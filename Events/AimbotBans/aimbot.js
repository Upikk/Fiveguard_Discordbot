const { Message, EmbedBuilder, Events } = require("discord.js");

const { AIMBOT_BANS } = require("../../config.json");

module.exports = {
  name: Events.MessageCreate,
  /**
   *
   * @param {Message} message
   */
  async execute(message, client) {
    if (
      AIMBOT_BANS.ENABLED == false ||
      message.embeds.length < 1 ||
      message.channel.id !== AIMBOT_BANS.AIMBOT_LOGS_CHANNEL
    )
      return;
    const PlayerLicense = message.embeds[0].fields[5].value;

    if (!PlayerLicense) return;

    emit("FG_DiscordBot:BanPlayerLicense", PlayerLicense);
  },
};
