const chalk = require("chalk");
const { Message, Client } = require("whatsapp-web.js");
const { test } = require("../../config.js");

/**
 *
 * @param {Client} client
 * @returns
 */
module.exports = async (client) => {
  console.log("Bolt Bot is ready to support !!");
  client.sendMessage(test, "*Bolt Bot* ⚡ Started 🟢");
};
