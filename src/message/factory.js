exports.constructMessage = (reviewerName, pullRequest) => {
    let body = ``;
    console.log(pullRequest.links.html);

    body += `Hi ${reviewerName},\n\n`;
    body += `Kindly need your review on this PR:\n\n`;
    body += `Title: ${pullRequest.title}\n`;
    body += `Link: ${pullRequest.links.html.href}\n\n`;
    body += `Thank you`;

    return body;
};
