"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bootstrap;

const handler = require("./handler");

function bootstrap(bot) {
  // register event listener here
  bot.on("polling_error", error => {
    console.log(error);
  });
  bot.onText(/\/register/, msg => {
    // bot.sendMessage(chatId, msg.text);
    handler.handleRegisterCommand(msg);
  });
}
//# sourceMappingURL=bootstraper.js.map