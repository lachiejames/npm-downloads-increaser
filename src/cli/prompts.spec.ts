import prompts from "prompts";

import { getConfigFromCli, getNumberOfDownloads, getPackageName, getTimeBetweenDownloads } from "./prompts";

describe("cli prompts", () => {
    it("getPackageName() returns the provided package name", async () => {
        prompts.inject(["code-review-leaderboard"]);
        expect(await getPackageName()).toEqual("code-review-leaderboard");
    });


    it("getNumberOfDownloads() returns the provided package name", async () => {
        prompts.inject([1000]);
        expect(await getNumberOfDownloads()).toEqual(1000);
    });

    it("getTimeBetweenDownloads() returns the provided package name", async () => {
        prompts.inject([5000]);
        expect(await getTimeBetweenDownloads()).toEqual(5000);
    });

    it("returns a config based on the provided values", async () => {
        prompts.inject(["code-review-leaderboard", "1.2.1", 1000, 5000]);

        const config = await getConfigFromCli();
        expect(config).toEqual({
            packageName: "code-review-leaderboard",
            numDownloads: 1000,
            timeBetweenDownloads: 5000,
        });
    });
});
