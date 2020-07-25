const botFactory = require("./bot/factory");
const camelCaseKeys = require("./utils").convertKeysToCamelCase;
const messageFactory = require("./message/factory");
const parseReviewerId = require("./service").parseReviewerId;
const repository = require("./repository");
const User = require("./const/User");

exports.reviewerAdded = async (req, res) => {
    const body = camelCaseKeys(req.body);
    const { comment, pullrequest } = body;
    const botClient = botFactory.getInstance();

    if (comment && botClient) {
        const result = parseReviewerId(comment, pullrequest);

        const users = await repository.readUsersByBitbucketId(
            result.reviewerIds
        );

        users.forEach((user) => {
            botClient.sendMessage(
                user.data()[User.ATTRIBUTE_CHAT_ID],
                messageFactory.constructMessage(
                    user.data()[User.ATTRIBUTE_CHAT_ID],
                    pullrequest
                )
            );
        });

        return res.status(200).json(result);
    }

    return res.status(204).json({});
};
