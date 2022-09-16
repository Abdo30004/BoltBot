const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const ms = require("ms");
const pms = require("pretty-ms");
module.exports = {
  name: "movie",
  aliases: ["film", "series", "فلم", "مسلسل"],
  description: "Searching for Movies/Series",
  usage: "[Movie/Series Name]",
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
      return message.reply("Type movie name\nFor Example /movie toy story 3");
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=bbdc62e9&t=${encodeURI(search)}&plot=full`
    );
    if (data.Response === "False") {
      await message.react("❌");
      await message.reply(
        "I can't Find This Movie 🎬\nRetype It In Correct Way"
      );
      return;
    }
    let poster;
    try {
      poster = await MessageMedia.fromUrl(data.Poster, {
        unsafeMime: true,
        filename: "poster",
      });
    } catch {
      poster = await MessageMedia.fromFilePath(
        `C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\Images\\not-found.png`
      );
    }
    const Runtime =data.Runtime!="N/A"?ms(data.Runtime):ms("1 min");
    const info = `*${data.Title}*\n\n*Year:* ${data.Year}\n\n*Type:* ${
      data.Type
    }\n\n*${
      data.Type === "movie" ? "Movie" : "Episode"
    } Duration:* ${ pms(Runtime,{verbose:true})}\n\n*Categories:* ${data.Genre}\n\n*Story:* ${
      data.Plot
    }\n\n*IMDB:* ${data.imdbRating}/10`;
    {
      await message.react("🎬");
      await message.reply(info, null, { media: poster, unsafeMime: true });
    }
  },
};
