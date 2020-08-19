exports.mock = () => {
    jest.mock("../../../src/repository", () => ({
        createOneUser: jest.fn(),
        readOneUserByBitbucketId: jest.fn(),
    }));

    jest.mock("../../../src/bot/factory", () => ({
        getInstance: jest.fn(),
    }));

    jest.mock("../../../src/message/factory", () => ({
        constructMessage: jest.fn(),
    }));
};
