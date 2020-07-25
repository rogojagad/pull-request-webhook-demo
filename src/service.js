const PLEASE_REVIEW_QUERY = "please review";
const repository = require("./repository");

exports.parseReviewerId = (comment, pullrequest) => {
    const {
        content: { raw },
        user: { displayName },
    } = comment;

    const { reviewers } = pullrequest;
    const isPleaseCheckRequest = raw.startsWith(PLEASE_REVIEW_QUERY);
    const reviewerIds = Array();

    if (isPleaseCheckRequest) {
        for (reviewer of reviewers) {
            reviewerIds.push(reviewer.accountId);
        }
    }

    return {
        pullRequestOwnerName: displayName,
        reviewerIds: reviewerIds,
    };
};

exports.createOneUser = async (chatId, bitbucketId, username) => {
    const result = await repository.createOneUser({
        bitbucket_id: bitbucketId,
        chat_id: chatId,
        name: username,
    });

    return result;
};
