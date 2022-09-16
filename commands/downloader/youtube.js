const { Message, Client, MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const download = require("download");
const fs =require('fs')

module.exports = {
  name: "youtube",
  aliases: ["yt"],
  groupeOnly: false,
  adminOnly: false,
  description: "youtube downloader",
  usage: "[link] (type)",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const url = encodeURI(args[0]);
    const type = args[1];
    const types = ["mp3", "mp4","audio","video"];
    if (!url) {
      await message.react("❌");
      await message.reply(
        "Please Type a youtube video URL 🔗\nFor Example /youtube [link] "
      );
      return;
    } else if(!types.includes(type)){
        await message.react("❌");
        await message.reply(
          `Please insert a corect file type mp4/mp3 🔗\nFor Example /youtube [link] (type)`
        );
        return;

    }
    isAudio=type=="mp3"||type=="audio"
    const { data } = await axios.get(
      `http://127.0.0.1:5000/youtube/video?url=${url}&type=${isAudio?"audio":"video"}`
    );
    if (data.status !== "success") {
      await message.reply("Error: " + data.message);
      return;
    } else if (data.info.duration > 7300) {
      await message.react("❌");
      await message.reply("Video is too long");
      return;
    }
    
    else if (data.info.sizes[isAudio?"audio":"video"] > 75) {
      await message.react("❌");
        await message.reply("Can't send video more than 100MB (WhatsApp limitation)");
        return;
    }
    await message.react("⌛");
    await message.reply("Please wait..⌛");
    try {

    const buffer = await download(data.download, { encoding: "base64" });
    const media = new MessageMedia(isAudio?"audio/mpeg":"video/mp4", buffer.toString("base64"), `${data.info.title.toString("utf-8")}-${type}.${isAudio?"mp4":"mp3"}`);
    await client.sendMessage(message.from, media,{sendMediaAsDocument:isAudio||data.info.sizes["video"]>15?true:false});
    await message.react("✅");
} catch(e) {
    console.log(e)

    message.reply(
      "Error while Sending The Video 🔴\nPlease Try Again Later ⏱️"
    );
  }
  },
};
