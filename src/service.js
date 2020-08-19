const PLEASE_REVIEW_QUERY = "please review";

const botFactory = require("./bot/factory");
const messageFactory = require("./message/factory");
const repository = require("./repository");
const User = require("./const/User");
const UserAlreadyExistsException = require("./exception/UserAlreadyExistsException");

exports.parseRequestBody = (comment, pullrequest) => {
    const {
        content: { raw },
        user: { displayName },
    } = comment;

    const { reviewers } = pullrequest;
    const isPleaseReviewRequest = raw.startsWith(PLEASE_REVIEW_QUERY);
    const reviewerIds = Array();

    if (isPleaseReviewRequest) {
        for (reviewer of reviewers) {
            reviewerIds.push(reviewer.accountId);
        }
    }

    return {
        isReviewRequest: isPleaseReviewRequest,
        commenterName: displayName,
        reviewerIds: reviewerIds,
    };
};

exports.sendMessageToAllReviewers = async (
    users,
    pullRequest,
    commenterName
) => {
    const botClient = botFactory.getInstance();

    users.forEach((user) => {
        botClient.sendMessage(
            user.data()[User.ATTRIBUTE_CHAT_ID],
            messageFactory.constructMessage(
                user.data()[User.ATTRIBUTE_NAME],
                pullRequest,
                commenterName
            )
        );
    });
};

exports.createOneUser = async (chatId, bitbucketId, username) => {
    const existingData = await repository.readOneUserByBitbucketId(bitbucketId);

    if (existingData === undefined) {
        const dataObj = Object();

        dataObj[User.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;
        dataObj[User.ATTRIBUTE_CHAT_ID] = chatId;
        dataObj[User.ATTRIBUTE_NAME] = username;

        const result = await repository.createOneUser(dataObj);
        return result;
    }

    throw new UserAlreadyExistsException(existingData);
};
