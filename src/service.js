const PLEASE_CHECK_QUERY = "please check";

exports.parseReviewerId = (comment, pullrequest) => {
    const {
        content: { raw },
        user: { displayName },
    } = comment;

    const { reviewers } = pullrequest;
    const isPleaseCheckRequest = raw.startsWith(PLEASE_CHECK_QUERY);
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
