export interface Config {
    numDownloads: number;

    packageName: string;

    maxConcurrentDownloads: number;

    downloadTimeout: number;
}
