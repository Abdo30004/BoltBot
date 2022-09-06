const chalk = require("chalk");
const { Call, Client } = require("whatsapp-web.js");
const { devs } = require("../../config.js");
const moment = require("moment-timezone");
/**
 *
 * @param {Client} client
 * @param {Call} call
 * @returns
 */
module.exports = async (client, call) => {

  if (call.isGroup) {
    return;
  }
  try {
    const caller = await client.getContactById(call.from);
    if (devs.includes(caller.id._serialized)) {
      return;
    }
    const chat = await caller.getChat();

    chat.sendMessage(
      `*Calling this number is not allowed, you has been blocked automatically if you didn't do it on purpose contact us :*\n\n*Devs:* ${devs
        .map((d) => d.split("@")[0])
        .join(
          ", "
        )}\n\n*Support Server Link:* https://chat.whatsapp.com/DPoaI7tS2WT3G1ZG5v2fJP`
    );
    const calltime = moment(new Date()).format("MM-DD-YYYY LTS");
    await caller.block();
    console.log(
      `Blocked ${chalk.red.bold(caller.pushname)} (${chalk.white.bold(caller.number)}) at ${chalk.green.bold(calltime)} for calling this number`
    );
  } catch (e) {
    console.log(e);
    return;
  }
};
