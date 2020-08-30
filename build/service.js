"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOneUser = createOneUser;
exports.sendMessageToAllReviewers = sendMessageToAllReviewers;
exports.parseRequestBody = parseRequestBody;

var _factory = require("./message/factory");

var repository = _interopRequireWildcard(require("./repository"));

var _client = _interopRequireDefault(require("./bot/client"));

var _User = _interopRequireDefault(require("./const/User"));

var _UserAlreadyExistsException = _interopRequireDefault(require("./exception/UserAlreadyExistsException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PLEASE_REVIEW_QUERY = "please review";

function parseRequestBody(comment, pullrequest) {
  const {
    content: {
      raw
    },
    user: {
      displayName
    }
  } = comment;
  const {
    reviewers
  } = pullrequest;
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
    reviewerIds: reviewerIds
  };
}

async function sendMessageToAllReviewers(users, pullRequest, commenterName) {
  const botClient = new _client.default().getInstance();
  users.forEach(user => {
    botClient.sendMessage(user.data()[_User.default.ATTRIBUTE_CHAT_ID], (0, _factory.constructMessage)(user.data()[_User.default.ATTRIBUTE_NAME], pullRequest, commenterName));
  });
}

async function createOneUser(chatId, bitbucketId, username) {
  const existingData = await repository.readOneUserByBitbucketId(bitbucketId);
  const isNotAlreadyExists = existingData.data() === undefined;

  if (isNotAlreadyExists) {
    const dataObj = Object();
    dataObj[_User.default.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;
    dataObj[_User.default.ATTRIBUTE_CHAT_ID] = chatId;
    dataObj[_User.default.ATTRIBUTE_NAME] = username;
    const result = await repository.createOneUser(dataObj);
    return result;
  }

  throw new _UserAlreadyExistsException.default(existingData);
}
//# sourceMappingURL=service.js.map