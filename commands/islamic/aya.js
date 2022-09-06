const { Message, Client } = require("whatsapp-web.js");
const axios = require("axios");

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
module.exports = {
  name: "ayah",
  aliases: ["ayat", "aya", "اية", "ايات", "آية", "آيات", "أية", "أيات"],
  groupeOnly: false,
  adminOnly: false,
  description: "to search from quran",
  usage: "[part of ayah]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const ayah = encodeURI(args.join(" "));
    if (!ayah) {
      await message.react("❌");
      await message.reply("Please Send surah Name");
      return;
    }
    try {
      var { data } = await axios.get(
        `https://api.alquran.cloud/v1/search/${ayah}`
      );
    } catch (error) {
      await message.react("❌");
      await message.reply("I can't find this ayah");
      return;
    }
    const matches =
      data?.data?.matches?.filter(
        (m) =>
          m.edition.type === "quran" &&
          m.edition.name !== "Corpus" &&
          m.edition.identifier === "quran-simple-clean"
      ) || [];
    if (matches.length == 0) {
      await message.react("❌");
      await message.reply(
        "I can't find this ayah be carefull with the spelling cause إله is not the same as اله"
      );
      return;
    }

    let string = ``;
    for (const match of matches) {
      string += `*${match.surah.name} الآية ${match.numberInSurah} :* ${match.text}\n\n`;
    }
    await message.reply("*Quran Search 📖...*");
    await message.reply(string);
  },
};
