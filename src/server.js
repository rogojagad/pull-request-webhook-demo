const app = require("./index");
const port = process.env.PORT || 5000;
const botBootstraper = require("./bot/bootstraper");
const botFactory = require("./bot/factory");
const url = process.env.APP_HOST;

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
