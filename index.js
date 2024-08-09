const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const root = GetResourcePath(GetCurrentResourceName());
const p = require("./version.json");
const v = p.version;

const fg = exports[config.FIVEGUARD_RESOURCE_NAME];

if (config.BOT_TOKEN == "") console.log("YOU'RE MISSING BOT TOKEN");
if (config.FIVEGUARD_RESOURCE_NAME == "")
  console.log("YOU'RE MISSING FIVEGUARD RESOURCE NAME");
if (!GetResourcePath(config.FIVEGUARD_RESOURCE_NAME))
  console.log("YOU PROVIDED WRONG FIVEGUARD RESOURCE NAME");

if (
  !fs.existsSync(
    `${GetResourcePath(
      config.FIVEGUARD_RESOURCE_NAME
    )}/ai_module_fg-obfuscated.lua`
  )
)
  console.log("PROVIDED RESOURCE NAME IS NOT A FIVEGUARD ANTICHEAT");

const client = new Client({
  intents: [259],
});

async function checkVer() {
  const https = require("https");
  const url =
    "https://raw.githubusercontent.com/Upikk/Fiveguard_Discordbot/master/version.json";
  https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const jsonData = JSON.parse(data);
      const version = jsonData.version;
      const changelog = jsonData.changelog;
      if (version !== v)
        return console.log(
          `^3New update is Available!\n\nLatest Version: ${version}\nYour Version: ${v}\n\nChangelog: ${changelog}\n\nIt's recommended to use Latest Version of the Bot^7`
        );
      console.log(`You're using latest version: ${version}!`);
    });
  });
}

const { loadEvents } = require(`${root}/Handlers/eventHandler`);
const { loadCommands } = require(`${root}/Handlers/commandHandler`);

client.fg = fg;
client.commands = new Collection();
client.events = new Collection();
client.UserBanLists = new Map();

setInterval(() => {
  global.RefreshBanlistCommands();
  global.RefreshBanlistEvents();
}, 1000 * 60 * 1);

client
  .login(config.BOT_TOKEN)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
    console.log(
      "\n\nMade By upik_\n\n^3If you'd like to buy custom bot (with commands that you want) you can dm me on discord: upik_^7\n\nStarted Successfully\n\n"
    );
    checkVer();
  })
  .catch((err) => {
    console.error(err);
  });
