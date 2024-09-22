module.exports = {
  config: {
    name: "notify",
    version: "1.0",
    aliases: [],
    author: "dipto",
    countDown: 5,
    role: 3, 
    description: "Send a message to all groups",
    commandCategory: "admin",
    guide: "{pn} <message>",
  },

  run: async function ({ api,message, args, threadsData }) {
    const notifyMessage = args.join(" ");
    if (!notifyMessage) {
      return await message.reply("Please provide a message to notify all groups.");
    }

    const allThreads = await threadsData.getAll();
    if (!allThreads || allThreads.length === 0) {
      return await message.reply("No active threads to notify.");
    }

    for (const thread of allThreads) {
      await api.sendMessage(thread.threadID, notifyMessage);
    }

    await message.reply("Notification sent to all groups.");
  },
};
