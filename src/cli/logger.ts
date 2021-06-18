import { format } from "date-fns";
import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
import { Stats } from "../models/stats.model";

export const terminalSpinner: Ora = ora();

const mapToString = (num: number): string => {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return num.toFixed(2);
    }
};

const mapToDate = (num: number | null): string => {
    if (num === null || num <= 0) {
        return "--:--:--";
    } else {
        return format(new Date(num), "hh:mm:ss");
    }
};

export const logDownload = (stats: Stats): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    terminalSpinner.text = `\n`;
    terminalSpinner.text += `Downloads:                 ${mapToString(stats.successfulDownloads)}\n`;
    terminalSpinner.text += `Speed:                     ${mapToString(stats.getDownloadSpeed())} dl/s\n`;
    terminalSpinner.text += `Success rate:              ${mapToString(stats.getDownloadSuccessRate())}%\n`;
    terminalSpinner.text += `Estimated time remaining:  ${mapToDate(stats.getTimeRemaining())}\n`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
