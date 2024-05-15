const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription(LANGUAGE.UNBAN.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("banid")
        .setDescription(LANGUAGE.UNBAN.OPTIONS.BANID.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.UNBAN;
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
    await interaction.deferReply()
    const id = interaction.options.getNumber("banid");
    const result = client.fg.UnbanId(id);
    if (result) {
      await interaction.deferReply({
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
      await interaction.deferReply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setColor("Red")
            .setTimestamp()
            .setDescription(LANGUAGE.UNBAN.ERROR_MESSAGE),
        ],
      });
    }
  },
};
