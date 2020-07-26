const botFactory = require("./factory");
const camelCaseKeys = require("./../utils").convertKeysToCamelCase;
const service = require("./../service");

exports.handleRegisterCommand = async (msg) => {
    const message = camelCaseKeys(msg);
    const botClient = botFactory.getInstance();

    const {
        from: { firstName, lastName },
        chat: { id },
    } = message;

    const fullname = `${firstName} ${lastName}`;

    botClient.sendMessage(id, `Hello, ${fullname}`);
    const bitbucketIdQuery = await botClient.sendMessage(
        id,
        `What is your Bitbucket Account ID?`,
        {
            reply_markup: JSON.stringify({ force_reply: true }),
        }
    );

    const reply = await new Promise((resolve) => {
        botClient.onReplyToMessage(
            bitbucketIdQuery.chat.id,
            bitbucketIdQuery.message_id,
            resolve
        );
    });

    const bitbucketId = reply.text;

    botClient.sendMessage(id, `Registering your data`);

    const result = await service.createOneUser(id, bitbucketId, fullname);

    if (result === undefined) {
        botClient.sendMessage(
            id,
            `User with Bitbucket ID ${bitbucketId} already exists`
        );
    } else {
        botClient.sendMessage(id, `Succesfuly register your data`);
    }
};
