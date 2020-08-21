const { mock } = require("./Mock");

mock();

const bitbucketId = "user1";
const db = require("./../../../src/firebase/client");
const User = require("../../../src/const/User");
const repository = require("./../../../src/repository");

describe("repository test", () => {
    describe("create one user", () => {
        const id = "data1";
        const newRecord = Object();
        const setMethod = db.collection().doc().set;

        beforeAll(() => {
            setMethod.mockClear();
            newRecord["id"] = id;
            setMethod.mockReturnValue(newRecord);
        });

        it("creates one user collection and return it", async () => {
            const data = Object();
            data[User.ATTRIBUTE_BITBUCKET_ID] = bitbucketId;

            const result = await repository.createOneUser(data);

            expect(setMethod.mock.calls.length).toBe(1);
            expect(result).toEqual(newRecord);
        });
    });

    describe("read one user by bitbucket id", () => {
        const id = "data1";
        const newRecord = Object();
        const getMethod = db.collection().doc().get;

        beforeAll(() => {
            getMethod.mockClear();

            newRecord["id"] = id;

            getMethod.mockReturnValue(newRecord);
        });

        it("read and return one user data by bitbucket id", async () => {
            const result = await repository.readOneUserByBitbucketId(
                bitbucketId
            );

            expect(getMethod.mock.calls.length).toBe(1);
            expect(result).toEqual(newRecord);
        });
    });

    describe("read many users by array of bitbucket ids", () => {
        const ids = ["data1"];
        const newRecord = Array();
        const getMethod = db.collection().where().get;

        beforeAll(() => {
            getMethod.mockClear();
            getMethod.mockReturnValue(newRecord);
        });

        it("read and return many user data by array of bitbucket id", async () => {
            const result = await repository.readUsersByBitbucketId(ids);

            expect(getMethod.mock.calls.length).toBe(1);
            expect(result).toEqual(newRecord);
        });
    });
});
