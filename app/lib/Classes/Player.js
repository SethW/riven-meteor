Player = function Player(id){
  var player = {};
  player.characters = [];
  player.id = id;

  player.addCharacter = function(character){
    this.characters.push(character);
  };

  player.findCharacter = function(characterLabel){
    for(var c = 0; c < this.characters.length; c++){
      if(this.characters[c].characterLabel === characterLabel){
        return this.characters[c];
      }
    }
  };

  return player;
};
