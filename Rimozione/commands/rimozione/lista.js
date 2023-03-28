const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const moment = require('moment');
const {ServerPermissions} = require("../../fucntion/checkPermissions");
moment.locale('it');

module.exports = {
    permissions: [
        ServerPermissions.KEY,
    ],



    enable: true,
    data: new SlashCommandBuilder()
        .setName('lista')
        .setDescription("Lista dei veicoli non rilasciati dopo 7 giorni"),
    async execute(interaction) {
        const embed = {
            title: 'Lista veicoli non rilasciati',
            color: 3447003
        }

        db.query(`SELECT *
                  FROM veicoli_seq
                  WHERE bit = 'N' AND DATEDIFF(?, data) >= 7;`, [moment().format('YYYY-MM-DD')], async (err, resutl) => {
            if (err) console.log(err);

            if (resutl.length === 0)
                embed.description = 'Nessun veicolo disponibile';
            else {
                let description = '';

                for (let i = 0; i < resutl.length; i++)
                    description += `Targa: **${resutl[i].targa}**\n\n`;

                embed.description = description;
            }


            await interaction.reply({embeds: [embed]});
        });
    },
};