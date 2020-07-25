const db = require("./firebase/client");
const User = require("./const/User");

exports.createOneUser = async (data) => {
    return await db.collection("users").doc().set(data);
};

exports.readUsersByBitbucketId = async (bitbucketIds) => {
    return await db
        .collection("users")
        .where(User.ATTRIBUTE_BITBUCKET_ID, "in", bitbucketIds)
        .get();
};
