Template.controls.rendered = function() {
  if(Session.get('GameData') === undefined){
    Router.go('/');
  }else{
    if(Session.get('GameData').status !== 'running'){
      Router.go('/');
    }
  }

  if(Session.get('GameData').voice){
    console.log('Running Voice');
    var speechController = document.querySelector('#speech-controller');
    speechController.start();
    Session.set('waitingForConfirm', false);

    speechController.addEventListener('end', function(e) {
      speechController.start();
    });

    speechController.addEventListener('result', function(e) {
      console.log(e.detail.result);
      if(Session.get('GameData').voice){
        if(/^(controller).+/ig.test(e.detail.result) && !Session.get('waitingForConfirm')){
          var input = $.trim(e.detail.result.replace(/^(controller)/ig, ''));
          $('#controller').val(input);
          Meteor.call('say', input+'. Confirm?');
          Session.set('waitingForConfirm', true);

        }else if(Session.get('waitingForConfirm')){
          if(/(confirm)|(yes)|(affirmative)|(do it)/ig.test(e.detail.result)){
            console.log('Confirmed!');
            $('#game-control').submit();
            Session.set('waitingForConfirm', false);
          }else if(/(no)|(negative)|(cancel)|(stop)/ig.test(e.detail.result)){
            console.log('Do not confirm');
            $('#controller').val('');
            Session.set('waitingForConfirm', false);
          }
        }
      }
      speechController.abort();
    });

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
    Session.set('waitingForConfirm', false);
    var $form = $(e.target);
    var command = $form.find('#controller').val();
    $form.find('#controller').val('');
    if(Turn.step === 'init'){
      Turn.activate(command);
    }else if(Turn.step === 'activate'){
      Turn.takeAction(command);
    }
  },
});
