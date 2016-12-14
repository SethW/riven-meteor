// Default route configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {  // These will be available to all routes
    return [
      Meteor.subscribe('allCharacters'),
    ];
  },
});

Router.route('/', {
  name: 'home',
  /*action: function () {
     if(!Session.get('CurrentGame')){
       return Router.go('game-setup');
     }else{
       return Router.go('controls');
     }
   }*/
});

Router.route('player-numbers');
Router.route('game-setup');
Router.route('show-character', {
  name: 'show-character',
  data: function(){
    return Characters.find().fetch();
  }
});


Router.route('add-characters', {
  name: 'add-characters',
});
