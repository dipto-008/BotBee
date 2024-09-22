module.exports = {
  config: {
    name: "echo",
    version: "1.0",
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
    const echoMessage = args.join(" ");
    if (!echoMessage) {
      return await message.reply("Please provide a message to echo.");
    }
   await message.reply(echoMessage);
  },
};