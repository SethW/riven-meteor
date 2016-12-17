Effect = function Effect(effectObj){
  var effect = {};

  effect.id = effectObj._id;
  effect.name = effectObj.name;
  effect.removeCosts = effectObj.removeCosts;
  effect.turnsAffected = effectObj.turnsAffected;

  effect.turnCount = 0;

  effect.start = effectObj.start;
  effect.activate = effectObj.activate;
  effect.action = effectObj.action;
  effect.finish = effectObj.finish;
  effect.end = effectObj.end;

  return effect;
};
