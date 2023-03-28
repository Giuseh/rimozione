const {
    SlashCommandBuilder,
} = require('discord.js');
const {ServerPermissions} = require("../../fucntion/checkPermissions");

module.exports = {
    permissions: [
        ServerPermissions.KEY
    ],
    enable: true,
    data: new SlashCommandBuilder()
        .setName('vendi')
        .setDescription("Vendi un veicolo")
        .addStringOption(option =>
            option.setName('targa1')
                .setDescription('Targa del veicolo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('targa2')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa3')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa4')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa5')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa6')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa7')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa8')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa9')
                .setDescription('Targa del veicolo')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('targa10')
                .setDescription('Targa del veicolo')
                .setRequired(false)),
    async execute(interaction) {
        const targhe = [];

        for (let i = 1; i <= 10; i++) targhe.push(interaction.options.getString(`targa${i}`) ? interaction.options.getString(`targa${i}`).toUpperCase() : null);


        targhe.forEach(targa => {
            if (targa === null) return;

            db.query(`SELECT *
                      FROM veicoli_seq
                      WHERE targa = ?`, [targa], async (err, bb) => {
                if (err) console.log(err);

                if (bb.length !== 0) {
                    const embed = {
                        title: 'Vendita veicolo',
                        description: `Targa: **${targa}**`,
                        color: 3447003,
                        timestamp: new Date(),
                    }

                    interaction.channel.send({embeds: [embed]});

                    db.query(`DELETE
                              FROM veicoli_seq
                              WHERE targa = ?`, [targa]);
                }
            });

        });

        interaction.reply({content: 'Veicoli venduti con successo', ephemeral: true});
    }
    ,
}
;