import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { logComplete, logDownload, logError } from "../cli/logger";
import { Config } from "../models/config.model";
import { NpmjsResponse } from "../models/npmjs-response.model";

const MAX_CONCURRENT_DOWNLOADS = 100;

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

export const downloadPackage = async (config: Config, version: string): Promise<GaxiosResponse<unknown>> => {
    return request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${config.packageName}/-/${config.packageName}-${version}.tgz`,
        method: "GET",
        timeout: 3000,
        responseType: "stream",
    })
        .then((response) => {
            numSuccessful++;
            logDownload(config, numSuccessful, numFailed);
            return response;
        })
        .catch((e) => {
            numFailed++;
            return Promise.resolve({}) as unknown as GaxiosResponse<unknown>;
        });
};

let numSuccessful = 0;
let numFailed = 0;

const spamDownloads = async (config: Config, version: string): Promise<void> => {
    const requests: Promise<GaxiosResponse<unknown>>[] = [];

    for (let i = 0; i < MAX_CONCURRENT_DOWNLOADS; i++) {
        requests.push(downloadPackage(config, version));
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
