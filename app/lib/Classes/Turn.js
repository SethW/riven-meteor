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
          if(Array.isArray(this.activeCharacter.effects)){
            for(var e = 0; e < this.activeCharacter.effects.length; e++){
              Game.characterProcessEffect(this.activeCharacter, this.activeCharacter.effects[e].activate);
            }
          }
        }else{
          this.log = this.log + '<br/>Sorry, that character is no longer with us';
        }
      }else{
        this.log = this.log + '<br/>Sorry, couldn\'t find that character';
      }
    }
    Session.set('GameData', Game);
    Session.set('TurnData', this);
  },
  takeAction: function (command) {
    var filterInput = FilterInput(command);
    if(filterInput){
      command = filterInput.raw;
      if(!filterInput.special){
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
                  if(Array.isArray(this.activeCharacter.effects)){
                    for(var e = 0; e < this.activeCharacter.effects.length; e++){
                      Game.characterProcessEffect(this.activeCharacter, this.activeCharacter.effects[e].action);
                    }
                  }
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
      }else{ //This is a special action
        if(filterInput.special == 'remove-effect'){
          if(Array.isArray(this.activeCharacter.effects)){
            var effectRegex;
            var firstLetterLower;
            var firstLetterUpper;
            var restOfName;
            for(var e = 0; e < this.activeCharacter.effects.length; e++){
              effectRegex = new RegExp('(((remove )|(cancel ))([ea]ffect ){0,1})('+this.activeCharacter.effects[e].name+')', 'ig');
              if(effectRegex.test(filterInput.raw)){
                if(this.activeCharacter.effects[e].removeCosts <= this.actionCount){
                  this.actionCount = this.actionCount - this.activeCharacter.effects[e].removeCosts;
                  this.log = this.log + '<br/>'+this.activeCharacter.effects[e].name+' has been removed';
                  Game.characterUnsetEffect(this.activeCharacter, this.activeCharacter.effects[e].id);
                }else{
                  this.log = this.log + '<br/>You do not have enough actions to do that';
                }
              }
            }
          }
        }else{
          this.log = this.log + '<br/>Sorry, couldn\'t find that action';
        }
      }
    }
    if(this.actionCount <=0 ){
      this.finish();
    }
    Session.set('TurnData', this);
    Session.set('GameData', Game);
  },
  finish: function () {
    if(Array.isArray(this.activeCharacter.effects)){
      for(var e = 0; e < this.activeCharacter.effects.length; e++){
        Game.characterProcessEffect(this.activeCharacter, this.activeCharacter.effects[e].finish);
      }
    }
    this.activeCharacter = false;
    this.turnSteps = ['init','activate', 'finish'];
    this.step = 'init';
    this.action = false;
    this.actionCount = 0;
    this.log = this.log + '<br/>Finished turn';
    Session.set('TurnData', this);
    Session.set('GameData', Game);
  }
};

if(Meteor.isClient){
  var turnData = Session.get('TurnData');
  for (var key in turnData) {
    Turn[key] =  turnData[key];
  }
}
