import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { setMockConfig } from "../../test-utils/mock-config";
import { MOCK_PACKAGE_VERSION, setMockErrorResponses, setMockResponses } from "../../test-utils/set-http-mocks";

import { downloadPackage, queryNpms, run } from "./spammer";

describe("spammer", () => {
    beforeEach(() => {
        cleanAll();
        MockConsole();
        setMockConfig();
    });

    describe("queryNpms()", () => {
        it("resolves when response is 200", async () => {
            setMockResponses();

            await expect(queryNpms()).resolves.not.toThrowError();
        });

        it("throws error when request fails", async () => {
            setMockErrorResponses();

            await expect(queryNpms()).rejects.toThrowError(
                new Error(
                    `Failed to download https://api.npms.io/v2/package/code-review-leaderboard\n` +
                        `request to https://api.npms.io/v2/package/code-review-leaderboard failed, reason: test message`,
                ),
            );
        });
    });

    describe("downloadPackage()", () => {
        it("resolves when response is 200", async () => {
            setMockResponses();

            await expect(downloadPackage(MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });

        it("resolves when request fails", async () => {
            setMockErrorResponses();

            await expect(downloadPackage(MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });
    });

    describe("run()", () => {
        it("resolves when responses are all successful", async () => {
            setMockResponses();

            await expect(run()).resolves.not.toThrowError();
        });

        it("resolves when responses include failures", async () => {
            setMockErrorResponses();
            await expect(run()).resolves.not.toThrowError();
        });
    });
});
