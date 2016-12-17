Meteor.startup(function () {
  var effectsFiles = [
    'effects/fire.yaml',
  ];
  var yaml = require('yaml-js');
  effectsFiles.forEach(function(effectFile) {
    var effectText = Assets.getText(effectFile);
    var effect;
    try {
      effect = yaml.load(effectText);
    } catch(e) {
      console.log(`ERROR IMPORTING ${effectFile}.  Please check the yaml is valid: http://www.yamllint.com/`);
      process.exit(1);  // Hard fail
    }

    // Validate object to schema
    try {
      Schema.Effects.validate(effect);
    } catch(e) {
      console.log(`ERROR IMPORTING ${effectFile}.  This effect is invalid.  See below:`);
      console.log(e);
      process.exit(1);  // Hard fail
    }

    var oldEffect = Effects.findOne(effect._id);
    if (JSON.stringify(effect) !== JSON.stringify(oldEffect)) {
      console.log(`EFFECT UPDATED ${effect._id} from ${effectFile}`);
      Effects.remove(effect._id);
      Effects.insert(effect);
    } else {
      console.log(`EFFECT UP TO DATE ${effect._id} from ${effectFile}`);
    }

  }); // Character File Loop
});
