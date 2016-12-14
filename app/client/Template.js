Template.registerHelper('log', function(thing) {
  if (!thing) thing = this;
  console.log(thing);
});

Template.registerHelper('SessionGet', function(thing) {
  return Session.get(thing);
});

Template.registerHelper('loop', function(count) {
  var countArr = [];
  for (var i = 1; i <= count; i++){
    countArr.push(i);
  }
  return countArr;
});
