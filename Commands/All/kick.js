const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick Player")
    .addNumberOption((option) =>
      option
        .setName("id")
        .setDescription("Enter the Player's ID to Kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Enter the Kick Reason")
        .setRequired(true)
    ),
  async execute(interaction, client) {
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
            .setDescription("**Invalid ID provided!**"),
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
