const {Events} = require('discord.js');
const {checkPermissions} = require("../fucntion/checkPermissions");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            if (command.permissions) {
                if (checkPermissions(interaction.member, command.permissions)) {
                    await command.execute(interaction);
                } else
                    await interaction.reply({
                        content: "Non hai i permessi per eseguire questo comando!",
                        ephemeral: true
                    });
            } else await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Errore Bot, contattare Giuseh', ephemeral: true});
        }
    },
};