module.exports = {
    testEnvironment: "node",
    coveragePathIgnorePatterns: [
        "/node_modules",
        "/src/bot",
        "/src/const",
        "/src/firebase",
        "/src/index.js",
        "/src/server.js",
        "/tests",
    ],
    collectCoverage: false,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["json"],
};
