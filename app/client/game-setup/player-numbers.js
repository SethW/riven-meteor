Template.PlayerNumbers.events({
  'submit #setup-step-1': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var numberOfPlayers = $form.find('#player-numbers').val();
    if(!isNaN(numberOfPlayers) && numberOfPlayers >= 2){
      $form.find('.form-message').html("Yay");
      Session.set('numberOfPlayers', numberOfPlayers);
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  }
});
