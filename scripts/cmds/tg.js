const axios = require('axios');

module.exports.config ={
    name: "tg",
    version: "6.9",
    author: "dipto",
    countDown: 5,
    role: 0,
    category: "media",
    description: "convert image tg link",
    category: "tools",
    usages: "reply [image]"
  },

module.exports.onStart = async function ({ api, event }) {
  const botToken = "7533328541:AAHXn1DRTcV6nYFtkz0Lr0NvLpbTFiSWqcM"; 
  const fileId = event.reply_to_message.video.file_id;

  const response = await axios.get(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
  const filePath = response.data.result.file_path;
  const URL = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
    if (!URL) {
      return message.reply('Please reply to an image.');
    }
    try {
      const res = await axios.get(`${global.functions.config.api}/tg?url=${encodeURIComponent(URL)}`);
      const dipto = res.data.data;
         message.reply(dipto);
    } catch (error) {
      console.error(error);
      return message.reply('Failed to convert image into link.');
    }
  };