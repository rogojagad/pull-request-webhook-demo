process.env["NTBA_FIX_319"] = 1;
import "dotenv/config";
import bodyParser from "body-parser";
import controller from "./controller";
import express from "express";

const app = express();

const token = process.env.TELEGRAM_TOKEN;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("etag");

app.post("/callback/bitbucket/reviewer", controller.reviewerAdded);
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

module.exports = app;
