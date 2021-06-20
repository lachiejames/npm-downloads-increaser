import { format } from "date-fns";
import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
import { Stats } from "../models/stats.model";

export const terminalSpinner: Ora = ora();

export const mapToString = (num: number): string => {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return num.toFixed(2);
    }
};

export const mapToDate = (num: number | null): string => {
    if (num === null || num < 0) {
        return "--:--:--";
    } else {
        // For some reason Date(num) adds +10 hours onto my date in this format, so this is a workaround
        return format(new Date(0, 0, 0, 0, 0, num), "HH:mm:ss");
    }
};

export const logDownload = (stats: Stats): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    terminalSpinner.text = `\n`;
    terminalSpinner.text += `Download count:            ${mapToString(stats.successfulDownloads)}/${stats.config.numDownloads}\n`;
    terminalSpinner.text += `Download speed:            ${mapToString(stats.getDownloadSpeed())} dl/s\n`;
    terminalSpinner.text += `Estimated time remaining:  ${mapToDate(stats.getTimeRemaining())}\n`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
