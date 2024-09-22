const { adminBot } = global.functions.config;

module.exports.config = {
  name: "call",
  aliases: ["report"],
  version: "1.0.0",
  role: 0,
  author: "dipto",
  description: "Send a call/report to bot admins and operators.",
  usePrefix: true,
  guide: "[message]",
  category: "Report",
  countDown: 5,
};

module.exports.onReply = async ({ message, event, Reply, api, usersData }) => {
  const { type, target, message_ID, author } = Reply;
const mm  = message_ID ? message_ID : event.message_id;
  try {
    // Admin replies to the user's message
    if (type === "adminReply" && (adminBot.includes(event.from.id) || botOperator.includes(event.from.id))) {
      const feedbackMessage = event.text;
      const adminName = await usersData.getName(event.from.id);

      const info = await api.sendMessage(
        target,
        `Reply from Admin (${adminName}):\n${feedbackMessage}`,
        { reply_to_message_id: message_ID }
      );

      // Set reply for the user to respond back to admin
      global.functions.onReply.set(info.message_id, {
        commandName: this.config.name,
        type: "userReply",
        message_ID: info.message_id,
        author: event.from.id,
        target: event.chat.id,
      });

      message.reply("✅ | Your message has been sent to the user.");
    }
    else if (type === "userReply") {
      const userMessage = event.text;
      const userName = await usersData.getName(event.from.id);

      const info = await api.sendMessage(
        author,
        `Message from User (${userName}):\n${userMessage}`  );
      global.functions.onReply.set(info.message_id, {
        commandName: this.config.name,
        type: "adminReply",
        message_ID: event.message_id,
        author: event.from.id,
        target: event.chat.id,
      });

      message.reply("✅ | Your message has been sent to the admin.");
    }
  } catch (err) {
    console.log("Error in onReply handler:", err.message);
    message.reply(`❌ | Error: ${err.message}`);
  }
};

module.exports.onStart = async ({ api, message, args, event, usersData }) => {
  try {
    const author = event.from.id;
    const reportMessage = args.join(" ").trim();

    if (!reportMessage) {
      return message.reply(
        "Please provide a message for the report.\n\nExample:\n!call This is a report message."
      );
    }

    for (const recipient of adminBot) {
      const adminName = await usersData.getName(recipient);
      const info = await api.sendMessage(
        recipient,
        `Report from user: ${await usersData.getName(author)}\nMessage: ${reportMessage}\n\nReply to this message to respond to the user.`
      );

      global.functions.onReply.set(info.message_id, {
        commandName: this.config.name,
        type: "adminReply",
        message_ID: event.message_id,
        author: author,
        target: event.chat.id,
      });
    }

    message.reply("Your report has been sent to the admins and operators.");
  } catch (error) {
    console.log(`Failed to send report: ${error.message}`);
    message.reply(`❌ | Error: ${error.message}`);
  }
};
