import { setConfig } from "../src/config";
import { Config } from "../src/models/config.model";

export const setMockConfig = (): void => {
    const mockConfig: Config = {
        packageName: "code-review-leaderboard",
        numDownloads: 3,
        maxConcurrentDownloads: 5,
        downloadTimeout: 10,
    };
    setConfig(mockConfig);
};
