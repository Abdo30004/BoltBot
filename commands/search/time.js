//template file
const { Message, Client } = require("whatsapp-web.js");
const axios = require("axios");
const moment = require("moment-timezone");
axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
module.exports = {
  name: "time",
  aliases: ["temp"],
  groupeOnly: false,
  adminOnly: false,
  description: "to get the time of a country",
  usage: "[country]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const country = args.join(" ");
    if (!country) {
      await message.react("❌");
      await message.reply("Please Send Country");
      return;
    }
    try {
      var { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
          country
        )}&appid=1dc1e6c1abe02c76f6741679a8879119&units=metric&lang=en`
      );
    } catch {
      await message.react("❌");
      await message.reply("Error");
      return;
    }
    const timezone = data.timezone / 3600;
    const time = moment(Date.now()).utcOffset(timezone).format("LT");
    const string = `*Country:* ${data.sys.country}\n\n*City:* ${
      data.name
    }\n\n*Time:* ${time}\n\n*Timezone:* ${moment()
      .utcOffset(timezone)
      .format("UTCZ")}`;
    await message.reply(string);
  },
};
