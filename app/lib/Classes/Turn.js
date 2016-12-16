Turn = {
  activeCharacter: false,
  turnSteps: ['init','activate', 'finish'],
  step: 'init',
	action: false,
	actionCount: 0,
  message: '',
  reset: function(){
    this.activeCharacter = false;
    this.turnSteps = ['init','activate', 'takeAction', 'finish'];
    this.step = 'init';
  	this.action = false;
  	this.actionCount = 0;
    this.log = '';
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
          this.log = 'Activated '+character.characterLabel;
          this.step = 'activate';
        }else{
          this.log = this.log + '<br/>Sorry, that character is no longer with us';
        }
      }else{
        this.log = this.log + '<br/>Sorry, couldn\'t find that character';
      }
    }
    Session.set('TurnData', this);
  },
  takeAction: function (command) {
    if(FilterInput(command)){
      var action = Game.characterFindAttack(this.activeCharacter, command);
      if(action){
        if(action.status === 'active'){
          if(action.actions <= this.actionCount){
            var range;
            if(action.range > 0){
              if(command.search('range') >= 0){
                range = command.split('range');
                range = range[1].split(' ');
                range = parseInt(range[1]);
              }else{
                this.log = this.log + '<br/>This action requires a range';
                Session.set('TurnData', this);
                return;
              }
            }else{
              range = 0;
            }

            if(range <= action.range){
              var targets = Game.findTargets(command);
              if(targets.length >= 1){
                console.log('Action validated');
                Game.characterAttack(this.activeCharacter, action, targets, {range: range});
                this.actionCount = this.actionCount - action.actions;
              }else{
                this.log = this.log + '<br/>No targets round';
              }

            }else{
              this.log = this.log + '<br/>The target is out of range';
            }

          }else{
            this.log = this.log + '<br/>That action costs too much';
          }
        }else{
          this.log = this.log + '<br/>That action is currently unavailable';
        }
      }else{
        this.log = this.log + '<br/>Sorry, couldn\'t find that action';
      }
    }
    if(this.actionCount <=0 ){
      this.finish();
    }
    Session.set('TurnData', this);
  },
  finish: function () {
    this.activeCharacter = false;
    this.turnSteps = ['init','activate', 'finish'];
    this.step = 'init';
    this.action = false;
    this.actionCount = 0;
    Session.set('TurnData', this);
  }
};

if(Meteor.isClient){
  var turnData = Session.get('TurnData');
  for (var key in turnData) {
    Turn[key] =  turnData[key];
  }
}
