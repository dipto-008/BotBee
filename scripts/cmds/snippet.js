const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports.config = {
    name: 'snippet',
    aliases: ['snip'],
    version: '1.0',
    role: 0,
    countDowns: 5,
    author: 'dipto',
    description: 'This command transforms text image',
    category: 'command',
    commandCategory: 'command',
    guide: { en: '[code] []' }
  },
module.exports.onStart = async ({ message,args}) => {
  const code = args.join(" ");
  if(!code) return message.reply('❎ | Please enter code')
    try {
      const { data } = await axios.post(`${await baseApiUrl()}/snippet`, {
          code: code,
          lang: 'javascript'
      });
      await message.stream({url:data.imageUrl, caption: `Here's Your snippet`});
    } catch (error) {
      console.error('Error:', error);
      message.reply('An error occurred while processing your request.');
    }
  };