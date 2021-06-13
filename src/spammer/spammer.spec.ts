import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { getMockConfig } from "../../test-utils/mock-config";
import { MOCK_PACKAGE_VERSION, setMockErrorResponses, setMockResponses } from "../../test-utils/set-http-mocks";
import { terminalSpinner } from "../cli/logger";
import { Config } from "../models/config.model";

import { downloadPackage, run } from "./spammer";

describe("spammer", () => {
    let config: Config;

    beforeEach(() => {
        cleanAll();
        MockConsole();
        config = getMockConfig();
    });

    describe("downloadPackage()", () => {
        it("resolves when response is 200", async () => {
            setMockResponses(config);

            await expect(downloadPackage(config.packageName, MOCK_PACKAGE_VERSION)).resolves.not.toThrowError();
        });

        it("throws error when response is 500", async () => {
            setMockErrorResponses(config);

            await expect(downloadPackage(config.packageName, MOCK_PACKAGE_VERSION)).rejects.toThrowError(
                "Request failed with status code 500",
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
