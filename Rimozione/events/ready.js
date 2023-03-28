const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.info("Dev: Lollo0401");
        console.info(`\x1b[35mName: ${client.user.tag}!\x1b[0m`);
        console.log("-----------------------------------------");

        client.user.setStatus("online");
    },
};