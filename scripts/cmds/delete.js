const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "delete",
    version: "1.0",
    aliases: [],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Deletes a command file",
    commandCategory: "admin",
    guide: "{pn} <commandFile.js>",
  },

  run: async function ({ message, args }) {
    const commandFile = args[0];
    if (!commandFile) {
      return await message.reply("Please specify a command file to delete.");
    }

    const commandPath = path.join(__dirname, commandFile);
    if (!fs.existsSync(commandPath)) {
      return await message.reply("Command file does not exist.");
    }

    try {
      fs.unlinkSync(commandPath);
      await message.reply(`Command \`${commandFile}\` has been deleted.`);
    } catch (error) {
      await message.reply("Error deleting the command file.");
    }
  },
};
