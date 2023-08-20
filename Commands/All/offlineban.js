const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("offlineban")
    .setDescription("Ban player that is Offline")
    .addNumberOption((option) =>
      option
        .setName("old_id")
        .setDescription("Enter the Player's Old ID")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Enter the Ban Reason")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { PERMISSIONS_ROLE_ID } = require("../../config.json");
    if (!interaction.member.roles.cache.has(PERMISSIONS_ROLE_ID)) //Add security check
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setDescription("You don't have permissions to use this Command!"),
        ],
      });
    const id = interaction.options.getNumber("old_id");
    const reason = interaction.options.getString("reason");
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.avatarURL(),
          })
          .setTimestamp()
          .setDescription(`**Banned player with Old ID ${id} for ${reason}**`),
      ],
    });
    ExecuteCommand(`fg offlineban ${id} ${reason}`);
  },
};
