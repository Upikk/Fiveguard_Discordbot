const { Message } = require("discord.js");

const { AUTO_BANS } = require("../../config.json");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message, client) {
    if (
      AUTO_BANS.ENTITY.ENABLED == false ||
      message.embeds?.length < 1 ||
      message.channel.id !== AUTO_BANS.ENTITY.ENTITY_LOGS_CHANNEL ||
      !message.webhookId
    )
      return;

    if (message.embeds[0]?.fields[1]?.value.includes("illegal way")) {
      const PlayerLicense = message.embeds[0].fields[5].value;

      if (!PlayerLicense) return;
      emit("FG_DiscordBot:BanPlayerLicense", PlayerLicense, "Illegal Entity");
    }
  },
};
