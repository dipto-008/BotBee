---
<div align="center">
  <img src="https://i.ibb.co/G5r6p5r/image.png" width="60"/>
   <h1>Bot'Bee<sub><sub>v1.0.0🚀</sub><sub><sub><h6>- Made By Dipto</h6></sub></sub></sub>
  </h1>
  <p><em>A Powerful Telegram bot built by Dipto for various automated tasks.</em></p>
  <p><small>Version 1.0.0</small></p>
</div>

<img align="center" src="https://i.ibb.co/GFGBBpY/image.jpg"></a>

---

<p align="center">
  <a href="https://nodejs.org/dist/v20.0.0">
    <img src="https://img.shields.io/badge/Nodejs%20Support-20.x-brightgreen.svg?style=flat-square" alt="Nodejs Support v20.x">
  </a>
  <img alt="size" src="https://img.shields.io/github/repo-size/dipto-008/BotBee.svg?style=flat-square&label=size">
  <img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=code%20version&prefix=v&query=%24.version&url=https://github.com/dipto-008/BotBee/raw/main/package.json&style=flat-square">
  <img alt="visitors" src="https://visitor-badge.laobi.icu/badge?style=flat-square&page_id=dipto-008.BotBee">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=brightgreen">
</p>

---

- [📝 **Features**](#-features)
- [ 🚀 **Getting Started**](#-getting-Started)
- [📝 **Usage**](#-usage)
- [💡 **Deployment**](#-deployment-with-Vercel)
- [🆙 **Update**](#-how-to-update)
- [💭 **Author**](#-author)
- [🌐 **Support groups**](#-support-Group)

## 📦 Features

- Integration with various APIs.
- Automated responses to user queries.
- Easy customization and commands.
- Built using Node.js and Express.
- Uses MongoDB for data storage.
- Custom message handling functions.
- usePrefix features for commands.
- whitelist id and threads features.
- ignore list id features.
- premium mode features.
- bot operators and main admin features.

---

## 🚀 Getting Started

### 1. Setting Up Your Bot with BotFather

1. Open Telegram and search for [BotFather](https://t.me/BotFather).
2. Start a chat with BotFather and type `/newbot` to create a new bot.
3. Follow the prompts to name your bot and create a unique username.
4. Once created, BotFather will provide you with a **bot token**. This token is crucial for connecting your bot to Telegram.

### 2. Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/telegram-bot.git
cd telegram-bot
```

### 3. Setting Up Your Bot Configuration

Create a `config.json` file in the root directory and add the following configuration:

```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "prefix": "/",
  "mongoURI": "YOUR_MONGODB_URI",
  "ignore_list_ID": {
    "enable": false,
    "IDS": []
  },
  "white_list_group": {
    "enable": false,
    "groups": []
  },
  "white_list_ID": {
    "enable": false,
    "IDS": []
  },
  "adminBot": [
    "ADMIN_UID_HERE"
  ],
  "botOperator": []
}
```

### 4. Installing Dependencies

Install the required dependencies:

```bash
npm install
```

### 5. Starting the Bot

Start your bot using the following command:

```bash
npm start
```
**or**

```node
node index
```

---

## 🛠 Usage

### Custom Message Functions

#### `message.reply()`

Use this function to send a reply to a specific message in the chat. It provides a more contextual response to user queries.

**Example:**

```javascript
module.exports = {
  config: {
    name: "echo",
    version: "1.0",
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
    const echoMessage = args.join(" ");
    if (!echoMessage) {
      return await message.reply("Please provide a message to echo.");
    }
    //usages of message reply
   await message.reply(echoMessage);
  },
};
```

#### `message.stream()`

This function is used to stream data to the chat. It can be useful for sending large amounts of data or files.

**Example:**

```javascript
module.exports = {
  config: {
    name: "echo",
    version: "1.0",
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
    const echoMessage = args.join(" ");
    if (!echoMessage) {
      return await message.reply("Please provide a message to echo.");
    }
    //usages of message stream (remember attachment should be first)
   await message.stream({
attachment:"https://telegra.ph/file/4b46589e723817e575717.jpg",
     body:"caption message "
   });
  },
};
```

#### `message.code()`

Use this function to format a message as code, which helps in presenting code snippets or structured data clearly.

**Example:**

```javascript
module.exports = {
  config: {
    name: "echo",
    version: "1.0",
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
    const echoMessage = args.join(" ");
    if (!echoMessage) {
      return await message.reply("Please provide a message to echo.");
    }
//usages of code box(js)
   await message.code("console.log()");
  },
};
```
#### `message.download()`

Use this function to format a message as code, which helps in presenting code snippets or structured data clearly. And it need a mimeType for recognize is it a video or photo or audio.

**Example:**

```javascript
await message.download({
attachment:"https://telegra.ph/file/4b46589e723817e575717.jpg",
     body:"caption message ",
  mimeType: "image/png"//it's important for download 
   });
```
#### `message.unsend()`

Is used to unsend message 

**Example:**

```javascript
await message.unsend(event.message_id)
```
#### `message.err()`

Is used to show error 

**Example:**

```javascript
await message.err(error)
```

### Command and Event Handling


#### Aliases

Aliases allow commands to be triggered with alternative names. Define them in your command configuration.It's a nickname or short name of real command 

**Example:**

```javascript
module.exports = {
  config: {
    name: "echo",
    version: "1.0",
//usages of aliases (it should be an Array [])
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
   
};
```


#### `usePrefix`

This setting determines whether a command requires a prefix to be recognized.If usePrefix false then that command will work without prefix.

**Example:**

```javascript
module.exports = {
  config: {
    name: "echo",
    version: "1.0",
//usages of usePrefix (it should be true or false)
    usePrefix: true,//or false 
    aliases:["eco"],
    author: "dipto",
    countDown: 3,
    role: 3, 
    description: "Echoes back the message sent by the user",
    commandCategory: "fun test",
    guide:  "{pn} <message>",
  },

  run: async function ({ message, args }) {
   
};
```


### Reply Handling

#### `reply`

This function handles replies to bot messages and executes the associated commands.

**Example Usage:**

```javascript
const axios = require('axios');

module.exports.config = {
    name: "bby",
    version: "1.0",
    credits: "Dipto",
    role: 0,
    usePrefix: false,
    description: "Talk to baby bot",
    commandCategory: "fun",
    guide: "baby [message]",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ event, message, args }) =>{
    
    const userMessage = args.join(' ');
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(userMessage)}`;
        const response = await axios.get(apiUrl);
        const data = response.data.reply;

      const info = await message.reply(data)
        
    const infoID = info.message_id; 
    const author = event.from.id
    //Store the command name and data ( in reply or onReply,handleReply any
    global.functions.reply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      data: reply
    });
           
    } catch (error) {
        console.error('Error:', error);
        message.reply('Sorry, something went wrong!');
    }
};

module.exports.reply = async function ({ event, message ,args, Reply }) {
//import the data from reply function which one we add in run function.
     const { data } = Reply;
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(args.join(' '))}`;
        const response = await axios.get(apiUrl);
        const reply = response.data.reply;
     const info = await message.reply(reply);
    const infoID = info.message_id; 
    const author = event.from.id
        //again store it for conventional (continuous process)
      //if you want only reply then you can ignore it.
    global.functions.reply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      mesg: reply
    });
  
    } catch (error) {
        console.error('Error:', error);
        message.reply("error 🦆")
    }
};
```


#### `onReply`

This function handles replies to bot messages and executes the associated commands.

**Example Usage:**

```javascript
const axios = require('axios');

module.exports.config = {
    name: "bby",
    version: "1.0",
    credits: "Dipto",
    role: 0,
    usePrefix: false,
    description: "Talk to baby bot",
    commandCategory: "fun",
    guide: "baby [message]",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ event, message, args }) =>{
    
    const userMessage = args.join(' ');
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(userMessage)}`;
        const response = await axios.get(apiUrl);
        const data = response.data.reply;

      const info = await message.reply(data)
        
    const infoID = info.message_id; 
    const author = event.from.id
    //Store the command name and data ( in reply or onReply,handleReply any
    global.functions.onReply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      data: reply
    });
           
    } catch (error) {
        console.error('Error:', error);
        message.reply('Sorry, something went wrong!');
    }
};

module.exports.onReply = async function ({ event, message ,args, Reply }) {
//import the data from reply function which one we add in run function.
     const { data } = Reply;
    try {
        const apiUrl = `https://www.noobs-api.000.pe/dipto/baby?text=${encodeURIComponent(args.join(' '))}`;
        const response = await axios.get(apiUrl);
        const reply = response.data.reply;
     const info = await message.reply(reply);
    const infoID = info.message_id; 
    const author = event.from.id
        //again store it for conventional (continuous process)
      //if you want only reply then you can ignore it.
    global.functions.onReply.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      mesg: reply
    });
  
    } catch (error) {
        console.error('Error:', error);
        message.reply("error 🦆")
    }
};
```
#### `reply`

Your can use handleReply also.it will work in same way
```javascript
  global.functions.handleEvent.set(infoID, {
        commandName: this.config.name,
       type: "reply",
       messageID: infoID,
       author,
      mesg: reply
    });

module.exports.handleEvent = async ({ event, message ,args, Reply }) => {}
```


### Commands

- **`start` , `onStart` , `run` , `prefix`**

Define these functions will work when they are called.

**Example Usage:**

```javascript

module.exports.config={
  name:""
}
module.exports.run = async({api,event}) =>{
  try {
    
  } catch (error) {
    
  }
}

//usages of onStart 

module.exports.config={
  name:""
}
module.exports.onStart = async({api,event}) =>{
  try {
    
  } catch (error) {
    
  }
}
//usages of start same as onStart run

module.exports.config={
  name:""
}
module.exports.start = async({api,event}) =>{
  try {
    
  } catch (error) {
    
  }
}

//also you can use function in different way
//this also same as others
module.exports ={
  config:{
  name:""
},
prefix: async({api,event}) =>{
  try {
    //this also works in same way
  } catch (error) {
    
  }
}
}
```


### Events

- **`chat` , `onChat` , `handleEvent` , `noPrefix`**

Define these functions will work for all time no need to call.

**Example Usage:**

```javascript

module.exports.config={
  name:""
}
module.exports.onChat= async({api,event}) =>{
  try {
    
  } catch (error) {
    
  }
}
//all system are same just onChat to chat,handleEvent, noPrefix.
```

#### **Example of Database**

Your can use database from mongo

```javascript
//get user and thread Data
 usersData.get(event.from.id);
 threadsData.get(event.chat.id);
 
 //update user and thread 
 usersData.set(event.from.id,{
   updateDataHere
   });
 threadsData.set(event.chat.id,{
   updateDataHere
 });
 //get all data
 usersData.getAll();
 threadsData.getAll();
```
---

## 📦 Deployment with Vercel

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Create a `vercel.json` File:**

   Add a `vercel.json` file to the root directory with the following content:

   ```json
   {
     "version": 2,
     "builds": [
       { "src": "index.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/index.js" }
     ]
   }
   ```

3. **Deploy Your Bot:**

   Run the following command to deploy:

   ```bash
   vercel
   ```

   Follow the prompts to complete the deployment.
---

## How to update

Type **node update** in shell or terminal

---

## 📜 License

This project is licensed under **Open License - Non-Commercial**. See the `LICENSE` file for more details.

---

## 🤝 Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

---

## 🐞 Issues

If you encounter any issues, please report them at [Issues](https://github.com/Diptogittt/telegram-bot/issues).

---

## ✍️ Author

- **Dipto**

![Dipto's Profile](https://telegra.ph/file/4b46589e723817e575717.jpg)
[Facebook ID](https://www.facebook.com/dipto008)

---
## 🌐 Support Group

[Your Baby Group(Telegram)](https://t.me/your_baby_group)

[Your Baby Group(Messager)](https://m.me/j/Abbzx_R02jroVmUv/)

---

## 🔗 Links

- [GitHub Repository](https://github.com/Diptogittt/telegram-bot)
- [License](./LICENSE)

---