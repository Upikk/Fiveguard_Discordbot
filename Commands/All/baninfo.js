const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baninfo")
    .setDescription("Display Ban Information")
    .addNumberOption((option) =>
      option
        .setName("banid")
        .setDescription("Enter the Player's BanID get Info")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { PERMISSIONS_ROLE_ID } = require("../../config.json");
    if (!interaction.member.roles.cache.has(PERMISSIONS_ROLE_ID))
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setDescription(
              `You don't have permissions to use this Command!`
            ),
        ],
      });
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
            .setDescription(`**Name: \`${result.name}\`\n\nReason: \`${result.reason}\`\n\nManual: \`${result.manual}\`\n\nDiscord: \`${result.discord}\`\n\nLicense: \`${result.license}\`\n\nSteam: \`${result.steam}\`**`),
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
