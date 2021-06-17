import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { getMockConfig } from "../../test-utils/mock-config";
import { MOCK_PACKAGE_VERSION, setMockErrorResponses, setMockResponses } from "../../test-utils/set-http-mocks";
import { terminalSpinner } from "../cli/logger";
import { Config } from "../models/config.model";

import { downloadPackage, queryNpms, run } from "./spammer";

describe("spammer", () => {
    let config: Config;

    beforeEach(() => {
        cleanAll();
        MockConsole();
        config = getMockConfig();
    });

    describe("queryNpms()", () => {
        it("resolves when response is 200", async () => {
            setMockResponses(config);

            await expect(queryNpms(config.packageName)).resolves.not.toThrowError();
        });

        it("throws error when request fails", async () => {
            setMockErrorResponses(config);

            await expect(queryNpms(config.packageName)).rejects.toThrowError(
                new Error(
                    `Failed to download https://api.npms.io/v2/package/code-review-leaderboard\n` +
                        `request to https://api.npms.io/v2/package/code-review-leaderboard failed, reason: test message`,
                ),
            );
        });
    });

    describe("downloadPackage()", () => {
        it("resolves when response is 200", async () => {
            setMockResponses(config);

            await expect(downloadPackage(config, MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });

        it("resolves when request fails", async () => {
            setMockErrorResponses(config);

            await expect(downloadPackage(config, MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });
    });

    describe("run()", () => {
        it("resolves when responses are all successful", async () => {
            setMockResponses(config);

            await expect(run(config)).resolves.not.toThrowError();
        });

        it("resolves when responses include failures", async () => {
            setMockErrorResponses(config);
            await expect(run(config)).resolves.not.toThrowError();
        });
    });
});
