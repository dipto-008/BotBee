module.exports.config = {
    name: "avatar",
    aliases: ["avt","pp","dp"],
    version: "1.0",
    credits: "Dipto",
    role: 0,
    hasPermission: 0,
    usePrefix: true,
    prefix: true,
    description: "Get your or another user's avatar",
    commandCategory: "utility",
    guide: { en: "avatar [user_id]" },
    coolDowns: 5,
    premium: false
};

module.exports.run = async function ({ bot, msg, args }) {
    const chatId = msg.chat.id;
    const userId = args[0] || msg.from.id; 

    try {
        const user = await bot.getUserProfilePhotos(userId);

        if (user.total_count > 0) {
            
            const fileId = user.photos[0][0].file_id;
            
            bot.sendPhoto(chatId, fileId, { caption: `Here is the avatar of user ${userId}` });
        } else {
            bot.sendMessage(chatId, `No avatar found for user ${userId}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
        bot.sendMessage(chatId, 'Sorry, something went wrong!');
    }
};
