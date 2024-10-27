module.exports = {
    name: 'chute',
    description: 'Da um chute',
    execute (message) {
        message.channel.send(`${message.author.username} deu um chute!`);
    }
};