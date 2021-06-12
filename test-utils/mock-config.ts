import { Config } from "../src/models/config.model";

export const getMockConfig = (): Config => {
    return {
        packageName: "code-review-leaderboard",
        packageVersion: "1.2.1",
        numDownloads: 3,
        timeBetweenDownloads: 10,
    };
};
