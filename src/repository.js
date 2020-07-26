const db = require("./firebase/client");
const User = require("./const/User");

exports.createOneUser = async (data) => {
    const bitbucketId = data[User.ATTRIBUTE_BITBUCKET_ID];
    return await db.collection(User.COLLECTION).doc(bitbucketId).set(data);
};

exports.readOneUserByBitbucketId = async (bitbucketId) => {
    return await db.collection(User.COLLECTION).doc(bitbucketId).get();
};

exports.readUsersByBitbucketId = async (bitbucketIds) => {
    return await db
        .collection(User.COLLECTION)
        .where(User.ATTRIBUTE_BITBUCKET_ID, "in", bitbucketIds)
        .get();
};
