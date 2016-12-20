Meteor.methods({
  'say'(sayThis){
    if(Game.voice){
      var say = require('say');
      say.speak(sayThis, 'Victoria', function (error) {
        if (error) {
          console.log(error);
        }
      });
    }

  },

});
