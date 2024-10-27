const { EmbedBuilder } = require("discord.js");
const Character = require("../../../../core/entities/character")
 

module.exports = {
    name: "ficha",
    description: "Mostra a ficha do jogador",

    execute(message) {
        let infp = `Nome: ${message.author.username}` + '\n' + 'Idade: 19';

        const msgEmbed = new EmbedBuilder()
            .setTitle('Ficha do Personagem')
            .setColor("DarkGold")
            .setDescription(message.author.username)
            .addFields({
                name: '🎡 Informações Pessoais:',
                value: infp.toString(),
                inline: false
            });
        
        message.channel.send({ embeds: [msgEmbed] });
        return msgEmbed;
    }
}