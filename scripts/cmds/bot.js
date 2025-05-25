const axios = require('axios');

const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
}; 

module.exports.config = {
    name: "babe",
    version: "1.0",
    credits: "Dipto",
    role: 0,
    usePrefix: true,
    description: "Talk to baby bot",
    commandCategory: "fun",
    guide: "baby [message]",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ event, message, args }) =>{
    const link = `${await baseApiUrl()}/baby`;
    const userMessage = args.join(' ');
    const author = event.from.id
    if(!userMessage) return message.reply('Please provide a message')
    try {
        const apiUrl = `${link}?text=${encodeURIComponent(userMessage)}&senderID=${author}`;
        const response = await axios.get(apiUrl);
        const data = response.data.reply;

      const info = await message.reply(data)
    const infoID = info.message_id; 
    global.functions.reply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      data: reply
    });
           
    } catch (error) {
        console.error('Error:', error);
        message.reply('Sorry, something went wrong!');
    }
};

module.exports.reply = async function ({ event, message ,args, Reply }) {
     const { data } = Reply;
    const link = `${await baseApiUrl()}/baby`;
     const author = event.from.id
    try {
        const apiUrl = `${link}?text=${encodeURIComponent(userMessage)}&senderID=${author}`;
        const response = await axios.get(apiUrl);
        const reply = response.data.reply;
     const info = await message.reply(reply);
    const infoID = info.message_id; 
    const author = event.from.id
        
    global.functions.reply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      mesg: reply
    });
  
    } catch (error) {
        console.error('Error:', error);
        message.reply("error 🦆")
    }
};
