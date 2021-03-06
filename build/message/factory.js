"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructMessage = constructMessage;

function constructMessage(reviewerName, pullRequest, commenterName) {
  let body = ``;
  body += `Hi ${reviewerName},\n\n`;
  body += `${commenterName} need your review on this following PR:\n\n`;
  body += `Title: ${pullRequest.title}\n`;
  body += `Link: ${pullRequest.links.html.href}\n\n`;
  body += `Thank you`;
  return body;
}
//# sourceMappingURL=factory.js.map