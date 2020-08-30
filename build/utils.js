"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertKeysToCamelCase = convertKeysToCamelCase;

const camelCaseKeys = require("camelcase-keys");

function convertKeysToCamelCase(obj) {
  return camelCaseKeys(obj, {
    deep: true
  });
}
//# sourceMappingURL=utils.js.map