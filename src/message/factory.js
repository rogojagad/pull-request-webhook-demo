exports.constructMessage = (
    reviewerName,
    pullRequest,
    pullRequestOwnerName
) => {
    let body = ``;

    body += `Hi ${reviewerName},\n\n`;
    body += `${pullRequestOwnerName} need your review on this following PR:\n\n`;
    body += `Title: ${pullRequest.title}\n`;
    body += `Link: ${pullRequest.links.html.href}\n\n`;
    body += `Thank you`;

    return body;
};
