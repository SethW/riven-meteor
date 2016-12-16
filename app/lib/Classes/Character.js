Character = function Character(characterId, characterLabel, data){
  var character = {};
	character.characterId = characterId;
	character.characterLabel = characterLabel;

  character.stats = {};
	character.stats.killCount = 0;
	character.stats.hitCount = 0;
	character.stats.missCount = 0;
	character.stats.dodgeCount = 0;
	character.stats.activateCount = 0;
	character.stats.healedCount = 0;
	character.stats.healCount = 0;


	character.health = data.maxHealth;
	character.maxHealth = data.maxHealth;
	character.movement = data.movement;
	character.actions = data.actions;
	character.attacks = data.attacks;
	character.abilities = data.abilities;
	character.type = data.type;
	character.faction = data.faction;
	character.immune = data.immune;
	character.dodge = data.dodge;
	character.armor = data.armor;

	character.new_condition = false;
	character.conditions = data.conditions;

	character.effects = [];


  character.findAction = function(actionString){
    for(var at = 0; a < self.attacks.length; at++){
      if(actionString.search(self.attacks[at].name) !== -1){
        return self.attacks[at];
      }
    }

    for(var ab = 0; a < self.abilities.length; ab++){
      if(actionString.search(self.abilities[ab].name) !== -1){
        return self.abilities[ab];
      }
    }

  };

  character.attack = function(action, targets, modifiers){
    console.log('Attack!');
  };

  return character;
};

if( typeof CurrentGame !== 'undefined'){
  // Load player functions
  for(var p = 0; p < CurrentGame.players.length; p++){

    for(var c = 0; c < CurrentGame.players[p].characters; c++){



    }

  }
}
