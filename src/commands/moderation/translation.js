const { EmbedBuilder } = require("discord.js");

async function transMessage(message, client) {
  if (message.author.bot) return;

  const mention = `<@${client.user.id}>`;
  if (message.content.startsWith(mention)) {
    const args = message.content.slice(mention.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const messageId = args.shift();

    if (commandName === "translate" && messageId) {
      try {
        const targetMessage = await message.channel.messages.fetch(messageId);

        if (!targetMessage) {
          await message.reply(`Message with ID ${messageId} not found.`);
          return;
        }

        const transEmbed1 = new EmbedBuilder()
          .setTitle("Pridebot Translation Guide")
          .addFields({
            name: "Language Codes (code - language)",
            value: `- **id**: Indonesian \n- **da**: Danish \n- **de**: German \n- **en-GB**: English (UK) \n- **en-US**: English (US) \n- **es-ES**: Spanish (Spain) \n- **es-419**: Spanish (Latin America) \n- **fr**: French \n- **hr**: Croatian \n- **it**: Italian \n- **lt**: Lithuanian \n- **hu**: Hungarian \n- **nl**: Dutch \n- **no**: Norwegian \n- **pl**: Polish \n- **pt-BR**: Portuguese (Brazil) \n- **ro**: Romanian \n- **fi**: Finnish \n- **sv-SE**: Swedish \n- **vi**: Vietnamese \n- **tr**: Turkish \n- **cs**: Czech \n- **el**: Greek \n- **bg**: Bulgarian \n- **ru**: Russian \n- **uk**: Ukrainian \n- **hi**: Hindi \n- **th**: Thai \n- **zh-CN**: Chinese (Simplified) \n- **ja**: Japanese \n- **zh-TW**: Chinese (Traditional) \n- **ko**: Korean`,
          })
          .setColor(0xff00ea);

        const transEmbed2 = new EmbedBuilder()
          .setTitle("Pridebot Translation Command Status/Guide")
          .addFields(
            {
              name: "Pride Commands",
              value: `
                \n- **Asexual**: de / el / en-US / es-ES / fi / nl / ru
                \n- **Bisexual**: de / el / en-US / es-ES / fi / nl / ru
                \n- **Gay**: en-US / fi
                \n- **Genderfluid**: en-US / fi
                \n- **Lesbian**: en-US / fi
                \n- **Nonbinary**: en-US / fi
                \n- **Pansexual**: en-US / fi
                \n- **Pridemonth**: en-US / fi
                \n- **Queer**: en-US / fi
                \n- **Trans**: en-US / fi
              `,
            },
            {
              name: "Terms Commands",
              value: `
                \n- **Gender**: N/A
                \n- **Others**: N/A
                \n- **Sexuality**: N/A
                \n- **Pronouns**: N/A
              `,
            }
          )
          .setColor(0xff00ea);

        const transEmbed3 = new EmbedBuilder()
          .setTitle("Pridebot Translation Command Contributors")
          .addFields(
            {
              name: "Contributors",
              value: `
              \n- <@691506668781174824> - English (US)
              \n- <@275731162545258498> - Spanish (Spain)
              \n- <@723568555362091158> - Dutch
              \n- <@678950545230135308> - Greek
              \n- <@599561793689485322> - Russian
              \n- <@687316434480922664> - German
              \n- <@987838764388855828> - Finnish
            `,
            },
            {
              name: "How can I contribute?",
              value: `
              \n-> https://crowdin.com/project/pridebot
              \n- If the language you want to contribute to is not listed, please contact <@691506668781174824>.
            `,
            }
          )
          .setColor(0xff00ea);

        await targetMessage.edit({
          embeds: [transEmbed1, transEmbed2, transEmbed3],
        });

        await message.reply(`Message with ID ${messageId} has been updated.`);
      } catch (error) {
        console.error(`Error fetching/editing message:`, error);
        await message.reply(
          `Failed to fetch or edit the message with ID ${messageId}.`
        );
      }
    }
  }
}

module.exports = { transMessage };
