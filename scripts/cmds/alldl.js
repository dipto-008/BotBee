const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "alldl",
    version: "1.0.5",
    author: "Dipto",
    countDown: 2,
    role: 0,
    description: {
      en: "𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝘃𝗶𝗱𝗲𝗼 𝗳𝗿𝗼𝗺 𝘁𝗶𝗸𝘁𝗼𝗸, 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸, 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺, 𝗬𝗼𝘂𝗧𝘂𝗯𝗲, 𝗮𝗻𝗱 𝗺𝗼𝗿𝗲",
    },
    commandCategory: "𝗠𝗘𝗗𝗜𝗔",
    guide: {
      en: "[video_link]",
    },
  },
  run: async ({ api, args, event , message})=>{
    const dipto = args.join(" ")
    if (!dipto) {
      message.reply('❌ | Please provide a valid video link.')
    }
    try {
      message.reply('🔍 | Downloading video...')
      const { data } = await axios.get(`${await baseApiUrl()}/alldl?url=${encodeURIComponent(dipto)}`);
      
const ext = path.extname(data.result) || 'mp4';
const filePath = __dirname + `/caches/vid.mp4`//${ext}`;
      const vid = (
        await axios.get(data.result, { responseType: "arraybuffer" })
      ).data;
      fs.writeFileSync(filePath, Buffer.from(vid, "utf-8"));
      
await message.stream({url: fs.createReadStream(filePath),caption: `${data.cp || null}`})
      
        fs.unlinkSync(filePath)
    } catch (error) {
message.reply('❌ | An error ' + error.message)
    }
  }
};