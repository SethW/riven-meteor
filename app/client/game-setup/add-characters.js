Template.PlayerNumbers.rendered = function() {
  if(Session.get('GameData') === undefined){
    Router.go('/');
  }else{
    if(Session.get('GameData').status !== 'setup'){
      Router.go('/');
    }
  }
};

Template.AddCharacters.events({
  'submit #add-characters': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var playerNumber = $form.find('#player-number').val();
    var characterId = $form.find('#character-id').val();
    var characterLabel = $form.find('#character-label').val();
    var baseCharacter = Characters.findOne(characterId);
    if(typeof baseCharacter !== 'undefined'){
      character = Character(characterId, characterLabel, baseCharacter);
      Game.addCharacter(playerNumber, character);
      $form.find('.form-message').html('Welcome, '+characterLabel+'!');
      $form.find('input[type="text"]').val('');
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  },
  'click .start-game': function(e, instance){
    e.preventDefault();
    Game.start();
    Router.go('/game');
  },
});
