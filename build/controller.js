"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewerAdded = reviewerAdded;

var _utils = require("./utils");

var _repository = _interopRequireDefault(require("./repository"));

var _service = _interopRequireDefault(require("./service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function reviewerAdded(req, res) {
  const body = (0, _utils.convertKeysToCamelCase)(req.body);
  const {
    comment,
    pullrequest
  } = body;

  if (comment) {
    const result = _service.default.parseRequestBody(comment, pullrequest);

    if (result.isReviewRequest) {
      const users = await _repository.default.readUsersByBitbucketId(result.reviewerIds);

      _service.default.sendMessageToAllReviewers(users, pullrequest, result.commenterName);

      return res.status(200).json(result);
    }
  }

  return res.status(204).json({});
}
//# sourceMappingURL=controller.js.map