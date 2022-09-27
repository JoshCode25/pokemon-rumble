import Pokemon from "./pokemonClass.js";

async function getNewMoves(data) {

  const newMoves = {
    allowableMovesList: [],
    learnedMovesList: []
  };

  newMoves.allowableMovesList = await Promise.all(data.moves.map(async function (move) {
    const moveUrl = move.move.url; //gets move url from pokemon info
    const moveData = await (await fetch(moveUrl)).json();
    return moveData;
  }))
  
  //reduce to only moves learned naturally in ascending order
  newMoves.learnedMovesList = data.moves.reduce((runningList, move, i) => {
    const levelLearned = move.version_group_details[0].level_learned_at;
  
    if (levelLearned !== 0) {
  
      const moveInfo = { //consolidates move info to add to array
      name: move.move.name,
      levelLearnedAt: parseInt(levelLearned, 10),
      accuracy: parseInt(newMoves.allowableMovesList[i].accuracy, 10),
      power: parseInt(newMoves.allowableMovesList[i].power, 10),
      type: newMoves.allowableMovesList[i].type.name,
      damageClass: newMoves.allowableMovesList[i].damage_class.name,
    };
    
    runningList.push(moveInfo);
    }
  return runningList;

  }, []).sort((x,y ) => x.levelLearnedAt - y.levelLearnedAt); //sort moves to ascending order based on level learned

  return newMoves;
}

async function getNewEvolutionChain(data) {

  let speciesData = await (await fetch(data.species.url)).json();
  let evolutionChainData = await (await fetch(speciesData.evolution_chain.url)).json();
  let newEvolutionChain = {};

  let doesEvolve = (evolutionChainData.chain.evolves_to.length > 0) ? true : false;

  if (doesEvolve) {
    let currentStage = evolutionChainData.chain;
    let stageNumber = 1;
    let triggerType = '';
    let evolutionArray = [];
    let continueNum = 2;
    
    //cycle through evolution stage objects until there isn't a deeper level
    do {
      //if there isn't another level deeper, run one more time
      continueNum = (currentStage.evolves_to.length > 0) ? 2:1;

      triggerType = (continueNum > 1) ? currentStage.evolves_to[0].evolution_details[0].trigger.name : '';

      let pokemonStageInfo = {
        stageNumber : stageNumber,
        stageName : currentStage.species.name,
        stageUrl : '',
      }

      if(triggerType) {
        pokemonStageInfo.evolutionType = triggerType;
        pokemonStageInfo.evolutionTrigger = (triggerType === 'use-item') ? 
          currentStage.evolves_to[0].evolution_details[0].item.name : currentStage.evolves_to[0].evolution_details[0].min_level;
        pokemonStageInfo.evolveToName = currentStage.evolves_to[0].species.name
        pokemonStageInfo.evolveToUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonStageInfo.evolveToName}`;
      } else {
        pokemonStageInfo.evolutionType = 'Final Stage';
        pokemonStageInfo.evolutionTrigger = 'Final Stage';
        pokemonStageInfo.evolveToName = 'Final Stage'
        pokemonStageInfo.evolveToUrl = `Final Stage`;
      }

      pokemonStageInfo.stageUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonStageInfo.stageName}`;

      evolutionArray.push(pokemonStageInfo);
      stageNumber++;
      currentStage = currentStage.evolves_to[0]; //make the next level deeper the current level for the next loop
      continueNum--;

    } while(continueNum > 0)

    //establish current stage evolution info
    newPokemon.evolutionChain = evolutionArray;
    newPokemon.currentStage = newPokemon.evolutionChain.find(stage => stage.stageName === newPokemon.name);
    newPokemon.evolutionType = newPokemon.currentStage.evolutionType;
    newPokemon.evolutionTrigger = newPokemon.currentStage.evolutionTrigger;
    newPokemon.nextStage = (newPokemon.evolutionChain[newPokemon.currentStage.stageNumber]) ? 
      newPokemon.evolutionChain[newPokemon.currentStage.stageNumber] : '';

  }  

}

function getNewTypes(data) {

  let newTypes = data.types.map(function (type) {
    const typeName = type.type.name;
    const typeUrl = type.type.url;
    const typeObject = { name: typeName, url: typeUrl };

    return typeObject;

  });

  return newTypes;
}

function getCurrentMoves(learnedMovesList, Level) {
  
  //set latest 4 moves as currently learned moves
  let currentMovesList = learnedMovesList.reduce((runningList, move) => {
    
    if (move.levelLearnedAt <= Level) {
      runningList.push(move);
    }
    if (runningList.length > 4) {
      runningList.shift();
    }
  
    return runningList;
  }, [])
  
  return currentMovesList;
  
}

function getNewStats(data, level) {
  
  let newStats = {
    baseStats: [],
    currentStats: []
  }

  //get base stats
  newStats.baseStats = data.stats.map((stat) => {
    const baseInfo = { name: stat.stat.name, value: parseInt(stat.base_stat) };
    return baseInfo;
  });
  
  //calculate current stats based on pokemon level
  newStats.currentStats = newStats.baseStats.map((stat, i) => {
    let baseStat = newStats.baseStats[i].value;
    let currentLevel = level;
    let currentName = stat.name;
    let currentValue = 0;
  
    if (currentName === "hp") {
      currentValue = Math.floor((2 * baseStat * currentLevel) / 100 + currentLevel + 10);
    } else {
      currentValue = Math.floor((2 * baseStat * currentLevel) / 100 + 5);
    }
  
    const currentStat = { name: currentName, value: currentValue };
    return currentStat;
  });

  return newStats;

}

function getNewSprites(data) {

  let spriteList = [];

  for (let spriteKey in data.sprites) {
    const spriteName = spriteKey;
    const spriteUrl = data.sprites[spriteKey];
    const spriteObject = { name: spriteName, url: spriteUrl };
    if (spriteName !== "versions" && spriteName !== "other") {
      spriteList.push(spriteObject);
    }
  }

  return spriteList;

}

async function getNewPokemon(identifier, level) {
  const newPokemon = new Pokemon(identifier, level);

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${identifier}`; //adjusts url based on id given
    const response = await fetch(url);
    const data = await response.json();
    newPokemon.speciesData = await (await fetch(data.species.url)).json();
    newPokemon.evolutionData = await (await fetch(newPokemon.speciesData.evolution_chain.url)).json();
    newPokemon.data = data;
    newPokemon.name = data.name;
    newPokemon.id = data.id;
    newPokemon.level = (typeof level === 'number') ? level : parseInt(level, 10);
    newPokemon.baseExperience = data.base_experience;
    newPokemon.currentExperience = newPokemon.level ** 3;

    //get moves
    ({allowableMovesList: newPokemon.allowableMovesList, learnedMovesList: newPokemon.learnedMovesList } 
      = await getNewMoves(newPokemon.data));

    //set learned moves
    newPokemon.currentMovesList = getCurrentMoves(newPokemon.learnedMovesList, newPokemon.level);
    
    //get stats
    ({baseStats: newPokemon.baseStats, currentStats: newPokemon.currentStats} = getNewStats(newPokemon.data, newPokemon.level));

    //get types
    newPokemon.types = getNewTypes(newPokemon.data);

    //get sprites
    newPokemon.spriteList = getNewSprites(data);

    //get evolution info


    return newPokemon;

  } catch (error) {
    console.log(error);
    return error
  } finally {
    console.log(newPokemon);
  }
}

export default getNewPokemon;
