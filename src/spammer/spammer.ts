import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { logComplete, logDownload, logError } from "../cli/logger";
import { Config } from "../models/config.model";
import { NpmjsResponse } from "../models/npmjs-response.model";

let numSuccessful = 0;
let numFailed = 0;

export const queryNpms = async (packageName: string): Promise<NpmjsResponse> => {
    const npmsResponse: GaxiosResponse<NpmjsResponse> = await request<NpmjsResponse>({
        baseUrl: "https://api.npms.io",
        url: `/v2/package/${packageName}`,
        method: "GET",
    }).catch((response: GaxiosError<NpmjsResponse>) => {
        throw Error(`Failed to download ${response.config.url}\n${response.message}`);
    });

    return npmsResponse.data;
};

export const downloadPackage = async (config: Config, version: string, downloadNumber: number): Promise<GaxiosResponse<unknown> | null> => {
    return request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${config.packageName}/-/${config.packageName}-${version}.tgz`,
        method: "GET",
        timeout: config.downloadTimeout,
        responseType: "stream",
    })
        .then((response) => {
            numSuccessful++;
            logDownload(config, downloadNumber, numSuccessful, numFailed, 0);
            return response;
        })
        .catch((_) => {
            numFailed++;
            return null;
        });
};

const spamDownloads = async (config: Config, version: string): Promise<void> => {
    const requests: Promise<GaxiosResponse<unknown> | null>[] = [];

    for (let i = 0; i < config.maxConcurrentDownloads; i++) {
        requests.push(downloadPackage(config, version, numSuccessful + i));
    }

    await Promise.all(requests);

    if (numSuccessful < config.numDownloads) {
        await spamDownloads(config, version);
    }
};

export const run = async (config: Config): Promise<void> => {
    try {
        const npmsResponse: NpmjsResponse = await queryNpms(config.packageName);
        const version: string = npmsResponse.collected.metadata.version;

        await spamDownloads(config, version);

        logComplete(config);
    } catch (e) {
        logError(e);
    }
};
