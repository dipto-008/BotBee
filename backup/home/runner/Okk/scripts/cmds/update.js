const fs = require('fs');
const { execSync } = require('child_process');

module.exports.config = {
  name: "update",
  version: "1.0.0",
  role: 3,
  author: "Dipto",
  description: "Check for updates and apply them.",
  usePrefix: true,
  guide: "[confirm]",
  category: "system",
  countDown: 5,
};

module.exports.run = async ({ message, args }) => {
  try {
    if (args[0] === 'confirm') {
      await message.reply('Updating...');
      execSync('node update.js confirm', { cwd: process.cwd() });
      await message.reply('Update completed.');
    } else {
      execSync('node update.js', { cwd: process.cwd() });
      const updateLog = fs.readFileSync('./update.log', 'utf-8');
      const info = await message.reply(`Update log:\n${updateLog}\n\nReply with "confirm" to apply updates.`);
      global.functions.onReply.set(info.message_id, {
        commandName: 'update',
        type: 'confirmUpdate',
        message_ID: info.message_id,
        author: message.senderID,
      });
    }
  } catch (err) {
    console.error('Error during update process:', err.message);
    await message.reply(`Error: ${err.message}`);
  }
};




//////tssy




module.exports.onReply = async ({ message, event, Reply }) => {
  if (Reply.commandName === 'update' && Reply.type === 'confirmUpdate') {
    if (event.text.toLowerCase() === 'confirm') {
      await message.reply('Updating...');
      execSync('node update.js confirm', { cwd: process.cwd() });
      await message.reply('Update completed.');
    } else {
      await message.reply('Update canceled.');
    }
  }
};
