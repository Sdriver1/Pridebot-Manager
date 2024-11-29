const { EmbedBuilder } = require("discord.js");

async function rulesMessage(message, client) {
  if (message.author.bot) return;

  const mention = `<@${client.user.id}>`;
  if (message.content.startsWith(mention)) {
    const args = message.content.slice(mention.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (commandName === "rules") {
      const ruleEmbed = new EmbedBuilder()
        .setTitle("Pridebot Support Server Rules")
        .setDescription(
          "These rules have been made in order to keep the server safe for everyone. Every member must follow these rules at all times. Breaking of rules will lead to moderative actions at the decision of staff. \n\n __**Important things to keep in mind:**__ \n- This is an English-only server. \n- Not every rule on Discord is listed, so just use common sense and everyone can be happy. \n- Staff have all rights to enforce punishments even for rules/reasons not listed here. Violations can come from the resources below as well.\n\n__**Discord ToS and Guidelines:**__ \n[Discord Terms of Service](https://discord.com/terms) \n[Discord Guidelines](https://discord.com/guidelines) \n\n__**Pridebot ToS and Privacy Policy (still underwork):**__ \n[Pridebot Terms of Service](https://pridebot.xyz/tos) \n[Pridebot Privacy Policy](https://pridebot.xyz/privacy)"
        )
        .addFields(
          {
            name: "Be respectful at all moments",
            value:
              "Be nice, honest, welcoming to new members, and open-minded. We do not tolerate any drama, hate, arguing, debate (including debate of server rules or how they are enforced), or disrespect in any form. Keeping the chat safe, welcoming, and engaging is the best way to follow this rule.",
          },
          {
            name: "No NSFW/NSFL",
            value:
              "We have a STRICT NO NSFW/NSFL policy. Absolutely no NSFW or NSFW suggestive content, this also includes profile names, banners, and avatars. It is not okay in any form, even if it's censored or spoilered.",
          },
          {
            name: "No Toxic or disruptive conversations",
            value: "Every discussion should be non-toxic and on-topic. Please avoid all racism, sexism, homophobia, transphobia, ableism, or any other form of discrimination. This also includes any form of hate speech or harassment.",
          },
          {
            name: "Don't spam or abuse bot commands",
            value: "Please avoid spamming commands, and only use commands in the appropriate channels. Do not abuse commands or use them in a way that is harmful to the server.",
          },
          {
            name: "Advertising of any kind is prohibited",
            value: "Do not advertise anything in the server. This includes other Discord servers, social media, or any other form of advertisement. Discussion about other Discord bots or topics are allowed but no personal advertisement of projects.",
          },
          {
            name: "No impersonation",
            value: "Do not impersonate anyone, including other members, staff, or other bots. This includes usernames, profile pictures, or any other form of impersonation.",
          },
          {
            name: "Proper use of Pridebot or other bots",
            value: "Please use all commands in their appropriate manner. Avoid using harmful language in string commands as they are monitored by staff and can be blacklisted at any point.",
          }
        )
        .setColor(0xff00ea);

      await message.channel.send({ embeds: [ruleEmbed] });
    }
  }
}

module.exports = { rulesMessage };
