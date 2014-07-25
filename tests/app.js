document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

Ember.Router.reopen({
  location: 'none'
});

Ember.run(function() {
  var App;
  App = window.App = Ember.Application.create({
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION: false,
    LOG_VIEW_LOOKUPS: false
  });
  App.setupForTesting();
  return App.injectTestHelpers();
});

emq.globalize();

setResolver(Ember.DefaultResolver.create({
  namespace: Ember.Forms
}));

QUnit.testStart(function() {
  Ember.run(function() {
    return App.reset();
  });
  return Ember.testing = true;
});

QUnit.testDone(function() {
  return Ember.testing = false;
});

QUnit.done(function() {
  return Ember.run(function() {
    return App.reset();
  });
});
