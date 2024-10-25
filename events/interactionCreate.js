const fs = require('fs');
const path = require('path');
const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'userForm') {
            // Capturar respostas do modal
            const name = interaction.fields.getTextInputValue('nameInput');
            const age = interaction.fields.getTextInputValue('ageInput');

            // Criação do objeto com as respotas
            const userData = {
                userId: interaction.user.id,
                name: name,
                age: age,
            };

            // Caminho para o arquivo JSON onde as respostas serão armazenadas
            const dataPath = path.join(__dirname, '..data', 'responses.json');

            // Verificar se o arquivo ja existe e carregar o conteúdo existente
            let data = [];
            if (fs.existsSync(dataPath)) {
                data = JSON.parse(fs.readFileSync(dataPath));
            }

            // Adicionar a nova resposta
            data.push(userData);

            // Salvar os dados no arquivo JSON
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

            // Responder ao usuário
            await interaction.reply({ content: 'Formulario enviado com sucesso!', ephemeral: true});
        }
    }
}