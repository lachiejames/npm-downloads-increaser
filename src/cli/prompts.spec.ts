import prompts from "prompts";

import { getPackageName } from "./prompts";

describe("cli config", () => {
    it("getPackageName() returns the provided package name", async () => {
        prompts.inject(["code-review-leaderboard"]);
        expect(await getPackageName()).toEqual("code-review-leaderboard");
    });
});
