const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    client.commands = new Map();

    // Caminho para a lista de comandos
    const messageComandsPath = path.join(__dirname, '../comandos/message');
    const messageComandsFiles = fs.readdirSync(messageComandsPath).filter(file => file.endsWith('.js'));

    // Log dos arquivos de comando encontrados
    console.log(`Comandos de menssagem encontrados: ${messageComandsFiles}`);

    // Carregar todos os comandos
    for (const file of messageComandsFiles) {
        const command = require(`${messageComandsPath}/${file}`);
        client.commands.set(command.name, command);
    }

    // Ouvir mensagens e executar o comando correspondente
    client.on('messageCreate', (message) => {
        // console.log(`Mensagem recebida de ${message.author.username}: ${message.content}`);

        if (!message.content.startsWith('//') || message.author.bot) return;

        const args = message.content.slice(2).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        // Verificação se os comandos estão sendo identificados
        console.log(`Comando detectado: ${commandName}`);

        const command = client.commands.get(commandName);
        if (!command){
            console.log('Comando não encontrado');
            return;
        };

        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('Houve um erro ao tentar executar esse comando!');
        };

    });

};
