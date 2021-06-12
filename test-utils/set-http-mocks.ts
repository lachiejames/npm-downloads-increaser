import nock from "nock";

import { Config } from "../src/models/config.model";

export const setMockResponses = (config: Config): void => {
    for (let i = 0; i <= config.numDownloads; i++) {
        nock("https://registry.yarnpkg.com/")
            .get(`/${config.packageName}/-/${config.packageName}-${config.packageVersion}.tgz`)
            .reply(200, {});
    }
};

export const setHttpErrorResponse = (config: Config): void => {
    nock("https://registry.yarnpkg.com/").get(`/${config.packageName}/-/${config.packageName}-${config.packageVersion}.tgz`).reply(500, {});
};
