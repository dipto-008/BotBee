module.exports.config = {
    name: "threads",
    aliases: ["thread"],
    version: "1.0",
    credits: "Dipto",
    role: 3, // Only admin
    usePrefix: true,
    description: "Manage threads in the bot",
    commandCategory: "admin",
    guide: "/threads -f|find id <thread_id> | /threads update id <thread_id> <update_data> | /threads delete id <thread_id>",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ Threads:threads, message, args }) => {
    const [action, searchType, identifier, ...updateData] = args;

    try {
        switch (`${action} ${searchType}`) {
            case '-f id':
            case 'find id': {
                const thread = await threads.getThread(identifier);
                if (!thread) return message.reply('Thread not found.');

                const threadInfo = `
╭──✦ [ Thread Information ]
├‣ 🆔 Thread ID: ${thread.threadId}
├‣ 📜 Title: ${thread.title || 'No title'}
├‣ 🖼️ Image URL: ${thread.threadImage || 'No image available'}
├‣ 🧑‍💼 Admins Count: ${thread.threadAdmins.length || 0}
├‣ 👥 Members Count: ${thread.members.length || 0}
├‣ 🔧 Settings: ${JSON.stringify(thread.settings) || 'No settings'}
╰‣ 🎮 Games: ${JSON.stringify(thread.games) || 'No games available'}`;

                message.reply(threadInfo);
                break;
            }

            case 'update id': {
                const updateObj = JSON.parse(updateData.join(' ')); // Ensure the input is valid JSON
                const updatedThread = await threads.updateThread(identifier, updateObj);
                message.reply(updatedThread ? 'Thread updated successfully.' : 'Thread update failed.');
                break;
            }

            case 'delete id': {
                await threads.deleteThread(identifier);
                message.reply('Thread deleted successfully.');
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
