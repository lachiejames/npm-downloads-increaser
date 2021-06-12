import prompts from "prompts";

import { getNumberOfDownloads, getPackageName, getPackageVersion, getTimeBetweenDownloads } from "./prompts";

describe("cli config", () => {
    it("getPackageName() returns the provided package name", async () => {
        prompts.inject(["code-review-leaderboard"]);
        expect(await getPackageName()).toEqual("code-review-leaderboard");
    });

    it("getPackageVersion() returns the provided package name", async () => {
        prompts.inject(["1.2.1"]);
        expect(await getPackageVersion()).toEqual("1.2.1");
    });

    it("getNumberOfDownloads() returns the provided package name", async () => {
        prompts.inject([1000]);
        expect(await getNumberOfDownloads()).toEqual(1000);
    });

    it("getTimeBetweenDownloads() returns the provided package name", async () => {
        prompts.inject([5000]);
        expect(await getTimeBetweenDownloads()).toEqual(5000);
    });
});
