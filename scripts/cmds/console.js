const chalk = require("chalk");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "console",
    version: '1.0',
    author: "dipto", 
    countDown: 5,
    role: 2,  
    description: { en: "Logs detailed message information to the console for debugging or monitoring" },
    category: "INFO"
  },
  onChat: async function ({ msg }) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const name = msg.from.first_name + (msg.from.last_name ? ` ${msg.from.last_name}` : "");
    const threadName = msg.chat.title || null;

    let chatType, title, user;

    if (threadName === null) {
      chatType = "PRIVATE CHAT MESSAGE";
      title = "INBOX";
      user = name;
    } else {
      chatType = "GROUP CHAT MESSAGE";
      title = "Group Name";
      user = threadName;
    }
    const msgContent = msg.text || msg.caption || "media or special characters";
    const time = moment.tz("Asia/Dhaka").format("LLLL");

console.log(`${chalk.blue('\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯')}\n\n${chalk.blue(chatType)}\n${chalk.blue('\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯')}\n» From: ${chalk.blue(name)}\n» UID: ${chalk.blue(userId)}\n» ${title}: ${chalk.blue(user)}\n» Chat ID: ${chalk.blue(chatId)}\n🔖 Message: ${chalk.blue(msgContent)}\n» Time: ${chalk.blue(time)}\n`);
  }
};
