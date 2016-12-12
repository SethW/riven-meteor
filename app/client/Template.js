Template.registerHelper('log', function(thing) {
  if (!thing) thing = this;
  console.log(thing);
});

Template.registerHelper('getSession', function(thing) {
  return Session.get(thing);
});
