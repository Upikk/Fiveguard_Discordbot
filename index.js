process.emitWarning = () => {};

const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const { User, Message, GuildMember, ThreadMember, Channel, Reaction } =
  Partials;

const config = require("./config.json");
const root = GetResourcePath(GetCurrentResourceName());

const fgName = config.FIVEGUARD_RESOURCE_NAME

if (config.BOT_TOKEN == "") console.log("YOU'RE MISSING BOT TOKEN");
if (fgName == "") console.log("YOU HAVE TO PROVIDE A FIVEGUARD RESOURCE NAME in the config.json FILE");

const fg = exports[fgName];

const client = new Client({
  intents: [
    32767,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction],
});

const { loadEvents } = require(`${root}/Handlers/eventHandler`);
const { loadCommands } = require(`${root}/Handlers/commandHandler`);

client.fg = fg;
client.commands = new Collection();
client.events = new Collection();
client.UserBanLists = new Map();
client.fiveguardName = fgName;

client
  .login(config.BOT_TOKEN)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
    console.log(
      "\n\nMade By upik_\n\n^3If you need help with the bot you can open a ticket here: https://discord.gg/yXBAPzRpz8^7\n\nStarted Successfully\n\n^3If you're looking for a feature-packed server management bot, you can check it out here: https://upikk.tebex.io/package/6578011!\n\n^7"
    );
  })
  .catch((err) => {
    console.error(err);
  });
