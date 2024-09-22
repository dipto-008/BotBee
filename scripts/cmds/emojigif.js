const axios = require('axios');
module.exports.config = {
  name: 'emojigif',
  version: '1.0.0',
  usePrefix: true,
  author: 'Dipto',
  category: 'Fun',
  role: 0,
  description:'Convert an emoji to a GIF image.',
  guide: '[emoji]',
  cooldowns: 5
};
module.exports.onStart = async ({ message, event, args }) => {
  const emoji = args.join(' ');
  if (!emoji) {
    return message.reply('Please provide an emoji.');
  }
  const apiUrl = await axios.get(`https://www.noobs-api.000.pe/dipto/emojiTogif?emoji=${emoji}`);

  try {
    const response = await axios.get(apiUrl.data.gifUrl, { responseType: 'stream' });
  message.stream({
    url: response.data
  });
  } catch (error) {
      message.reply(`Failed to convert emoji to GIF.\n${error.message}`, event.threadID);
  }
};