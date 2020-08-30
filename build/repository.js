"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOneUser = createOneUser;
exports.readOneUserByBitbucketId = readOneUserByBitbucketId;
exports.readUsersByBitbucketId = readUsersByBitbucketId;

var _client = _interopRequireDefault(require("./firebase/client"));

var _User = _interopRequireDefault(require("./const/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createOneUser(data) {
  const bitbucketId = data[_User.default.ATTRIBUTE_BITBUCKET_ID];
  return await _client.default.collection(_User.default.COLLECTION).doc(bitbucketId).set(data);
}

async function readOneUserByBitbucketId(bitbucketId) {
  return await _client.default.collection(_User.default.COLLECTION).doc(bitbucketId).get();
}

async function readUsersByBitbucketId(bitbucketIds) {
  return await _client.default.collection(_User.default.COLLECTION).where(_User.default.ATTRIBUTE_BITBUCKET_ID, "in", bitbucketIds).get();
}
//# sourceMappingURL=repository.js.map