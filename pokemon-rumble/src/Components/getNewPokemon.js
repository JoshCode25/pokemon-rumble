import Pokemon from "./pokemonClass.js";

async function getNewPokemon(identifier, level) {
  const newPokemon = new Pokemon(identifier, level);

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${identifier}`; //adjusts url based on id given
    const response = await fetch(url);
    const data = await response.json();
    newPokemon.data = data;
    newPokemon.name = data.name;
    newPokemon.id = data.id;
    newPokemon.baseExperience = data.base_experience;
    newPokemon.currentExperience = Math.pow(newPokemon.level, 3);

    //get moves
    newPokemon.allowableMovesList = await Promise.all(data.moves.map(async function (move) {
      const moveUrl = move.move.url; //gets move url from pokemon info
      const moveDataResponse = await fetch(moveUrl); //fetch move info
      const moveData = await moveDataResponse.json(); //convert move info to json
      return moveData;
    }))

    //reduce to only moves learned naturally in ascending order
    newPokemon.learnedMovesList = data.moves.reduce((runningList, move, i) => {
      const levelLearned = move.version_group_details[0].level_learned_at;

      if (levelLearned !== 0) {

        const moveInfo = { //consolidates move info to add to array
        name: move.move.name,
        levelLearnedAt: parseInt(levelLearned, 10),
        accuracy: parseInt(newPokemon.allowableMovesList[i].accuracy, 10),
        power: parseInt(newPokemon.allowableMovesList[i].power, 10),
        type: newPokemon.allowableMovesList[i].type.name,
        damageClass: newPokemon.allowableMovesList[i].damage_class.name,
        };

        runningList.push(moveInfo);
      }
      
      return runningList;
    }, []).sort((x,y ) => x.levelLearnedAt - y.levelLearnedAt);

    //set latest 4 moves as currently learned moves
    newPokemon.currentMovesList = newPokemon.learnedMovesList.reduce((runningList, move) => {

      if (move.levelLearnedAt <= parseInt(newPokemon.level, 10)) {
        runningList.push(move);
      }
      if (runningList.length > 4) {
        runningList.shift();
      }

      return runningList;
    }, [])
    //   if (newPokemon.level >= levelLearned && levelLearned !== 0) {
    //     //adds moves to current moves depending on pokemon's level
    //     newPokemon.currentMovesList.push(moveInfo);
    //     if (newPokemon.currentMovesList.length > 4) {
    //       newPokemon.currentMovesList.shift();
    //     }
    //   }
    // });

    //get stats
    newPokemon.baseStats = data.stats.map((stat) => {
      const baseInfo = { name: stat.name, value: parseInt(stat.base_stat) };
      return baseInfo;
    });

    newPokemon.currentStats = data.stats.map((stat, i) => {
      let currentName = stat.stat.name;
      let currentValue = 0;
      if (currentName === "hp") {
        currentValue = Math.floor(
          (2 * parseInt(newPokemon.baseStats[i].value, 10) * newPokemon.level) /
            100 + newPokemon.level + 10
        );
      } else {
        currentValue = Math.floor(
          (2 * parseInt(newPokemon.baseStats[i].value, 10) * newPokemon.level) /
            100 +5
        );
      }
      const currentStat = { name: currentName, value: currentValue };
      return currentStat;
    });
    // data.stats.map(async function(stat) {
    //     const statName = stat.stat.name;
    //     const baseStatValue = stat.base_stat;
    //     const baseStat = {name: statName, value: parseInt(baseStatValue)};
    //     const currentStat = {name: statName, value: 0}

    //     if (statName === 'hp') {
    //         currentStat.value = Math.floor((2*parseInt(baseStatValue, 10)*newPokemon.level)/100 + newPokemon.level +10)
    //     } else {
    //         currentStat.value = Math.floor((2*parseInt(baseStatValue, 10)*newPokemon.level)/100 + 5)
    //     }

    //     newPokemon.baseStats.push(baseStat);
    //     newPokemon.currentStats.push(currentStat)
    // });

    //get types
    data.types.map(async function (type) {
      const typeName = type.type.name;
      const typeUrl = type.type.url;
      const typeObject = { name: typeName, url: typeUrl };

      newPokemon.types.push(typeObject);
    });

    //get sprites
    for (let spriteKey in data.sprites) {
      const spriteName = spriteKey;
      const spriteUrl = data.sprites[spriteKey];
      const spriteObject = { name: spriteName, url: spriteUrl };
      if (spriteName !== "versions" && spriteName !== "other") {
        newPokemon.spriteList.push(spriteObject);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(newPokemon);
    return newPokemon;
  }
}

export default getNewPokemon;
