Game = function Game(){
  var game = {};
  game.status = 'setup';
  game.players = [];

  game.addPlayer = function(player){
    game.players.push(player);
  };

  game.findCharacter = function(player){

  };

  return game;
};
