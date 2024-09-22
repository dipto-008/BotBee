const axios = require("axios");

module.exports.config = {
  name: "translate",
  aliases: ["trans"],
  author: "dipto",
  countDown: 5,
  role: 0,
  description: "Translates text from one language to another.",
  category: "Utility",
  usePrefix: true,
  usage: "{pn} <target_language> <text>"
};

module.exports.start = async ({ args, message }) => {
  const langCode = args[0] || "en";
  const textToTranslate = args.slice(1).join(" ");

  if (!langCode || !textToTranslate) {
    return message.reply("Please specify a target language code and the text to translate.");
  }

  try {
    const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
    const translatedText = res.data[0][0][0];
    await message.reply(`Translation: ${translatedText}`);
  } catch (error) {
    message.reply("Failed to translate the text. Please check your input and try again.");
  }
};