const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const moment = require("moment-timezone");
axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
function to_km_per_h(speed) {
  const turned = speed * 3.6;
  return Math.round((turned + Number.EPSILON) * 100) / 100;
}
module.exports = {
  name: "weather",
  aliases: ["طقس", "wt"],
  groupeOnly: false,
  adminOnly: false,
  description: "weather in your city",
  usage: "[city]",
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
      await message.reply("Please Send City Name");
      return;
    }
    try {
      var { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1dc1e6c1abe02c76f6741679a8879119&units=metric&lang=en`
      );
    } catch (error) {
      await message.react("❌");
      await message.reply("I can't find this city");
      return;
    }
    const string = `*Country:* ${data.sys.country}\n\n*City:* ${
      data.name
    }\n\n*Temperature:* ${data.main.temp}°C\n\n*Description:* ${
      data.weather[0].description
    }\n\n*Wind:* ${to_km_per_h(data.wind.speed)} km/h\n\n*Humidity:* ${
      data.main.humidity
    }%\n\n*Pressure:* ${data.main.pressure} hPa\n\n*Sunrise:* ${moment(
      new Date(data.sys.sunrise * 1000)
    )
      .utcOffset(data.timezone / 3600)
      .format("LT")} (${moment(new Date(data.sys.sunrise * 1000))
      .utcOffset(data.timezone / 3600)
      .fromNow()})\n\n*Sunset:* ${moment(new Date(data.sys.sunset * 1000))
      .utcOffset(data.timezone / 3600)
      .format("LT")} (${moment(new Date(data.sys.sunset * 1000))
      .utcOffset(data.timezone / 3600)
      .fromNow()})\n\n*Timezone:* ${moment()
      .utcOffset(data.timezone / 3600)
      .format("UTC(G[M]T)Z")} hours\n\n*Geo Coordinates:* ${data.coord.lat}, ${
      data.coord.lon
    }`;
    const icon = data.weather[0].icon;
    //const media = await MessageMedia.fromUrl(icon, { unsafeMime: true });
    let media;
    const iconPath = `C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\Images\\weather\\${
      data.weather[0].description
    } ${icon.endsWith("d") ? "day" : "night"}.png`;
    const defaultIconPath = `C:\\Users\\tt4k\\Desktop\\BoltBot\\assets\\Images\\not-found.png`;
    try {
      media = MessageMedia.fromFilePath(iconPath, { unsafeMime: true });
    } catch (error) {
      media = MessageMedia.fromFilePath(defaultIconPath, { unsafeMime: true });
    }
    await message.reply(string, null, { media, unsafeMime: true });
    await message.react("✅");
  },
};
