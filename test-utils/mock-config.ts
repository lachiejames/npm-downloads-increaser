import { Config } from "../src/models/config.model";

export const getMockConfig = (): Config => {
    return {
        packageName: "code-review-leaderboard",
        numDownloads: 10,
        maxConcurrentDownloads: 5,
        downloadTimeout: 1000,
    };
};
