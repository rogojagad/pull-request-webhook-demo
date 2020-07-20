exports.constructMessage = (reviewerName, pullRequest) => {
    let body = ``;

    body += `Hi ${reviewerName},\n\n`;
    body += `Kindly need your review on this PR:\n\n`;
    body += `Title: ${pullRequest.title}\n`;
    body += `Link: ${pullRequest.links.html}\n\n`;
    body += `Thank you`;

    return body;
};
