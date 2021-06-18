import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
import { Stats } from "../models/stats.model";

export const terminalSpinner: Ora = ora();

export const logDownload = (
    stats:Stats
): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    terminalSpinner.text = `Downloads: ${stats.successfulDownloads}\n`;
    terminalSpinner.text += `Speed: ${stats.getDownloadSpeed()} dl/s\n`;
    terminalSpinner.text += `Download success rate: ${stats.getDownloadSuccessRate()}%\n`;
    terminalSpinner.text += `Time remaining: ${stats.getTimeRemaining()}\n`;
    terminalSpinner.text += `Time until npmjs downloads refresh: ${stats.timeUntilNpmjsRefresh}\n`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
