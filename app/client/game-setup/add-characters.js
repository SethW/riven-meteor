Template.AddCharacters.events({
  'submit #add-characters': function(e, instance){
    e.preventDefault();
    console.log('Add Character submited');
    var $form = $(e.target);
    var playerNumber = $form.find('#player-number').val();
    var characterId = $form.find('#character-id').val();
    var characterLabel = $form.find('#character-label').val();
    var baseCharacter = Characters.findOne(characterId);
    console.log(baseCharacter);
    if(typeof baseCharacter !== 'undefined'){
      character = Character(characterId, characterLabel, baseCharacter);
      console.log(character);
      $form.find('.form-message').html("Yay");
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  }
});
