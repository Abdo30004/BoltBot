const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "unlock",
  aliases: ["فك", "فتح", "open"],
  description: "Unlock Group chat",
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
    await chat.setMessagesAdminsOnly(false);
    await message.reply("Chat unlocked 🔓");
    await message.react("🔓");
  },
};
