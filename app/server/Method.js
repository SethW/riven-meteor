Meteor.methods({
  'say'(sayThis){
    var say = require('say');
    say.speak(sayThis, 'Victoria', function (error) {
      if (error) {
        console.log(error);
      }
    });

  },

});
