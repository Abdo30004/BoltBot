const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "sticker",
  aliases: ["stickers"],
  description: "Transform videos/pictures to a WhatsApp sticker",
  usage: "(Sticker package Name)",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    if (!message.hasMedia)
      return message.reply(
        "I Can't Find *PIC/VID* 🤔 \nPlease Send Media With Caption */sticker*"
      );
    const media = await message.downloadMedia();


      await message.react("⏱️");
      await message.reply(media, null, {
        sendMediaAsSticker: true,
        stickerAuthor: "By Bolt Bot ⚡",
        stickerName: args[0] || "Sticker",
      });
      await message.react("✅");

  },
};
