Template.PlayerNumbers.events({
  'submit #setup-step-1': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var numberOfPlayers = $form.find('#player-numbers').val();
    if(!isNaN(numberOfPlayers) && numberOfPlayers >= 2){
      $form.find('.form-message').html("Yay");
      CurrentGame = Session.get('CurrentGame');
      for(var p = 1; p <= numberOfPlayers; p++){
        CurrentGame.addPlayer(Player(p));
      }
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  }
});
