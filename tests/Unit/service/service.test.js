const { mock } = require("./Mock");

mock();

const repository = require("../../../src/repository");
const service = require("../../../src/service");
const User = require("../../../src/const/User");

describe("create one user", () => {
    const chatId = "chat1";
    const bitbucketId = "bibucketUser1";
    const username = "user1";

    describe("when data is already exists", () => {
        const existingData = Object();

        beforeAll(() => {
            existingData[User.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;
            existingData[User.ATTRIBUTE_CHAT_ID] = chatId;
            existingData[User.ATTRIBUTE_NAME] = username;

            repository.readOneUserByBitbucketId.mockReturnValue(existingData);
        });

        it("return the existing data", async () => {
            const result = await service.createOneUser(
                chatId,
                bitbucketId,
                username
            );

            expect(repository.readOneUserByBitbucketId).toHaveBeenCalledWith(
                bitbucketId
            );

            expect(result).toEqual(existingData);
        });
    });

    describe("when data is not exists", () => {
        const newData = Object();

        beforeAll(() => {
            newData[User.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;
            newData[User.ATTRIBUTE_CHAT_ID] = chatId;
            newData[User.ATTRIBUTE_NAME] = username;

            repository.readOneUserByBitbucketId.mockReturnValue(undefined);
            repository.createOneUser.mockReturnValue(newData);
        });

        it("return newly created data", async () => {
            const result = await service.createOneUser(
                chatId,
                bitbucketId,
                username
            );

            expect(repository.readOneUserByBitbucketId).toHaveBeenCalledWith(
                bitbucketId
            );

            expect(repository.createOneUser).toHaveBeenCalledWith(newData);

            expect(result).toEqual(newData);
        });
    });
});
