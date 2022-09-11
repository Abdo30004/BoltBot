//template file
const { Message, Client } = require("whatsapp-web.js");
const os = require("os");
const process=require("process")
const pms = require("pretty-ms");

module.exports = {
  name: "stats",
  aliases: ["status"],
  groupeOnly: false,
  adminOnly: false,
  description: "bot stats",
  usage: "",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const chats = await client.getChats();
    const groups = chats.filter((c) => c.isGroup).length;
    const users = chats.filter((c) => !c.isGroup).length;
    const blocked = (await client.getBlockedContacts()).length;
    const RdpUptime = pms(os.uptime()*1000, { verbose: true });
    const uptime=pms(Math.floor(process.uptime())*1000, { verbose: true });
    const string = `*BoltBot Stats:*\n\n*RDP Uptime:* ${RdpUptime}\n\n*Bot Uptime:* ${uptime}\n\n*Groups:* ${groups}\n\n*Users:* ${users}\n\n*Blocked:* ${blocked}`;
    await message.reply(string);
  },
};
