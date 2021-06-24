const pikachu = {
    url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    movesList: [],
    learnedMovesList: [],
    currentMovesList: [],
    types: [],
    level: 10,
    damage: 0,
    currentHealth: 100,
    baseStats: [],
    currentStats: [],
    abilities: [],
    getInfo: async function() {
        try{
            const response = await fetch(pikachu.url);
            const data = await response.json();
            console.log(data);
            console.log(data.stats);
            console.log(data.stats[0].stat.name);
            console.log(data.stats[0].base_stat);

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
                pikachu.movesList.push(moveInfo);
                if (levelLearned !== 0) { //only adds moves the pokemon will learn naturally by leveling up
                    pikachu.learnedMovesList.push(moveInfo);
                }
                if (pikachu.level >= levelLearned && levelLearned !== 0) { //adds moves to current moves depending on pokemon's level
                    pikachu.currentMovesList.push(moveInfo);
                    if (pikachu.currentMovesList.length > 4) {
                        pikachu.currentMovesList.shift();
                    }
                }

            });

            //get stats
            data.stats.map(async function(stat) {
                const statName = stat.stat.name;
                const baseStatValue = stat.base_stat;
                const baseStat = {name: statName, value: parseInt(baseStatValue)};
                const currentStat = {name: statName, value: parseInt(baseStatValue, 10) + pikachu.level};

                pikachu.baseStats.push(baseStat);
                pikachu.currentStats.push(currentStat)
            })

        } catch(error) {
            console.log(error);
        }
    }
}

pikachu.getInfo();