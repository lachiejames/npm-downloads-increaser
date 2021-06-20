module.exports = {
    // NPM package to increase the download count for
    packageName: "",

    // Number of downloads to add to the package
    numDownloads: 1000,

    // Amount of downloads you can run in parallel at once.
    // Slower networks may perform better with a lower maxConcurrentDownloads
    maxConcurrentDownloads: 300,

    // Max time to wait for for a download to complete
    // Slower networks may perform better with a higher downloadTimeout
    downloadTimeout: 3000,
};
