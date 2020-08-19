const { mock } = require("./Mock");

mock();

const botFactory = require("./../../../src/bot/factory");
const messageFactory = require("./../../../src/message/factory");
const repository = require("../../../src/repository");
const service = require("../../../src/service");
const User = require("../../../src/const/User");
const UserAlreadyExistsException = require("../../../src/exception/UserAlreadyExistsException");

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

        it("throws exception", async () => {
            try {
                await service.createOneUser(chatId, bitbucketId, username);
            } catch (error) {
                expect(error).toBeInstanceOf(UserAlreadyExistsException);
            }
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

describe("sendMessageToAllReviewers", () => {
    const botClient = {
        sendMessage: jest.fn(),
    };

    beforeAll(() => {
        botFactory.getInstance.mockReturnValue(botClient);
    });

    it("sends notification message to all reviewers", async () => {
        const users = [
            {
                data: () => {
                    const user = Object();
                    user[User.ATTRIBUTE_CHAT_ID] = "chat1";
                    user[User.ATTRIBUTE_NAME] = "user1";

                    return user;
                },
            },
            {
                data: () => {
                    const user = Object();
                    user[User.ATTRIBUTE_CHAT_ID] = "chat2";
                    user[User.ATTRIBUTE_NAME] = "user2";

                    return user;
                },
            },
        ];

        const pullRequest = Object();
        const commenterName = "Reviewer 1";
        const expectedCallCount = users.length;

        await service.sendMessageToAllReviewers(
            users,
            pullRequest,
            commenterName
        );

        expect(botClient.sendMessage.mock.calls.length).toBe(expectedCallCount);
        expect(messageFactory.constructMessage.mock.calls.length).toBe(
            expectedCallCount
        );

        for (user of users) {
            expect(messageFactory.constructMessage).toHaveBeenCalledWith(
                user.data()[User.ATTRIBUTE_NAME],
                pullRequest,
                commenterName
            );
        }
    });
});

describe("parseRequestBody", () => {
    let comment = {
        content: {
            raw: "",
        },
        user: {
            displayName: "reviewer 1",
        },
    };

    let pullRequest = {
        reviewers: [
            {
                accountId: "account 1",
            },
        ],
    };

    describe("is please review query", () => {
        beforeAll(() => {
            comment.content.raw = "please review";
        });

        it("parses Bitbucket webhook payload", () => {
            const result = service.parseRequestBody(comment, pullRequest);

            const expectedResult = {
                isReviewRequest: true,
                commenterName: comment.user.displayName,
                reviewerIds: pullRequest.reviewers.map((reviewer) => {
                    return reviewer.accountId;
                }),
            };

            expect(result).toEqual(expectedResult);
        });
    });

    describe("is not please review query", () => {
        beforeAll(() => {
            comment.content.raw = "please dont review";
        });

        it("parses Bitbucket webhook payload", () => {
            const result = service.parseRequestBody(comment, pullRequest);

            const expectedResult = {
                isReviewRequest: false,
                commenterName: comment.user.displayName,
                reviewerIds: Array(),
            };

            expect(result).toEqual(expectedResult);
        });
    });
});
