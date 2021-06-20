import { GaxiosError } from "gaxios";
import nock from "nock";

import { getConfig } from "../src/config";

import mockNpmsResponse from "./mock-npms-response.json";

export const MOCK_PACKAGE_VERSION = mockNpmsResponse.collected.metadata.version;

const MOCK_ERROR_RESPONSE: GaxiosError<unknown> = {
    config: {
        url: "test url",
    },
    message: "test message",
    name: "test name",
};

const setMockNpmsResponse = (): void => {
    nock("https://api.npms.io").get(`/v2/package/${getConfig().packageName}`).reply(200, mockNpmsResponse);
};

const setMockDownloadResponse = (): void => {
    nock("https://registry.yarnpkg.com").get(`/${getConfig().packageName}/-/${getConfig().packageName}-${MOCK_PACKAGE_VERSION}.tgz`).reply(200, {});
};

const setMockNpmsErrorResponse = (): void => {
    nock("https://api.npms.io").get(`/v2/package/${getConfig().packageName}`).replyWithError(MOCK_ERROR_RESPONSE);
};

const setMockDownloadErrorResponse = (): void => {
    nock("https://registry.yarnpkg.com")
        .get(`/${getConfig().packageName}/-/${getConfig().packageName}-${MOCK_PACKAGE_VERSION}.tgz`)
        .replyWithError(MOCK_ERROR_RESPONSE);
};

export const setMockResponses = (): void => {
    setMockNpmsResponse();

    for (let i = 0; i <= getConfig().numDownloads; i++) {
        setMockDownloadResponse();
    }
};

export const setMockErrorResponses = (): void => {
    setMockNpmsErrorResponse();
    setMockDownloadErrorResponse();
};
