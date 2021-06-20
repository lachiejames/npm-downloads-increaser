import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { getConfig } from "src/config";

import { logComplete, logDownload, logError } from "../cli/logger";
import { NpmjsResponse } from "../models/npmjs-response.model";

let numSuccessful = 0;

export const queryNpms = async (): Promise<NpmjsResponse> => {
    const npmsResponse: GaxiosResponse<NpmjsResponse> = await request<NpmjsResponse>({
        baseUrl: "https://api.npms.io",
        url: `/v2/package/${getConfig().packageName}`,
        method: "GET",
    }).catch((response: GaxiosError<NpmjsResponse>) => {
        throw Error(`Failed to download ${response.config.url}\n${response.message}`);
    });

    return npmsResponse.data;
};

export const downloadPackage = async (version: string): Promise<GaxiosResponse<unknown> | null> => {
    return request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${getConfig().packageName}/-/${getConfig().packageName}-${version}.tgz`,
        method: "GET",
        timeout: getConfig().downloadTimeout,
        responseType: "stream",
    })
        .then((response) => {
            numSuccessful++;
            logDownload(numSuccessful);
            return response;
        })
        .catch((_) => {
            return null;
        });
};

const spamDownloads = async (version: string): Promise<void> => {
    const requests: Promise<GaxiosResponse<unknown> | null>[] = [];

    for (let i = 0; i < getConfig().maxConcurrentDownloads; i++) {
        requests.push(downloadPackage(version));
    }

    await Promise.all(requests);

    if (numSuccessful < getConfig().numDownloads) {
        await spamDownloads(version);
    }
};

export const run = async (): Promise<void> => {
    try {
        const npmsResponse: NpmjsResponse = await queryNpms();
        const version: string = npmsResponse.collected.metadata.version;

        await spamDownloads(version);

        logComplete();
    } catch (e) {
        logError(e);
    }
};
