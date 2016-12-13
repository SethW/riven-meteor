// These are sent to all clients
Meteor.publish('allCharacters', function() {
  return Characters.find();
});
