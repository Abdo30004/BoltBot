const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { Collection } = require("@discordjs/collection");
const message = require("./events/message_create/message");
const config=require("./config.js")
const client = new Client({
  authStrategy: new LocalAuth(),

  puppeteer: {
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox"],
  },
  
});
client.config=config
client.commands = new Collection();
String.prototype.title = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLocaleLowerCase();
  });
};
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
})


try {
  let events = fs.readdirSync("./events/");
  for (const event of events) {
    let eventname = event.split(".")[0];
    let files = fs
      .readdirSync(`./events/${event}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of files) {
      let eventfile = require(`./events/${event}/${file}`);
      try {
        client.on(eventname, eventfile.bind(null, client));
      } catch (err) {
        throw Error(`err ${err}`);
        continue;
      }
    }
  }
} catch (err) {
  throw Error(`
  Message:${err.message}
----------------------------------------------------------
  Stack:${err.stack}  
  `);
}

try {
  let categories = fs.readdirSync("./commands/");
  for (const category of categories) {
    let files = fs
      .readdirSync(`./commands/${category}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of files) {
      const command = require(`./commands/${category}/${file}`);
      if (command.name) {
        client.commands.set(command.name, Object.assign(command, { category }));
      } else {
        continue;
      }
    }
  }
} catch (err) {
  throw Error(`
  Message:${err.message}
----------------------------------------------------------
  Stack:${err.stack}  
  `);
}
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();
