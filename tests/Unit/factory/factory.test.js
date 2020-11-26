const factory = require("./../../../src/message/factory");

describe("message factory", () => {
    it("generate notification message", async () => {
        const reviewerName = "Reviewer 1";
        const commenterName = "Commenter 1";
        const pullRequest = {
            title: "PR 1",
            links: {
                html: {
                    href: "https://github.com",
                },
            },
        };

        let body = ``;

        body += `Hi ${reviewerName},\n\n`;
        body += `${commenterName} need your review on this following PR:\n\n`;
        body += `Title: ${pullRequest.title}\n`;
        body += `Link: ${pullRequest.links.html.href}\n\n`;
        body += `Thank you`;

        const result = factory.constructRequestReviewMessage(
            reviewerName,
            pullRequest,
            commenterName
        );

        expect(result).toEqual(body);
    });
});
