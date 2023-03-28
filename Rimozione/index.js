const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

const CONFIG = require('./config.json');
global.CONFIG = CONFIG;

require('./handler/eventsHandler').eventsHandler(client).then(() => console.log(`\x1b[36m[EVENTS HANDLER] > Events loaded\x1b[0m`));
require('./handler/comandsHandler').cmdsHandler(client).then(() => console.log(`\x1b[36m[COMANDS HANDLER] > Commands loaded\x1b[0m`));

global.db = require('./database/database').db();

client.login(CONFIG.token);