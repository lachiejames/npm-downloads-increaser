import { addMilliseconds, addSeconds } from "date-fns";

import { getMockConfig } from "../../test-utils/mock-config";

import { Stats } from "./stats.model";

describe("stats", () => {
    const startTime: number = new Date(2020, 1, 1, 0, 0, 0).getTime();

    const setCurrentDate = (date: Date): void => {
        Date.now = () => date.getTime();
    };

    describe("getDownloadSpeed()", () => {
        it("if successfulDownloads=1, and timeElapsed=1s, returns 1 dl/s", () => {
            setCurrentDate(addSeconds(startTime, 1));

            const successfulDownloads = 1;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(1);
        });

        it("if successfulDownloads=20, and timeElapsed=500ms, returns 40 dl/s", () => {
            setCurrentDate(addMilliseconds(startTime, 500));

            const successfulDownloads = 20;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(40);
        });

        it("if successfulDownloads=0, and timeElapsed=1s, returns 0 dl/s", () => {
            setCurrentDate(addMilliseconds(startTime, 500));

            const successfulDownloads = 0;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
        });

        it("if successfulDownloads=1, and timeElapsed=0, returns 0 dl/s", () => {
            setCurrentDate(new Date(startTime));

            const successfulDownloads = 1;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, 0);

            expect(stats.getDownloadSpeed()).toEqual(0);
        });
    });

    describe("getDownloadSuccessRate()", () => {
        it("if successfulDownloads=1 and failedDownloads=1, returns 50%", () => {
            const successfulDownloads = 1;
            const failedDownloads = 1;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, failedDownloads);

            expect(stats.getDownloadSuccessRate()).toEqual(50);
        });

        it("if successfulDownloads=0 and failedDownloads=1, returns 0%", () => {
            const successfulDownloads = 0;
            const failedDownloads = 1;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, failedDownloads);

            expect(stats.getDownloadSuccessRate()).toEqual(0);
        });

        it("if successfulDownloads=1 and failedDownloads=0, returns 100%", () => {
            const successfulDownloads = 1;
            const failedDownloads = 0;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, failedDownloads);

            expect(stats.getDownloadSuccessRate()).toEqual(100);
        });

        it("if successfulDownloads=0 and failedDownloads=0, returns 0%", () => {
            const successfulDownloads = 0;
            const failedDownloads = 0;
            const stats = new Stats(getMockConfig(), startTime, successfulDownloads, failedDownloads);

            expect(stats.getDownloadSuccessRate()).toEqual(0);
        });
    });
});
