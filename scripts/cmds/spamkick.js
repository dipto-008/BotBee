module.exports = {
  config: {
    name: "spamkick",
    version: "1.0",
    aliases: [],
    author: "Dipto",
    countDown: 3,
    role: 2, 
    description: "Automatically kicks spammers from the group",
    commandCategory: "moderation",
    guide: "Automatically detects and kicks users who spam the chat",
  },

  onChat: async function ({ message, event, api, threadsData }) {
    const chatId = event.chat.id;
    const userId = event.from.id;

    const thread = await threadsData.get(chatId);

    if (!thread.settings.spamDetection) {
      thread.settings.spamDetection = {};
    }

    const currentTime = Date.now();
    const userMessages = thread.settings.spamDetection[userId] || [];

    userMessages.push(currentTime);

    const recentMessages = userMessages.filter(
      (timestamp) => currentTime - timestamp < 10000
    );

    thread.settings.spamDetection[userId] = recentMessages;

    if (recentMessages.length > 5) {
      try {
        await api.banChatMember(chatId, userId);
        await message.reply(
          `⚠️ User ${event.from.username || event.from.first_name} has been kicked for spamming.`
        );
      } catch (err) {
        console.error(`Failed to kick user ${userId}:`, err);
      }
    }

    await threadsData.set(chatId, thread);
  },
};