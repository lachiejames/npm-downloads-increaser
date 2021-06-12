import prompts, { Answers } from "prompts";

import { Config } from "../models/config.model";

// `prompts` package uses generics which accepts string literal values and then uses those values as types
// This means I have to ensure I use a string literal type that matches a string literal value
const PROMPT_NAME = "value";
type PromptType = "value";

export const getPackageName = async (): Promise<string> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "text",
        message: "Package name: ",
    });

    return promptData[PROMPT_NAME];
};

export const getPackageVersion = async (): Promise<string> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "text",
        message: "Package version: ",
    });

    return promptData[PROMPT_NAME];
};

export const getNumberOfDownloads = async (): Promise<number> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "number",
        message: "Number of downloads: ",
    });

    return promptData[PROMPT_NAME];
};

export const getTimeBetweenDownloads = async (): Promise<number> => {
    const promptData: Answers<PromptType> = await prompts({
        name: PROMPT_NAME,
        type: "number",
        message: "Time between downloads (in ms): ",
    });

    return promptData[PROMPT_NAME];
};

const getEmptyConfig = (): Config => {
    return {
        packageName: "",
        packageVersion: "",
        numDownloads: 0,
        timeBetweenDownloads: 0,
    };
};

export const getConfigFromCli = async (): Promise<Config> => {
    const config: Config = getEmptyConfig();

    config.packageName = await getPackageName();
    config.packageVersion = await getPackageVersion();
    config.numDownloads = await getNumberOfDownloads();
    config.timeBetweenDownloads = await getTimeBetweenDownloads();

    return config;
};
