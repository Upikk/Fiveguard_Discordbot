const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

const { PERMISSIONS, LANGUAGE } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recordscreen")
    .setDescription(LANGUAGE.RECORDSCREEN.DESCRIPTION)
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription(LANGUAGE.RECORDSCREEN.OPTIONS.ID.DESCRIPTION)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription(LANGUAGE.RECORDSCREEN.OPTIONS.TIME.DESCRIPTION)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const roles = PERMISSIONS.RECORDSCREEN;
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
    const time = interaction.options.getNumber("time") * 1000;
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
              .setDescription(LANGUAGE.RECORDSCREEN.SUCCESS_MESSAGE),
          ],
        })
        .then(async (msg) => {
          client.fg.recordPlayerScreen(id, time, (result) => {
            const videoAttachment = new AttachmentBuilder(result);
            msg.edit({
              content: result,
              embeds: [
                new EmbedBuilder()
                  .setColor("Green")
                  .setAuthor({
                    name: client.user.username,
                    iconURL: client.user.avatarURL(),
                  })
                  .setTimestamp()
                  .setDescription(
                    `**Here's ${GetPlayerName(id)} recorded Screen!**`
                  ),
              ],
              files: [videoAttachment],
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
