module.exports = {
  config: {
    name: "eval",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 2,
    description: {
      en: "Test your code from bot and quickly",
    },
    commandCategory: "owner",
    guide: {
      en: "{pn} <code to test>",
    },
  },
  run: async ({ api, event,bot, msg, args, message ,usersData, threadsData ,Users, Threads }) => {
    function out(result) {
      if (typeof result === "number" || typeof result === "boolean" || typeof result === "function") {
        result = result.toString();
      } else if (result instanceof Map) {
        let text = `Map(${result.size}) `;
        text += JSON.stringify(mapToObj(result), null, 2);
        result = text;
      } else if (typeof result === "object") {
      result = JSON.stringify(result, null, 2);
      } else if (typeof result === "undefined") {
        result = "undefined";
      }

      message.reply(result);
    }

    function mapToObj(map) {
      const obj = {};
      map.forEach((v, k) => {
        obj[k] = v;
      });
      return obj;
    }

    const code = `
      (async () => {
        try {
          ${args.join(" ")}
        } catch (err) {
          console.error("Eval command error:", err);
          message.reply(\`Error:\\n\${err.stack || err.message}\`);
        }
      })();
    `;

    try {
      eval(code);
    } catch (err) {
      await message.err(err);
    }
  },
};
