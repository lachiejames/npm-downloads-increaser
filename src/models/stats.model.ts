import { Config } from "./config.model";

export class Stats {
    public successfulDownloads = 0;

    public failedDownloads = 0;

    private startTime: number;

    private config: Config;

    public constructor(config: Config, startTime: number, successfulDownloads?: number, failedDownloads?: number) {
        this.config = config;
        this.startTime = startTime;
        this.successfulDownloads = successfulDownloads ?? this.successfulDownloads;
        this.failedDownloads = failedDownloads ?? this.failedDownloads;
    }

    public getDownloadSpeed(): number {
        const currentTime: number = Date.now();
        const timeElapsed: number = currentTime - this.startTime;
        const downloadsPerMillisecond: number = this.successfulDownloads / timeElapsed;
        const downloadsPerSecond: number = downloadsPerMillisecond * 1000;

        if (downloadsPerSecond > 0 && isFinite(downloadsPerSecond)) {
            return downloadsPerSecond;
        } else {
            return 0;
        }
    }

    public getTimeRemaining(): number | null {
        const downloadsRemaining: number = this.config.numDownloads - this.successfulDownloads;
        const downloadsPerSecond: number = this.getDownloadSpeed() ?? 0;
        const secondsRemaining = downloadsRemaining / downloadsPerSecond;

        if (secondsRemaining <= 0) {
            return null;
        } else {
            return secondsRemaining;
        }
    }
}
