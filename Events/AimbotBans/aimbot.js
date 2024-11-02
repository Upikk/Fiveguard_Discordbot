const { Message } = require("discord.js");

const { AIMBOT_BANS } = require("../../config.json");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message, client) {
    if (
      AIMBOT_BANS.ENABLED == false ||
      message.embeds?.length < 1 ||
      message.channel.id !== AIMBOT_BANS.AIMBOT_LOGS_CHANNEL ||
      !message.webhookId
    )
      return;

    if (message.embeds[0]?.fields[1]?.value.includes("Aimbot")) {
      const PlayerLicense = message.embeds[0].fields[5].value;

      if (!PlayerLicense) return;
      emit("FG_DiscordBot:BanPlayerLicense", PlayerLicense);
    }
  },
};
