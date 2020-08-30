import { db } from "./firebase/client";
import User from "./const/User";

async function createOneUser(data) {
    const bitbucketId = data[User.ATTRIBUTE_BITBUCKET_ID];
    return await db.collection(User.COLLECTION).doc(bitbucketId).set(data);
}

async function readOneUserByBitbucketId(bitbucketId) {
    return await db.collection(User.COLLECTION).doc(bitbucketId).get();
}

async function readUsersByBitbucketId(bitbucketIds) {
    return await db
        .collection(User.COLLECTION)
        .where(User.ATTRIBUTE_BITBUCKET_ID, "in", bitbucketIds)
        .get();
}

module.exports = {
    createOneUser: createOneUser,
    readOneUserByBitbucketId: readOneUserByBitbucketId,
    readUsersByBitbucketId: readUsersByBitbucketId,
};
