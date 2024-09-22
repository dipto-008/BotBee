module.exports.config = {
  name: "unsend",
  aliases: ["uns","r"],
  version: "1.0",
  author: "Dipto",
  role: 0,
  description: "Deletes the bot's message when replied with /unsend",
  commandCategory: "utility",
  guide: { en: "/unsend" },
};

module.exports.run = async function ({ bot, msg }) {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  if (!msg.reply_to_message || !msg.reply_to_message.from.is_bot) {
    bot.sendMessage(chatId, "Please reply to a bot's message to unsend it.", {
      reply_to_message_id: messageId,
    });
    return;
  }

  try {
    await bot.deleteMessage(chatId, msg.reply_to_message.message_id);
  } catch (error) {
    console.error("Error deleting message:", error);
    bot.sendMessage(chatId, "Unable to delete the message.", {
      reply_to_message_id: messageId,
    });
  }
};
