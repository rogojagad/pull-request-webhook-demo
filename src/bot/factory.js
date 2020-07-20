require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const botClient = undefined;

exports.createOne = () => {
    let bot;

    if (this.getInstance()) {
        return this.getInstance();
    }

    if (process.env.NODE_ENV === "production") {
        console.log("Starting bot on webhook mode");
        bot = new TelegramBot(token);
    } else {
        console.log("Starting bot on polling mode");
        bot = new TelegramBot(token, { polling: true });
    }

    setInstance(bot);
    return bot;
};

exports.getInstance = () => {
    return this.botClient;
};

const setInstance = (bot) => {
    this.botClient = bot;
};
