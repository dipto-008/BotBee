const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.api;
};

module.exports.config = {
  name: "autodl",
  version: "1.0.1",
  author: "Dipto",
  countDown: 0,
  role: 0,
  description: {
    en: "Auto download video from TikTok, Facebook, Instagram, YouTube, and more",
  },
  category: "𝗠𝗘𝗗𝗜𝗔",
  commandCategory: "𝗠𝗘𝗗𝗜𝗔",
  guide: {
    en: "[video_link]",
  },
};

module.exports.run = async ({ bot, msg }) => {
  this.onChat({ bot, msg });
};

module.exports.onChat = async ({ bot, msg }) => {
  const messageText = msg.link_preview_options?.url || msg.text || "";

  try {
    if (
      messageText.startsWith("https://vt.tiktok.com") ||
      messageText.startsWith("https://www.tiktok.com/") ||
      messageText.startsWith("https://www.facebook.com") ||
      messageText.startsWith("https://www.instagram.com/") ||
      messageText.startsWith("https://youtu.be/") ||
      messageText.startsWith("https://youtube.com/") ||
      messageText.startsWith("https://x.com/") ||
      messageText.startsWith("https://twitter.com/") ||
      messageText.startsWith("https://vm.tiktok.com") ||
      messageText.startsWith("https://fb.watch")
    ) {
      const chatId = msg.chat.id;
      const messageId = msg.message_id;

      const wait = await bot.sendMessage(chatId, "⏳ Processing your request...", {
        reply_to_message_id: messageId,
      });
// Store the ID of the "processing" message//
      const waitMId = wait.message_id; 
      const videoPath = path.join(__dirname, "caches", "diptoo.mp4");

      const { data } = await axios.get(
        `${await baseApiUrl()}/alldl?url=${encodeURIComponent(messageText)}`
      );
      const videoBuffer = (
        await axios.get(data.result, { responseType: "arraybuffer" })
      ).data;

      fs.writeFileSync(videoPath, Buffer.from(videoBuffer, "utf-8"));

      // Delete the "processing" message///
 await bot.deleteMessage(chatId, waitMId);

      await bot.sendVideo(
        chatId,
        videoPath,
        {
          caption: `${data.cp || ""}✅`,
          reply_to_message_id: messageId,
        },
        {
          filename: "video.mp4",
          contentType: "video/mp4",
        },
      );

      fs.unlinkSync(videoPath);
    }
  } catch (error) {
    await bot.sendMessage(msg.chat.id, `❎ Error: ${error.message}`);
  }
};
