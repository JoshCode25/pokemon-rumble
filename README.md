# Pokemon Rumble

I tend to start out with dreams too big for the time I have available. My ultimate goal for this repo is to make a Tactics style Pokemon experience where a player would move his/her pokemon around a grid to battle/catpure other pokemon.

What's shown now is a way for me to develop the getNewPokemon() function and confirm I was organizing the data I'm fetching from PokeApi.co correctly.

I can now fetch a pokemon by name or ID of any level and will be returned with an object containing:

1. Stats calculated based on the pokemon's level and base stats

2. A list of moves learned naturally as it's leveled up - with accuracy, type, and power information

3. Lists of moves still to be learned by leveling up or moves allowed to be learned by TM

4. Where it falls in it's evolution chain and information on the other stages to check when an evolution will trigger
