import { validateNumbers, validatePackageName, validatePackageVersion } from "./validators";

describe("cli validators", () => {
    describe("validatePackageName()", () => {
        it("if a name is entered, returns true", () => {
            expect(validatePackageName("code-review-leaderboard")).toEqual(true);
        });

        it("if no name is entered, returns error message", () => {
            expect(validatePackageName("")).toEqual("Must enter a package name");
        });
    });

    describe("validatePackageVersion()", () => {
        it("if a version is entered, returns true", () => {
            expect(validatePackageVersion("1.2.3")).toEqual(true);
        });

        it("if no version is entered, returns error message", () => {
            expect(validatePackageVersion("")).toEqual("Must enter a package version");
        });
    });

    describe("validateNumbers()", () => {
        it("if a number greater than 0 is entered, returns true", () => {
            expect(validateNumbers(500)).toEqual(true);
        });

        it("if 0 is entered, returns error message", () => {
            expect(validateNumbers(0)).toEqual("Must be greater than 0");
        });

        it("if a number less than 0 is entered, returns error message", () => {
            expect(validateNumbers(-3)).toEqual("Must be greater than 0");
        });

        it("if no version is entered, returns error message", () => {
            expect(validateNumbers(undefined)).toEqual("Must enter a number");
        });
    });
});
