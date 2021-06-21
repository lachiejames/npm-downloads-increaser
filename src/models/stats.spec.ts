import { addMilliseconds, addSeconds } from "date-fns";

import { MOCK_START_TIME, setMockConfig } from "../../test-utils/mock-config";
import { setCurrentDate } from "../../test-utils/mock-stats";

import { Stats } from "./stats.model";

describe("stats", () => {
    beforeEach(() => {
        setMockConfig();
    });

    describe("getDownloadSpeed()", () => {
        it("if successfulDownloads=1, and timeElapsed=1s, returns 1 dl/s", () => {
            setCurrentDate(addSeconds(MOCK_START_TIME, 1));

            const successfulDownloads = 1;
            const stats = new Stats(MOCK_START_TIME, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(1);
        });

        it("if successfulDownloads=20, and timeElapsed=500ms, returns 40 dl/s", () => {
            setCurrentDate(addMilliseconds(MOCK_START_TIME, 500));

            const successfulDownloads = 20;
            const stats = new Stats(MOCK_START_TIME, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(40);
        });

        it("if successfulDownloads=0, and timeElapsed=1s, returns 0 dl/s", () => {
            setCurrentDate(addMilliseconds(MOCK_START_TIME, 500));

            const successfulDownloads = 0;
            const stats = new Stats(MOCK_START_TIME, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
        });

        it("if successfulDownloads=1, and timeElapsed=0, returns 0 dl/s", () => {
            setCurrentDate(new Date(MOCK_START_TIME));

            const successfulDownloads = 1;
            const stats = new Stats(MOCK_START_TIME, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
        });
    });

    describe("getTimeRemaining()", () => {
        it("if numDownloads=10, speed=1dl/s and timeElapsed=1s, returns 9s", () => {
            setCurrentDate(addSeconds(MOCK_START_TIME, 1));

            const stats = new Stats(MOCK_START_TIME, 1, 0);

            expect(stats.getDownloadSpeed()).toEqual(1);
            expect(stats.getTimeRemaining()).toEqual(9);
        });

        it("if numDownloads=10, speed=0dl/s and timeElapsed=50s, returns null", () => {
            setCurrentDate(addSeconds(MOCK_START_TIME, 50));

            const stats = new Stats(MOCK_START_TIME, 0, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
            expect(stats.getTimeRemaining()).toEqual(null);
        });

        it("if numDownloads=10, speed=0dl/s and timeElapsed=0, returns null", () => {
            setCurrentDate(addSeconds(MOCK_START_TIME, 0));

            const stats = new Stats(MOCK_START_TIME, 0, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
            expect(stats.getTimeRemaining()).toEqual(null);
        });
    });
});
