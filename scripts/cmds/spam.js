module.exports.config = {
  name: "spam",
  aliases: [],
  author: "dipto",
  countDown: 2,
  role: 1,
  description: "Spams a message a specified number of times.",
  category: "Utility",
  usePrefix: true,
  usage: "{pn} <count> <message>"
};

module.exports.run = async ({ event, args, api, message }) => {
  const chatId = event.chat.id;
  const count = parseInt(args[0], 10);
  const spamMessage = args.slice(1).join(" ");

  if (isNaN(count) || count <= 0) {
    return message.reply("Please specify a valid number of times to spam.");
  }

  if (!spamMessage) {
    return message.reply("Please provide a message to spam.");
  }

  const maxSpamCount = 50;
  if (count > maxSpamCount) {
    return message.reply(`You can only spam up to ${maxSpamCount} times.`);
  }

  for (let i = 0; i < count; i++) {
    await api.sendMessage(chatId, spamMessage);
  }
};