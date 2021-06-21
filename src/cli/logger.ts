import { format, secondsToHours } from "date-fns";
import ora, { Ora } from "ora";

import { getConfig } from "../config";
import { Stats } from "../models/stats.model";

export const terminalSpinner: Ora = ora();

export const mapToString = (num: number): string => {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return num.toFixed(2);
    }
};

export const mapToDate = (seconds: number | null): string => {
    if (seconds === null || seconds < 0) {
        return "--:--:--";
    }

    const milliseconds = 1000 * seconds;
    const date: Date = new Date(milliseconds);
    const hours: number = secondsToHours(seconds);
    const hoursString: string = hours.toString().padStart(2, "0");
    const minutesSecondsString: string = format(date, "mm:ss");

    return `${hoursString}:${minutesSecondsString}`;
};

export const logDownload = (stats: Stats): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    terminalSpinner.text = `\n`;
    terminalSpinner.text += `Download count:            ${mapToString(stats.successfulDownloads)}/${getConfig().numDownloads}\n`;
    terminalSpinner.text += `Download speed:            ${mapToString(stats.getDownloadSpeed())} dl/s\n`;
    terminalSpinner.text += `Estimated time remaining:  ${mapToDate(stats.getTimeRemaining())}\n`;
};

export const logComplete = (): void => {
    terminalSpinner.succeed(`Completed ${getConfig().numDownloads} downloads for ${getConfig().packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
