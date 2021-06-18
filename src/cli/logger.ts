import { format } from "date-fns";
import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
import { Stats } from "../models/stats.model";

export const terminalSpinner: Ora = ora();

export const logDownload = (stats: Stats): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    const successfulDownloads: string = stats.successfulDownloads.toString();
    const downloadSpeed: string = stats.getDownloadSpeed().toFixed(2);
    const downloadSuccessRate: string = stats.getDownloadSuccessRate().toFixed(2);
    const timeRemaining: string = format(new Date(stats.getTimeRemaining()), "hh:mm:ss");
    const timeUntilNextNpmsRefresh: string = format(new Date(stats.getTimeUntilNextNpmsRefresh()), "hh:mm:ss");

    terminalSpinner.text = `Downloads: ${successfulDownloads}\n`;
    terminalSpinner.text += `Speed: ${downloadSpeed} dl/s\n`;
    terminalSpinner.text += `Download success rate: ${downloadSuccessRate}%\n`;
    terminalSpinner.text += `Time remaining: ${timeRemaining}\n`;
    terminalSpinner.text += `Time until npmjs downloads refresh: ${timeUntilNextNpmsRefresh}\n`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
