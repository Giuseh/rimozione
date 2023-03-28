const {Collection, REST, Routes} = require("discord.js");
const fs = require('fs');
const path = require('path');

exports.cmdsHandler = async client => {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, '../commands');
    const commandsFolders = fs.readdirSync(commandsPath);

    for (const folder of commandsFolders) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${folder}`)).filter(file => file.endsWith('.js'));

        console.info(`\x1b[32m- Load commands in folder [${folder}]\x1b[0m`);

        for (const file of commandFiles) {
            const filePath = path.join(path.join(__dirname, `../commands/${folder}`), file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                if (command.enable) {
                    client.commands.set(command.data.name, command);
                    console.info(`\x1b[33m  ∟ Command \x1b[4m${command.data.name}\x1b[0m\x1b[33m loaded\x1b[0m`);
                } else
                    console.info(`\x1b[31m  ∟ Command \x1b[4m${command.data.name}\x1b[0m\x1b[30m DISABLED\x1b[0m`);
            }
            else
                console.log(`\x1b[31m[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.\x1b[0m`);
        }
    }

    // Register commands to Discord
    const rest = new REST({ version: '10' }).setToken(CONFIG.token);
    const slashCommands = client.commands.map(command => command.data.toJSON());

    try {
        await rest.put(Routes.applicationCommands(CONFIG.clientID), { body: slashCommands });

        console.log("\x1b[32m[INFO API] All commands are loaded\x1b[0m");
    } catch (error) {
        console.error(error);
    }

}