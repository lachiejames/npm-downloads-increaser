import { GaxiosError, request } from "gaxios";

import { Config } from "../models/config.model";

const sleep = async (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const downloadPackage = async (name: string, version: string): Promise<void> => {
    const packageUrl = `https://registry.yarnpkg.com/${name}/-/${name}-${version}.tgz`;

    await request<unknown>({
        url: packageUrl,
        method: "GET",
    }).catch((response: GaxiosError<unknown>) => {
        throw Error(`Failed to download ${packageUrl}\n${response.message}`);
    });
};

export const run = async (config: Config): Promise<void> => {
    try {
        for (let i = 0; i < config.numDownloads; i++) {
            await downloadPackage(config.packageName, config.packageVersion);
            await sleep(config.timeBetweenDownloads);

            console.log(`Downloaded ${config.packageName} ${i + 1}/${config.numDownloads}`);
        }
    } catch (e) {
        console.error(e.toString());
    }
};
