
const telegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const {Configuration, OpenAIApi} = require('openai')
const OWNER_ID= process.env.OWNER_ID;
const OWNER_NAME= process.env.OWNER_NAME;
const TOKEN = process.env.BOT_TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

const helpMessage= `
Say something to me and I will generate image according to your text

/gene <query> | generate images.
/tip tips for generating image according to you.
/ask <query> | ask me anything.
/report <report query> | enter report query to my owner.
/repository | My repo on github.
`

bot.onText(/\/start/, (msg) => {
    let chat_id = msg.chat.id;
    console.log();
    bot.sendMessage(chat_id,`Hii ${msg.from.first_name+" "+msg.from.last_name}, I am <a href=\"https://t.me/Aki_Image_UltraBot\">ᴀᴋɪ ʜᴀʏᴀᴋᴀᴡᴀ</a><a href=\"https://graph.org/file/06f943b53be73a0d3a8bc.png\">,</a> who can generate image.\nI am based on <a href=\"https://openai.com/dall-e-2/\">DALL-E API.</a>`,{parse_mode : "HTML"})
  
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
    let openai = new OpenAIApi(config);
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
    bot.sendMessage(msg.chat.id,`my owner is <a href=\"t.me/awesome_tofu\">OWNER_NAME</a>. Thanks for using me!`,{parse_mode : "HTML"})
})



bot.onText(/\/ask/, (msg) => {

 const inputmsg= msg.text;
  let inputArray = inputmsg.split(" ");
  let message="";
  if(inputArray.length==1){
    bot.sendMessage(msg.chat.id,"Please input the text/query!");
  }else{
inputArray.shift();
     message=inputArray.join(" ");

  BOT_NAME="Aki"
  const prompt_template =
    "I am Telegram AI Bot" +
    BOT_NAME +
    "Developed by telegram.me/Awesome_tofu \n human: How are you? \n" +
    BOT_NAME +
    "I am well, how are can I can you? \n human:" +
    message +
    "\n" +
    BOT_NAME +
    ":";
  
  const configu = new Configuration({
    apiKey: process.env.API
});
let openai = new OpenAIApi(configu);

    const resp = openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt_template,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    resp.then((data) => {
      const message = data.data.choices[0].text;
        console.log("@"+msg.from.username+": "+inputArray.join(" "));
      bot.sendMessage(msg.chat.id,message);
  }).catch((err) => {
      bot.sendMessage(msg.chat.id,"ERROR!!")
  })

  }
  

})



bot.onText(/\/report/, (msg) => {
    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function myFunction() {
  bot.sendMessage(msg.chat.id,"<code>Reporting...</code>",{parse_mode:"HTML"})
  await sleep(1500);
  bot.deleteMessage(msg.chat.id,msg.message_id+1);
  bot.sendMessage(msg.chat.id,"<code>Reported!</code>",{parse_mode:"HTML"})
}

myFunction();
    bot.sendMessage(OWNER_ID,`from: @${msg.from.username},[<code>${msg.from.id}</code>]
    ${msg.text}`,{parse_mode : "HTML"});
    // console.log(msg.message_id+1)
    
    
})

bot.onText(/\/repository/, (msg) => {
    bot.sendMessage(msg.chat.id,"<a href=\"github.com/Awesome-tofu/TGJSBOT\">Github Repo.</a>",{parse_mode : "HTML"})
})





bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
        
