//template file
const { Message, Client } = require("whatsapp-web.js");
const lyricsFinder=require("songlyrics")
module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  groupeOnly: false,
  adminOnly: false,
  description: "find lyrics of a song",
  usage: "[song name]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const song = args.join(" ");
    if(!song) {
        await message.react("❌")
        await message.reply("Please provide a song name")
        return
    }
    try{
        const lyrics = await lyricsFinder.default(song);
const sring=`*Title:* ${lyrics.title}\n\n*Lyrics:*\n${lyrics.lyrics}`
    } catch{
        await message.react("❌")
        await message.reply("No lyrics found")
        return
    }
    
  },

};
