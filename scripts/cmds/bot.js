const axios = require('axios');

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
    
    const userMessage = args.join(' ');
    if(!userMessage) return message.reply('Please provide a message')
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(userMessage)}`;
        const response = await axios.get(apiUrl);
        const data = response.data.reply;

      const info = await message.reply(data)
        
    const infoID = info.message_id; 
    const author = event.from.id
        
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
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(args.join(' '))}`;
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