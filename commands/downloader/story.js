const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const instagramGetUrl = require("instagram-url-direct");
const download = require("download");

module.exports = {
  name: "story",
  aliases: ["st"],
  groupeOnly: false,
  adminOnly: false,
  test: true,
  description: "Instagram videos and stories downloader",
  usage: "[URL]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */

  run: async (client, message, args) => {
    if (!args.join(" ")) {
      await message.reply(
        "Please Write A Username 👤\nFor Example : /story [username] "
      );
      return;
    }
    const url = `https://www.instagram.com/stories/${encodeURI(
      args.join(" ").trim()
    )}`;
    if (!url) {
      await message.react("❌");
      await message.reply(
        "Please Write A Username 👤\nFor Example : /story [username]  "
      );
      return;
    }
    await message.reply("Please Wait ...");
    await message.react("⏱️");
    const links = (await instagramGetUrl(url)).url_list;
    const file = await import("file-type");
    if (!links.length) {
      await message.react("❌");
      await message.reply(
        "Can't find User \nPlease check username or the Account is Private 🔒"
      );
      return;
    }
    for (const link of links) {
      const buffer = await download(link, { encoding: "base64" });
      const { mime } = await file.fileTypeFromBuffer(
        Buffer.from(buffer, "base64")
      );
      let media = new MessageMedia(mime, buffer);
      await message.reply(media);
      await message.react("✅");
    }
  },
};
