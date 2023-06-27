const { Client, ActivityType } = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "ready",
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    if (config.SERVER_STATUS.ON) {
      setInterval(async () => {
        try {
          await fetch(
            `http://127.0.0.1:${config.SERVER_STATUS.SERVER_PORT}/players.json`
          )
            .then((res) => res.json())
            .then((body) => {
              if (body.length) {
                client.user.setActivity({
                  name: `${config.SERVER_STATUS.MESSAGE.replace(
                    "<count>",
                    body.length
                  )}`,
                  type: ActivityType.Watching,
                });
              }
            });
        } catch {}
      }, 7000);
    }
  },
};
