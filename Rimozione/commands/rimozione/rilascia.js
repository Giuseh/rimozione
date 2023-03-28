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
        .setName('rilascia')
        .setDescription("Rilascia un veicolo")
        .addStringOption(option =>
            option.setName('targa')
                .setDescription('Targa del veicolo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('img')
                .setDescription('Link immagine documento')
                .setRequired(true)),
    async execute(interaction) {
        const targa = interaction.options.getString('targa').toUpperCase();
        const img = interaction.options.getString('img');

        const user = interaction.user;

        db.query(`SELECT * FROM veicoli_seq WHERE targa = ?`, [targa], async (err, bb) => {
            if (err) console.log(err);

            if (bb.length === 0) {
                await interaction.reply({content: 'Veicolo non trovato', ephemeral: true});
                return;
            } else {
                db.query(`DELETE
                          FROM veicoli_seq
                          WHERE targa = ?`, [targa], async (err, _) => {
                    if (err) console.log(err);

                    db.query(`SELECT dis_totali
                              FROM users
                              WHERE id = ?`, [user.id], (err, aa) => {
                        if (err) console.log(err);

                        if (aa.length === 0) {
                            db.query(`INSERT INTO users
                              VALUES (?, 0, 1, ?)`, [user.id, user.username], (err, _) => {
                                if (err) console.log(err);
                            });

                            return;
                        }

                        const totali = aa[0].dis_totali + 1;
                        db.query(`UPDATE users
                                  SET dis_totali = ?
                                  WHERE id = ?`, [totali, user.id], (err, _) => {
                            if (err) console.log(err);
                        });
                    });

                    const embed = {
                        title: 'Veicolo rilasciato',
                        description: `Targa: **${targa}**`,
                        color: 0x00ff00,
                        image:  {
                            url: img,
                        },
                        timestamp: new Date(),
                    }

                    await interaction.reply({embeds: [embed]});
                });
            }
        });
    },
};