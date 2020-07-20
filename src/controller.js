const botFactory = require("./bot/factory");
const messageFactory = require("./message/factory");
const parseReviewerId = require("./service").parseReviewerId;
const repository = require("./repository");
const camelCaseKeys = require("./utils").convertKeysToCamelCase;

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
                user.data()["chat_id"],
                messageFactory.constructMessage(
                    user.data()["name"],
                    pullrequest
                )
            );
        });

        return res.status(200).json(result);
    }

    return res.status(204).json({});
};
