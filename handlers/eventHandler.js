const { Events, InteractionType } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    // Carregar eventos 

    for (const file of eventFiles) {
        const event = require(`${eventsPath}/${file}`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        };
    };

    // Gerenciar interações (comandos de Slash e Modals)

    client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.type === InteractionType.ApplicationCommand) {
             const command = client.command.get(interaction.commandName);
             if (!command) return;

             try {
                await command.execute(interaction);
             } catch (error) {
                console.error(error);
                await interaction.reply('Houve um erro ao tentar executar esse comando!');
             }
        } else if (interaction.type === InteractionType.ModalSubmit) {
            if (interaction.customId === 'userForm') {
                // Capturar respostas do Modal
                const name = interaction.fields.getTextInputValue('nameInput');
                const age = interaction.fields.getTextInputValue('ageInput');

                // Resposta
                await interaction.reply(`Nome: ${name}, Idade: ${age}`);
            }
        }
    });
};