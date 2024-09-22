const axios = require("axios");

module.exports.config = {
  name: "currency",
  aliases: ["convert"],
  author: "dipto",
  countDown: 5,
  role: 0,
  description: "Converts an amount from one currency to another.",
  category: "Utility",
  usePrefix: true,
  usage: "{pn} <amount> <from_currency> <to_currency>"
};

module.exports.run = async ({ event, message, args }) => {
  const amount = parseFloat(args[0]);
  const fromCurrency = args[1].toUpperCase();
  const toCurrency = args[2].toUpperCase();

  if (!amount || !fromCurrency || !toCurrency) {
    return message.reply("Please provide the amount and the currency codes (e.g., /currency 100 USD EUR).");
  }

  const apiKey = "4bf9cbb57579484ab9a81b52f8875a84"; 
  const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;

    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return message.reply("Invalid currency code provided.");
    }

    const convertedAmount = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
    message.reply(`${amount} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}.`);
  } catch (error) {
    message.reply("Failed to fetch currency data. Please try again later.");
  }
};