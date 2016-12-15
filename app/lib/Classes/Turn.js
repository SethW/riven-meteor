Turn = {
  activeCharacter: false,
  turnSteps: ['init','activate', 'takeAction', 'finish'],
  step: 'init',
	action: false,
	actionCount: 0,
  message: '',
  loadStep: function (nextStep) {
    this[nextStep]();
    Session.set('TurnData', this);
  },
  stepBack: function () {
    var stepPosition = this.turnSteps.indexOf(this.step);
    if(stepPosition > 0){
      this.loadStep(this.turnSteps[stepPosition - 1]);
    }else{
      this.stepAgain();
    }
    Session.set('TurnData', this);
  },
  stepForward: function () {
    var stepPosition = this.turnSteps.indexOf(this.step);
    if(stepPosition < (this.turnSteps.length - 1)){
      this.loadStep(this.turnSteps[stepPosition + 1]);
    }else{
      this.stepAgain();
    }
    Session.set('TurnData', this);
  },
  stepAgain: function () {
    this.loadStep(this.step);
    Session.set('TurnData', this);
  },
  activate: function (command) {
    if(FilterInput(command)){
      var character = Game.findCharacter(command);
      if(character){
        if(character.health > 0){
          this.activeCharacter = character;
		      this.actionCount = character.actions;
          this.message = 'Activated '+character.characterLabel;
          this.step = 'activate';
        }else{
          this.message = 'Sorry, that character is no longer with us';
        }
      }else{
        this.message = 'Sorry, couldn\'t find that character';
      }
    }
    Session.set('TurnData', this);
  },
  takeAction: function () {
    Session.set('TurnData', this);
  },
  finish: function () {
    this.activeCharacter = false;
    this.turnSteps = ['init','activate', 'takeAction', 'finish'];
    this.step = 'init';
    this.action = false;
    this.action_count = 0;
    Session.set('TurnData', this);
  }
};

if(Meteor.isClient){
  var turnData = Session.get('TurnData');
  for (var key in turnData) {
    Turn[key] =  turnData[key];
  }
}
