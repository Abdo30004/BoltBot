const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "kick",
  aliases: ["remove", "delete", "طرد"],
  groupeOnly: true,
  adminOnly: true,
  adminPerm: true,
  description: "Kick Someone in The Group",
  usage: "[Mention Member]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const chat = await message.getChat();
    let mentions = await message.getMentions();

    if (!mentions.length) {
      await message.reply(
        "Please Mention @Someone to kick\nFor Example /kick @ali"
      );
      return;
    }
    let removeds = mentions
      .map((c) => {
        return chat.participants.find((p) => p.id.user === c.id.user);
      })
      .map((r) => r.id._serialized);
    if (removeds.length === 1 && removeds.includes(chat.owner._serialized)) {
      await message.reply("You can't Kick groupe owner ❌");
      await message.react("❌");
      return;
    }
    await chat.removeParticipants(removeds);
    await message.reply("Kicked ✅");
    await message.react("✅");
  },
};
