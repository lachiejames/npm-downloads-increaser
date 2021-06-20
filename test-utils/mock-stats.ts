import { Stats } from "../src/models/stats.model";

export const getMockStats = (): Stats => {
    const mockDate: Date = new Date(2020, 1, 1);
    const stats: Stats = new Stats(mockDate.getTime());

    stats.successfulDownloads = 500;
    stats.failedDownloads = 300;

    return stats;
};

export const setCurrentDate = (date: Date): void => {
    Date.now = () => date.getTime();
};
