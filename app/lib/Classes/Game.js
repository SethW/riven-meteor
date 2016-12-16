Game = {
  status: 'uninit',
  players: [],
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
  findCharacter: function(characterLabel){
    for(var p = 0; p < this.players.length; p++){
      for(var c = 0; c < this.players[p].characters.length; c++){
        if(this.players[p].characters[c].characterLabel === characterLabel){
          return this.players[p].characters[c];
        }
      }
    }
  },
  findTargets: function(command){
    var targets = [];
    for(var p = 0; p < this.players.length; p++){
      for(var c = 0; c < this.players[p].characters.length; c++){
        if(command.search(this.players[p].characters[c].characterLabel) !== -1){
          targets.push(this.players[p].characters[c]);
        }
      }
    }
    return targets;
  },
  addCharacter: function(playerId, character){
    this.players[playerId].addCharacter(character);
    Session.set('GameData', this);
  },
  addPlayer: function(player){
    this.players.push(player);
    Session.set('GameData', this);
  },


  characterFindAttack: function(character, inputString){
    for(var at = 0; at < character.attacks.length; at++){
      if(inputString.search(character.attacks[at].name) !== -1){
        return character.attacks[at];
      }
    }

    for(var ab = 0; ab < character.abilities.length; ab++){
      if(inputString.search(character.abilities[ab].name) !== -1){
        return character.abilities[ab];
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

      if(attack.types.indexOf('heal') >= 0){

      }

      if(attack.types.indexOf('remedy') >= 0){

      }
      Game.attack = attack;
      console.log(attack);

      if(attack.types.indexOf('ranged') >= 0){
        console.log('Ranged attack');
        var rangeRatio = (Math.round(modifiers.range / attack.range)*100);
        rangeMod = GetRandomInt(0, rangeRatio);

        for(power = 0; power < attack.power.length; power++){
          sides = attack.power[power].options.split(',');
          for( numRolls = 0; numRolls < attack.power[power].multiplier; numRolls++){
            attackPower = attackPower + parseInt(sides[GetRandomInt(0, sides.length-1)]);
          }
        }

        //Now the character defends
        Game.characterDefend(target, attackPower, {range: modifiers.range, accuracy: attack.accuracy, effects: attack.effects, types: attack.types, characterTypes: character.types});

      }

      if(attack.types.indexOf('melee') >= 0){
        console.log('Melee attack');
        for(power = 0; power < attack.power.length; power++){
          sides = attack.power[power].options.split(',');
          for( numRolls = 0; numRolls < attack.power[power].multiplier; numRolls++){
            attackPower = attackPower + parseInt(sides[GetRandomInt(0, sides.length-1)]);
          }
        }

        //Now the character defends
        Game.characterDefend(target, attackPower, {range: 0, accuracy: attack.accuracy, effects: attack.effects, types: attack.types, characterTypes: character.types});

      }

    }
    Session.set('GameData', this);
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
      character.stats.hitCount++;

      if(character.health <= attackValue ){
        result.kill = true;
        character.health = 0;
        character.stats.killCount++;
        Turn.log = Turn.log + '<br/>'+character.characterLabel+' has fallen';
      }else{
        character.health = character.health - attackValue;
      }

    }else{ //It is a miss
      Turn.log = Turn.log + '<br/>Missed '+character.characterLabel;
      character.stats.dodgeCount++;
      result.success = false;

    }
    Session.set('TurnData', Turn);
    Session.set('GameData', this);
    return result;
  },

};

if(Meteor.isClient){
  var gameData = Session.get('GameData');
  for (var key in gameData) {
    Game[key] =  gameData[key];
  }
}
