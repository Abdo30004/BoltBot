const chalk = require("chalk");
const { Message, Client } = require("whatsapp-web.js");
const { prefix, devs } = require("../../config.js");
const similar = require("string-similarity");
const moment = require("moment-timezone");
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */
module.exports = async (client, message) => {
  if (message.body.indexOf(prefix) !== 0) return;
  const args = message.body.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find(
      (c) => c.aliases && !c.aliases.includes("") && c.aliases.includes(cmd)
    );
  const commands = client.commands.filter((c) => c.category !== "devs");
  const names = commands
    .map((c) => c.name)
    .concat(commands.map((c) => c.aliases).flat());
  const { target, rating } = similar.findBestMatch(cmd, names).bestMatch;

  if (!command && rating >= 0.4) {
    await message.reply(
      `
        Command Not Found
       \nDid you mean *${prefix}${target}* ?`
    );
    return;
  }

  if (!command) return;
  const author = await message.getContact();
  const blockeds=(await client.getBlockedContacts()).map(c=>c.id._serialized);
  if(blockeds.includes(author.id._serialized)) return;
  const chat = await message.getChat();
  if (command.category == "devs" && !devs.includes(author.id._serialized)) {
    return;
  }
  if (command.groupeOnly && !chat.isGroup) {
    await message.reply("This is a group command 💬");
    await message.react("💬");
    return;
  }
  if (chat.isGroup) {
    let amAdmin = chat.participants.find(
      (c) => c.id.user === client.info.wid.user
    ).isAdmin;
    let isAdmin = chat.participants.find(
      (c) => c.id.user === author.id.user
    ).isAdmin;

    if (command.adminOnly && !isAdmin) {
      await message.reply("You Are not Admin ❌");
      await message.react("❌");
      return;
    }
    if (command.adminPerm && !amAdmin) {
      await message.react("🛡️");
      await message.reply("I don't have admin permission ❌");
      return;
    }
  }
  console.log(
    `${chalk.green.underline.bold("WhatsApp:")} ${chalk.red.bold(
      author.pushname
    )} used ${chalk.greenBright.bold(message.body)} in ${chalk.blue.bold(
      chat.name
    )}/${chalk.bold(chat.isGroup ? "Groupe" : "DM")} (${chalk.cyanBright.bold(chat.id._serialized)}) at ${chalk.yellow.bold(moment(new Date()).format("MM-DD-YYYY LTS"))}`
  );
  try {
    await command?.run(client, message, args);
  } catch (e) {
    console.log(`Error:\n${e}\nStack:\n${e.stack}`);
  }
};
