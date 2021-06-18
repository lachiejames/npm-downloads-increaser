import { addDays } from "date-fns";

import { Config } from "./config.model";

export class Stats {
    public successfulDownloads = 0;

    public failedDownloads = 0;

    public previousPackageDownloads: number;

    private startTime: number;

    private dateLastAnalyzed: number;

    private config: Config;

    public constructor(
        config: Config,
        startTime: number,
        dateLastAnalyzed: number,
        previousPackageDownloads: number,
    ) {
        this.config = config;
        this.startTime = startTime;
        this.dateLastAnalyzed = dateLastAnalyzed;
        this.previousPackageDownloads = previousPackageDownloads;
    }

    public getDownloadSpeed(): number {
        const currentTime: number = Date.now();
        const timeElapsed: number = currentTime - this.startTime;
        const downloadsPerMillisecond: number = this.successfulDownloads / timeElapsed;
        const downloadsPerSecond: number = downloadsPerMillisecond * 1000;
        return downloadsPerSecond;
    }

    public getDownloadSuccessRate(): number {
        const totalDownloads: number = this.successfulDownloads + this.failedDownloads;
        const successRate: number = this.successfulDownloads / totalDownloads;
        const successRatePercentage: number = 100 * successRate;
        return successRatePercentage;
    }

    public getTimeRemaining(): number {
        const downloadsRemaining: number = this.config.numDownloads - this.successfulDownloads;
        const timeRemaining: number = downloadsRemaining / this.getDownloadSpeed();
        return timeRemaining;
    }

    public getTimeUntilNextNpmsRefresh(): number {
        const currentTime: number = Date.now();
        const nextRefresh: number = addDays(this.dateLastAnalyzed, 1).getTime();
        const timeUntilRefresh: number = nextRefresh - currentTime;
        return timeUntilRefresh;
    }

    public getExpectedDownloads(): number {
        return this.previousPackageDownloads + this.config.numDownloads;
    }
}
