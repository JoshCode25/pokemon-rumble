export default class Pokemon {
    constructor(identifier, level) { //id can be a pokemon's name or number
        this.level = level;

        this.name = '';
        this.id = '';
        this.url = `https://pokeapi.co/api/v2/pokemon/${identifier}`; //adjusts url based on id given
        this.movesList = [];
        this.learnedMovesList = [];
        this.currentMovesList = [];
        this.types = [];
        this.damage = 0;
        this.currentHealth = 100;
        this.baseStats = [];
        this.currentStats = [];
        this.abilities = [];
        this.spriteList = [];
    }

    async getInfo() {
        try{
            const response = await fetch(this.url);
            const data = await response.json();
            this.name = data.name;
            this.id = data.id;
            console.log(data.name);
            console.log(data.stats);

            //get moves
            data.moves.map(async function(move) {
                const moveUrl = move.move.url; //gets move url from pokemon info
                const moveDataResponse = await fetch(moveUrl); //fetch move info
                const moveData = await moveDataResponse.json(); //convert move info to json
                const levelLearned = move.version_group_details[0].level_learned_at; //get info when the pokemon learns the move         
                
                const moveInfo = { //consolidates move info to add to array
                    name: moveData.name,
                    levelLearnedAt: parseInt(levelLearned, 10),
                    accuracy: parseInt(moveData.accuracy, 10),
                    power: parseInt(moveData.power, 10),
                    type: moveData.type.name,
                    damageClass: moveData.damage_class.name
                }
                this.movesList.push(moveInfo);
                if (levelLearned !== 0) { //only adds moves the pokemon will learn naturally by leveling up
                    this.learnedMovesList.push(moveInfo);
                }
                if (this.level >= levelLearned && levelLearned !== 0) { //adds moves to current moves depending on pokemon's level
                    this.currentMovesList.push(moveInfo);
                    if (this.currentMovesList.length > 4) {
                        this.currentMovesList.shift();
                    }
                }
            }, this);

            //get stats
            data.stats.map(async function(stat) {
                const statName = stat.stat.name;
                const baseStatValue = stat.base_stat;
                const baseStat = {name: statName, value: parseInt(baseStatValue)};
                const currentStat = {name: statName, value: 0}
                
                if (statName === 'hp') {
                    currentStat.value = Math.floor((2*parseInt(baseStatValue, 10) + this.level)/100 + 5)
                } else {
                    currentStat.value = Math.floor((2*parseInt(baseStatValue, 10) + this.level)/100 + this.level +10)
                }

                this.baseStats.push(baseStat);
                this.currentStats.push(currentStat)
            }, this);

            //get types
            data.types.map(async function(type) {
                const typeName = type.type.name;
                const typeUrl = type.type.url;
                const typeObject = {name: typeName, url: typeUrl};

                this.types.push(typeObject);

            }, this)

            //get sprites
            for (let spriteKey in data.sprites) {
                const spriteName = spriteKey;
                const spriteUrl = data.sprites[spriteKey];
                const spriteObject = {name: spriteName, url: spriteUrl};

                this.spriteList.push(spriteObject);

            }

        } catch(error) {
            console.log(error);
        } finally {
            console.log(this);
        }
    }

    testThis() {
        console.log(this);
        console.log('Level: ', this.level);
        console.log('Moves List: ', this.movesList);
    }
}