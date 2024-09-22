const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports.config = {
  name: "ss",
  version: "1.0",
  author: "dipto",
  role: 2,
  description: "Take a screenshot of a website",
  category: "utility",
  guide: "screenshot [URL]",
  coolDowns: 5,
};
exports.onStart = async function ({ message, args }) {
  const url = args.join(" ");
  if (!url) {
    return message.reply("Please provide a URL.");
  }
  try {
    message.download({
        url:`${await baseApiUrl()}/ss?url=${url}`,caption: "Screenshot Saved <😽",
      mimeType: "image/jpeg"
      });
  } catch (error) {
    console.error("Error taking screenshot:", error);
    message.reply("Failed to take a screenshot.");
  }
};