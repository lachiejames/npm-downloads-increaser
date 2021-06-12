export const validatePackageName = (packageName: string): string | boolean => {
    if (packageName.length === 0) {
        return "Must enter a package name";
    } else {
        return true;
    }
};

export const validatePackageVersion = (packageVersion: string): string | boolean => {
    if (packageVersion.length === 0) {
        return "Must enter a package version";
    } else {
        return true;
    }
};

export const validateNumbers = (num: number | undefined): string | boolean => {
    if (typeof num !== "number") {
        return "Must enter a number";
    } else if (num <= 0) {
        return "Must be greater than 0";
    } else {
        return true;
    }
};
