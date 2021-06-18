import { Config } from "./config.model";

export class Stats {
    public startTime = 0;

    public successfulDownloads = 0;

    public failedDownloads = 0;

    public previousPackageDownloads = 0;

    public expectedPackageDownloads = 0;

    public dateLastAnalyzed = 0;

    private config: Config;

    public constructor(config: Config, startTime: number, dateLastAnalyzed: number) {
        this.config = config;
        this.startTime = startTime;
        this.dateLastAnalyzed = dateLastAnalyzed;
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
        const currentTime = Date.now();
        return currentTime - this.dateLastAnalyzed;
    }
}
