const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("screenshot")
    .setDescription("Screenshot player")
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription("Enter the Player's ID")
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
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL(),
            })
            .setDescription("You don't have permissions to use this Command!"),
        ],
      });
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
              .setDescription(
                `**Screenshooting screen, this may take a While!**`
              ),
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
            .setDescription("**Incorrect ID has been Provided!**"),
        ],
      });
    }
  },
};
