const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("screenshot")
    .setDescription(LANGUAGE.SCREENSHOT.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription(LANGUAGE.SCREENSHOT.OPTIONS.ID.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.SCREENSHOT;
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
      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Green")
              .setAuthor({
                name: client.user.username,
                iconURL: client.user.avatarURL(),
              })
              .setTimestamp()
              .setDescription(LANGUAGE.REVIVE.SUCCESS_MESSAGE),
          ],
        })
        .then(async (msg) => {
          client.fg.screenshotPlayer(id, (result) => {
            msg.edit({
              embeds: [
                new EmbedBuilder()
                  .setColor("Green")
                  .setAuthor({
                    name: client.user.username,
                    iconURL: client.user.avatarURL(),
                  })
                  .setTimestamp()
                  .setImage(result)
                  .setDescription(
                    `**Here's ${GetPlayerName(id)} Screenshot!**`
                  ),
              ],
            });
          });
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
            .setDescription(LANGUAGE.INVALID_ID_INFO),
        ],
      });
    }
  },
};
