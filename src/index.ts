import { request } from "gaxios";

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

const run = async () => {
    const numDownloads = 100;
    const timeBetweenDownloads = 3000;
    const packageName = "code-review-leaderboard";
    const packageVersion = "1.2.3";

    for (let i = 0; i < numDownloads; i++) {
        await downloadPackage(packageName, packageVersion);
        await sleep(timeBetweenDownloads);
        console.log(i);
    }
};

run();
