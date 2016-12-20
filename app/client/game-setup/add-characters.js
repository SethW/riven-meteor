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
    var isValidName = Game.isNameAvailable(characterLabel);
    if(typeof baseCharacter !== 'undefined' && isValidName){
      character = Character(characterId, characterLabel, baseCharacter);
      Game.addCharacter(playerNumber, character);
      $form.find('.form-message').html('Welcome, '+characterLabel+'!');
      $form.find('input[type="text"]').val('');
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  },
  'click .start-game': function(e, instance){
    console.log(1);
    e.preventDefault();
    console.log(2);
    Game.start();
    console.log(3);
    Router.go('/game');
    console.log(4);
  },
});
