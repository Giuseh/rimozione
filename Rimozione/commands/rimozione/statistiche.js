//Command to see employee statistics with number of impounds and releases
const {
    SlashCommandBuilder, ActionRowBuilder, ButtonBuilder,ButtonStyle
} = require('discord.js');
const {ServerPermissions} = require("../../fucntion/checkPermissions");

module.exports = {
    permissions: [
        ServerPermissions.KEY
    ],
    enable: true,
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription("Lista delle statistiche rimozione"),
    async execute(interaction) {
        const embed = {
            title: 'Statistiche',
        }

        db.query(`SELECT *
                  FROM users
                  ORDER BY nome_ds`, async (err, data) => {
            if (err) console.log(err);

            if (data.length === 0) {
                embed.description = 'Nessun dato disponibile';
                embed.color = 0xff0000;
            } else {
                let description = '';

                for (let i = 0; i < data.length; i++)
                    description += `Nome: **${data[i].nome_ds}**\nSequestri: **${data[i].seq_totali}**\nDissequestri: **${data[i].dis_totali}**\n\n`;

                embed.description = description;
                embed.color = 0x00ff00;
            }

            const btn = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('azzerastats')
                        .setLabel('Azzera')
                        .setStyle(ButtonStyle.Danger)
                );

            await interaction.reply({embeds: [embed], components: [btn]});
        });
    },
};
