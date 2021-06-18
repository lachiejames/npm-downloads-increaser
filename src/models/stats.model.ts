import { Config } from "./config.model";

export class Stats {
    public successfulDownloads = 0;

    public failedDownloads = 0;

    private startTime: number;

    private config: Config;

    public constructor(config: Config, startTime: number) {
        this.config = config;
        this.startTime = startTime;
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

    public getTimeRemaining(): number | null {
        const downloadsRemaining: number = this.config.numDownloads - this.successfulDownloads;
        const downloadSpeed: number = this.getDownloadSpeed();

        if (downloadSpeed <= 0) {
            return null;
        } else {
            return downloadsRemaining / downloadSpeed;
        }
    }
}
