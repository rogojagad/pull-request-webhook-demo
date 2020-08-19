const botFactory = require("./bot/factory");
const camelCaseKeys = require("./utils").convertKeysToCamelCase;
const repository = require("./repository");
const service = require("./service");

exports.reviewerAdded = async (req, res) => {
    const body = camelCaseKeys(req.body);
    const { comment, pullrequest } = body;
    const botClient = botFactory.getInstance();

    if (comment && botClient) {
        const result = service.parseRequestBody(comment, pullrequest);

        if (result.isReviewRequest) {
            const users = await repository.readUsersByBitbucketId(
                result.reviewerIds
            );

            service.sendMessageToAllUsers(
                users,
                pullrequest,
                result.commenterName
            );

            return res.status(200).json(result);
        }
    }

    return res.status(204).json({});
};
