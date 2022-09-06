const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "help",
  aliases: ["commands", "اوامر", "هيلب", "مساعدة"],
  description: "commands help",
  usage: "(Command Name)",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const cmd = args.join(" ").toLowerCase();
    const command =
      client.commands.get(cmd) ||
      client.commands.find(
        (c) => c.aliases && !c.aliases.includes("") && c.aliases.includes(cmd)
      );
    if (command) {
      const string = `*Command:* /${command.name}\n\n*Description:* ${
        command.description || "No description"
      }\n\n*Category:* ${command.category}\n\n*Shortcuts:* ${
        command.aliases.map((a) => `\`\`\`${a}\`\`\``).join() || "No aliases"
      }\n\n*Usage:* /${command.name} ${
        command.usage || ""
      }\n\n[] for required, () for optional`;
      await message.reply(string);
      return;
    }

    const categories = [
      ...new Set(client.commands.map((c) => c.category)),
    ].filter((c) => c != "devs");
    const string = `${categories
      .map((category) => {
        const commands = client.commands
          .filter((c) => c.category == category)
          .map((c) => `\`\`\`/${c.name}\`\`\``);
        return `\n------------ *${category.title()}* ------------\n${commands.join(
          "\n"
        )}`;
      })
      .join(
        "\n"
      )}\n\n*Note:* You can use \`/help [command]\` to get info about a command\n\nBe the first to know about Bolt Bot news 📣: https://chat.whatsapp.com/GXOAsDgcSFvGsWfzdph62k`;
    await message.react("⚡");
    await message.reply(string);
  },
};
