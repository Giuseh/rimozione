const {
    SlashCommandBuilder,
} = require('discord.js');
const {ServerPermissions} = require("../../fucntion/checkPermissions");

module.exports = {
    permissions: [
        ServerPermissions.KEY,
    ],
    enable: true,
    data: new SlashCommandBuilder()
        .setName('sequestrati')
        .setDescription("Visualizza tutti i veicoli sequestrati"),
    async execute(interaction) {
        const embed = {
            title: 'Veicoli sequestrati',
            color: 15548997,
            description: '',
            timestamp: new Date(),
        }

        db.query("SELECT targa FROM veicoli_seq", (err, result) => {
            if (err) console.log(err);

            if (!result) {
                embed.description = 'Nessuna targa presente';
                interaction.reply({embeds: [embed]});
                return;
            } else {
                result.forEach((row) => {
                    embed.description += `${row.targa}\n`;
                });

                embed.title += ` **(${result.length})**`;
            }

            interaction.reply({embeds: [embed]});
        });
    },
};