const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
  const loggingId = "1312101101616758877";
  const loggingChannel = member.guild.channels.cache.get(loggingId);

  if (!loggingChannel) {
    console.log("Logging channel not found.");
    return;
  }

  const name = member.guild.name;
  const memberCount = member.guild.memberCount;
  const username = member.user.tag;
  const avatarUrl = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

  // Date the member joined
  const joinedAt = member.joinedAt;
  const leftAt = new Date();
  const duration = leftAt - joinedAt;

  // Convert duration to a readable format
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const durationString = `${days} days, ${hours} hours, and ${minutes} minutes`;

  // Convert timestamps to EST
  const options = {
    timeZone: "America/New_York",
    hour12: true,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const joinedAtEST = new Intl.DateTimeFormat("en-US", options).format(
    joinedAt
  );
  const leftAtEST = new Intl.DateTimeFormat("en-US", options).format(leftAt);

  const loggingEmbed = new EmbedBuilder()
    .setColor(0xff00ea)
    .setTitle(`${username} has left ${name}`)
    .setDescription(
      `**User: ${member}**\n**Total Members: ${memberCount}**\n**Joined: ${joinedAtEST}**\n**Duration in Server: ${durationString}**`
    )
    .setThumbnail(avatarUrl)
    .setFooter({ text: `Left: ${leftAtEST}` });

  await loggingChannel.send({ embeds: [loggingEmbed] });
};
