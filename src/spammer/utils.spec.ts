import { getEncodedPackageName, stripOrganisationFromPackageName } from "./utils";

describe("stripOrganisationFromPackageName()", () => {
    it("when packageName is '@babel/core', then returns 'core'", () => {
        expect(stripOrganisationFromPackageName("@babel/core")).toEqual("core");
    });

    it("when packageName is 'core', then returns 'core'", () => {
        expect(stripOrganisationFromPackageName("core")).toEqual("core");
    });

    it("when packageName is '', then returns ''", () => {
        expect(stripOrganisationFromPackageName("")).toEqual("");
    });
});

describe("getEncodedPackageName()", () => {
    it("when packageName is '@babel/core', then returns '%40babel%2Fcore'", () => {
        expect(getEncodedPackageName("@babel/core")).toEqual("%40babel%2Fcore");
    });

    it("when packageName is 'core', then returns 'core'", () => {
        expect(getEncodedPackageName("core")).toEqual("core");
    });

    it("when packageName is '', then returns ''", () => {
        expect(getEncodedPackageName("")).toEqual("");
    });
});
