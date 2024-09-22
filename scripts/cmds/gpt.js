const axios = require("axios");
const baseUrl = async () => {
    const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
    return base.data.api;
  };

module.exports.config = {
  name: "gpt4",
  aliases: [],
  version: "1.0.0",
  role: 0, 
  author: "dipto", 
  description: "Gpt4 ai with multiple conversation",
  usePrefix: true,
  guide: "[message]",
  category: "Ai",
  countDown: 5,
};
module.exports.onReply = async function ({ message, event, Reply }) {
  const { author ,type } = Reply;
  if(author != event.from.id) return;
  if (type == "reply") {
  const reply = event.text?.toLowerCase();
  if (isNaN(reply)) {
    try {
    const response = await axios.get(`${await baseUrl()}/gpt4?text=${encodeURIComponent(reply)}&senderID=${author}`);
    const ok = response.data.data;
 const info = await message.reply(ok)
      
 global.functions.onReply.set(info.message_id, {
   commandName: this.config.name,
   type: 'reply',
   messageID: info.message_id,
   author: author,
   link: ok
 })
    } catch (err) {
      console.log(err.message);
      message.reply(`Error: ${err.message}`);
    }
  }
  }
}
module.exports.onStart = async ({ message, args, event })=> {
  try {
    const author = event.from.id;
    const dipto = args.join(" ").toLowerCase();
    if (!args[0]) {
      return message.reply(
        "Please provide a question to answer\n\nExample:\n!gpt4 hey");
}
    if (dipto) {
      const response = await axios.get(`${await baseUrl()}/gpt4?text=${encodeURIComponent(dipto)}&senderID=${author}`);
   const mg = response.data.data;
   const info =  await message.reply(mg)
  global.functions.onReply.set(info.message_id, {
    commandName: this.config.name,
    type: 'reply',
    messageID: info.message_id,
    author,
    link: mg
  });
    }
  } catch (error) {
    console.log(`Failed to get an answer: ${error.message}`);
   message.reply(`Error: ${error.message}`);
  }
};