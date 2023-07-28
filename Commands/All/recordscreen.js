const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recordscreen")
    .setDescription("Record player's Screen")
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription("Enter the Player's ID")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("time").setDescription("Time in Seconds").setRequired(true)
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
              .setDescription(`**Recording screen, this may take a While!**`),
          ],
        })
        .then(async (msg) => {
          client.fg.recordPlayerScreen(id, time, (result) => {
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
                    `**Here's ${GetPlayerName(id)} recorded Screen!**`
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
