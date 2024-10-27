module.exports = class Character {

    constructor (charData){

        //------------------------------------------------------

        this.id = charData.id;
        this.name = charData.name;

        // --------------------------- /////////////// EVOLUÇÃO DA FICHA

		this.level = parseInt(charData.level);

        // --------------------------- ///////////////  ATRIBUTOS

		this.con = charData.con;
		this.str = charData.str;
		this.dex = charData.dex;
		this.int = charData.int;
		this.sab = charData.sab;
		this.car = charData.car;
		this.agi = charData.agi;
		this.will = charData.will;

        //------------------------------------------------------

        this.hp = charData.hp;
        this.ap = charData.ap;
        this.hpA = charData.hpA;
		this.apA = charData.enA;

        if (this.hpA < 0) {
            this.hpA = 0;
        };

        if (this.enA < 0) {
            this.enA = 0;
        };

        //------------------------------------------------------

        this.target = charData.target;
        
        //------------------------------------------------------

        this.inventory = charData.inventory;
    };

    getStatus() {
        return `❤️ ${this.hpA}/${this.hp} • 🔘 ${this.enA}/${this.ap} • ⭕️ ${this.tp}`;
    }
}

