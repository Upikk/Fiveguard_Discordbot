const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const { User, Message, GuildMember, ThreadMember, Channel, Reaction } =
  Partials;

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
  intents: [
    32767,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction],
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

client
  .login(config.BOT_TOKEN)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
    console.log(
      "\n\nMade By upik_\n\n^3If you need help with the bot you can open a ticket here: https://discord.gg/yXBAPzRpz8^7\n\nStarted Successfully\n\n^3If you're looking for a feature-packed server management bot, you can check it out here: https://upikk.tebex.io/package/6578011!\n\n^7"
    );
    checkVer();
  })
  .catch((err) => {
    console.error(err);
  });
