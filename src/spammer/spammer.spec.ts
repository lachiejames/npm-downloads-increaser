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

            await expect(downloadPackage(config.packageName, MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });

        it("throws error when request fails", async () => {
            setMockErrorResponses(config);

            await expect(downloadPackage(config.packageName, MOCK_PACKAGE_VERSION)).rejects.toThrowError(
                new Error(
                    `Failed to download https://registry.yarnpkg.com/code-review-leaderboard/-/code-review-leaderboard-1.2.3.tgz\n` +
                        `request to https://registry.yarnpkg.com/code-review-leaderboard/-/code-review-leaderboard-1.2.3.tgz failed, reason: test message`,
                ),
            );
        });
    });

    describe("run()", () => {
        it("terminalSpinner contains expected text", async () => {
            setMockResponses(config);

            await run(config);
            expect(terminalSpinner.text).toEqual("Downloaded code-review-leaderboard 3/3");
        });

        it("does NOT throw error when response is 500", async () => {
            setMockErrorResponses(config);

            await expect(run(config)).resolves.not.toThrowError();
        });
    });
});
