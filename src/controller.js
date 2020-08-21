const camelCaseKeys = require("./utils").convertKeysToCamelCase;
const repository = require("./repository");
const service = require("./service");

exports.reviewerAdded = async (req, res) => {
    const body = camelCaseKeys(req.body);
    const { comment, pullrequest } = body;

    if (comment) {
        const result = service.parseRequestBody(comment, pullrequest);

        if (result.isReviewRequest) {
            const users = await repository.readUsersByBitbucketId(
                result.reviewerIds
            );

            service.sendMessageToAllReviewers(
                users,
                pullrequest,
                result.commenterName
            );

            return res.status(200).json(result);
        }
    }

    return res.status(204).json({});
};
