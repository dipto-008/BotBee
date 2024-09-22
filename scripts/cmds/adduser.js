module.exports.config = {
  name: "adduser",
  aliases: ["add"],
  author: "dipto",
  countDown: 2,
  role: 3,
  description: "Adds a user to the group by their user ID.",
  category: "Admin",
  usePrefix: true,
  usage: "{pn} <userID>"
};

module.exports.run = async ({ event, args, api, message }) => {
  const chatId = event.chat.id;
  const userIdToAdd = event?.reply_to_message?.from.id || args[0];

  if (!userIdToAdd) {
    return message.reply("Please provide a user ID to add.");
  }

  try {
    const inviteLink = await api.exportChatInviteLink(chatId);

    await api.sendMessage(userIdToAdd, `You have been invited to join the group. Here is the link: ${inviteLink}`);

    message.reply(`Invite link has been successfully sent to user with ID ${userIdToAdd}.`);
  } catch (error) {
    message.reply(`Failed to invite user. Error: ${error.message}`);
  }
};