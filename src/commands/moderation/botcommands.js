const { EmbedBuilder } = require("discord.js");

const commandCategories = {
  blacklist: {
    description: "Manage blacklists for users or guilds.",
    commands: [
      {
        name: "blacklist add <user/guild> <ID>",
        description: "Add an ID to the blacklist.",
      },
      {
        name: "blacklist remove <user/guild> <ID>",
        description: "Remove an ID from the blacklist.",
      },
      {
        name: "blacklist list <user/guild>",
        description: "List all blacklisted IDs.",
      },
    ],
  },
  dar: {
    description:
      "Manage dar meters for specific categories. \n**Categories:** `gaydar`, `trandar`, `queerdar`",
    commands: [
      {
        name: "dar add <category> <userID> <value>",
        description: "Add or update a dar entry.",
      },
      {
        name: "dar change <category> <userID> <value>",
        description: "Change an existing dar entry.",
      },
      {
        name: "dar remove <category> <userID>",
        description: "Remove a dar entry.",
      },
    ],
  },
  id: {
    description:
      "Manage special roles and IDs. \n**Categories:** `vips`, `devs`, `bot`, `donor`, `oneyear`, `partner`, `discord`, `support`",
    commands: [
      {
        name: "id add <category> <ID>",
        description: "Add an ID to a category.",
      },
      {
        name: "id remove <category> <ID>",
        description: "Remove an ID from a category.",
      },
    ],
  },
  term: {
    description: "Manage blocked terms.",
    commands: [
      { name: "term add <term>", description: "Add a term to the block list." },
      {
        name: "term remove <term>",
        description: "Remove a term from the block list.",
      },
    ],
  },
};

async function botcommands(message, client, args) {
  if (message.author.bot) return;
  const mention = `<@${client.user.id}>`;

  const isMention = message.content.startsWith(mention);
  if (!isMention && !message.content.startsWith("botcommands")) return;

  args =
    args || message.content.slice(mention.length).trim().split(/ +/).slice(1);

    const excludedCommands = ["restart", "stop", "list"];
    if (excludedCommands.includes(args[0]?.toLowerCase())) return;

  if (!args.length) {
    const embed = new EmbedBuilder()
      .setTitle("Command Categories")
      .setDescription(
        "Use `botcommands <category>` to view the commands in that category."
      )
      .setColor(0x1e90ff);

    for (const [category, details] of Object.entries(commandCategories)) {
      embed.addFields({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: details.description,
      });
    }

    await message.channel.send({ embeds: [embed] });
  } else {
    const category = args[0].toLowerCase();

    if (category === "all") {
      for (const [cat, details] of Object.entries(commandCategories)) {
        const embed = new EmbedBuilder()
          .setTitle(`Commands in ${cat.charAt(0).toUpperCase() + cat.slice(1)}`)
          .setDescription(details.description)
          .setColor(0xff00ea);

        for (const command of details.commands) {
          embed.addFields({ name: command.name, value: command.description });
        }

        await message.channel.send({ embeds: [embed] });
      }
    } else {
      const details = commandCategories[category];

      if (!details) {
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(
          `Commands in ${category.charAt(0).toUpperCase() + category.slice(1)}`
        )
        .setDescription(details.description)
        .setColor(0xff00ea);

      for (const command of details.commands) {
        embed.addFields({ name: command.name, value: command.description });
      }

      await message.channel.send({ embeds: [embed] });
    }
  }
}

module.exports = { botcommands };
