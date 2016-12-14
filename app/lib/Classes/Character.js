Character = function Character(characterId, characterLabel, data){
  var character = {};
	character.characterId = characterId;
	character.characterLabel = characterLabel;

  character.stats = {};
	character.stats.kill_count = 0;
	character.stats.hit_count = 0;
	character.stats.miss_count = 0;
	character.stats.dodge_count = 0;
	character.stats.activate_count = 0;
	character.stats.healed_count = 0;
	character.stats.heal_count = 0;


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

  return character;
};
