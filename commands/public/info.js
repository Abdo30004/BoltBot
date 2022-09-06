const { Message, Client } = require("whatsapp-web.js");
const {version}=require("../../package.json");
module.exports = {
  name: "info",
  aliases: ["bot", "terms", "about"],
  description: "Bot information",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const info = `
    ------------ *${client.info.pushname.title()}* ------------
      🛡️ Terms and Conditions 🛡️
- It is not allowed to post pictures that offend someone

- It is strictly forbidden to call this number

- It is forbidden to post videos that offend Islam or violate morals

—————————————————————
*Violation of these Terms will result in you being banned* ❌ 
-----------------------------------------------------------
         🛡️ شروط وأحكام 🛡️
- يمنع نشر صور تسيء بشخص ما 

- يمنع منعاً باتاً الإتصال بهذا الرقم 

- يمنع نشر فيديوهات تسيء للاسلام او تخل بالآداب

—————————————————————
*❌ مخالفتك لهذه الشروط تعرضك للباند*
-----------------------------------------------------------
*Bolt Bot Version:* ${version} ⚡

    `;
    await message.reply(info);
    await message.react("❗");
  },
};
