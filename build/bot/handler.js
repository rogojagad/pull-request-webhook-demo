"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRegisterCommand = handleRegisterCommand;

var _utils = require("./../utils");

var _service = _interopRequireDefault(require("./../service"));

var _client = _interopRequireDefault(require("./client"));

var _UserAlreadyExistsException = _interopRequireDefault(require("./../exception/UserAlreadyExistsException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handleRegisterCommand(msg) {
  const message = (0, _utils.convertKeysToCamelCase)(msg);
  const botClient = new _client.default().getInstance();
  const {
    from: {
      firstName,
      lastName
    },
    chat: {
      id
    }
  } = message;
  const fullname = `${firstName} ${lastName}`;
  botClient.sendMessage(id, `Hello, ${fullname}`);
  const bitbucketIdQuery = await botClient.sendMessage(id, `What is your Bitbucket Account ID?`, {
    reply_markup: JSON.stringify({
      force_reply: true
    })
  });
  const reply = await new Promise(resolve => {
    botClient.onReplyToMessage(bitbucketIdQuery.chat.id, bitbucketIdQuery.message_id, resolve);
  });
  const bitbucketId = reply.text;
  botClient.sendMessage(id, `Registering your data`);

  try {
    await _service.default.createOneUser(id, bitbucketId, fullname);
  } catch (error) {
    console.error(error);

    if (error instanceof _UserAlreadyExistsException.default) {
      botClient.sendMessage(id, `User with Bitbucket ID ${bitbucketId} already exists`);
    }

    return;
  }

  botClient.sendMessage(id, `Succesfuly register your data`);
}
//# sourceMappingURL=handler.js.map