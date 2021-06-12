module.exports = {
    collectCoverageFrom: [
        "src/**/*.ts",
        "!**/node_modules*/**",
        "!<rootDir>/coverage*/**",
        "!<rootDir>/dist*/**",
        "!<rootDir>/lib*/**",
        "!<rootDir>/tmp*/**",
        "!**/index.ts",
        "!**/cli.ts",
    ],
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    globals: {
        window: {},
    },
    moduleNameMapper: {
        "^src$": "<rootDir>/src",
        "^src/(.+)$": "<rootDir>/src/$1",
    },
    preset: "ts-jest",
    testPathIgnorePatterns: ["/node_modules.*/", "<rootDir>/(coverage|dist|lib|tmp).*/"],
    reporters: ["default"],
};
