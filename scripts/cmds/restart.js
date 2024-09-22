const fs = require('fs')
const restartTxt = `${__dirname}/caches/restart.txt`;

module.exports.config = {
  name: "restart",
  aliases: [],
  version: "1.0.0",
  role: 3,
  author: "dipto",
  description: "Restart the bot.",
  usePrefix: true,
  guide: "",
  category: "Admin",
  countDown: 5,
};
module.exports.onLoad = async ({ api }) =>{
		
		if (fs.existsSync(restartTxt)) {
			const [target, oldtime] = fs.readFileSync(restartTxt, "utf-8").split(" ");
			api.sendMessage(target,`✅ | Bot restarted\n⏰ | Time: ${(Date.now() - oldtime) / 1000}s`);
			fs.unlinkSync(restartTxt);
		}
}

module.exports.onStart = async ({ message, event }) => {
  try {
  
		fs.writeFileSync(restartTxt, `${event.chat.id} ${Date.now()}`);
		
    await message.reply("🔄 | Restarting the bot...");
    process.exit(2);
  } catch (error) {
    console.log(error);
    message.reply("🔄 | Error");
  }
};
