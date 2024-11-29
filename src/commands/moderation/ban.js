const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("preserve_messages")
        .setDescription("Whether to preserve the user's messages")
        .setRequired(false)
    ),

  async execute(interaction) {
    const allowedRoleIds = [
      "1164666833970937896",
      "857006412646711316",
      "1031544853349277808",
      "942526724049104936",
      "1164666835631878305",
    ];

    const memberRoles = interaction.member.roles.cache;
    const hasRole = allowedRoleIds.some((roleId) => memberRoles.has(roleId));

    if (!hasRole) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const preserveMessages =
      interaction.options.getBoolean("preserve_messages") || false;
    const moderator = interaction.user.id;
    const chamber = Math.floor(Math.random() * 100) + 1; 

    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    if (!member) {
      return interaction.reply({
        content: "User not found in the guild.",
        ephemeral: true,
      });
    }

    try {
      await interaction.guild.members.ban(user, {
        days: preserveMessages ? 0 : 7,
        reason: reason,
      });

      const currentTime = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);
      const estTime = currentTime.toUTCString(); 

      const embed = new EmbedBuilder()
        .setTitle("Ban Successful")
        .setDescription(`**${user.tag} has successfully been sent to Piston Pumping Chamber #${chamber}**`)
        .addFields(
          { name: "Reason", value: reason, inline:true },
          { name: "Moderator", value: `<@${moderator}>`, inline:true },
          { name: "Timestamp", value: estTime, inline:true }
        )
        .setColor(0xff0000)
        .setFooter({ text: `${user.id}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      const errorEmbed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("An error occurred while trying to ban the user.")
        .setColor(0xff0000)
        .setTimestamp();

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
