Template.controls.rendered = function() {
  if(Session.get('GameData') === undefined){
    Router.go('/');
  }else{
    if(Session.get('GameData').status !== 'running'){
      Router.go('/');
    }
  }
};

Template.controls.helpers({
  formMessage: function(){
    return Turn.message;
  },
});

Template.controls.events({
  'submit #game-control': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var command = $form.find('#controller').val();
    if(Turn.step === 'init'){
      console.log(Turn.activate(command));
    }else if(Turn.step === 'activate'){
      console.log(Turn.takeAction(command));
    }
  },
});
