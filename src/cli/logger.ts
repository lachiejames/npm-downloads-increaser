import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
export const terminalSpinner: Ora = ora();

const startTime: number = Date.now();

const getDownloadSpeed = (numSuccessful: number) => {
    const currentTime: number = Date.now();
    const timeElapsed: number = currentTime - startTime;
    const downloadsPerSecond: number = (numSuccessful * 1000) / timeElapsed;
    return downloadsPerSecond.toFixed(2);
};

const getDownloadSuccessRate = (numSuccessful: number, numFailed: number) => {
    const totalDownloads: number = numSuccessful + numFailed;
    const successRate: number = numSuccessful / totalDownloads;
    return successRate.toFixed(2);
};

export const logDownload = (
    config: Config,
    downloadNumber: number,
    numSuccessful: number,
    numFailed: number,
    timeUntilRefresh: number,
): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    terminalSpinner.text = `Downloads: ${downloadNumber}\n`;
    terminalSpinner.text += `Speed: ${getDownloadSpeed(numSuccessful)} dl/s\n`;
    terminalSpinner.text += `Download success rate: ${getDownloadSuccessRate(numSuccessful, numFailed)}  (concurrent=${
        config.maxConcurrentDownloads
    }, timeout=${config.downloadTimeout})\n`;
    terminalSpinner.text += `Time remaining: ${0}\n`;
    terminalSpinner.text += `Time until npmjs downloads refresh: ${timeUntilRefresh}\n`;

    // numSuccessful downloads
    // downloads/second
    // % successful, also show concurrent and timeout config
    // projected completion time
    // time until next npmjs refresh

    // Make logging object to contain values?  sounds good, less params
    // actually nah fuck that
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
