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
      AUTO_BANS.AIMBOT.ENABLED == false ||
      message.embeds?.length < 1 ||
      message.channel.id !== AUTO_BANS.AIMBOT.AIMBOT_LOGS_CHANNEL ||
      !message.webhookId
    )
      return;

    if (message.embeds[0]?.fields[1]?.value.includes("Aimbot") || message.embeds[0]?.fields[1]?.value.includes("Silent Aim")) {
      const PlayerLicense = message.embeds[0].fields[5].value;

      if (!PlayerLicense) return;
      emit("FG_DiscordBot:BanPlayerLicense", PlayerLicense, "Aimbot Detected");
    }
  },
};
