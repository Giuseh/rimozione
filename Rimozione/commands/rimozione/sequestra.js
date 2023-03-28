const {
    SlashCommandBuilder,
} = require('discord.js');
const {ServerPermissions} = require("../../fucntion/checkPermissions");

module.exports = {
    permissions: [
        ServerPermissions.RIMO
    ],
    enable: true,
    data: new SlashCommandBuilder()
        .setName('sequestra')
        .setDescription("Sequestra un veicolo")
        .addStringOption(option =>
            option.setName('targa')
                .setDescription('Targa del veicolo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bit')
                .setDescription('Bit del veicolo')
                .setRequired(true)
                .addChoices(
                    {name: 'Si', value: 'true'},
                    {name: 'No', value: 'false'},
                ))
        .addStringOption(option =>
            option.setName('img')
                .setDescription('Link immagine')
                .setRequired(true)),
    async execute(interaction) {
        const targa = interaction.options.getString('targa').toUpperCase();
        const bit = interaction.options.getString('bit');
        const bitemb = bit === 'true' ? 'Si' : 'No';
        const bitDB = bit === 'true' ? 'Y' : 'N';
        const img = interaction.options.getString('img');

        const user = interaction.user;

        const embed = {
            title: 'Sequestro veicolo',
            description: `Targa: **${targa}**\nBit: **${bitemb}**`,
            color: 15548997,
            timestamp: new Date(),
            image: {
                url: img,
            },
        }

        db.query(`SELECT targa FROM veicoli_seq WHERE targa = ?`, [targa], async (err, aa) => {
            if (err) console.log(err);

            if (aa.length !== 0) return await interaction.reply({content: 'Veicolo già sequestrato', ephemeral: true});

            db.query(`INSERT INTO veicoli_seq(targa, bit)
                  VALUES (?, ?)`, [targa, bitDB], (err, _) => {
                if (err) console.log(err);

                db.query(`SELECT seq_totali
                      FROM users
                      WHERE id = ?`, [user.id], async (err, aa) => {
                    if (err) console.log(err);

                    if (aa.length === 0) {
                        db.query(`INSERT INTO users
                                  VALUES (?, 1, 0, ?)`, [user.id, interaction.member.displayName], (err, _) => {
                            if (err) console.log(err);
                        });

                        return;
                    }

                    const totali = aa[0].seq_totali + 1;
                    db.query(`UPDATE users
                              SET seq_totali = ?
                              WHERE id = ?`, [totali, user.id], (err, _) => {
                        if (err) console.log(err);
                    });

                    await interaction.reply({embeds: [embed]});
                });
            });
        });

    },
};