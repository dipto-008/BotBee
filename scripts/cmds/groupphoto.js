module.exports = {
  config: {
    name: "changephoto",
    version: "1.0",
    aliases: ["setphoto"],
    author: "dipto",
    countDown: 5,
    role: 2, 
    description: "Changes the group chat photo using a file_id",
    commandCategory: "group",
    guide: "{pn} <reply to image>",
  },

  run: async ({event ,message, api }) =>{
    if (!event.reply_to_message || !event.reply_to_message.photo) {
      return await message.reply("Please reply to an image to set as the group photo.");
    }
    const photoFileId = event.reply_to_message.photo[event.reply_to_message.photo.length - 1].file_id;

    try {
      await api.setChatPhoto(event.chat.id, photoFileId);
      await message.reply("✅ | Group photo updated successfully!");
    } catch (error) {
      await message.reply("Failed to update the group photo. Please try again.");
      console.error("Error setting chat photo:", error);
    }
  }
};
