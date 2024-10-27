const Character = require('../../core/entities/character');

class characterService {
    
    static verStatus(charData) {
        const char = new Character(charData);
        console.log(`nome: ${char.name} | id: ${char.id}`);

        return char.getStatus();
    };
};

module.exports = characterService;
