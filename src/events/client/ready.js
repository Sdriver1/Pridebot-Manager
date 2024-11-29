const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const updatePresence = async () => {
      const guild = client.guilds.cache.get("1101740375342845952");

      if (guild) {
        const userCount = guild.memberCount;
        const formattedTotalUserCount = userCount.toLocaleString();
        await client.user.setPresence({
          status: "online",
          activities: [
            {
              type: ActivityType.Watching,
              name: `over the ${formattedTotalUserCount} users in Pridebot Support Server`,
            },
          ],
        });
      } else {
        console.error("Guild not found");
      }
    };

    updatePresence();
    setInterval(updatePresence, 300000);
  },
};
