const { Message, Client,MessageMedia } = require("whatsapp-web.js");

const Image=require("../../functions.js");

const fs=require("fs");

module.exports = {
  name: "greyscale",
  aliases: ["gs","grayscale","blackwhite"],
  groupeOnly: false,
  adminOnly: false,
  description: "apply greyscale filter to image",
  usage: "[Image]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {


    const media=await message.downloadMedia()
    if(!media){ 
      message.reply("I Can't Find *PIC* 🤔 \nPlease Send Media With Caption */greyscale*")
      return
       
    }
    let isImage=media.mimetype.toLowerCase().startsWith("image")
    if(!isImage){

      message.reply("I don't support this type of media")
      return
    }
    const data=Buffer.from(media.data,"base64");
    const grayscaled=await (new Image(data)).greyscale();
        
    //const file = await import("file-type");
    //const { mime } = await file.fileTypeFromBuffer(Buffer.from(blured, "base64"));
    let photo = new MessageMedia("image/png", grayscaled.toString("base64"));
    await message.react("✅");
    await message.reply(photo);


  },
};
