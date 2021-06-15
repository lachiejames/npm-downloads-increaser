import ora, { Ora } from "ora";

import { Config } from "../models/config.model";

export const terminalSpinner: Ora = ora();

export const logDownload = (config: Config, numSuccessful: number, numFailed: number): void => {
    if (!terminalSpinner.isSpinning) {
        terminalSpinner.start();
    }
    terminalSpinner.text =
        `Downloaded ${config.packageName} ${numSuccessful}/${config.numDownloads}\n` +
        `Successful: ${numSuccessful}\n` +
        `Failed: ${numFailed}`;
};

export const logComplete = (config: Config): void => {
    terminalSpinner.succeed(`Completed ${config.numDownloads} downloads for ${config.packageName}`);
};

export const logError = (error: Error): void => {
    terminalSpinner.stopAndPersist();
    terminalSpinner.fail(error.toString());
};
