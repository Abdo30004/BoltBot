//template file
const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const fs = require("fs");
axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};
module.exports = {
  name: "tts",
  aliases: ["text-to-speech", "speak", "talk"],
  groupeOnly: false,
  adminOnly: false,
  description: "text to speech support (ar, en, fr, de, it, es, pt, ru,tr)",
  usage: "[text]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text) {
      await message.react("❌");
      await message.reply("Please Send Text");
      return;
    }
    if (text.length > 1020) {
      await message.react("❌");
      await message.reply("Please Send Text Less Than 1000 Characters");
      return;
    }
    /*
    try {
        var { data } = await axios.get(`http://127.0.0.1:5000/tts?text=${encodeURI(text)}`);
        }
        catch {
            await message.react("❌");
            await message.reply("Error");
            return;
            }
        */
    const link = `http://127.0.0.1:5000/tts?text=${encodeURI(text)}`;
    try {
      const media = await MessageMedia.fromUrl(link, {
        unsafeMime: true,
        filename: "tts.mp3",
      });
      await message.reply(media, null, { sendMediaAsDocument: true });
    } catch (e) {
      console.log(e);
      await message.react("❌");
      await message.reply("Error");
      return;
    }
  },
};
