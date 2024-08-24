const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("revive")
    .setDescription(LANGUAGE.REVIVE.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription(LANGUAGE.REVIVE.OPTIONS.ID.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.REVIVE;
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
    if (GetPlayerName(id)) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setDescription(
              LANGUAGE.REVIVE.SUCCESS_MESSAGE.replace(
                "{name}",
                GetPlayerName(id)
              )
            ),
        ],
      });
      emit("FG_DiscordBot:revive", id);
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
            .setDescription(LANGUAGE.INVALID_ID_INFO),
        ],
      });
    }
  },
};
