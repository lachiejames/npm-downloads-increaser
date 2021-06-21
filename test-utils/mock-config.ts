import { setConfig } from "../src/config";
import { Config } from "../src/models/config.model";

export const setMockConfig = (): void => {
    const mockConfig: Config = {
        packageName: "code-review-leaderboard",
        numDownloads: 10,
        maxConcurrentDownloads: 5,
        downloadTimeout: 1000,
    };
    setConfig(mockConfig);
};

export const MOCK_START_TIME: number = new Date(2020, 1, 1).getTime();
