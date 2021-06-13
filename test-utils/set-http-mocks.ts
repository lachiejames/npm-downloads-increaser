import nock from "nock";

import { Config } from "../src/models/config.model";

import mockNpmsResponse from "./mock-npms-response.json";

export const MOCK_PACKAGE_VERSION = mockNpmsResponse.collected.metadata.version;

const setMockNpmsResponse = (config: Config): void => {
    nock("https://api.npms.io").get(`/v2/package/${config.packageName}`).reply(200, mockNpmsResponse);
};

const setMockDownloadResponse = (config: Config): void => {
    nock("https://registry.yarnpkg.com").get(`/${config.packageName}/-/${config.packageName}-${MOCK_PACKAGE_VERSION}.tgz`).reply(200, {});
};

export const setMockResponses = (config: Config): void => {
    setMockNpmsResponse(config);

    for (let i = 0; i <= config.numDownloads; i++) {
        setMockDownloadResponse(config);
    }
};

const setMockDownloadErrorResponse = (config: Config): void => {
    nock("https://registry.yarnpkg.com").get(`/${config.packageName}/-/${config.packageName}-${MOCK_PACKAGE_VERSION}.tgz`).reply(500, {});
};

const setMockNpmsErrorResponse = (config: Config): void => {
    nock("https://api.npms.io").get(`/v2/package/${config.packageName}`).reply(200, mockNpmsResponse);
};

export const setMockErrorResponses = (config: Config): void => {
    setMockNpmsErrorResponse(config);
    setMockDownloadErrorResponse(config);
};
