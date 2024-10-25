require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.BOT_TOKEN;
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');


const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
    ],
  });

// Quando o cliente estiver pronto
client.once(Events.ClientReady, readyClient => {
	console.log(`PRONTO! Logado como ${readyClient.user.tag}`);
});

// Chama os handlers para carregar e gerenciar os comandos e eventos
commandHandler(client);
eventHandler(client);

// Login no discord com o client token
client.login(token);