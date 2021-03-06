process.env["NTBA_FIX_319"] = 1;
import "dotenv/config";
import bodyParser from "body-parser";
import { reviewerAdded } from "./controller";
import { sendBuildResult } from "./controller";
import express from "express";
import TelegramBotClient from "./bot/client";

const app = express();

const token = process.env.TELEGRAM_TOKEN;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable("etag");

app.post("/callback/bitbucket/reviewer", reviewerAdded);
app.post("/api/build_result", sendBuildResult);
app.post(`/bot${token}`, (req, res) => {
    const bot = new TelegramBotClient().getInstance();
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

module.exports = app;
