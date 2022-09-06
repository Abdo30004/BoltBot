const { Message, Client } = require("whatsapp-web.js");
const { support } = require("../../config.js");
const child = require("child_process");
const wait = require("util").promisify(setTimeout);

module.exports = {
  name: "restart",
  aliases: ["re"],
  groupeOnly: false,
  adminOnly: false,
  description: "restart the bot",
  usage: "",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    await client.sendMessage(support, "*Bolt Bot* ⚡ Restarting 🟠");
    await wait(1000);
    process.on("exit", () => {
      child.spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });

    process.exit();
  },
};
