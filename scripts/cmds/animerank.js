const malScraper = require("mal-scraper");
const axios = require("axios");

module.exports = {
  config: {
    name: "aninews",
    aliases: ["animenews"],
    version: "1.0",
    author: "dipto",
    countDown: 5,
    role: 0,
    description: {
      en: "Get the latest anime news from MyAnimeList",
    },
    category: "anime",
    guide: {
      en: "{p}aninews",
    },
  },
  onStart: async ({ api, msg , message }) => {
    try {
      const news = await malScraper.getNewsNoDetails(6);
      let message = "• Here's the TOP 6 latest Anime News\n\n";

      // Fetch and prepare media group safely
      const media = [];
      for (const [index, item] of news.entries()) {
        message += `• ${index + 1}. ${item.title}\n• Link: ${item.link}\n\n`;

        try {
          // Fetch image data safely
          const response = await axios.get(item.image, {
            responseType: "arraybuffer",
          });

          // Push formatted media object into array
          media.push({
            type: "photo",
            media: { source: Buffer.from(response.data) },
          });
        } catch (imageError) {
          console.error("Error fetching image:", imageError);
        }
      }

      // Send text first, then media
      await api.sendMessage(msg.chat.id, message);

      // Send media group if not empty
     // if (media.length > 0) {
     //   await api.sendMediaGroup(msg.chat.id, media);
    //  }
    } catch (err) {
      console.error(err);
      message.reply("Sorry, there was an error fetching the news.");
    }
  },
};
