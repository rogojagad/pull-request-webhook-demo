"use strict";

require("dotenv/config");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _controller = require("./controller");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env["NTBA_FIX_319"] = 1;
const app = (0, _express.default)();
const token = process.env.TELEGRAM_TOKEN;
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.disable("etag");
app.post("/callback/bitbucket/reviewer", _controller.reviewerAdded);
app.post(`/bot${token}`, (req, res) => {
  const bot = new TelegramBotClient().getInstance();
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
module.exports = app;
//# sourceMappingURL=index.js.map