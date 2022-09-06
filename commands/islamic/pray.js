const { Message, Client,Location } = require("whatsapp-web.js");
const axios = require("axios");

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
module.exports = {
  name: "pray",
  aliases: ["مواقيت","صلاة","صلوات","مواقيت الصلاة"],
  groupeOnly: false,
  adminOnly: false,
  description: "know the prayer times",
  usage: "[city name]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const city = encodeURI(args.join(" "));
    if (!city) {
      await message.react("❌");
      await message.reply("Please Send City Name\nFor Example /pray مكة");
      return;
    }
    try {
      var { data } = await axios.get(
        `https://muslimsalat.com/${city}/daily.json?key=4cac3d04afdb6b23b8306e00d370bdd3`
      );
    } catch (error) {
      await message.react("❌");
      await message.reply("I can't find this city");
      return;
    }
    if(data.title == null){
        await message.react("❌");

        await message.reply("I can't find this city");
        return;
    }
    const  timings  = data?.items?.[0];
    
    const string = `*Prayers Time 🕋*\n\n*Fajr:* ${timings.fajr}\n\n*Sunrise:* ${timings.shurooq}\n\n*Dhuhr:* ${timings.dhuhr}\n\n*Asr:* ${timings.asr}\n\n*Maghrib:* ${timings.maghrib}\n\n*Isha:* ${timings.isha}`;
 
    await message.reply(string);
    await message.react("🕌");
  },
};
