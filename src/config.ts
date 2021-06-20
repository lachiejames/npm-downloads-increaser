import defaultConfig from "../npm-downloads-increaser.config";

import { Config } from "./models/config.model";

let selectedConfig: Config = defaultConfig;

export const getConfig = (): Config => {
    return selectedConfig;
};

export const setConfig = (newConfig: Config): void => {
    selectedConfig = newConfig;
};
