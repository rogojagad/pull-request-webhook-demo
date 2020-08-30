"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class UserAlreadyExistsException extends Error {
  constructor(user, ...params) {
    super(...params);
    this.name = "UserAlreadyExistsException";
    this.user = user;
  }

}

exports.default = UserAlreadyExistsException;
//# sourceMappingURL=UserAlreadyExistsException.js.map