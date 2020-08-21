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
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["html", "text", "xml"],
};
