Game = {
  status: 'uninit',
  players: [],
  voice: false,
  setup: function(){
    this.status = 'setup';
    Session.set('GameData', this);
  },
  reset: function() {
    this.status = 'uninit';
    this.players = [];
    Turn.reset();
    Session.set('GameData', undefined);
  },
  start: function(){
    this.status = 'running';
    Session.set('GameData', this);
  },
  enableVoice: function(){
    this.voice = true;
    console.log('setting voice to enabled');
    console.log(this);
    Session.set('GameData', this);
  },
  disableVoice: function(){
    this.voice = false;
    Session.set('GameData', this);
  },
  toggleVoice: function(){
    if(this.voice){
      this.voice = false;
    }else{
      this.voice = true;
    }
    Session.set('GameData', this);
  },
  findCharacter: function(characterLabel){
    for(var p = 0; p < this.players.length; p++){
      for(var c = 0; c < this.players[p].characters.length; c++){
        if(new RegExp('('+this.players[p].characters[c].characterLabel+')', 'ig').test(characterLabel)){
          return this.players[p].characters[c];
        }
      }
    }
  },
  isNameAvailable: function(name){
    var invalidNames = ['cancel', 'end', 'activate', 'turn', 'game', 'range', 'effect', 'affect', 'remove'];
    var effects = Effects.find().fetch();
    for(var e = 0; e < effects.length; e++){
      invalidNames.push(effects[e].name);
    }

    for(var p = 0; p < Game.players.length; p++){
      for(var c = 0; c < Game.players[p].characters.length; c++){
        invalidNames.push(Game.players[p].characters[c].characterLabel);
      }
    }

    for(var i = 0; i < invalidNames.length; i++){
      if(new RegExp('('+invalidNames[i]+')').test(name)){
        return false;
      }
    }
    return true;
  },
  findTargets: function(command){
    var targets = [];
    for(var p = 0; p < this.players.length; p++){
      for(var c = 0; c < this.players[p].characters.length; c++){
        if(new RegExp('('+this.players[p].characters[c].characterLabel+')', 'ig').test(command)){
          targets.push(this.players[p].characters[c]);
        }
      }
    }
    return targets;
  },
  addCharacter: function(playerId, character){
    this.players[playerId].characters.push(character);
    Session.set('GameData', this);
  },
  addPlayer: function(player){
    this.players.push(player);
    Session.set('GameData', this);
  },


  characterFindAttack: function(character, inputString){
    if(character.attacks !== undefined){
      for(var at = 0; at < character.attacks.length; at++){
        if(new RegExp('('+character.attacks[at].name+')', 'ig').test(inputString)){
          return character.attacks[at];
        }
      }
    }

    if(character.abilities !== undefined){
      for(var ab = 0; ab < character.abilities.length; ab++){
        if(new RegExp('('+character.abilities[at].name+')', 'ig').test(inputString)){
          return character.abilities[ab];
        }
      }
    }
  },

  characterAttack: function(character, attack, targets, modifiers){
    var target;
    for(var t = 0; t < targets.length; t++){
      target = targets[t];
      var result;

      var rangeMod = 0;
      var attackPower = 0;
      var dice;
      var power;
      var numRolls;
      var sides;
      var actionResult;
      var rangeRatio;

      if(attack.types.indexOf('heal') >= 0){
        if(attack.types.indexOf('ranged') >= 0){
          rangeRatio = (Math.round(modifiers.range / attack.range)*100);
          rangeMod = GetRandomInt(0, rangeRatio);
        }else{
          rangeMod = 0;
        }

        for(power = 0; power < attack.power.length; power++){
          sides = attack.power[power].options.split(',');
          for( numRolls = 0; numRolls < attack.power[power].multiplier; numRolls++){
            attackPower = attackPower + parseInt(sides[GetRandomInt(0, sides.length-1)]);
          }
        }

        actionResult = Game.characterHeal(target, attackPower, {range: modifiers.range, accuracy: attack.accuracy, effects: attack.effects, types: attack.types, characterTypes: character.types});
        if(actionResult.success){
          character.stats.healCount++;
        }
      }

      if(attack.types.indexOf('remedy') >= 0){

      }

      Game.attack = attack;

      if(attack.types.indexOf('ranged') >= 0){
        rangeRatio = (Math.round(modifiers.range / attack.range)*100);
        rangeMod = GetRandomInt(0, rangeRatio);

        for(power = 0; power < attack.power.length; power++){
          sides = attack.power[power].options.split(',');
          for( numRolls = 0; numRolls < attack.power[power].multiplier; numRolls++){
            attackPower = attackPower + parseInt(sides[GetRandomInt(0, sides.length-1)]);
          }
        }

        //Now the character defends
        actionResult = Game.characterDefend(target, attackPower, {range: modifiers.range, accuracy: attack.accuracy, effects: attack.effects, types: attack.types, characterTypes: character.types});

        if(actionResult.kill){
          character.stats.killCount++;
        }
        if(actionResult.success){
          character.stats.hitCount++;
        }else{
          character.stats.missCount++;
        }

      }

      if(attack.types.indexOf('melee') >= 0){
        for(power = 0; power < attack.power.length; power++){
          sides = attack.power[power].options.split(',');
          for( numRolls = 0; numRolls < attack.power[power].multiplier; numRolls++){
            attackPower = attackPower + parseInt(sides[GetRandomInt(0, sides.length-1)]);
          }
        }

        //Now the character defends
        actionResult = Game.characterDefend(target, attackPower, {range: 0, accuracy: attack.accuracy, effects: attack.effects, types: attack.types, characterTypes: character.types});

        if(actionResult.kill){
          character.stats.killCount++;
        }
        if(actionResult.success){
          character.stats.hitCount++;
        }else{
          character.stats.missCount++;
        }

      }

    }
    Game.charcterCheckConditions(character);
    Session.set('GameData', this);
  },
  characterHeal: function(character, healPower, modifiers){
    var result = {};
    if(GetRandomInt(0, 100) <= modifiers.accuracy){
      result.success = true;
      character.health = character.health + healPower;
      if(character.health > character.maxHealth){
        character.health = character.maxHealth;
      }
      character.stats.healedCount++;
      Turn.log = Turn.log + '<br/>'+character.characterLabel+' healed. Health is now '+character.health;
    }else{
      result.success = false;
      Turn.log = Turn.log + '<br/>Heal missed';
    }
    Game.charcterCheckConditions(character);
    Session.set('GameData', this);
    return result;
  },
  characterRemedy: function(character, attackPower, modifiers){
    return;
  },
  characterDefend: function(character, attackPower, modifiers){
    var result = {};
    var dodgeFactor = character.dodge - modifiers.accuracy;
    if(dodgeFactor < 0){
      dodgeFactor = 0;
    }
    result.dodge = dodgeFactor;
    var attackValue = attackPower - character.armor;
    if(attackValue < 0){
      attackValue = 0;
    }
    result.attackValue = attackValue;
    if(GetRandomInt(0, 100) >= dodgeFactor){
      Turn.log = Turn.log + '<br/>Hit '+character.characterLabel;
      Turn.log = Turn.log + '<br/>'+character.characterLabel+' lost '+attackValue+' health';
      result.success = true;
      if(Array.isArray(modifiers.effects)){
        for(var e = 0; e < modifiers.effects.length; e++){
          Game.characterSetEffect(character, modifiers.effects[e]);
        }
      }

      if(character.health <= attackValue ){
        result.kill = true;
        character.health = 0;
        Turn.log = Turn.log + '<br/>'+character.characterLabel+' has fallen';
        if(Game.voice){
          Meteor.call('say', character.characterLabel+' has fallen');
        }
      }else{
        character.health = character.health - attackValue;
      }

    }else{ //It is a miss
      Turn.log = Turn.log + '<br/>Missed '+character.characterLabel;
      character.stats.dodgeCount++;
      result.success = false;

    }
    Game.charcterCheckConditions(character);
    Session.set('TurnData', Turn);
    Session.set('GameData', this);
    return result;
  },
  characterSetEffect: function(character, effectId){
    var effectFound = false;
    for(var e = 0; e < character.effects.length; e++){
      if(character.effects[e].id == effectId){
        effectFound = true;
      }
    }
    if(!effectFound){
      var effect =  Effect(Effects.findOne(effectId));
      character.effects.push(effect);
      var effectResults = Game.characterProcessEffect(character, effect.start);
    }
    Session.set('TurnData', Turn);
    Session.set('GameData', this);
  },

  characterUnsetEffect: function(character, effectId){
    var effect =  Effect(Effects.findOne(effectId));
    var effectResults = Game.characterProcessEffect(character, effect.end);
    for(var e = 0; e < character.effects.length; e++){
      if(character.effects[e].id == effectId){
        var effectKey = e;
      }
    }
    character.effects = character.effects.splice(e,1);

    Session.set('TurnData', Turn);
    Session.set('GameData', this);
  },

  characterProcessEffect: function(character, effectRules){
    if(Array.isArray(effectRules)){
      for(var e = 0; e < effectRules.length; e++){
        var effect = effectRules[e];

        if(effect.operation === '-'){
          character[effect.key] = character[effect.key] - effect.value;
        }

        if(effect.operation === '+'){
          character[effect.key] = character[effect.key] + effect.value;
        }

        if(effect.operation === '='){
          character[effect.key] = effect.value;
        }

        if(character[effect.key] < 0){
          character[effect.key] = 0;
        }
        if(character.health === 0){
          Turn.log = Turn.log + '<br/>'+character.characterLabel+' has fallen';
          if(Game.voice){
            Meteor.call('say', character.characterLabel+' has fallen');
          }
        }

      }
    }
    Game.charcterCheckConditions(character);
    Session.set('TurnData', Turn);
    Session.set('GameData', this);
  },

  charcterCheckConditions: function(character){
    for( var c = 0; c < character.conditions.length; c++){
      var condition = character.conditions[c];
      var conditionKey;
      if(condition.type === 'stat'){
        if(condition.compare === '<='){
          if(character[condition.key] <= condition.value && character.activeConditions.indexOf(condition.id) === -1){
            character.activeConditions.push(condition.id);
            Game.processCharacterConditionResults(character, condition.results);
          }else if(character[condition.key] >= condition.value && character.activeConditions.indexOf(condition.id) >= 0){
            for(var acc = 0; acc < character.activeConditions.length; acc++){
              if(character.activeConditions[acc] === condition.id){
                conditionKey = acc;
              }
            }
            if(conditionKey >= 0 ){
              console.log('Remove Condition');
              character.activeConditions.splice(conditionKey,1);
              Game.unprocessCharacterConditionResults(character, condition.results);
            }
          }
        }else if(condition.compare === '>='){
          if(character[condition.key] >= condition.value && character.activeConditions.indexOf(condition.id) === -1){
            console.log('Condition Triggered');
            character.activeConditions.push(condition.id);
            Game.processCharacterConditionResults(character, condition.results);
          }else if(character[condition.key] <= condition.value && character.activeConditions.indexOf(condition.id) >= 0){
            for(var accc = 0; accc < character.activeConditions.length; accc++){
              if(character.activeConditions[accc] === condition.id){
                conditionKey = accc;
              }
            }
            if(conditionKey >= 0){
              character.activeConditions.splice(conditionKey,1);
              Game.unprocessCharacterConditionResults(character, condition.results);
            }
          }
        }else if(condition.compare === '='){
          if(character[condition.key] == condition.value && character.activeConditions.indexOf(condition.id) === -1){
            character.activeConditions.push(condition.id);
            Game.processCharacterConditionResults(character, condition.results);
          }else if(character[condition.key] != condition.value && character.activeConditions.indexOf(condition.id) >= 0){
            for(var acccc = 0; acccc < character.activeConditions.length; acccc++){
              if(character.activeConditions[acccc] === condition.id){
                conditionKey = acccc;
              }
            }
            if(conditionKey >= 0){
              character.activeConditions.splice(conditionKey,1);
              Game.unprocessCharacterConditionResults(character, condition.results);
            }
          }
        }

      }
    }
    Session.set('TurnData', Turn);
    Session.set('GameData', this);
  },

  processCharacterConditionResults: function(character, conditionResult){
    var singleStats = ['value', 'actions', 'movement', 'dodge', 'armor'];
    for(var ss = 0; ss < singleStats.length; ss++){
      if(conditionResult[singleStats[ss]] !== undefined){
        if(conditionResult[singleStats[ss]].operation === '-'){
          character[singleStats[ss]] = character[singleStats[ss]] - conditionResult[singleStats[ss]].value;
        }else if(conditionResult[singleStats[ss]].operation === '+'){
          character[singleStats[ss]] = character[singleStats[ss]] + conditionResult[singleStats[ss]].value;
        }
      }
    }

    if(conditionResult.types !== undefined){
      for(var lt = 0; lt < conditionResult.types.length; lt++){
        if(character.types.indexOf(conditionResult.types[lt]) === -1){
          character.types.push(conditionResult.types[lt]);
        }
      }
    }

    if(conditionResult.immunities !== undefined){
      for(var li = 0; li < conditionResult.immunities.length; li++){
        if(character.immunities.indexOf(conditionResult.immunities[li]) === -1){
          character.immunities.push(conditionResult.immunities[li]);
        }
      }
    }

    if(conditionResult.attacks !== undefined){
      for(var at = 0; at < conditionResult.attacks.length; at++){
        var attack = conditionResult.attacks[at];
        for( var cat = 0; cat < character.attacks.length; cat++){
          if(character.attacks[cat]._id === attack._id){
            var charactersAttack = character.attacks[cat];
            var attackFields = ['name', 'range', 'status', 'actions', 'area', 'accuracy', 'effects', 'power'];
            for( var attackFieldCount = 0; attackFieldCount < attackFields.length; attackFieldCount++){
              if(attack[attackFields[attackFieldCount]] !== undefined){
                if(attack[attackFields[attackFieldCount]].operation === '-'){
                  charactersAttack[attackFields[attackFieldCount]] = charactersAttack[attackFields[attackFieldCount]] - attack[attackFields[attackFieldCount]].value;
                }else if(attack[attackFields[attackFieldCount]].operation === '+'){
                  charactersAttack[attackFields[attackFieldCount]] = charactersAttack[attackFields[attackFieldCount]] + attack[attackFields[attackFieldCount]].value;
                }
              }
            }
          }
        }
      }
    }

    if(conditionResult.abilities !== undefined){
      for(var ab = 0; ab < conditionResult.abilities.length; ab++){
        var ability = conditionResult.abilities[ab];
        for( var cab = 0; cab < character.abilities.length; cab++){
          if(character.abilities[cab]._id === ability._id){
            var charactersAbilities = character.abilities[cab];
            var abilitiesFields = ['name', 'range', 'status', 'actions', 'area', 'accuracy', 'effects', 'power'];
            for( var abilitiesFieldCount = 0; abilitiesFieldCount < abilitiesFields.length; abilitiesFieldCount++){
              if(ability[abilitiesFields[abilitiesFieldCount]] !== undefined){

                if(ability[abilitiesFields[abilitiesFieldCount]].operation === '-'){
                  charactersAbilities[abilitiesFields[attackFieldCount]] = charactersAbilities[abilitiesFields[attackFieldCount]] - ability[abilitiesFields[abilitiesFieldCount]].value;
                }else if(ability[abilitiesFields[abilitiesFieldCount]].operation === '+'){
                  charactersAbilities[abilitiesFields[attackFieldCount]] = charactersAbilities[abilitiesFields[attackFieldCount]] + ability[abilitiesFields[abilitiesFieldCount]].value;
                }

              }
            }
          }
        }
      }
    }

    Session.set('TurnData', Turn);
    Session.set('GameData', this);

  },


  unprocessCharacterConditionResults: function(character, conditionResult){
    var singleStats = ['value', 'actions', 'movement', 'dodge', 'armor'];
    for(var ss = 0; ss < singleStats.length; ss++){
      if(conditionResult[singleStats[ss]] !== undefined){
        if(conditionResult[singleStats[ss]].operation === '-'){
          character[singleStats[ss]] = character[singleStats[ss]] + conditionResult[singleStats[ss]].value;
        }else if(conditionResult[singleStats[ss]].operation === '+'){
          character[singleStats[ss]] = character[singleStats[ss]] - conditionResult[singleStats[ss]].value;
        }
      }
    }

    if(conditionResult.attacks !== undefined){
      for(var at = 0; at < conditionResult.attacks.length; at++){
        var attack = conditionResult.attacks[at];
        for( var cat = 0; cat < character.attacks.length; cat++){
          if(character.attacks[cat]._id === attack._id){
            var charactersAttack = character.attacks[cat];
            var attackFields = ['name', 'range', 'status', 'actions', 'area', 'accuracy', 'effects', 'power'];
            for( var attackFieldCount = 0; attackFieldCount < attackFields.length; attackFieldCount++){
              if(attack[attackFields[attackFieldCount]] !== undefined){
                if(attack[attackFields[attackFieldCount]].operation === '-'){
                  charactersAttack[attackFields[attackFieldCount]] = charactersAttack[attackFields[attackFieldCount]] + attack[attackFields[attackFieldCount]].value;
                }else if(attack[attackFields[attackFieldCount]].operation === '+'){
                  charactersAttack[attackFields[attackFieldCount]] = charactersAttack[attackFields[attackFieldCount]] - attack[attackFields[attackFieldCount]].value;
                }
              }
            }
          }
        }
      }
    }

    if(conditionResult.abilities !== undefined){
      for(var ab = 0; ab < conditionResult.abilities.length; ab++){
        var ability = conditionResult.abilities[ab];
        for( var cab = 0; cab < character.abilities.length; cab++){
          if(character.abilities[cab]._id === ability._id){
            var charactersAbilities = character.abilities[cab];
            var abilitiesFields = ['name', 'range', 'status', 'actions', 'area', 'accuracy', 'effects', 'power'];
            for( var abilitiesFieldCount = 0; abilitiesFieldCount < abilitiesFields.length; abilitiesFieldCount++){
              if(ability[abilitiesFields[abilitiesFieldCount]] !== undefined){

                if(ability[abilitiesFields[abilitiesFieldCount]].operation === '-'){
                  charactersAbilities[abilitiesFields[attackFieldCount]] = charactersAbilities[abilitiesFields[attackFieldCount]] + ability[abilitiesFields[abilitiesFieldCount]].value;
                }else if(ability[abilitiesFields[abilitiesFieldCount]].operation === '+'){
                  charactersAbilities[abilitiesFields[attackFieldCount]] = charactersAbilities[abilitiesFields[attackFieldCount]] - ability[abilitiesFields[abilitiesFieldCount]].value;
                }

              }
            }
          }
        }
      }
    }

    Session.set('TurnData', Turn);
    Session.set('GameData', this);

  },

};

if(Meteor.isClient){
  var gameData = Session.get('GameData');
  for (var key in gameData) {
    Game[key] =  gameData[key];
  }
}
