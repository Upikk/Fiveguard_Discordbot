const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baninfo")
    .setDescription("Display Ban Information")
    .addNumberOption((option) =>
      option
        .setName("banid")
        .setDescription(LANGUAGE.BANINFO.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.BANINFO;
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
    const banid = interaction.options.getNumber("banid");
    const result = client.fg.GetBanInfoId(banid);
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
            .setTitle(`Ban Information for ID: ${banid}`)
            .setDescription(
              `**Name: \`${result.name}\`\n\nReason: \`${result.reason}\`\n\nManual: \`${result.manual}\`\n\nDiscord: \`${result.discord}\`\n\nLicense: \`${result.license}\`\n\nSteam: \`${result.steam}\`**`
            ),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()

            .setColor("Red")
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setDescription("**Incorrect Ban ID provided**"),
        ],
      });
    }
  },
};
