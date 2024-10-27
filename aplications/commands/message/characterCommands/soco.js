module.exports = {
    name: 'soco',
    description: 'Da um soco"',
    execute(message) {
        message.channel.send(`${message.author.username} deu um soco!`);
    }
};

