Template.registerHelper('log', function(thing) {
  if (!thing) thing = this;
  console.log(thing);
});

Template.registerHelper('SessionGet', function(thing) {
  return Session.get(thing);
});

Template.registerHelper('numberOfPlayers', function(thing) {
  return Game.players.length;
});

Template.registerHelper('getPlayers', function(thing) {
  return Session.get('GameData').players;
});


Template.registerHelper('loop', function(count) {
  var countArr = [];
  for (var i = 1; i <= count; i++){
    countArr.push(i);
  }
  return countArr;
});

Template.registerHelper('minus', function(a, b) {
  return parseInt(a) - parseInt(b);
});

Template.registerHelper('plus', function(a, b) {
  return parseInt(a) + parseInt(b);
});

Template.registerHelper('isVoiceEnabled', function(a, b) {
  return Session.get('GameData').voice;
});
