const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports.config = {
  name: "gemini2",
  version: "1.0.0",
  role: 0,
  author: "dipto",
  description: "gemini ai with multiple conversation",
  usePrefix: true,
  guide: "[message]",
  category: "Ai",
  coolDowns: 5,
};
module.exports.onReply = async ({ message, event, Reply }) => {
  //api.unsendMessage(Reply.messageID);
  const { author ,type } = Reply;
  if (author != event.from.id) return;
  
  if (type == "reply") {
    const reply = event.text.toLowerCase();
    if (isNaN(reply)) {
      const response = await axios.get(
        `${await baseApiUrl()}/gemini2?text=${encodeURIComponent(reply)}&senderID=${author}`,
      );
      const ok = response.data.response;
    const info = await message.reply(ok)
      global.functions.onReply.set(info.message_id, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.message_id,
            author: event.from.id,
            link: ok
          });
    }
  }
};
module.exports.onStart = async function ({ message, args, event }) {
  const uid = event.from.id;
  try {
  const dipto = args.join(" ")?.toLowerCase();
    if (!args[0]) {
    message.reply(
        "Please provide a question to answer\n\nExample:\ngemini2 hey"
      );
      return;
    }
    if (dipto) {
      const response = await axios.get(
        `${await baseApiUrl()}/gemini2?text=${encodeURIComponent(dipto)}&senderID=${uid}`,
      );
      const mg = response.data.response;
     const info = await message.reply(mg)
  global.functions.onReply.set(info.message_id, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.message_id,
            author: uid,
            link: mg,
          });
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
  message.reply(`${error.message}.\nAn error`);
  }
};