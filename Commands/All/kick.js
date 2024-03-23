const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription(LANGUAGE.KICK.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription(LANGUAGE.KICK.OPTIONS.ID.DESCRIPTION)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(LANGUAGE.KICK.OPTIONS.REASON.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.KICK;
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
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Green")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.avatarURL(),
          })
          .setTimestamp()
          .setDescription(`**Kicked ${GetPlayerName(id)} for ${reason}**`),
      ],
    });
    DropPlayer(
      id,
      `You have been kicked by ${interaction.user.tag} for ${reason}`
    );
  },
};
