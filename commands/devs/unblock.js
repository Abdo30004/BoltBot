const { Message, Client } = require("whatsapp-web.js");
const { devs } = require("../../config.js");
module.exports = {
  name: "unblock",
  aliases: ["unblk"],
  groupeOnly: false,
  adminOnly: false,
  description: "unblock users",
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
        "Please Mention @Someone to unlock\nFor Example /unblock @ali"
      );
      return;
    }
    for (const mention of mentions) {
      try {
        await mention.unblock();
      } catch (e) {
        continue;
      }
    }
    const string = mentions.map((c) => c.pushname).join(", ");
    await message.reply(`${string} unblocked`);
  },
};
