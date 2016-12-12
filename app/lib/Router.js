// Default route configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {  // These will be available to all routes
    return [
      //Meteor.subscribe('characters'),
    ];
  },
});

Router.route('/', {
  name: 'home',
  action: function () {
     if(!Session.get('CurrentGame')){
       return Router.go('game-setup');
     }else{
       return Router.go('controls');
     }
   }
});

Router.route('controls');
Router.route('game-setup');
