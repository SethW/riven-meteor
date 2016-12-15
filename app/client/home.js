Template.home.events({
  'click #newGame': function(e, instance) {
    e.preventDefault();
    if( Game.status === 'uninit'){
      Game.setup();
      Router.go('/player-numbers');
    }else{
      alert('There is already a game in place');
    }
  },
  'click #clearGame': function(e, instance) {
    e.preventDefault();
    Game.reset();
  },
});
