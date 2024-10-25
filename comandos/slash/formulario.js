const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('formulario')
        .setDescription('Abre um formulário com perguntas!'),

    async execute(interaction) {
        // Cria o modal
        const modal = new ModalBuilder()
            .setCustomId('userForm')
            .setTitle('Formulário de Teste');

        // Cria os campos de texto (perguntas)
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel('Qual é o seu nome?')
            .setStyle(TextInputStyle.Short);

        const ageInput = new TextInputBuilder()
            .setCustomId('ageInput')
            .setLabel('Qual é a sua idade?')
            .setStyle(TextInputStyle.Short);

        // Adiciona os campos criados no modal
        const firstRow = new ActionRowBuilder().addComponents(nameInput);
        const secondRow = new ActionRowBuilder().addComponents(ageInput);

        modal.addComponents(firstRow, secondRow);

        // Mostra o modal ao usuário
        await interaction.showModal(modal);

    }

};