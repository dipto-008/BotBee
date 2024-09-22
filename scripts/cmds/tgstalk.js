module.exports.config = {
    name: "stalk",
    aliases: ["userinfo"],
    version: "1.0",
    credits: "Dipto",
    role: 0,
    hasPermission: 0,
    usePrefix: true,
    prefix: true,
    description: "Get information about a user, including their bio and avatar",
    commandCategory: "utility",
    guide: " [user_id]",
    coolDowns: 5,
    premium: false
};

module.exports.run = async({ api, event, message, args }) => {
    const userId = event.reply_to_message?.from.id || args[0] || event.from.id;

    try {
        const userProfile = await api.getUserProfilePhotos(userId);
        const user = await api.getChat(userId);

        const bio = user.bio || 'No bio available';
        const fullName = `${user.first_name} ${user.last_name || ''}`.trim();
        const username = user.username ? `@${user.username}` : 'No username';
        const profilePhotoUrl = userProfile.photos[0][0].file_id;
        const status = user.is_bot ? 'Bot' : 'User';
        const userLink = user.username ? `https://t.me/${user.username}` : 'No link available';

        const infoMessage = `
╭──✦ [ User Information ]
├‣ 🆔 User ID: ${userId}
├‣ 👤 Full Name: ${fullName}
├‣ 📱 Username: ${username}
├‣ 📝 Bio: ${bio}
├‣ 📊 Status: ${status}
╰‣ 🔗 User Link: ${userLink}`;

        if (profilePhotoUrl) {
            api.sendPhoto(event.chat.id, profilePhotoUrl, { caption: infoMessage,reply_to_message_id: event.message_id });
        } else {
            await message.reply(infoMessage);
        }
    } catch (error) {
        console.error('Error:', error.message);
        await message.reply(`❌ | Error occurred: ${error.message}`);
    }
};