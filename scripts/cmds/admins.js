const fs = require("fs");
const configPath = "../../config.json";
let config = require(configPath);

module.exports.config = {
  name: "admins",
  aliases: ["access", "operator"],
  version: "1.0.0",
  role: 3, // Only bot admins
  author: "Dipto",
  description: "Manage bot admins and operators.",
  usePrefix: true,
  guide: "{pn} [add|remove|list] [admin|operator] [user_id]",
  category: "Admin",
  countDown: 5,
};

module.exports.run = async ({ message, args }) => {
  try {
    if (args.length < 2) {
      return message.reply(
        "Usage:\n`/admins [add|remove|list] [admin|operator] [user_id]`\nExamples:\n`/admins add admin 123456789`\n`/admins remove operator 987654321`\n`/admins list admin`"
      );
    }

    const action = args[0].toLowerCase();
    const roleType = args[1].toLowerCase();
    const userId = parseInt(args[2]);
let targetList;
    if (roleType === "admin") {
      targetList = config.adminBot;
    } else if (roleType === "operator") {
      targetList = config.botOperator;
    } else {
      return message.reply("Invalid role type. Use `admin` or `operator`.");
    }

    switch (action) {
      case "add":
        if (isNaN(userId)) {
          return message.reply("Please provide a valid user ID.");
        }
        if (targetList.includes(userId)) {
          return message.reply(`User ID ${userId} is already in the ${roleType} list.`);
        }
        targetList.push(userId);
        saveConfig();
        return message.reply(`✅ User ID ${userId} has been added to the ${roleType} list.`);

      case "remove":
        if (isNaN(userId)) {
          return message.reply("Please provide a valid user ID.");
        }
        if (!targetList.includes(userId)) {
          return message.reply(`User ID ${userId} is not in the ${roleType} list.`);
        }
        config[roleType === "admin" ? "adminBot" : "botOperator"] = targetList.filter((id) => id !== userId);
        saveConfig();
        return message.reply(`✅ User ID ${userId} has been removed from the ${roleType} list.`);

      case "list":
        const list = targetList.length ? targetList.join(", ") : "No users in the list.";
        return message.reply(`🔹 ${roleType === "admin" ? "Admin" : "Operator"} List: ${list}`);

      default:
        return message.reply("Invalid action. Use `add`, `remove`, or `list`.");
    }
  } catch (error) {
    console.error(`Error managing admins or operators: ${error.message}`);
    message.reply(`Error: ${error.message}`);
  }
};

// Save //
function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
