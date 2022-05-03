import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { setMockConfig } from "../../test-utils/mock-config";
import { getMockStats } from "../../test-utils/mock-stats";
import { MOCK_PACKAGE_VERSION, setMockErrorResponses, setMockResponses } from "../../test-utils/set-http-mocks";

import { downloadPackage, getEncodedPackageName, queryNpms, run, stripOrganisationFromPackageName } from "./spammer";

describe("spammer", () => {
    beforeEach(() => {
        cleanAll();
        MockConsole();
        setMockConfig();
    });

    describe("stripOrganisationFromPackageName()", () => {
        it("when packageName is '@babel/core', then returns 'core'", async () => {
            expect(stripOrganisationFromPackageName("@babel/core")).toEqual("core");
        });

        it("when packageName is 'core', then returns 'core'", async () => {
            expect(stripOrganisationFromPackageName("core")).toEqual("core");
        });

        it("when packageName is '', then returns ''", async () => {
            expect(stripOrganisationFromPackageName("")).toEqual("");
        });
    });

    describe("getEncodedPackageName()", () => {
        it("when packageName is '@babel/core', then returns '%40babel%2Fcore'", async () => {
            expect(getEncodedPackageName("@babel/core")).toEqual("%40babel%2Fcore");
        });

        it("when packageName is 'core', then returns 'core'", async () => {
            expect(getEncodedPackageName("core")).toEqual("core");
        });

        it("when packageName is '', then returns ''", async () => {
            expect(getEncodedPackageName("")).toEqual("");
        });
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

            await expect(downloadPackage(MOCK_PACKAGE_VERSION, getMockStats())).resolves.not.toThrowError();
        });

        it("resolves when request fails", async () => {
            setMockErrorResponses();

            await expect(downloadPackage(MOCK_PACKAGE_VERSION, getMockStats())).resolves.not.toThrowError();
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
