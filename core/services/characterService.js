const Character = require('../entities/character');
const FileCharacterRepository = require('../../infrastructure/repositories/FileCharacterRepository');

const repository = new FileCharacterRepository();

class characterService {
    
    static verStatus(characterName) {
        // const char = new Character(charData);
        // console.log(`nome: ${char.name} | id: ${char.id}`);

        // return char.getStatus();

        const character = repository.load(characterName);
        if (!character){
            console.log(`Personagem ${characterName} não encontrado.`);
            return;
        }
        console.log(`Status de ${character.name}: ${JSON.stringify(character)}`);
    };

    static saveCharacter(character) {
        repository.save(character);
        console.log(`Personagem ${character.name} salvo com sucesso!`);
    };
};

module.exports = characterService;
