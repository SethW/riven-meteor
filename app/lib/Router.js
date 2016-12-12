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

Router.route('player-numbers');
