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
          this.activeCharacter.stats.activateCount++;
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
  takeAction: function (command) {
    if(FilterInput(command)){
      var action = this.activeCharacter.findAction(command);
      if(action){
        if(action.status === 'active'){
          if(action.actions <= self.actionCount){
            var range;
            if(action.range > 0){
              if(command.search('range') >= 0){
                range = command.split('range ');
                range = range[0].split(' ');
                range = parseInt(range[0]);
              }else{
                this.message = 'This action requires a range';
                return;
              }
            }else{
              range = 0;
            }

            if(range <= action.range){
              var targets = Game.findTargets(command);
              if(targets.length >= 1){
                this.activeCharacter.attack(action, targets, {range: range});
                this.actionCount = this.actionCount - action.actions;
              }else{
                this.message = 'No targets round';
              }

            }else{
              this.message = 'The target is out of range';
            }

          }else{
            this.message = 'That action costs too much';
          }
        }else{
          this.message = 'That action is currently unavailable';
        }
      }else{
        this.message = 'Sorry, couldn\'t find that action';
      }
    }
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
