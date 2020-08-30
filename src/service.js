import { constructMessage } from "./message/factory";
import * as repository from "./repository";
import TelegramBotClient from "./bot/client";
import User from "./const/User";
import UserAlreadyExistsException from "./exception/UserAlreadyExistsException";

const PLEASE_REVIEW_QUERY = "please review";

function parseRequestBody(comment, pullrequest) {
    const {
        content: { raw },
        user: { displayName },
    } = comment;

    const { reviewers } = pullrequest;
    const isPleaseReviewRequest = raw.startsWith(PLEASE_REVIEW_QUERY);
    const reviewerIds = Array();

    if (isPleaseReviewRequest) {
        for (let reviewer of reviewers) {
            reviewerIds.push(reviewer.accountId);
        }
    }

    return {
        isReviewRequest: isPleaseReviewRequest,
        commenterName: displayName,
        reviewerIds: reviewerIds,
    };
}

async function sendMessageToAllReviewers(users, pullRequest, commenterName) {
    const botClient = new TelegramBotClient().getInstance();

    users.forEach((user) => {
        botClient.sendMessage(
            user.data()[User.ATTRIBUTE_CHAT_ID],
            constructMessage(
                user.data()[User.ATTRIBUTE_NAME],
                pullRequest,
                commenterName
            )
        );
    });
}

async function createOneUser(chatId, bitbucketId, username) {
    const existingData = await repository.readOneUserByBitbucketId(bitbucketId);
    const isNotAlreadyExists = existingData.data() === undefined;

    if (isNotAlreadyExists) {
        const dataObj = Object();

        dataObj[User.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;
        dataObj[User.ATTRIBUTE_CHAT_ID] = chatId;
        dataObj[User.ATTRIBUTE_NAME] = username;

        const result = await repository.createOneUser(dataObj);
        return result;
    }

    throw new UserAlreadyExistsException(existingData);
}

export { createOneUser, sendMessageToAllReviewers, parseRequestBody };
