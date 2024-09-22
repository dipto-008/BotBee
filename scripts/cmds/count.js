module.exports = {
  config: {
    name: "count",
    version: "1.0",
    aliases: [],
    author: "dipto",
    countDown: 3,
    role: 0,
    description: "Shows a sorted count of messages from group members",
    commandCategory: "group",
    guide: "{pn}",
  },

  run: async function ({ message, event, threadsData, usersData }) {
    const thread = await threadsData.get(event.chat.id);
    if (!thread || !thread.count || thread.count.length === 0) {
      return await message.reply("No message count data available.");
    }

    const sortedCount = thread.count.sort((a, b) => b.count - a.count);
    let response = "👑 | Count all members\n";

    for (let index = 0; index < sortedCount.length; index++) {
      const member = sortedCount[index];
      const userName = await usersData.getName(member.senderID) || "Unknown User";
      response += `${index + 1}/ ${userName} : ${member.count} messages\n`;
    }

    await message.reply(response);
  },
};
