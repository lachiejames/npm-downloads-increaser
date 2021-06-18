import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { logComplete, logDownload, logError } from "../cli/logger";
import { Config } from "../models/config.model";
import { NpmjsResponse } from "../models/npmjs-response.model";
import { Stats } from "../models/stats.model";

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

export const downloadPackage = async (config: Config, version: string, stats: Stats): Promise<GaxiosResponse<unknown> | null> => {
    return request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${config.packageName}/-/${config.packageName}-${version}.tgz`,
        method: "GET",
        timeout: config.downloadTimeout,
        responseType: "stream",
    })
        .then((response) => {
            stats.successfulDownloads++;
            return response;
        })
        .catch((_) => {
            stats.failedDownloads++;
            return null;
        });
};

const spamDownloads = async (config: Config, version: string, stats: Stats): Promise<void> => {
    const requests: Promise<GaxiosResponse<unknown> | null>[] = [];

    for (let i = 0; i < config.maxConcurrentDownloads; i++) {
        requests.push(downloadPackage(config, version, stats));
    }

    await Promise.all(requests);

    if (stats.successfulDownloads < config.numDownloads) {
        await spamDownloads(config, version, stats);
    }
};

export const run = async (config: Config): Promise<void> => {
    try {
        const npmsResponse: NpmjsResponse = await queryNpms(config.packageName);
        const version: string = npmsResponse.collected.metadata.version;
        const startTime = Date.now();
        const stats: Stats = new Stats(config, startTime);

        setInterval(() => logDownload(stats), 1000);

        await spamDownloads(config, version, stats);

        logComplete(config);
    } catch (e) {
        logError(e);
    }
};
