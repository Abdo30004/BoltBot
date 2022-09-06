const { Message, Client } = require("whatsapp-web.js");
const { support } = require("../../config.js");
module.exports = {
  name: "kickall",
  aliases: ["removeall"],
  groupeOnly: true,
  adminOnly: true,
  adminPerm: true,
  description:
    "Kick All Group Members *(only group owner can do this command)*",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const chat = await message.getChat();
    let author = await message.getContact();
    let isOwner = author.id.user === chat.owner.user;
    let amAdmin = chat.participants.find(
      (c) => c.id.user === client.info.wid.user
    ).isAdmin;
    if (!isOwner) {
      await message.reply("You are not the group owner ❌");
      await message.react("❌");
      return;
    }
    if (chat.id._serialized === support) {
      await message.reply("You can't Kick All Members in Support Group ❌");
      await message.react("❌");
      return;
    }
    const removeds = chat.participants
      .filter((p) => p.id.user !== client.info.wid.user)
      .map((p) => p.id._serialized);
    await chat.removeParticipants(removeds);
  },
};
