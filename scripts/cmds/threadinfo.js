module.exports.config = {
        name: "threadinfo",
        aliases:["tinfo","groupinfo"],
        author: "dipto",
description: "Get information about the group",
        commandCategory: "info",
        usage: "[]",
        usePrefix: true,
        role: 0 
    },
    
module.exports.onStart = async ({ api,event, message }) => {
        try {
    const chat = await api.getChat(event.chat.id);

    let infoMessage = `╭───[ GROUP INFO ]\n`;
            infoMessage += `╰‣ Group Name: ${chat.title}\n`;
            infoMessage += `╰‣ Type: ${chat.type}\n`;
        infoMessage += `╰‣ TID: ${chat.id}\n`;
            if (chat.description) {
                infoMessage += `╰‣ Description: ${chat.description}\n`;
            }
            if (chat.invite_link) {
                infoMessage += `╰‣Invite Link: ${chat.invite_link}\n`;
            }

            message.reply(infoMessage);
        } catch (error) {
            console.log('Error', error);
    message.reply('An error occurred');
        }
    };