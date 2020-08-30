import db from "./firebase/client";
import User from "./const/User";

export async function createOneUser(data) {
    const bitbucketId = data[User.ATTRIBUTE_BITBUCKET_ID];
    return await db.collection(User.COLLECTION).doc(bitbucketId).set(data);
}

export async function readOneUserByBitbucketId(bitbucketId) {
    return await db.collection(User.COLLECTION).doc(bitbucketId).get();
}

export async function readUsersByBitbucketId(bitbucketIds) {
    return await db
        .collection(User.COLLECTION)
        .where(User.ATTRIBUTE_BITBUCKET_ID, "in", bitbucketIds)
        .get();
}
