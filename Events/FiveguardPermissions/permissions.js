const config = require("../../config.json");

module.exports = {
  name: "ready",
  async execute(client) {
    if (config.USE_ROLES_PERMISSIONS) {
      const event =
        (config.FRAMEWORK == "ESX" && "esx:playerLoaded") ||
        (config.FRAMEWORK == "QB" && "QBCore:Server:OnPlayerLoaded");
      on(event, async (source) => {
        const discord = GetPlayerIdentifierByType(source, "discord");
        if (!discord)
          return console.error(
            `Player: ${source} Doesn't Have Discord Identifier!`
          );
        const d = discord.replace("discord:", "");
        if (config.GUILD_ID == "" && config.USE_ROLES_PERMISSIONS)
          return console.error("You didn't set your Guild ID in config.json!");
        const g = await client.guilds.cache.get(config.GUILD_ID);
        const member = await g.members.cache.get(d);
        const memberRoles = member.roles.cache.map((role) => role.id);
        Object.keys(config.IN_GAME_PERMISSIONS).some((roleId) => {
          if (memberRoles.includes(roleId)) {
            if (config.SHOW_LOADED_INFO)
              console.log(
                `Player ${member.user.username} loaded with Role ID: ${roleId} | ID: ${source}`
              );
            Object.keys(config.IN_GAME_PERMISSIONS[roleId]).forEach(
              (category) => {
                config.IN_GAME_PERMISSIONS[roleId][category].forEach(
                  (permission) => {
                    let res,
                      text = client.fg.SetTempPermission(
                        source,
                        category,
                        permission,
                        true,
                        true
                      );
                    if (!res && text)
                      console.error(
                        `Error while Setting Permission ${permission}: ${text}`
                      );
                  }
                );
              }
            );
          }
        });
      });
    }
  },
};
