const axios = require("axios");

module.exports.config = {
  name: "weather",
  aliases: [],
  author: "dipto",
  countDown: 5,
  role: 0,
  description: "Gets the current weather information for a city.",
  category: "Utility",
  usePrefix: true,
  usage: "{pn} <city>"
};

module.exports.run = async ({ args, message }) => {
  const city = args.join(" ");
  const apiKey = "77f75cb02ca4d4906e6c52d2784485f8";

  if (!city) {
    return message.reply("Please specify a city.");
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    const weatherMessage = `Weather in ${weatherData.name}:
    - Temperature: ${weatherData.main.temp}°C
    - Condition: ${weatherData.weather[0].description}
    - Humidity: ${weatherData.main.humidity}%
    - Wind Speed: ${weatherData.wind.speed} m/s`;

    await message.reply(weatherMessage);
  } catch (error) {
    message.reply("Failed to fetch weather data. Please check the city name or try again later.");
  }
};