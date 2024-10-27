const fs = require('fs');
const path = require('path');
const ICharacterRepository = require('../../core/repositories/ICharacterRepository');

class FileCharacterRepository extends ICharacterRepository {
    save(character) {
        const filePath = path.join(__dirname, '../../data/character', `${character.name}.json`);
        fs.writeFileSync(filePath, JSON.stringify(character, null, 2));
    };

    load(characterName) {
        const filePath = path.join(__dirname, '../../data/character', `${characterName}.json`);

        if (!fs.existsSync(filePath)) return null;
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);

    }
};

module.exports = FileCharacterRepository;