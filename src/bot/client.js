import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;

export default class TelegramBotClient {
    constructor() {
        if (!TelegramBotClient.instance) {
            let bot = Object();

            if (process.env.NODE_ENV === "production") {
                console.log("Starting bot on webhook mode");
                bot = new TelegramBot(token);
            } else {
                console.log("Starting bot on polling mode");
                bot = new TelegramBot(token, { polling: true });
            }

            TelegramBotClient.instance = bot;
        }
    }

    getInstance() {
        return TelegramBotClient.instance;
    }
}
