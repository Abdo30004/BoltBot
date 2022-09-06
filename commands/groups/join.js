const { Message, Client } = require("whatsapp-web.js");
const linkRegex =
  /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/;
const codeRegex = /(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?/;

module.exports = {
  name: "join",
  aliases: ["invite"],
  description: "Add *Bolt Bot* ⚡ to a Group",
  usage: "[Invite URL]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const link = args.join("") || "";

    const isValid = linkRegex.test(link);
    if (!isValid) {
      await message.react("❌");
      await message.reply("Invalid Link");
      return;
    }

    const code = link.replace(codeRegex, "");
    try {
      await message.react("⌛");
      await client.acceptInvite(code);
      await message.react("✅");
      await message.reply(" *Bolt Bot* ⚡ Joined");
    } catch {
      await message.react("❌");
      await message.reply(
        "Error While Trying To Join Group \n\nGroup Admin Not Allowed Me To Join\nOr There Are No Place For Me 🥲 "
      );
    }
  },
};
