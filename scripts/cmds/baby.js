const axios = require("axios");
const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "baby",
    aliases: ["baby", "bbe", "babe","bby"],
    version: "6.9.0",
    author: "dipto",
    countDown: 0,
    role: 0,
    description: "better then all sim simi",
    category: "chat",
    guide: {
      en: "{pn}[anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR \nall OR\nedit [YourMessage] - [NeeMessage]",
    },
  },
  onStart: async ({ api, event, args, usersData , message}) => {
    const link = `${await baseApiUrl()}/baby`;
  const dipto = args.join(" ").toLowerCase();
    const uid = event.from.id;
    let command;
    let comd;
    let final;
    try {
      if (!args[0]) {
        const ran = [
          "Bolo baby",
          "hum",
          "type help baby",
          "type !baby hi",
          "yes baby",
          "hey baby😃",
          "hey i am here😃"
        ];
        const r = ran[Math.floor(Math.random() * ran.length)];
        return message.reply(r);
      }
  //----------------------------------//
else if (args[0].toLowerCase() === "remove") {
    const fina = dipto.replace("remove ", "");
        const respons = await axios.get(`${link}?remove=${fina}`);
        const dat = respons.data.message;
        message.reply(`${dat}`);
      }
    //------------------------------------//
      else if (args[0].toLowerCase() === "rm" && dipto.includes("-")) {
        const fina = dipto.replace("rm ", "");
        const fi = fina.split(/\s*-\s*/)[0];
        const f = fina.split(/\s*-\s*/)[1];
  const respons = await axios.get(`${link}?remove=${fi}&index=${f}`);
        const da = respons.data.message;
        message.reply(`${da}`);
      }
      //-----------------------------------//
      else if (args[0] === "list") {
       /* if (args[1] === "all") {
          const res = await axios.get(`${link}?list=all`);
          const data = res.data;
          Promise.all(
            data.teacher.teacherList.map(async (item) => {
          const number = Object.keys(item)[0];
              const value = item[number];
              const userData = await usersData.get(number);
              const name = userData.name;
              return { name, value };
            }),
          )
            .then((teachers) => {
  teachers.sort((a, b) => b.value - a.value);
              const output = teachers
                .map(
                  (teacher, index) =>
                    `${index + 1}/ ${teacher.name || 'bolod'}: ${teacher.value}`,
                )
                .join("\n");
           const hh = message.reply(
                `Total Teach = ${data.length}\n\n👑 | List of Teachers of baby\n${output}`,
                event.threadID,
                event.messageID,
              );
                setTimeout(() => {
                    api.unsendMessage(hh.messageID);
                }, 30000);
            })
            .catch((error) => {
              console.error(error);
              message.reply(
                `Error fetching teacher data`,
                event.threadID,
                event.messageID,
              );
            });
        } else {*/
          const respo = await axios.get(`${link}?list=all`);
          const d = respo.data.length;
          message.reply(
            `Total Teach = ${d}`,
            event.threadID,
            event.messageID,
          );
      //  }
      }
      //-----------------------------------//
      else if (
        args[0].toLowerCase() === "msg" ||
        args[0].toLowerCase() === "message"
      ) {
        const fuk = dipto.replace("msg ", "");
        const respo = await axios.get(`${link}?list=${fuk}`);
        const d = respo.data.data;
      message.reply(`Message ${fuk} = ${d}`);
      }
      //----------------------------------//
  else if (args[0].toLowerCase() === "edit") {
   const command = dipto.split(/\s*-\s*/)[1];
        if (command.length < 2) {
          return message.reply(
            "❌ | Invalid format! Use edit [YourMessage] - [NewReply]");
        }
const res = await axios.get(`${link}?edit=${args[1].toLowerCase()}&replace=${command}`,
        );
        const dA = res.data.message;
        message.reply(`changed ${dA}`);
      }
  //-------------------------------------//
      else if (
        args[0].toLowerCase() === "teach" &&
        args[1].toLowerCase() !== "amar" &&
        args[1].toLowerCase() !== "react"
      ) {
command = dipto.split(/\s*-\s*/).slice(1).join(' - ');
        comd = dipto.split(/\s*-\s*/)[0];
        final = comd.replace("teach ", "");
        if (command.length < 2) {
          return message.reply(
            "❌ | Invalid format! Use [YourMessage] - [Reply1], [Reply2], [Reply3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]"
          );
        }
const re = await axios.get(`${link}?teach=${final}&reply=${command}&senderID=${uid}`);
        const tex = re.data.message;
      //  const name = re.data.teacher;
        const data = await usersData.getName(event.from.id);
    // const teacher = data.name;
        const teachs = re.data.teachs;
        message.reply(`✅ Replies added ${tex}\nTeacher: ${data || "none"}\nTeachs: ${teachs}`);
        
   }
   //------------------------------------//
      else if (
        args[0].toLowerCase() === "teach" &&
        args[1].toLowerCase() === "amar" &&
        args[2].toLowerCase() === "name"
      ) {
        command = dipto.split(/\s*-\s*/)[1];
        comd = dipto.split(/\s*-\s*/)[0];
        final = comd.replace("teach ", "");
        if (command.length < 2) {
          return message.reply(
            "❌ | Invalid format! Use [YourMessage] - [Reply1], [Reply2], [Reply3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]");
        }
        const re = await axios.get(`${link}?teach=${final}&senderID=${uid}&reply=${command}&key=intro`);
        const tex = re.data.message;
        message.reply(`✅ Replies added ${tex}`);
      }
      //------------------------------------//
      else if (
        args[0].toLowerCase() === "teach" &&
        args[1].toLowerCase() === "react"
      ) {
        command = dipto.split(/\s*-\s*/)[1];
        comd = dipto.split(/\s*-\s*/)[0];
    final = comd.replace("teach react ", "");
        if (command.length < 2) {
          return message.reply(
            "❌ | Invalid format! Use [teach] [YourMessage] - [Reply1], [Reply2], [Reply3]... OR [teach] [react] [YourMessage] - [react1], [react2], [react3]... OR remove [YourMessage] OR list OR edit [YourMessage] - [NewReply]");
        }
        const re = await axios.get(
          `${link}?teach=${final}&react=${command}`,
        );
        const tex = re.data.message;
    message.reply(`✅ Replies added ${tex}`);
      }
      //------------------------------------//
      else if (
        dipto.includes("amar name ki") ||
        dipto.includes("amr nam ki") ||
        dipto.includes("amar nam ki") ||
        dipto.includes("amr name ki")
      ) {
        const response = await axios.get(`${link}?text=amar name ki&senderID=${uid}`);
        const data = response.data.reply;
        message.reply(`${data}`);
      }
    //------------------------------------//
      else if (
        args[0].toLowerCase() === "find" ||
        args[0].toLowerCase() ==="-f"
      ) {
const d = dipto.replace(/^(?:-f|find) /, '');
        const response = await axios.get(
          `${link}?find=${d}`,
        );
        const data = response.data.result;
        const message = data.map(item => {
          return Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n');
        }).join('\n\n');
        message.reply(message);
      }
      //----------------------------------//
      else {
        const response = await axios.get(`${link}?text=${dipto}`);
        const data = response.data.reply;
      const info = await message.reply(data)
  global.functions.onReply.set(info.message_id, {
              commandName: 'baby',
              type: "reply",
              messageID: info.message_id,
              author: event.from.id,
              link: data,
            });
      }
    } catch (e) {
      console.log(e);
  message.reply("Check console for error ");
    }
  },
  onReply: async function ({ api, event,message }) {
   // if (event.type == "message_reply") {
      const reply = event.text.toLowerCase();
      if (isNaN(reply)) {
const response = await axios.get(`${global.functions.config.api}/baby?text=${encodeURIComponent(reply)}`,
        );
        const ok = response.data.reply;
       /* if (response.data.react) {
          api.setMessageReaction(
            response.data.react,
            event.messageID,
            (err) => {},
            true,
          );
        }*/
 const info = await message.reply(ok)
        
global.functions.onReply.set(info.message_id, {
              commandName: 'baby',
              type: "reply",
              messageID: info.message_id,
              author: event.from.id,
              link: ok,
            });
      }
   // }
  }
};