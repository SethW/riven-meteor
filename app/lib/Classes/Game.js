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
  addCharacter: function(playerId, character){
    this.players[playerId].addCharacter(character);
    Session.set('GameData', this);
  },
  addPlayer: function(player){
    this.players.push(player);
    Session.set('GameData', this);
  },
};

if(Meteor.isClient){
  var gameData = Session.get('GameData');
  for (var key in gameData) {
    Game[key] =  gameData[key];
  }
}
