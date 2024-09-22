module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.new_chat_member && msg.new_chat_member.id === bot.id) {
            const infoMessage = `Hello! I'm ${bot.username}, the bot. How can I assist you today?`;
            bot.sendMessage(msg.chat.id, infoMessage);
        }
    }
};
