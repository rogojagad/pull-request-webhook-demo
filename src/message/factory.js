function constructRequestReviewMessage(
    reviewerName,
    pullRequest,
    commenterName
) {
    let body = ``;

    body += `Hi ${reviewerName},\n\n`;
    body += `${commenterName} need your review on this following PR:\n\n`;
    body += `Title: ${pullRequest.title}\n`;
    body += `Link: ${pullRequest.links.html.href}\n\n`;
    body += `Thank you`;

    return body;
}

function constructBuildResultMessage(htmlUrl, number, status, title) {
    let body = ``;

    body += `Build for Pull Request ${title} (${number}) ${status}.\n\n`;
    body += `Pull Request Link: ${htmlUrl}`;

    return body;
}

export { constructRequestReviewMessage, constructBuildResultMessage };
