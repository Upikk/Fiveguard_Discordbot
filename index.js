const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const root = GetResourcePath(GetCurrentResourceName());

if (!fs.existsSync(`${root}/node_modules`)) {
  console.log("You didn't put node_modules from https://github.com/Upikk/Fiveguard_Discordbot in the Fiveguard_Discordbot Script Destination!")
} else {
  const fg = exports[config.FIVEGUARD_RESOURCE_NAME];

  if (config.BOT_TOKEN == "") console.log("YOU'RE MISSING BOT TOKEN");
  if (config.FIVEGUARD_RESOURCE_NAME == "")
    console.log("YOU'RE MISSING FIVEGUARD RESOURCE NAME");
  if (!GetResourcePath(config.FIVEGUARD_RESOURCE_NAME))
    console.log("YOU PROVIDED WRONG FIVEGUARD RESOURCE NAME");

  if (config.PERMISSIONS_ROLE_ID == "")
    console.log("YOU'RE MISSING PERMISSION ROLE ID");
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
  
  const { loadEvents } = require(`${root}/Handlers/eventHandler`);
  const { loadCommands } = require(`${root}/Handlers/commandHandler`);

  client.fg = fg;
  client.commands = new Collection();
  client.events = new Collection();

  client
    .login(config.BOT_TOKEN)
    .then(() => {
      loadEvents(client);
      loadCommands(client);
      console.log(
        "\n\nMade By upik_\n\n^3If you want to purchase Custom Bot with functions like revive, kill etc dm me on discord: upik_^7\n\nStarted Successfully\n\n"
      );
    })
    .catch(() => {});
}
