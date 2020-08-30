"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _nodeTelegramBotApi = _interopRequireDefault(require("node-telegram-bot-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const token = process.env.TELEGRAM_TOKEN;

class TelegramBotClient {
  constructor() {
    if (!TelegramBotClient.instance) {
      let bot = Object();

      if (process.env.NODE_ENV === "production") {
        console.log("Starting bot on webhook mode");
        bot = new _nodeTelegramBotApi.default(token);
      } else {
        console.log("Starting bot on polling mode");
        bot = new _nodeTelegramBotApi.default(token, {
          polling: true
        });
      }

      TelegramBotClient.instance = bot;
    }
  }

  getInstance() {
    return TelegramBotClient.instance;
  }

}

exports.default = TelegramBotClient;
//# sourceMappingURL=client.js.map