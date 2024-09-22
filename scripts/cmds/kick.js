module.exports.config = {
    name: "kick",
    aliases: ["ban"],
    version: "1.0",
    credits: "Dipto",
    role: 2,
    hasPermission: true,
    usePrefix: true,
    description: "Kick a user from the group",
    commandCategory: "moderation",
    guide: "{p}[user_id]" ,
    coolDowns: 5,
};

module.exports.run = async ({ api, message, args, event,usersData }) => {
    const chatId = event.chat.id;
    const userId = args[0] || event.reply_to_message?.from.id;

    if (!userId) {
        return message.reply("Please specify a user ID or reply to a user's message to kick them.");
    }

    try {
 await api.banChatMember(chatId, userId);
        await message.reply(`Successfully kicked user with ID: ${await usersData.getName(userId)}`);
    } catch (error) {
        console.error('Error kicking user:', error.message);
        await message.reply(`❌ | Error occurred: ${error.message}`);
    }
};