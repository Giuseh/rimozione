const {Events} = require('discord.js');
const {checkPermissions, ServerPermissions} = require("../fucntion/checkPermissions");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'azzerastats') {
            if (!checkPermissions(interaction.member, [
                ServerPermissions.KEY
            ])) return interaction.reply({content: "Non hai il ruolo per usare questo comando", ephemeral: true});

            await interaction.update({components: []});

            db.query("UPDATE users SET seq_totali = 0, dis_totali = 0", (err, _) => {
                if (err) console.log(err);
            });
        }
    },
};