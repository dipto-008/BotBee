module.exports.config = {
    name: "users",
    aliases: ["user"],
    version: "1.0",
    credits: "Dipto",
    role: 3, // Only admin
    usePrefix: true,
    description: "Manage users in the bot",
    commandCategory: "admin",
    guide: "/users -f|find id <user_id> | /users update id <user_id> <update_data> | /users delete id <user_id>",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ Users:users,message, args }) => {
    const [action, searchType, identifier, ...updateData] = args;

    try {
        switch (`${action} ${searchType}`) {
            case '-f id':
            case 'find id': {
                const user = await users.getUser(identifier);
                if (!user) return message.reply('User not found.');

                const userInfo = `
╭──✦ [ User Information ]
├‣ 🆔 User ID: ${user.userId}
├‣ 👤 Full Name: ${user.firstName} ${user.lastName || ''}
├‣ 📱 Username: ${user.username || 'No username'}
├‣ 📝 Bio: ${user.bio || 'No bio available'}
├‣ 🖼️ Avatar URL: ${user.avatarUrl || 'No avatar'}
├‣ 📊 Experience: ${user.exp || 0}
├‣ 💰 Money: ${user.money || 0}
╰‣ 📅 Joined At: ${user.joinedAt.toDateString()}`;

                message.reply(userInfo);
                break;
            }

            case 'update id': {
                const updateObj = JSON.parse(updateData.join(' ')); 
                const updatedUser = await users.updateUser(identifier, updateObj);
                message.reply(updatedUser ? 'User updated successfully.' : 'User update failed.');
                break;
            }

            case 'delete id': {
                await users.deleteUser(identifier);
                message.reply('User deleted successfully.');
                break;
            }

            default:
                message.reply('Invalid command. Please check the guide.');
                break;
        }
    } catch (error) {
        message.reply(`❌ | Error occurred: ${error.message}`);
    }
};