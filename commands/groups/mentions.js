const { Message, Client } = require("whatsapp-web.js");

module.exports = {
  name: "mention",
  aliases: ["m", "everyone", "منشن"],
  groupeOnly: true,
  description: "Mention Everyone",
  adminOnly: false,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   * @returns
   */
  run: async (client, message, args) => {
    const chat = await message.getChat();
    let text = "";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);

      mentions.push(contact);
      text += `${!text ? "" : "\n"}-@${participant.id.user}`;
    }
    await message.react("📧");
    await chat.sendMessage(text, { mentions });
  },
};
