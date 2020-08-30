const camelCaseKeys = require("camelcase-keys");

export function convertKeysToCamelCase(obj) {
    return camelCaseKeys(obj, { deep: true });
}
