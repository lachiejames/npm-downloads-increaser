const path = require("path");

const root = require("find-root")(process.cwd());

module.exports = {
    ignorePatterns: ["lib/**", "coverage/**"],
    root: true,
    parser: "@typescript-eslint/parser",
    settings: {
        "import/resolver": {
            node: {
                moduleDirectory: [root, path.join(root, "node_modules")],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    env: {
        browser: true,
        amd: true,
        node: true,
        jest: true,
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ],
    rules: {
        "import/no-duplicates": "error",
        "import/order": [
            "error",
            {
                "alphabetize": {
                    order: "asc",
                },
                "newlines-between": "always",
                "pathGroups": [
                    {
                        group: "external",
                        pattern: "src",
                        position: "after",
                    },
                    {
                        group: "external",
                        pattern: "src/**",
                        position: "after",
                    },
                ],
                "pathGroupsExcludedImportTypes": ["builtin"],
            },
        ],
        "sort-imports": [
            "error",
            {
                ignoreDeclarationSort: true,
            },
        ],
        "no-unused-expressions": "error",
    },
};
