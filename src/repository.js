const db = require("./firebase/client");

exports.createOneUser = async (data) => {
    return await db.collection("users").doc().set(data);
};

exports.readUsersByBitbucketId = async (bitbucketIds) => {
    return await db
        .collection("users")
        .where("bitbucket_id", "in", bitbucketIds)
        .get();
};
