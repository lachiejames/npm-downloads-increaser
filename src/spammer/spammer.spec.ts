import { getMockConfig } from "../../test-utils/mock-config";
import { downloadPackage, run } from "./spammer";
import MockConsole from "jest-mock-console";
import { cleanAll } from "nock";
import { setHttpErrorResponse, setMockResponses } from "../../test-utils/set-http-mocks";
import { Config } from "../models/config.model";

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
        it("logs download expected number of times", async () => {
            setMockResponses(config);

            await run(config);
            expect(console.log).toHaveBeenCalledTimes(3);
        });

        it("logs error when response is 500", async () => {
            setHttpErrorResponse(config);

            await run(config);
            expect(console.error).toHaveBeenCalledWith(
                `Error: Failed to download https://registry.yarnpkg.com/code-review-leaderboard/-/code-review-leaderboard-1.2.1.tgz\n` +
                    `Request failed with status code 500`,
            );
        });
    });
});
