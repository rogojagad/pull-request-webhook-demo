exports.mock = () => {
    jest.mock("../../../src/service", () => ({
        parseRequestBody: jest.fn(),
        sendMessageToAllReviewers: jest.fn(),
    }));

    jest.mock("../../../src/repository", () => ({
        readUsersByBitbucketId: jest.fn(() => {
            return Object();
        }),
    }));

    jest.mock("../../../src/utils", () => ({
        convertKeysToCamelCase: jest.fn((arg) => {
            return arg;
        }),
    }));
};
