const { mock } = require("./Mock");

mock();

const request = require("supertest");
const app = require("./../../../src/index");
const service = require("./../../../src/service");
const repository = require("./../../../src/repository");

describe("controller test", () => {
    describe("comment is null or undefined", () => {
        const inputPayload = {
            comment: null,
            pullrequest: {},
        };

        it("returns 204 response", async () => {
            const res = await request(app)
                .post("/callback/bitbucket/reviewer")
                .send(inputPayload);

            expect(res.status).toBe(204);
        });
    });

    describe("comment is not null or undefined", () => {
        const inputPayload = {
            comment: {
                raw: "please review",
            },
            pullrequest: {},
        };

        const users = [
            {
                name: "User1",
            },
            {
                name: "User 2",
            },
        ];

        describe("is review request query", () => {
            beforeAll(() => {
                service.parseRequestBody.mockReturnValue({
                    isReviewRequest: true,
                });

                repository.readUsersByBitbucketId(users);
            });

            it("returns 200 response", async () => {
                const res = await request(app)
                    .post("/callback/bitbucket/reviewer")
                    .send(inputPayload);

                expect(res.status).toBe(200);
            });
        });

        describe("is not review request query", () => {
            beforeAll(() => {
                service.parseRequestBody.mockReturnValue({
                    isReviewRequest: false,
                });

                repository.readUsersByBitbucketId(users);
            });

            it("returns 200 response", async () => {
                const res = await request(app)
                    .post("/callback/bitbucket/reviewer")
                    .send(inputPayload);

                expect(res.status).toBe(204);
            });
        });
    });
});
