// These are sent to all clients
Meteor.publish('allCharacters', function() {
  return Characters.find();
});

Meteor.publish('allEffects', function() {
  return Effects.find();
});
