const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

bot.on('message', (message) => {
  let chat_id = message.from.id;
  var sticker = message.sticker.file_id;
  var unique_sticker = message.sticker.file_unique_id;
  var isanimated = message.sticker.is_animated;
  var isvideo = message.sticker.is_video;
  var emoji = message.sticker.emoji;
  
  console.log(message);
  
  bot.sendMessage(chat_id, "Sticker ID: " + sticker);
  bot.sendMessage(chat_id, "Unique Sticker ID: " + unique_sticker);
  bot.sendMessage(chat_id, "Is Animated: " + isanimated);
  bot.sendMessage(chat_id, "Is Video: " + isvideo);
  bot.sendMessage(chat_id, "Emoji: " + emoji);

});
