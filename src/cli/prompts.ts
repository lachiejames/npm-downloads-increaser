import prompts, { Answers } from "prompts";

import { Config } from "../models/config.model";

import { validateNumbers, validatePackageName } from "./validators";

// `prompts` package uses generics which accepts string literal values and then uses those values as types
// This means I have to ensure I use a string literal type that matches a string literal value
const PROMPT_NAME = "value";
type PromptType = "value";

export const getPackageName = async (): Promise<string> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "text",
        message: "Package name: ",
        initial: "npm-downloads-increaser",
        validate: (name: string) => validatePackageName(name),
    });

    return promptData[PROMPT_NAME];
};

export const getNumberOfDownloads = async (): Promise<number> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "number",
        message: "Number of downloads: ",
        initial: 1000000,
        validate: (downloads: number) => validateNumbers(downloads),
    });

    return promptData[PROMPT_NAME];
};

export const getMaxConcurrentDownloads = async (): Promise<number> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "number",
        message: "Number of concurrent downloads: ",
        initial: 300,
        validate: (downloads: number) => validateNumbers(downloads),
    });

    return promptData[PROMPT_NAME];
};

export const getDownloadTimeout = async (): Promise<number> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "number",
        message: "Time to wait for a download to complete (in ms): ",
        initial: 3000,
        validate: (downloads: number) => validateNumbers(downloads),
    });

    return promptData[PROMPT_NAME];
};

const getEmptyConfig = (): Config => {
    return {
        packageName: "",
        numDownloads: 0,
        maxConcurrentDownloads: 0,
        downloadTimeout: 0,
    };
};

export const getConfigFromCli = async (): Promise<Config> => {
    const config: Config = getEmptyConfig();

    config.packageName = await getPackageName();
    config.numDownloads = await getNumberOfDownloads();
    config.maxConcurrentDownloads = await getMaxConcurrentDownloads();
    config.downloadTimeout = await getDownloadTimeout();

    return config;
};
