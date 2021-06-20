import { getMockStats } from "../../test-utils/mock-stats";

import { logDownload, mapToDate, mapToString, terminalSpinner } from "./logger";

describe("logger", () => {
    afterEach(() => {
        // Prevents tests from hanging due
        terminalSpinner.stop();
    });

    describe("mapToString()", () => {
        it("if num is 100, returns '100'", () => {
            expect(mapToString(100)).toEqual("100");
        });

        it("if num is 0, returns '0'", () => {
            expect(mapToString(0)).toEqual("0");
        });

        it("if num is -100, returns '-100'", () => {
            expect(mapToString(-100)).toEqual("-100");
        });

        it("if num is 123.456, returns '123.46'", () => {
            expect(mapToString(123.456)).toEqual("123.46");
        });

        it("if num is 0.0, returns '0'", () => {
            expect(mapToString(0.0)).toEqual("0");
        });

        it("if num is -123.456, returns '-123.46'", () => {
            expect(mapToString(-123.456)).toEqual("-123.46");
        });
    });

    describe("mapToDate()", () => {
        it("if num is 100000, returns '00:01:40'", () => {
            expect(mapToDate(100000)).toEqual("00:01:40");
        });

        it("if num is 0, returns '0'", () => {
            expect(mapToDate(0)).toEqual("00:00:00");
        });

        it("if num is -100, returns '--:--:--'", () => {
            expect(mapToDate(-100)).toEqual("--:--:--");
        });

        it("if num is null, returns '--:--:--'", () => {
            expect(mapToDate(null)).toEqual("--:--:--");
        });
    });

    describe("logDownload()", () => {
        it("starts the terminal spinner", () => {
            expect(terminalSpinner.isSpinning).toEqual(false);
            logDownload(getMockStats());
            setTimeout(() => expect(terminalSpinner.isSpinning).toEqual(true));
        });

        it("if stats={}, logs ''", () => {
            logDownload(getMockStats());
            expect(terminalSpinner.text).toEqual(
                `\n` +
                    `Downloads:                 500\n` +
                    `Speed:                     0.00 dl/s\n` +
                    `Estimated time remaining:  --:--:--\n`,
            );
        });
    });
});
