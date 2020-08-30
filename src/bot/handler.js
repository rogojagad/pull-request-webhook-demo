import { convertKeysToCamelCase } from "./../utils";
import service from "./../service";
import TelegramBotClient from "./client";
import UserAlreadyExistsException from "./../exception/UserAlreadyExistsException";

exports.handleRegisterCommand = async (msg) => {
    const message = convertKeysToCamelCase(msg);
    const botClient = new TelegramBotClient().getInstance();

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

    try {
        await service.createUser(id, bitbucketId, fullname);
    } catch (error) {
        console.error(error);
        if (error instanceof UserAlreadyExistsException) {
            botClient.sendMessage(
                id,
                `User with Bitbucket ID ${bitbucketId} already exists`
            );
        }

        return;
    }

    botClient.sendMessage(id, `Succesfuly register your data`);
};
