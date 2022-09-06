const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "lock",
  aliases: ["close", "غلق", "قفل"],
  description: "lock Group chat",
  groupeOnly: true,
  adminOnly: true,
  adminPerm: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const chat = await message.getChat();
    await chat.setMessagesAdminsOnly(true);
    await message.reply("Chat locked 🔒");
    await message.react("🔒");
  },
};
