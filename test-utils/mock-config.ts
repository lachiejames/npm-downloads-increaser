import { Config } from "../src/models/config.model";

export const getMockConfig = (): Config => {
    return {
        packageName: "code-review-leaderboard",
        numDownloads: 3,
        timeBetweenDownloads: 10,
    };
};
