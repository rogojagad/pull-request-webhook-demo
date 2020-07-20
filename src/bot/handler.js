const camelCaseKeys = require("./../utils").convertKeysToCamelCase;

exports.handleRegisterCommand = (msg) => {
    const message = camelCaseKeys(msg);
    const {
        from: { firstName, lastName },
        chat: { id },
    } = message;

    console.log(firstName, lastName, id);
};
