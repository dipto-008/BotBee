const axios = require('axios');
const fs = require('fs');
const vm = require('vm');

module.exports.config = {
  name: "cmd",
  version: "1.0.0",
  role: 2,
  credits: "dipto",
  description: "Create a new file with code from a link or provided code, with syntax error checking",
  commandCategory: "utility",
  usages: "[file name] [link/code]",
  cooldowns: 5
};

module.exports.run = async ({ message, args }) => {
  try {
    const fileName = args[0];
    const input = args.slice(1).join(' ');

    if (!fileName || !input) {
      return message.reply("Please provide both a file name and code or a valid link!");
    }

    let code;
    const linkPattern = /^(http|https):\/\/[^ "]+$/;

    if (linkPattern.test(input)) {
      const response = await axios.get(input);
      code = response.data;
    } else {
      code = input;
    }
    try {
      new vm.Script(code);
    } catch (syntaxError) {
      return message.reply(`❌ Syntax error in the provided code: ${syntaxError.message}`);
    }

    const filePath = `${__dirname}/${fileName}`;
    fs.writeFileSync(filePath, code, 'utf-8');

    message.reply(`✅ File created successfully: ${filePath}`);
  } catch (error) {
    console.error("Error:", error);
    message.reply("An error occurred while creating the file.");
  }
};