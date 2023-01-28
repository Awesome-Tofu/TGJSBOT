
const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const {Configuration, OpenAIApi} = require('openai')

const TOKEN = process.env.BOT_TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

const helpMessage= `
Say something to me and I will generate image according to your text
To generate image, use 
/gene <query> 
/tip tips for generating image according to you
`

bot.onText(/\/start/, (msg) => {
    let chat_id = msg.chat.id;
    console.log();
    bot.sendMessage(chat_id,`Hii ${msg.chat.first_name+" "+msg.chat.last_name}, I am <a href=\"https://t.me/Aki_Image_UltraBot\">ᴀᴋɪ ʜᴀʏᴀᴋᴀᴡᴀ</a><a href=\"https://graph.org/file/06f943b53be73a0d3a8bc.png\">,</a> who can generate image.\nI am based on <a href=\"https://openai.com/dall-e-2/\">DALL-E API.</a>`,{parse_mode : "HTML"})
  
  });


bot.onText(/\/help/,(msg)=>{
    let chat_id=msg.chat.id;
    bot.sendMessage(chat_id,helpMessage);
})



bot.onText(/\/gene/, (msg) => {
     let chat_id = msg.chat.id;
    const inputmsg= msg.text;
  let inputArray = inputmsg.split(" ");
  let message="";
  if(inputArray.length==1){
    console.log("Please input the text/query!");
  }else{
      bot.sendMessage(chat_id, "Please wait...");
  }
})


bot.onText(/\/gene/, (msg) => {
  let chat_id = msg.chat.id;
  const inputmsg= msg.text;
  let inputArray = inputmsg.split(" ");
  let message="";
  if(inputArray.length==1){
    bot.sendMessage(chat_id,"Please input the text/query!");
  }else{
     inputArray.shift();
     message=inputArray.join(" ");
      var apikey=process.env.API;
    // bot.sendMessage(chat_id,message);
      const config = new Configuration({
        apiKey: apikey
    });
    const openai = new OpenAIApi(config);
    const response = openai.createImage({
        prompt: message,
        n: 1,
        size: "1024x1024",
      });
      response.then((data)=>{
        const image= data.data.data[0].url;
        bot.sendPhoto(chat_id,image, {caption:message});
      }).catch((err) => {
          console.log("sed error"+err);
        bot.sendMessage("\n\n Please contact t.me/awesome_tofu");
    });
  }
  
});

bot.onText(/\/testpic/, (msg) => {
  let chat_id = msg.chat.id;
    const url = 'https://graph.org/file/68adc7cdedc76f8d59aa9.jpg';
    bot.sendPhoto(chat_id, url,{caption:"Test Image"});
})

bot.onText(/\/tip/,(msg)=>{
  let chat_id = msg.chat.id;
    bot.sendMessage(chat_id,"<a href=\"https://pitch.com/v/tmd33y/d959fd01-3eea-4b16-9472-e79ccb635e98/\">Here are some Tips</a>",{parse_mode : "HTML"})
})

bot.onText(/\/owner/,(msg)=>{
    bot.sendMessage(msg.chat.id,"my owner is <a href=\"t.me/awesome_tofu\">𝗧𝗢𝗙𝗨鬼</a>. Thanks for using me!",{parse_mode : "HTML"})
})

