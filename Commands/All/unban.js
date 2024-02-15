const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a Player")
    .addNumberOption((option) =>
      option
        .setName("banid")
        .setDescription("Enter the Player's BanID to unban")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { PERMISSIONS } = require("../../config.json");
    const roles = PERMISSIONS.UNBAN;
    const memberRoles = interaction.member.roles.cache.map((role) => role.id);

    if (!roles.some((roleId) => memberRoles.includes(roleId))) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setDescription("You don't have permissions to use this Command"),
        ],
      });
    }
    const id = interaction.options.getNumber("banid");
    const result = client.fg.UnbanId(id);
    if (result) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setDescription(`**Player \`${result.name}\` has been unbanned!**`),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setColor("Red")
            .setTimestamp()
            .setDescription("**Player is not Banned!**"),
        ],
      });
    }
  },
};
