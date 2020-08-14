exports.mock = () => {
    jest.mock("../../../src/repository", () => ({
        createOneUser: jest.fn(),
        readOneUserByBitbucketId: jest.fn(),
    }));
};
