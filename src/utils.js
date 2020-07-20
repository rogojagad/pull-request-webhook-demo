const camelCaseKeys = require("camelcase-keys");

exports.convertKeysToCamelCase = (obj) => {
    return camelCaseKeys(obj, { deep: true });
};
