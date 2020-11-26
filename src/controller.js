import { convertKeysToCamelCase } from "./utils";
import * as repository from "./repository";
import * as service from "./service";
import BuildResult from "./const/BuildResult";

async function reviewerAdded(req, res) {
    const body = convertKeysToCamelCase(req.body);
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
}

async function sendBuildResult(req, res) {
    const body = req.body;
    const ownerId = body[BuildResult.ATTRIBUTE_OWNER_ID];

    const user = await repository.readOneUserByBitbucketId(ownerId);

    service.sendBuildResultMessageToOwner(user, body);

    return res.status(200).json(body);
}

export { reviewerAdded, sendBuildResult };
