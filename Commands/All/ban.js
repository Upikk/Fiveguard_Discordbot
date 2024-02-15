const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a Player")
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription("Enter the Player's ID to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Enter the ban reason")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("log")
        .setDescription("Send ban to logs?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { PERMISSIONS } = require("../../config.json");
    const roles = PERMISSIONS.BAN;
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
    const id = interaction.options.getNumber("id");
    const reason = interaction.options.getString("reason");
    const logs = interaction.options.getBoolean("log");
    if (!GetPlayerName(id))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setDescription("**Invalid ID provided!**"),
        ],
      });

    client.fg.fg_BanPlayer(id, reason, logs);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setTimestamp()
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.avatarURL(),
          })
          .setDescription("**Player has been banned!**"),
      ],
    });
  },
};
