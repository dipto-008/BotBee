module.exports = {
  config: {
    name: "uid",
    version: "1.0",
    aliases:[],
    author: "dipto",
    countDown: 3,
    role: 0, 
    description: {
      en: "user id",
    },
    commandCategory: "info",
    guide: {
      en: "{pn} <message>",
    },
  },

  run: async ({ event ,message }) => {
   try {
     const uuu = event.reply_to_message?.from.id || event.from.id;
       if (!uuu) {
         return await message.reply("Please reply a message.");
       }
      await message.reply(uuu);
   } catch (error) {
     message.err(error.message)
     console.log(error);
   }
  }
};
