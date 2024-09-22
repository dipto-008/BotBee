module.exports.config = {
  name: "reverse",
  aliases: [],
  author: "dipto",
  countDown: 2,
  role: 0,
  description: "Reverses the text you provide.",
  category: "Fun",
  usePrefix: true,
  usage: "{pn} <text>"
};

module.exports.run = async ({ event, args, api, message }) => {
  const text = args.join(" ");

  if (!text) {
    return message.reply("Please provide some text to reverse.");
  }

  const reversedText = text.split("").reverse().join("");
  await api.sendMessage(event.chat.id, reversedText);
};