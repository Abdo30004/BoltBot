const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "ping",
  aliases: ["latency", "alive"],
  description: "Bolt Bot ping",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    await message.react("⚡");
    await message.reply("pong");
  },
};
