const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");

module.exports = {
  name: "anime",
  aliases: [],
  description: "Searching for anime",
  usage: "[Anime Name]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const search = args.join(" ");
    if (!search)
      return message.reply(
        "Type anime name\nFor Example /anime attack on titan"
      );
    const { data } = await axios.get(
      `http://127.0.0.1:5000/search/anime?query=${encodeURI(search)}`
    );
    if (data.status === "error") {
      await message.react("❌");
      await message.reply(
        "I can't Find This Anime 🎬\nRetype It In Correct Way"
      );
      return;
    }
    let poster;
    try {
      poster = await MessageMedia.fromUrl(data.data.cover_image, {
        unsafeMime: true,
        filename: "poster",
      });
    } catch {
      poster = await MessageMedia.fromFilePath(
        `C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\Images\\not-found.png`
      );
    }
    const info = `*${data.data.name_english}*\n\n*Date:* ${
      data.data.starting_time
    }\n\n*Season:* ${data.data.season}\n\n*Episodes Count:* ${
      data.data.airing_episodes
    }\n\n*Categories:* ${data.data.genres.join("/")}\n\n*Description:* ${
      data.data.desc
    }`;
    {
      await message.react("🎬");
      await message.reply(info, null, { media: poster, unsafeMime: true });
    }
  },
};
