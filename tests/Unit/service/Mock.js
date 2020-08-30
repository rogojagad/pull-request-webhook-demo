exports.mock = () => {
    jest.mock("../../../src/repository", () => ({
        createOneUser: jest.fn(),
        readOneUserByBitbucketId: jest.fn(),
    }));

    jest.mock("../../../src/bot/client", () => {
        return function TelegramBotClient() {
            this.getInstance = jest.fn(() => ({
                sendMessage: jest.fn(),
            }));
        };
    });

    jest.mock("../../../src/message/factory", () => ({
        constructMessage: jest.fn(),
    }));
};
