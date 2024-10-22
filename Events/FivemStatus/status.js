const { Client, ActivityType } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "ready",
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    if (config.SERVER_STATUS.ON) {
      setInterval(async () => {
        const count = getPlayers().length;
        client.user.setActivity({
          name: `${config.SERVER_STATUS.MESSAGE.replace("<count>", count)}`,
          type: ActivityType.Watching,
        });
      }, 7000);
    }
  },
};
