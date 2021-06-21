import { Stats } from "../src/models/stats.model";

import { MOCK_START_TIME } from "./mock-config";

export const getMockStats = (): Stats => {
    const successfulDownloads = 500;
    const failedDownloads = 300;
    const stats: Stats = new Stats(MOCK_START_TIME, successfulDownloads, failedDownloads);

    return stats;
};

export const setCurrentDate = (date: Date): void => {
    Date.now = () => date.getTime();
};
