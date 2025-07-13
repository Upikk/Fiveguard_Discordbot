const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

const identifierPrefixes = ["license:", "steam:", "ip:", "discord:"];

function ValidateIdentifier(identifier) {
  return identifierPrefixes.some((prefix) => identifier.startsWith(prefix));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banoffline")
    .setDescription(LANGUAGE.BANOFFLINE.DESCRIPTION)
    .addStringOption((option) =>
      option
        .setName("identifier")
        .setDescription(LANGUAGE.BANOFFLINE.OPTIONS.IDENTIFIER.DESCRIPTION)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(LANGUAGE.BANOFFLINE.OPTIONS.REASON.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.BANOFFLINE;
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
    const identifier = interaction.options.getString("identifier");
    if (!ValidateIdentifier(identifier))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setDescription(LANGUAGE.INVALID_IDENTIFIER_INFO),
        ],
      });
    const reason = interaction.options.getString("reason");

    ExecuteCommand(`fg offlineban ${identifier} ${reason}`);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setTimestamp()
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.avatarURL(),
          })
          .setDescription(LANGUAGE.BANOFFLINE.SUCCESS_MESSAGE),
      ],
    });
  },
};
