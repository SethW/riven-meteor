Meteor.startup(function () {
  var characterFiles = [
    'characters/dusk-ranger.yaml',
    'characters/starfire.yaml',
    'characters/goodwin-paladin.yaml',
  ];
  var yaml = require('yaml-js');
  characterFiles.forEach(function(characterFile) {
    var characterText = Assets.getText(characterFile);
    var character;
    try {
      character = yaml.load(characterText);
    } catch(e) {
      console.log(`ERROR IMPORTING ${characterFile}.  Please check the yaml is valid: http://www.yamllint.com/`);
      process.exit(1);  // Hard fail
    }

    // Validate object to schema
    try {
      Schema.Characters.validate(character);
    } catch(e) {
      console.log(`ERROR IMPORTING ${characterFile}.  This character is invalid.  See below:`);
      console.log(e);
      process.exit(1);  // Hard fail
    }

    var oldCharacter = Characters.findOne(character._id);
    if (JSON.stringify(character) !== JSON.stringify(oldCharacter)) {
      console.log(`CHARACTER UPDATED ${character._id} from ${characterFile}`);
      Characters.remove(character._id);
      Characters.insert(character);
    } else {
      console.log(`CHARACTER UP TO DATE ${character._id} from ${characterFile}`);
    }

  }); // Character File Loop
});
