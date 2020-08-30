import { convertKeysToCamelCase } from "./utils";
import repository from "./repository";
import service from "./service";

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

export { reviewerAdded };
