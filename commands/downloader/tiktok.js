const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const download = require("download");

module.exports = {
  name: "tiktok",
  aliases: ["download", "tik", "تيك", "tk"],
  description: "Tiktok videos and sounds downloader",
  usage: "[URL]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const url = encodeURI(args.join(" "));
    if (!url) {
      await message.react("❌");
      await message.reply(
        "Please Type a tiktok video URL 🔗\nFor Example /tiktok [link] "
      );
      return;
    }
    const { data } = await axios.get(
      `https://api-v1.majhcc.com/api/tk?url=${url}`
    );
    if (!data.success) {
      await message.react("❌");
      await message.reply("Invalid Link ❌");
      return;
    }
    await message.react("⌛");
    await message.reply("Please wait..⌛");
    const buffer = await download(data.link, { encoding: "base64" });
    const media = new MessageMedia("video/mp4", buffer, "video.mp4");
    try {
      await message.reply(media, null);
      await message.react("✅");
    } catch {
      try {
        await message.reply(media, null, { sendMediaAsDocument: true });
        await message.react("✅");
      } catch {
        await message.reply(
          "Error while Sending The Video 🔴\nPlease Try Again Later ⏱️"
        );
        await message.react("❌");
      }
    }
  },
};
