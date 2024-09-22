const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "flag",
    aliases: ["flagGame"],
    version: "3.0",
    author: "Dipto",
    countDown: 0,
    role: 0,
    description: "Guess the flag name",
    category: "game",
    guide: "{pn}",
  },
  onReply: async ({ message, event, Reply, usersData }) => {
    const { country, attempts, type } = Reply;
    const maxAttempts = 5;

    if (type === "reply") {
      const reply = event.text.toLowerCase();
      const getCoin = 2 * 120.5;
      const getExp = 1 * 121;
      const userData = await usersData.get(event.from.id);

      if (!userData) {
        console.error(`User with ID ${event.from.id} not found.`);
      }

      if (attempts >= maxAttempts) {
        await message.reply(
          "🚫 | You have reached the maximum number of attempts (5).",
        );
        return;
      }

      if (isNaN(reply)) {
        if (reply === country.toLowerCase()) {
          try {
            await message.unsend(Reply.messageID);
            await usersData.set(event.from.id, {
              money: userData.money + getCoin,
              exp: userData.exp + getExp,
              data: userData.data,
            });
          } catch (err) {
            console.log("Error:", err.message);
          } finally {
            const messag = `✅ | Correct answer!\nYou have earned ${getCoin} coins and ${getExp} exp.`;
            await message.reply(messag);
          }
        } else {
          Reply.attempts += 1;
          global.functions.onReply.set(Reply.messageID, Reply);
          message.reply(
            `❌ | Wrong Answer. You have ${
              maxAttempts - Reply.attempts
            } attempts left.\n✅ | Try Again baby!`,
          );
        }
      }
    }
  },
  onStart: async ({ threadID, api, message, args, event }) => {
    try {
      if (!args[0]) {
        const response = await axios.get(
          `${await baseApiUrl()}/flagGame?randomFlag=random`,
        );
        const { link, country } = response.data;
        const info = await api.sendPhoto(threadID, link, {
          caption: "Guess this flag name.",
        });
        global.functions.onReply.set(info.message_id, {
          commandName: this.config.name,
          type: "reply",
          messageID: info.message_id,
          author: event.from.id,
          link,
          country,
          attempts: 0,
        });
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      message.reply(`Error: ${error.message}`);
    }
  },
};
