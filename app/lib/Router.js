// Default route configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {  // These will be available to all routes
    return [
      Meteor.subscribe('allCharacters'),
      Meteor.subscribe('allEffects'),
    ];
  },
});

Router.route('/', {
  name: 'home',
});

Router.route('player-numbers', {
  name: 'player-numbers',
});
Router.route('game-setup');
Router.route('/game', {
  name: 'controls',
});
Router.route('show-character', {
  name: 'show-character',
  data: function(){
    return Characters.find().fetch();
  }
});


Router.route('add-characters', {
  name: 'add-characters',

});
