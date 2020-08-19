process.env["NTBA_FIX_319"] = 1;
require("dotenv").config();

const controller = require("./controller");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const botBootstraper = require("./bot/bootstraper");
const botFactory = require("./bot/factory");
const url = process.env.APP_HOST;
const token = process.env.TELEGRAM_TOKEN;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("etag");

app.post("/callback/bitbucket/reviewer", controller.reviewerAdded);
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Server starting on port ${port}`);
});

const bot = botFactory.createOne();
if (process.env.NODE_ENV === "production") {
    bot.setWebHook(`${url}/bot${token}`);
}
botBootstraper.bootstrap(bot);
