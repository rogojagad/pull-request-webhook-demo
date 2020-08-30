import app from "./index";
import bootstrap from "./bot/bootstraper";
import TelegramBotClient from "./bot/client";

const port = process.env.PORT || 5000;
const url = process.env.APP_HOST;

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Server starting on port ${port}`);
});

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBotClient().getInstance();

if (process.env.NODE_ENV === "production") {
    bot.setWebHook(`${url}/bot${token}`);
}

bootstrap(bot);
