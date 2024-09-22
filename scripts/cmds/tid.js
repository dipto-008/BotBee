module.exports.config = {
        name: "tid",
        author: "dipto",
        role: 0 ,
       description: "Get group id",
        commandCategory: "info",
        usage: "[]",
        usePrefix: true,
        premium: false
    }
    
module.exports.onStart = async ({ api,event, message }) => {
        try {
    const chat = await api.getChat(event.chat.id);
    message.reply(`• TID: ${chat.id}`);
        } catch (error) {
            console.log('Error', error);
    message.reply('An error occurred');
        }
    };