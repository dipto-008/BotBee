module.exports = {
  config: {
    name: "rules",
    version: "1.0",
    aliases: ["setrules"],
    author: "Dipto",
    countDown: 5,
    role: 0,
    description: "View, add, or remove group rules",
    commandCategory: "group",
    guide: `
      {pn} - Show the rules.
      {pn} add <rule> - Add a new rule.
      {pn} add <rule1> - <rule2> - Add multiple rules separated by a dash.
      {pn} remove <rule number> - Remove the rule by its number.
    `,
  },

  run: async ({ message, args, threadsData, event }) => {
    const threadID = event.chat.id;
    let threadData = await threadsData.get(threadID);

    // Initialize settings and rules if not present
    if (!threadData.settings) threadData.settings = {};
    if (!threadData.settings.rules) threadData.settings.rules = [];

    let rules = threadData.settings.rules;

    if (!args[0]) {
      if (rules.length === 0) {
        return await message.reply("👑 | This group has no rules.");
      }
      const rulesList = rules.map((rule, index) => `${index + 1}/ ${rule}`).join("\n");
      return await message.reply(`👑 | Rules of ${event.chat.title}:\n${rulesList}`);
    }

    const action = args[0].toLowerCase();

    if (action === "add") {
      const ruleText = args.slice(1).join(" ");
      if (!ruleText) {
        return await message.reply("Please provide a rule to add.");
      }
      
      // Split multiple rules if provided with '-'
      const newRules = ruleText.split(" - ").map((rule) => rule.trim());
      
      // Add the new rules to the existing rules array
      rules = [...rules, ...newRules];

      // Update the threadData settings with the new rules array
      try {
        await threadsData.set(threadID, { "settings.rules": rules });
      } catch (error) {
        return await message.reply("An error occurred while saving the rules.");
      }

      const addedRulesList = newRules.map((rule, index) => `${rules.length - newRules.length + index + 1}/ ${rule}`).join("\n");
      return await message.reply(`New rules added:\n${addedRulesList}`);
    }

    if (action === "remove") {
      const ruleNumber = parseInt(args[1], 10);
      if (isNaN(ruleNumber) || ruleNumber < 1 || ruleNumber > rules.length) {
        return await message.reply("Please provide a valid rule number to remove.");
      }

      const removedRule = rules.splice(ruleNumber - 1, 1); // Remove the rule by index

      // Update the database with the new rules array
      await threadsData.set(threadID, { "settings.rules": rules });

      return await message.reply(`Rule removed: ${ruleNumber}/ ${removedRule[0]}`);
    }
  },
};