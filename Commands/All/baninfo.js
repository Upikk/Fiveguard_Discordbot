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
    const banid = interaction.options.getNumber("banid");
    const { createConnection } = require("mysql");
    const conn = createConnection({
      host: "127.0.0.1",
      password: "Pass",
      database: "dbname",
    });
    conn.query("SELECT * FROM dbname WHERE id = ?", [banid], (err, result) => {
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
              .setDescription(`Results`),
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
    });
  },
};
