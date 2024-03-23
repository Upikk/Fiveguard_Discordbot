const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription(LANGUAGE.BAN.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription(LANGUAGE.BAN.OPTIONS.ID.DESCRIPTION)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(LANGUAGE.BAN.OPTIONS.REASON.DESCRIPTION)
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("log")
        .setDescription(LANGUAGE.BAN.OPTIONS.LOG.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.BAN;
    const memberRoles = interaction.member.roles.cache.map((role) => role.id);

    if (!roles.some((roleId) => memberRoles.includes(roleId))) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setDescription(LANGUAGE.NO_PERMISSION_INFO),
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
            .setDescription(LANGUAGE.INVALID_ID_INFO),
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
          .setDescription(LANGUAGE.BAN.SUCCESS_MESSAGE),
      ],
    });
  },
};
