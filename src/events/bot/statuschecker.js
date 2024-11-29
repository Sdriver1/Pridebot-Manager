const { EmbedBuilder } = require("discord.js");

const botStartTime = Math.floor(Date.now() / 1000);
let statusMessageId = null;
let lastOfflineTime = null;

let pridebotOfflineAlertSent = false;
let pridebotTestOfflineAlertSent = false;
let pridebotManagerOfflineAlertSent = false;
let pridebotWebOfflineAlertSent = false;

async function fetchPrideBotStats() {
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch("https://api.pridebot.xyz/stats");
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return { data, error: null };
    } catch (jsonError) {
      console.error("Invalid JSON response:", text);
      return { data: null, error: `Invalid JSON response: ${text}` };
    }
  } catch (error) {
    console.error("Failed to fetch bot stats:", error);
    return { data: null, error: error.message };
  }
}

async function fetchPrideBotTestStats() {
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch("https://api.test.pridebot.xyz/stats");
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return { data, error: null };
    } catch (jsonError) {
      return { data: null, error: `Invalid JSON response: ${text}` };
    }
  } catch (error) {
    console.error("Failed to fetch bot stats:", error);
    return { data: null, error: error.message };
  }
}

async function fetchPrideBotWebStats() {
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch("https://pridebot.xyz/api/serverstats");
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return { data, error: null };
    } catch (jsonError) {
      return { data: null, error: `Invalid JSON response: ${text}` };
    }
  } catch (error) {
    console.error("Failed to fetch bot stats:", error);
    return { data: null, error: error.message };
  }
}

async function checkWebsiteStatus(url) {
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

const checkBotStatus = async (client) => {
  if (!client) {
    console.error("Client is undefined! Check the caller.");
    return;
  }

  const guild = client.guilds.cache.first();
  if (!guild) {
    console.error("Bot is not in any guilds.");
    return;
  }

  const monitoredBot = guild.members.cache.get("1101256478632972369");
  const monitoredBot1 = guild.members.cache.get("1193779874935099472");
  const monitoredBot2 = guild.members.cache.get("1109501423441432628");
  const channel = guild.channels.cache.get("1183584265825431726");
  const devChannel = guild.channels.cache.get("1245511925790675056");
  const messageId = "1312128560391258195";

  if (!channel) {
    console.error("Channel not found.");
    return;
  }

  const timestamp = `<t:${Math.floor(Date.now() / 1000)}:R>`;
  const { data: botStats } = await fetchPrideBotStats();
  const pridebotUptime = botStats ? botStats.botuptime : "Unknown";
  const { data: botStatsTest } = await fetchPrideBotTestStats();
  const pridebottestUptime = botStatsTest ? botStatsTest.botuptime : "Unknown";
  const { data: webStats } = await fetchPrideBotWebStats();
  const webUptime = webStats ? webStats.formatedStartTime : "Unknown";

  // Pridebot
  if (
    monitoredBot &&
    monitoredBot.presence &&
    monitoredBot.presence.status !== "offline"
  ) {
    pridebotOfflineAlertSent = false;
  } else if (!pridebotOfflineAlertSent) {
    pridebotOfflineAlertSent = true;
    lastOfflineTime = Math.floor(Date.now() / 1000);
    if (devChannel) {
      await devChannel.send(
        `<@691506668781174824> Pridebot is offline. Been offline since <t:${lastOfflineTime}:T> (<t:${lastOfflineTime}:R>).`
      );
    }
  }

  // Pridebot Manager
  if (
    monitoredBot1 &&
    monitoredBot1.presence &&
    monitoredBot1.presence.status !== "offline"
  ) {
    pridebotManagerOfflineAlertSent = false;
  } else if (!pridebotManagerOfflineAlertSent) {
    pridebotManagerOfflineAlertSent = true;
    lastOfflineTime = Math.floor(Date.now() / 1000);
    if (devChannel) {
      await devChannel.send(
        `<@691506668781174824> Pridebot Manager is offline. Been offline since <t:${lastOfflineTime}:T> (<t:${lastOfflineTime}:R>).`
      );
    }
  }

  // Pridebot Test
  if (
    monitoredBot2 &&
    monitoredBot2.presence &&
    monitoredBot2.presence.status !== "offline"
  ) {
    pridebotTestOfflineAlertSent = false;
  } else if (!pridebotTestOfflineAlertSent) {
    pridebotTestOfflineAlertSent = true;
    lastOfflineTime = Math.floor(Date.now() / 1000);
    if (devChannel) {
      await devChannel.send(
        `<@691506668781174824> Pridebot Test is offline. Been offline since <t:${lastOfflineTime}:T> (<t:${lastOfflineTime}:R>).`
      );
    }
  }

  // Pridebot Website
  const pridebotWebStatus = await checkWebsiteStatus("https://pridebot.xyz");
  if (pridebotWebStatus) {
    pridebotWebOfflineAlertSent = false;
  } else if (!pridebotWebOfflineAlertSent) {
    pridebotWebOfflineAlertSent = true;
    lastOfflineTime = Math.floor(Date.now() / 1000);
    if (devChannel) {
      await devChannel.send(
        `<@691506668781174824> Pridebot Website is offline. Been offline since <t:${lastOfflineTime}:T> (<t:${lastOfflineTime}:R>).`
      );
    }
  }

  // Update the status message in the channel
  const embed = new EmbedBuilder()
    .setColor(0xff00ea)
    .setTitle("Pridebot System Status")
    .addFields(
      {
        name: `${
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? "<:_:1111490955518951465>"
            : "<:_:1111490661259165727>"
        } ${
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? "Online"
            : "Offline"
        } **|** Pridebot`,
        value:
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? `<@1101256478632972369> has been online since <t:${pridebotUptime}:R>.`
            : `<@1101256478632972369> is currently offline. Last seen online <t:${lastOfflineTime}:R>.`,
      },
      {
        name: `${
          monitoredBot1 &&
          monitoredBot1.presence &&
          monitoredBot1.presence.status !== "offline"
            ? "<:_:1111490955518951465>"
            : "<:_:1111490661259165727>"
        } ${
          monitoredBot1 &&
          monitoredBot1.presence &&
          monitoredBot1.presence.status !== "offline"
            ? "Online"
            : "Offline"
        } **|** Pridebot Manager`,
        value:
          monitoredBot1 &&
          monitoredBot1.presence &&
          monitoredBot1.presence.status !== "offline"
            ? `<@1193779874935099472> has been online since <t:${botStartTime}:R>.`
            : `<@1193779874935099472> is currently offline. Last seen online <t:${lastOfflineTime}:R>.`,
      },
      {
        name: `${
          monitoredBot2 &&
          monitoredBot2.presence &&
          monitoredBot2.presence.status !== "offline"
            ? "<:_:1111490955518951465>"
            : "<:_:1111490661259165727>"
        } ${
          monitoredBot2 &&
          monitoredBot2.presence &&
          monitoredBot2.presence.status !== "offline"
            ? "Online"
            : "Offline"
        } **|** Pridebot Test`,
        value:
          monitoredBot2 &&
          monitoredBot2.presence &&
          monitoredBot2.presence.status !== "offline"
            ? `<@1109501423441432628> has been online since <t:${pridebottestUptime}:R>.`
            : `<@1109501423441432628> is currently offline. Last seen online <t:${lastOfflineTime}:R>.`,
      },
      {
        name: `${
          pridebotWebStatus
            ? "<:_:1111490955518951465>"
            : "<:_:1111490661259165727>"
        } ${pridebotWebStatus ? "Online" : "Offline"} **|** Pridebot Website`,
        value: pridebotWebStatus
          ? `https://pridebot.xyz has been online since <t:${webUptime}:R>.`
          : `https://pridebot.xyz is currently offline. Last seen online <t:${lastOfflineTime}:R>.`,
      },
      {
        name: `${
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? "<:_:1111490955518951465>"
            : "<:_:1111490661259165727>"
        } ${
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? "Online"
            : "Offline"
        } **|** PFP Website`,
        value:
          monitoredBot &&
          monitoredBot.presence &&
          monitoredBot.presence.status !== "offline"
            ? `https://pfp.pridebot.xyz has been online since <t:${pridebotUptime}:R>.`
            : `https://pfp.pridebot.xyz is currently offline. Last seen online <t:${lastOfflineTime}:R>.`,
      },
      {
        name: "Last Checked",
        value: `${timestamp}`,
      }
    )
    .setFooter({ text: `Status is checked every 1 min` });

  try {
    const message = await channel.messages.fetch(messageId);

    // Edit the existing message
    await message.edit({ embeds: [embed] });
  } catch (error) {
    if (error.code === 10008) {
      console.error("The specified message was not found.");
    } else {
      console.error("Failed to edit the message:", error);
    }
  }
};

module.exports = { checkBotStatus };
