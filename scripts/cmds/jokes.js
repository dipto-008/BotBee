const axios = require("axios");

module.exports.config = {
  name: "joke",
  aliases: ["funny"],
  author: "dipto",
  countDown: 5,
  role: 0,
  description: "Fetches a random joke.",
  category: "Fun",
  usePrefix: true,
  usage: "{pn}"
};

module.exports.run = async ({ message }) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = `${response.data.setup} - ${response.data.punchline}`;

    await message.reply(joke);
  } catch (error) {
    message.reply("Failed to fetch a joke. Please try again later.");
  }
};