module.exports.config = {
  name: "prefix",
  version: "1.0.1",
  author: "Dipto",
  countDown: 0,
  role: 0,
  description: {
    en: "Get or set the bot's prefix for the current group.",
  },
  category: "system",
  commandCategory: "system",
  guide: {
    en: "[current] - get current prefix, [new] - change prefix (e.g., `/prefix !`)",
  },
};

module.exports.run = async ({ message, event, threadsData }) => {
  try {
    // Extract new prefix from the command arguments
    const newPrefix = event.text.split(" ")[1];

    // Check if the user provided a new prefix
    if (!newPrefix) {
      return message.reply("❌ | Please specify a new prefix. Example: `/prefix !`");
    }

    // Update the prefix for the current thread
    await threadsData.set(event.chat.id, { prefix: newPrefix });

    // Confirm the change
    message.reply(`✅ | Prefix changed successfully to: ${newPrefix}`);
  } catch (error) {
    console.error("Error changing prefix:", error.message);
    message.reply(`❌ | Error changing prefix: ${error.message}`);
  }
};

module.exports.onChat = async ({ message, event, threadsData }) => {
  try {
    const mText = event.text?.toLowerCase() || "";

    // Check if the message is exactly "prefix"
    if (mText === "prefix") {
      // Get the prefix for the current thread or the default one
      const ppy = (await threadsData.getThread(event.chat.id))?.prefix || "";
      const ppz = global.functions.config.prefix;

      // Reply with the current prefixes
      message.reply(`✨ | Your Baby Prefix => ${ppz}\n🌟 | Your Group Prefix => ${ppy}`);
    }
  } catch (error) {
    console.error("Error fetching prefix:", error.message);
    message.reply(`❌ | Prefix error: ${error.message}`);
  }
};
