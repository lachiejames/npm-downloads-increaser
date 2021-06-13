import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";

import { getMockConfig } from "../../test-utils/mock-config";
import { setHttpErrorResponse, setMockResponses } from "../../test-utils/set-http-mocks";
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

            await expect(downloadPackage(config.packageName, config.packageVersion)).resolves.not.toThrowError();
        });

        it("throws error when response is 500", async () => {
            setHttpErrorResponse(config);

            await expect(downloadPackage(config.packageName, config.packageVersion)).rejects.toThrowError(
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
            setHttpErrorResponse(config);

            await expect(run(config)).resolves.not.toThrowError();
        });
    });
});
