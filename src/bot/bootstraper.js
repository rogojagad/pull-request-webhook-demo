const handler = require("./handler");

export default function bootstrap(bot) {
    // register event listener here
    bot.on("polling_error", (error) => {
        console.log(error);
    });

    bot.onText(/\/register/, (msg) => {
        // bot.sendMessage(chatId, msg.text);
        handler.handleRegisterCommand(msg);
    });
}
