const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];
const commandFiles = fs.readdirSync('./comandos/slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'comandos/slash', file));

    // Verifica se a estrutura do comando está correta
    if (!command.data || typeof command.data.toJSON !== 'function') {
        console.error(`O comando em ${file} está mal estruturado. Falta a propriedade "data" ou "toJSON".`);
        continue;
    }

    commands.push(command.data.toJSON());
}

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Atualizando os Slash (/) commands.');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), { body: commands },
        );

        console.log('Atualização dos Slash (/) commands realizada com sucesso!');

    } catch (error) {
        console.error(error);
    }
})();