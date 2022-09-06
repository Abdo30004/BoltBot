const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const similar=require("string-similarity");
module.exports = {
  name: "quran",
  aliases: ["قرآن", "قران","سورة"],
  groupeOnly: false,
  adminOnly: false,
  description: "download surah from quran",
  usage: "(name surah in arabic)",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    
    const suras_names = fs.readdirSync("C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\quran").map(n=>n.split(".")[0]);
    const name = args.join(" ").replace("ال ","آل ");
    if(!name) return message.reply("Please enter a surah name\nFor Example /quran الفاتحة");

    const similar_match=similar.findBestMatch(name,suras_names).bestMatch;
    if(similar_match.rating<1) {
      return message.reply(`Did you mean /quran ${similar_match.target}`);
    }

    const path = `C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\quran\\${name}.mp3`;
    try {
      await message.react("⏱️");
      await message.reply("جاري التحميل..");
      const media = MessageMedia.fromFilePath(path);

      await message.reply(media, null, { sendMediaAsDocument: true });
    } catch (e) {
      await messabe.react("❌");
      await message.reply("surah Not Found");
      return;
    }
  },
};
