import ora, { Ora } from "ora";

import { getConfig } from "../config";

export const terminalSpinner: Ora = ora();

const startTime: number = Date.now();

export const logDownload = (downloadNumber: number): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }

    const currentTime: number = Date.now();
    const timeElapsed: number = currentTime - startTime;
    const downloadsPerSecond = (downloadNumber * 1000) / timeElapsed;

    terminalSpinner.text = `Downloaded ${getConfig().packageName} ${downloadNumber}/${getConfig().numDownloads}`;
    terminalSpinner.text += `  (${downloadsPerSecond.toFixed(2)} downloads/second)`;
};

export const logComplete = (): void => {
    terminalSpinner.succeed(`Completed ${getConfig().numDownloads} downloads for ${getConfig().packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
