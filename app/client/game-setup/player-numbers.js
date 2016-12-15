Template.PlayerNumbers.rendered = function() {
  if(Session.get('GameData') === undefined){
    Router.go('/');
  }else{
    if(Session.get('GameData').status !== 'setup'){
      Router.go('/');
    }
  }
};

Template.PlayerNumbers.events({
  'submit #setup-step-1': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var numberOfPlayers = $form.find('#player-numbers').val();
    if(!isNaN(numberOfPlayers) && numberOfPlayers >= 2){
      $form.find('.form-message').html("Yay");
      for(var p = 1; p <= numberOfPlayers; p++){
        Game.addPlayer(Player(p));
        Router.go('add-characters');
      }
    }else{
      $form.find('.form-message').html("Sorry, thats not valid");
    }
  }
});
