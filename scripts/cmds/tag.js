module.exports.config = {
  name: "tag",
  aliases: ["mention"],
  version: "1.0.0",
  role: 0,
  author: "Dipto",
  description: "Tag a user by mentioning them.",
  usePrefix: true,
  guide: "Reply to a user with `{p}tag` to mention them.",
  category: "Utility",
  countDown: 5,
};

module.exports.run = async ({ message, event, api , threadID }) => {
  try {
    if (!event.reply_to_message) {
      return message.reply("Please reply to a user's message to tag them.");
    }

    const repliedUser = event.reply_to_message.from;
    const userId = repliedUser.id;
    const userName = repliedUser.username || repliedUser.first_name || "User";

    const text = `📢 @${userName}`;
    const entities = [
      {
        type: "mention",
        offset: 2, // Offset position for @ in the text
        length: userName.length + 1, // Length of the mention,
        user: { id: userId },
      },
    ];

    await api.sendMessage(threadID, text ,{ entities });
  } catch (error) {
    console.error("Error tagging user:", error.message);
    await message.reply(`❌ | Error occurred: ${error.message}`);
  }
};