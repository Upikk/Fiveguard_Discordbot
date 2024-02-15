const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const root = GetResourcePath(GetCurrentResourceName());

if (!fs.existsSync(`${root}/node_modules`)) {
  const fs = require("fs");
  const { exec } = require("child_process");
  const tarFilePath = `${root}/modules.tar`;
  const extractDir = `${root}/`;
  if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir);
  }
  exec(
    `tar -xf "${tarFilePath}" -C "${extractDir}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error extracting tar file: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(
        `Successfully installed Modules to ${extractDir}\n\n⚠ Restart the Script! ⚠`
      );
    }
  );
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
    intents: [1],
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
