import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { logComplete, logDownload, logError } from "../cli/logger";
import { getConfig } from "../config";
import { NpmjsResponse } from "../models/npmjs-response.model";
import { Stats } from "../models/stats.model";

// If package name is scoped, return the package name without the scope
// e.g. package-name url -> /package-name/-/package-name-1.0.0.tgz
// e.g. @scope/package-name url -> /@scope/package-name/-/package-name-1.0.0.tgz
// Fixes https://github.com/lachiejames/npm-downloads-increaser/issues/91
export const stripOrganisationFromPackageName = (packageName: string): string => {
    const packageNameWithScope: string[] = packageName.split("/");
    return packageNameWithScope.pop() ?? packageName;
};

export const getEncodedPackageName = (packageName: string): string => {
    return encodeURIComponent(packageName);
};

export const queryNpms = async (): Promise<NpmjsResponse> => {
    const encodedPackageName: string = getEncodedPackageName(getConfig().packageName);

    const npmsResponse: GaxiosResponse<NpmjsResponse> = await request<NpmjsResponse>({
        baseUrl: "https://api.npms.io",
        url: `/v2/package/${encodedPackageName}`,
        method: "GET",
    }).catch((response: GaxiosError<NpmjsResponse>) => {
        throw Error(`Failed to download ${response.config.url}\n${response.message}`);
    });

    return npmsResponse.data;
};

export const downloadPackage = async (version: string, stats: Stats): Promise<unknown> => {
    const packageName: string = getConfig().packageName;
    const unscopedPackageName: string = stripOrganisationFromPackageName(packageName);

    return request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${packageName}/-/${unscopedPackageName}-${version}.tgz`,
        method: "GET",
        timeout: getConfig().downloadTimeout,
        responseType: "stream",
    })
        .then((_) => stats.successfulDownloads++)
        .catch((_) => stats.failedDownloads++);
};

const spamDownloads = async (version: string, stats: Stats): Promise<void> => {
    const requests: Promise<unknown>[] = [];

    for (let i = 0; i < getConfig().maxConcurrentDownloads; i++) {
        requests.push(downloadPackage(version, stats));
    }

    await Promise.all(requests);

    if (stats.successfulDownloads < getConfig().numDownloads) {
        await spamDownloads(version, stats);
    }
};

export const run = async (): Promise<void> => {
    try {
        const npmsResponse: NpmjsResponse = await queryNpms();
        const version: string = npmsResponse.collected.metadata.version;
        const startTime = Date.now();
        const stats: Stats = new Stats(startTime);

        const loggingInterval: NodeJS.Timeout = setInterval(() => logDownload(stats), 1000);
        await spamDownloads(version, stats);

        clearInterval(loggingInterval);
        logComplete();
    } catch (e) {
        logError(e);
    }
};
