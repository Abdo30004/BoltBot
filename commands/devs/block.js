const { Message, Client } = require("whatsapp-web.js");
const { devs } = require("../../config.js");
module.exports = {
  name: "block",
  aliases: ["blk"],
  groupeOnly: false,
  adminOnly: false,
  description: "block users",
  usage: "",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    let mentions = (await message.getMentions()).filter(
      (c) => !devs.includes(c.id._serialized)
    );
    if (!mentions.length) {
      await message.reply(
        "Please Mention @Someone to block\nFor Example /block @ali"
      );
      return;
    }
    for (const mention of mentions) {
      try {
        await mention.block();
      } catch (e) {
        continue;
      }
    }
    const string = mentions.map((c) => c.pushname).join(", ");
    await message.reply(`${string} blocked`);
  },
};
