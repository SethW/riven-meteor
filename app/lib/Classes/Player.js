Player = function Player(id){
  var player = {};
  player.characters = [];
  player.id = id;

  player.addCharacter = function(character){
    this.characters.push(character);
  };

  player.findCharacter = function(characterLabel){

  };

  return player;
};
