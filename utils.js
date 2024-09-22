const path = require("path");
const url = require("url");
const axios = require('axios');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const config = require('./config.json');

async function getExtensionFromUrl(mediaUrl) {
  const response = await axios.get(mediaUrl,{ responseType:'stream' });
  const pp = response.headers["content-type"];
  const dd = await getExtensionFromMimeType(pp);
   return dd || path.extname(new URL(mediaUrl).pathname).toLowerCase();

}
function getExtensionFromMimeType(mimeType) {
  const mimeTypeMap = {
    'video/mp4': '.mp4',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'audio/mpeg': '.mp3',
    'audio/mp4': '.mp3',
    'audio/wav': '.wav',
  };
  return mimeTypeMap[mimeType] || '';
}
async function downloadFile(url, downloadPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(downloadPath, Buffer.from(response.data));
  } catch (err) {
    throw new Error(`❌ | Failed to download file: ${err.message}`);
  }
}
function message(bot, msg) {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  async function sendMessageError(err) {
    if (typeof err === "object" && !err.stack)
      err = JSON.stringify(err, null, 2);
    else err = `${err.name || err.error}: ${err.message}`;
    return await bot.sendMessage(chatId, `❌ | Error occurred: ${err}`, {
      reply_to_message_id: messageId,
    });
  }

  return {
    // Send a message //
    send: async (form, options = {}) => {
      try {
        return await bot.sendMessage(chatId, form, options);
      } catch (err) {
        await sendMessageError(err);
      }
    },

    // Reply to a message //
    reply: async (form, options = {}) => {
      try {
  return await bot.sendMessage(chatId, form, {
          ...options,
          reply_to_message_id: messageId,
        });
      } catch (err) {
        await sendMessageError(err);
      }
    },

    // Unsend a message //
    unsend: async (messageId) => {
      try {
        return await bot.deleteMessage(chatId, messageId);
      } catch (err) {
        await sendMessageError(err);
      }
    },

   // Stream media //
    stream: async (options = {}) => {
const { url:mediaSource, caption="heres your media",attachmentType: isvalid } = options;
      try {
        let attachmentType;
        let mediaPath;

        if (typeof mediaSource === 'string') {
    attachmentType = mediaSource.startsWith('http') ? (await getExtensionFromUrl(mediaSource)) : path.extname(mediaSource).toLowerCase() || isvalid;
          
          mediaPath = mediaSource;
} else if (typeof mediaSource === 'object') {
          attachmentType = path.extname(mediaSource.path).toLowerCase();
          mediaPath = mediaSource;
        } else {
          throw new Error('❌ | Unsupported media source type');
        }
        
const sendOptions = { caption, reply_to_message_id: messageId };

        if ([".mp4", ".mov"].includes(attachmentType)) {
          await bot.sendVideo(chatId, mediaPath, sendOptions);
        } else if ([".jpg", ".jpeg", ".png", ".gif"].includes(attachmentType)) {
          await bot.sendPhoto(chatId, mediaPath, sendOptions);
        } else if ([".mp3", ".wav", ".mp4a"].includes(attachmentType)) {
          await bot.sendAudio(chatId, mediaPath, sendOptions);
        } else {
    await sendMessageError(new Error("❌ | Unsupported media type"));
        }
      } catch (err) {
        await sendMessageError(err);
      }
    },
    //download media //
    download: async (options = {}) => {
      const { url: mediaUrl, mimeType, caption } = options;
      try {
        const extension = getExtensionFromMimeType(mimeType) || '.tmp';
        let tempFilePath = __dirname + `temp${extension}`;

await downloadFile(mediaUrl, tempFilePath);

        const sendOptions = { caption, reply_to_message_id: messageId };

        // check  MIME type //
        if (mimeType.startsWith('video/')) {
          await bot.sendVideo(chatId, tempFilePath, sendOptions);
        } else if (mimeType.startsWith('image/')) {
          await bot.sendPhoto(chatId, tempFilePath, sendOptions);
        } else if (mimeType.startsWith('audio/')) {
          await bot.sendAudio(chatId, tempFilePath, sendOptions);
          
          fs.remove(tempFilePath);
        } else {
    throw new Error('❌ | Unsupported media type');
        }
      } catch (err) {
        await sendMessageError(err);
      } 
    },code: async (messageText, parseMode = "Markdown") => {
      try {
        const options = { parse_mode: parseMode, reply_to_message_id: messageId };
        return await bot.sendMessage(chatId, `\`\`\`javascript\n${messageText}\n\`\`\``, options);
      } catch (err) {
        await sendMessageError(err);
      }
    },
    err: async (err) => {
      await sendMessageError(err);
    },
  };
}




  function loadScripts() {
    const commandsPath = path.join(__dirname, "..", "scripts", "cmds");
    const eventsPath = path.join(__dirname, "..", "scripts", "events");

    // Load Commands
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandName = path.parse(file).name;

      // Skip commands listed in unloadCommand
      if (config.unloadCommand.includes(commandName)) {
        console.log(
          `[ SKIP COMMAND ] • ${commandName} is excluded from reloading`.yellow
        );
        continue;
      }

      const command = require(path.join(commandsPath, file));
      global.commands.set(command.config.name, command);
      console.log(`[ COMMAND ] • ${command.config.name} loaded successfully`.green);
    }

    // Load Events
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const eventName = path.parse(file).name;

      // Skip events listed in unloadEvent
      if (config.unloadEvent.includes(eventName)) {
        console.log(
          `[ SKIP EVENT ] • ${eventName} is excluded from reloading`.yellow
        );
        continue;
      }

      const event = require(path.join(eventsPath, file));

      bot.on(eventName, event);
      global.events.set(eventName, event);

      console.log(`[ EVENT ] • ${eventName} loaded successfully`.green);
    }

    // Watch for changes with Chokidar
    chokidar.watch([commandsPath, eventsPath]).on("all", (event, filePath) => {
      const fileName = path.basename(filePath, ".js");

      // Reload command if not in unloadCommand
      if (filePath.startsWith(commandsPath) && !config.unloadCommand.includes(fileName)) {
        delete require.cache[require.resolve(filePath)];
        const newCommand = require(filePath);
        global.commands.set(newCommand.config.name, newCommand);
        console.log(`[ COMMAND ] • ${fileName} reloaded`.cyan);
      }

      // Reload event if not in unloadEvent
      if (filePath.startsWith(eventsPath) && !config.unloadEvent.includes(fileName)) {
        delete require.cache[require.resolve(filePath)];
        const newEvent = require(filePath);
        bot.removeListener(fileName, global.events.get(fileName));
        bot.on(fileName, newEvent);

        global.events.set(fileName, newEvent);
        console.log(`[ EVENT ] • ${fileName} reloaded`.cyan);
      }
    });
  }


module.exports = {
messageUtils: message,
  loadScripts
};
