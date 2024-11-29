const { EmbedBuilder } = require("discord.js");

module.exports = async (client, member) => {
  const channelId = "1111059318641528832";
  const loggingId = "1312101101616758877";
  const channel = member.guild.channels.cache.get(channelId);
  const loggingChannel = member.guild.channels.cache.get(loggingId);

  if (!channel) {
    console.log("Welcome channel not found.");
    return;
  }
  if (!loggingChannel) {
    console.log("Logging channel not found.");
    return;
  }

  const name = member.guild.name;
  const memberCount = member.guild.memberCount;
  const username = member.user.tag;
  const avatarUrl = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

  const embed = new EmbedBuilder()
    .setColor(0xff00ea)
    .setTitle(`${username} has joined ${name}`)
    .setDescription(`**User: ${member}** \n**Total Members: ${memberCount}**`)
    .setThumbnail(avatarUrl)
    .setFooter({ text: `Joined: ${new Date().toLocaleString()}` });


  const loggingEmbed = new EmbedBuilder()
    .setColor(0xff00ea)
    .setTitle(`${username} has joined ${name}`)
    .setDescription(`**User: ${member}** \n**Total Members: ${memberCount}**`)
    .setThumbnail(avatarUrl)
    .setFooter({ text: `Joined: ${new Date().toLocaleString()}` });


  await channel.send({ embeds: [embed] });
  await loggingChannel.send({ embeds: [loggingEmbed] });
};
