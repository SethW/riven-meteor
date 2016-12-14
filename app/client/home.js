Template.home.events({
  'click #newGame': function(e, instance) {
    e.preventDefault();
    if( typeof Session.get('CurrentGame') === 'undefined'){
      Session.set('CurrentGame', Game());
      Router.go('/player-numbers');
    }else{
      alert('There is already a game in place');
    }
  },
  'click #clearGame': function(e, instance) {
    e.preventDefault();
    Session.set('CurrentGame', undefined);
  },
});
