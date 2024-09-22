module.exports = {
  config: {
    name: "filteruser",
    version: "1.0",
    aliases: ["filter"],
    author: "dipto",
    countDown: 5,
    role: 3,
    description: "Filter and remove inactive users based on message count or inactivity on a specific date.",
    commandCategory: "moderation",
    guide: `
      {pn} <count> - Kick users with message count less than the specified count.
      {pn} date <YYYY-MM-DD> - Kick users inactive since the specified date.
    `,
  },

  run: async function ({ message, args, threadsData, api, event }) {
    const chatId = event.chat.id;
    const threadData = await threadsData.get(chatId);

    // Filter by count
    if (args[0] && !isNaN(args[0])) {
      const countLimit = parseInt(args[0], 10);
      const membersToKick = threadData.count.filter((user) => user.count < countLimit);

      if (membersToKick.length === 0) {
        return await message.reply(`No users found with a message count less than ${countLimit}.`);
      }

      for (const user of membersToKick) {
        try {
          await api.banChatMember(chatId, user.senderID);
        } catch (error) {
          console.error(`Failed to kick user ${user.username}:`, error);
        }
      }

      return await message.reply(`Kicked ${membersToKick.length} user(s) with a message count less than ${countLimit}.`);
    }

    // Filter by date
    if (args[0] === "date" && args[1]) {
      const targetDate = args[1];
      const dateFilter = threadData.settings[targetDate] || [];
      const activeUserIds = dateFilter.map((user) => user.senderID);
      const membersToKick = threadData.count.filter((user) => !activeUserIds.includes(user.senderID));

      if (membersToKick.length === 0) {
        return await message.reply(`No inactive users found since ${targetDate}.`);
      }

      for (const user of membersToKick) {
        try {
          await api.banChatMember(chatId, user.senderID);
        } catch (error) {
          console.error(`Failed to kick user ${user.username}:`, error);
        }
      }

      return await message.reply(`Kicked ${membersToKick.length} inactive user(s) since ${targetDate}.`);
    }

    return await message.reply("Please provide a valid count or date to filter users.");
  },
};
