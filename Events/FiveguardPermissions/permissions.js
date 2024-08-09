const config = require("../../config.json");

module.exports = {
  name: "ready",
  async execute(client) {
    if (config.IN_GAME_PERMISSIONS.ENABLED) {
      const res = GetCurrentResourceName();

      const event =
        (config.IN_GAME_PERMISSIONS.FRAMEWORK == "ESX" && "esx:playerLoaded") ||
        (config.IN_GAME_PERMISSIONS.FRAMEWORK == "QB" &&
          "QBCore:Server:OnPlayerLoaded");

      const g = await client.guilds.cache.get(
        config.IN_GAME_PERMISSIONS.GUILD_ID
      );

      ExecuteCommand("add_ace group.PermissionsBypass command allow");

      ExecuteCommand(`add_principal resource.${res} group.PermissionsBypass`);

      Object.keys(config.IN_GAME_PERMISSIONS.PERMISSIONS).some((roleId) => {
        const AllPermissions = config.IN_GAME_PERMISSIONS.PERMISSIONS[roleId];
        if (!g.roles.cache.has(roleId)) return;
        AllPermissions.forEach((permission) => {
          ExecuteCommand(
            `add_ace group.DiscordBot${roleId} ${permission} allow`
          );
        });
      });

      on(event, async (source) => {
        const discord = GetPlayerIdentifierByType(source, "discord");
        if (!discord)
          return console.error(
            `Player: ${source} Doesn't Have Discord Identifier!`
          );
        const d = discord.replace("discord:", "");
        if (!g) return console.error("You put Wrong Guild ID in config.json!");
        const member = await g.members.cache.get(d);
        const memberRoles = member.roles.cache.map((role) => role.id);
        if (memberRoles.includes(roleId)) {
          if (config.IN_GAME_PERMISSIONS.SHOW_LOADED_INFO)
            print(
              `^3Permissions granted to player: ${GetPlayerName(
                source
              )} (${source})^0`
            );
          ExecuteCommand(
            `add_principal identifier.${GetPlayerIdentifier(
              playerId,
              0
            )} group.DiscordBot${roleId}`
          );
        }
      });
    }
  },
};
