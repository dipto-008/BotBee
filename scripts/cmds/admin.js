module.exports.config = {
  name: "admin",
  aliases: [],
  version: "1.0.0",
  role: 0,
  author: "dipto",
  description: "Display information about the bot admins and group admins.",
  usePrefix: true,
  guide: "{p}",
  category: "Admin",
  countDown: 5,
};

module.exports.onStart = async ({ message, event, api, usersData, args }) => {
  try {
    const adminBotIds = global.functions.config.adminBot || [];
    const botOperatorIds = global.functions.config.botOperator || [];
    const chatId = event.chat.id;

    // Define adminInfo at the start to use in both conditions
    let adminInfo = "🛠️ **Bot Admins & Operators:**\n";

    // If no arguments are passed, show bot admins and operators
    if (!args[0]) {
      if (adminBotIds.length) {
        adminInfo += `\n**Bot Admins:**\n`;
        for (const adminId of adminBotIds) {
          const name = await usersData.getName(adminId);
          adminInfo += `- **Name:** ${name}\n  **ID:** ${adminId}\n`;
        }
      } else {
        adminInfo += "\n- No bot admins found.\n";
      }

      if (botOperatorIds.length) {
        adminInfo += `\n**Bot Operators:**\n`;
        for (const operatorId of botOperatorIds) {
          const name = await usersData.getName(operatorId);
          adminInfo += `- **Name:** ${name}\n  **ID:** ${operatorId}\n`;
        }
      } else {
        adminInfo += "\n- No bot operators found.\n";
      }
    }

    // If arguments are provided, show group admins
    if (args[0]) {
      const chatAdmins = await api.getChatAdministrators(chatId);
      if (chatAdmins.length) {
        adminInfo += `\n**Group Admins:**\n`;
        for (const admin of chatAdmins) {
          const name = admin.user.username || admin.user.first_name || "Unknown";
          const adminId = admin.user.id;
          adminInfo += `- **Name:** ${name}\n  **ID:** ${adminId}\n`;
        }
      } else {
        adminInfo += "\n- No group admins found or this is not a group chat.\n";
      }
    }

    // Reply with the collected admin information
    await message.reply(adminInfo);

  } catch (error) {
    console.log(`Failed to get admin information: ${error.message}`);
    await message.reply(`Error: ${error.message}`);
  }
};