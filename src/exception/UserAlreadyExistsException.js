export default class UserAlreadyExistsException extends Error {
    constructor(user, ...params) {
        super(...params);

        this.name = "UserAlreadyExistsException";
        this.user = user;
    }
}
