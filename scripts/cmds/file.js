const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    author: "dipto",
    description: "Send the command code as a file",
    category: "utility",
    usage: "file <command_name>",
    usePrefix: true,
    role: 2,
  },
  onStart: async ({ args, message }) =>{
    if (!args) {
      return message.reply("type: !file <command_name>");
    }

    const commandName = args[0];
    const filePath = `${__dirname}/${commandName}.js`;

    if (!fs.existsSync(filePath)) {
      return message.reply(`Command "${commandName}" not found.`);
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    await message.code(fileContent);
  }
};
