// const Promise = require('node-telegram-bot-api');
// Promise.config({
//   cancellation: true
// });
const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new telegramBot(TOKEN, {polling: true});

bot.on('message', (message) => {
    let chat_id = message.from.id;
    //middle dg

    bot.sendMessage(chat_id, 'HELLO WORLD!');
});