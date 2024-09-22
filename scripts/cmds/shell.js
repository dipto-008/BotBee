const { exec } = require('child_process');

module.exports.config = {
    name: "shell",
    aliases: ["sh"],
    version: "1.0",
    credits: "Dipto",
    role: 3,
    hasPermission: 3,
    usePrefix: true,
    prefix: true,
    description: "Execute shell commands",
    commandCategory: "system",
    guide: "{prefix}shell <command>",
    coolDowns: 5,
    premium: false
};

module.exports.run = async ({ message, args, event }) => {
    
    //if (!admin.includes(event.from.id)) { 
      //  return message.reply("You do not have permission to execute shell commands.");
   // }

    if (!args.length) {
        return message.reply("Please provide a command to execute.");
    }
    const command = args.join(' ');

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return message.reply(`Error executing command: ${error.message}`);
        }
        if (stderr) {
            return message.reply(`Shell Error: ${stderr}`);
        }


 const output = stdout || "Command executed successfully with no output.";
        message.reply(`\`\`\`\n${output}\n\`\`\``);
    });
};