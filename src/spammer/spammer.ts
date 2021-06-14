import { GaxiosError, GaxiosResponse, request } from "gaxios";

import { logComplete, logDownload, logError } from "../cli/logger";
import { Config } from "../models/config.model";
import { NpmjsResponse } from "../models/npmjs-response.model";

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

export const downloadPackage = async (name: string, version: string): Promise<void> => {
    await request<unknown>({
        baseUrl: "https://registry.yarnpkg.com",
        url: `/${name}/-/${name}-${version}.tgz`,
        method: "GET",
    }).catch((response: GaxiosError<unknown>) => {
        throw Error(`Failed to download ${response.config.url}\n${response.message}`);
    });
};

export const run = async (config: Config): Promise<void> => {
    try {
        const npmsResponse: NpmjsResponse = await queryNpms(config.packageName);
        const version: string = npmsResponse.collected.metadata.version;

        for (let i = 0; i < config.numDownloads; i++) {
            await downloadPackage(config.packageName, version);

            logDownload(config, i + 1);
        }

        logComplete(config);
    } catch (e) {
        logError(e);
    }
};
