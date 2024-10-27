const fs = require('fs');
const path = require('path');
const prefix = "//";

module.exports = (client) => {

    client.commands = new Map();

    // Função para ler arquivos recursivamente em todas as subpastas
    const readCommandsRecursively = (dir) => {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readCommandsRecursively(fullPath); // Se for uma pasta, chama a função novamente
            } else if (file.endsWith('.js')) {
                const command = require(fullPath);
                client.commands.set(command.name, command);

                console.log(`Comando encontrado: ${command.name}`);
            }
        }
    };

    // Caminho para a pasta de comandos
    const messageCommandsPath = path.join(__dirname, '../aplications/commands/message');
    readCommandsRecursively(messageCommandsPath);

    // Ouvir messagens e executar o comando correspondente
    client.on('messageCreate', (message) => {
        if(!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(2).trim().split(/ + /);
        const commandName = args.shift().toLowerCase();
        
        console.log(`Um comando foi enviado por ${message.author.username}: ${commandName}`);

        const command = client.commands.get(commandName);
        if (!command) {
            console.log("Comando não encontrado");
            return;
        }

        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.reply(`Houve um erro ao tentar executar o comando: ${commandName}`);
        };
    });
}
