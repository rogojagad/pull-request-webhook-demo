"use strict";

var _index = _interopRequireDefault(require("./index"));

var _bootstraper = _interopRequireDefault(require("./bot/bootstraper"));

var _client = _interopRequireDefault(require("./bot/client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 5000;
const url = process.env.APP_HOST;

_index.default.listen(port, err => {
  if (err) {
    console.error(err);
  }

  console.log(`Server starting on port ${port}`);
});

const token = process.env.TELEGRAM_TOKEN;
const bot = new _client.default().getInstance();

if (process.env.NODE_ENV === "production") {
  bot.setWebHook(`${url}/bot${token}`);
}

(0, _bootstraper.default)(bot);
//# sourceMappingURL=server.js.map