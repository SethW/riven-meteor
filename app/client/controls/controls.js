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
  turnLog: function(){
    return Session.get('TurnData').log;
  },
  currentStep: function(){
    if(Session.get('TurnData').step === 'init'){
      return 'Please activate a character';
    }else if(Session.get('TurnData').step === 'activate'){
      return 'Give action command';
    }else{
      return 'Processing...';
    }
  },
  activeCharacter: function(){
    return Session.get('TurnData').activeCharacter.characterLabel;
  },
  actionsRemaining: function(){
    return Session.get('TurnData').actionCount;
  },
});

Template.controls.events({
  'submit #game-control': function(e, instance){
    e.preventDefault();
    var $form = $(e.target);
    var command = $form.find('#controller').val();
    $form.find('#controller').val('');
    if(Turn.step === 'init'){
      console.log(Turn.activate(command));
    }else if(Turn.step === 'activate'){
      console.log(Turn.takeAction(command));
    }
  },
});
