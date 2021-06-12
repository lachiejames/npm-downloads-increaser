import { request } from "gaxios";
import { Config } from "../models/config.model";

const downloadPackage = async (name: string, version: string) => {
    const packageUrl = `https://registry.yarnpkg.com/${name}/-/${name}-${version}.tgz`;
    const response = await request({ url: packageUrl, retry: true });

    if (response.status !== 200) {
        throw Error(`Failed to download ${packageUrl}\n${response.statusText}`);
    }
};

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const run = async (config: Config) => {
    for (let i = 0; i < config.numDownloads; i++) {
        await downloadPackage(config.packageName, config.packageVersion);
        await sleep(config.timeBetweenDownloads);
        
        console.log(`Downloaded ${config.packageName} ${i + 1}/${config.numDownloads}`);
    }
};
