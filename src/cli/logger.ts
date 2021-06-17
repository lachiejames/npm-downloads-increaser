import ora, { Ora } from "ora";

import { Config } from "../models/config.model";
export const terminalSpinner: Ora = ora();

const startTime: number = Date.now();

export const logDownload = (config: Config, downloadNumber: number): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }
    const currentTime: number = Date.now();
    const timeElapsed: number = currentTime - startTime;
    const downloadsPerSecond = (downloadNumber * 1000) / timeElapsed;

    terminalSpinner.text = `Downloaded ${config.packageName} ${downloadNumber}/${config.numDownloads}`;
    terminalSpinner.text += `  (${downloadsPerSecond.toFixed(2)} downloads/second)`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
