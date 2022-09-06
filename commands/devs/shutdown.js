const { Message, Client } = require("whatsapp-web.js");
const wait = require("util").promisify(setTimeout);
module.exports = {
  name: "shutdown",
  aliases: ["exit", "stop", "kill"],
  groupeOnly: false,
  adminOnly: false,
  description: "shutdown the bot",
  usage: "",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    await message.reply("*Bolt Bot* ⚡ Stoped 🔴");
    await wait(1000);
    process.exit(1);
  },
};
