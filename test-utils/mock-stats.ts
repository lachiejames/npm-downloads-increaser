import { Stats } from "../src/models/stats.model";

import { getMockConfig } from "./mock-config";

export const getMockStats = (): Stats => {
    const mockDate: Date = new Date(2020, 1, 1);
    const config = getMockConfig();
    const stats: Stats = new Stats(config, mockDate.getTime());

    stats.successfulDownloads = 500;
    stats.failedDownloads = 300;

    return stats;
};
