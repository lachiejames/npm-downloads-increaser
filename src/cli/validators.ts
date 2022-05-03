export const validatePackageName = (packageName: string): string | boolean => {
    if (packageName.length === 0) {
        return "Must enter a package name";
    }

    return true;
};

export const validateNumbers = (num: number | undefined): string | boolean => {
    if (typeof num === "number" && num <= 0) {
        return "Must be greater than 0";
    }

    return true;
};
