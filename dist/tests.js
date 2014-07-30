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

var FormController, FormControllerCustomAction, somePerson;

moduleForComponent('form', 'FormComponent', {
  needs: ['component:form-submit', 'template:components/form-submit-button']
});

FormController = Em.ObjectController.extend({
  actions: {
    submit: function() {
      return ok(true, 'submit action invoked!');
    }
  }
});

FormControllerCustomAction = Em.ObjectController.extend({
  actions: {
    submitNow: function() {
      return ok(true, 'submitNow action invoked!');
    }
  }
});

somePerson = Em.Object.create({
  name: 'asaf',
  errors: Ember.Object.create(),
  validate: function() {
    var promise;
    promise = new Ember.RSVP.Promise(function(resolve) {
      return resolve("ok");
    });
    return promise;
  }
});

test("Form rendering", function() {
  var component;
  component = this.subject();
  equal(this.$().attr("role"), "form", 'form has role.');
  ok($.find('form').get(0), 'form got rendered.');
  ok(!component.get('model'), 'model does not exist.');
  return ok(this.$().find('button').get(0), 'submit button has rendered');
});

test("Submit button rendering", function() {
  var component;
  component = this.subject();
  ok(this.$().find('button').get(0), "submit button got rendered.");
  Ember.run(function() {
    return component.set('submit_button', false);
  });
  return ok(!this.$().find('button').get(0), 'no submit button.');
});

test("form.layout", function() {
  var component;
  component = this.subject();
  component.set('form_layout', 'form');
  ok(this.$().hasClass('form'));
  ok(!this.$().hasClass('form-inline'));
  ok(!this.$().hasClass('form-horizontal'));
  ok(component.get('isDefaultLayout'));
  ok(!component.get('isInline'));
  ok(!component.get('isHorizontal'));
  Ember.run(function() {
    return component.set('form_layout', 'inline');
  });
  ok(this.$().hasClass('form-inline'));
  ok(!this.$().hasClass('form'));
  ok(!this.$().hasClass('form-horizontal'));
  ok(!component.get('isDefaultLayout'));
  ok(component.get('isInline'));
  ok(!component.get('isHorizontal'));
  Ember.run(function() {
    return component.set('form_layout', 'horizontal');
  });
  ok(this.$().hasClass('form-horizontal'));
  ok(!this.$().hasClass('form-inline'));
  ok(!this.$().hasClass('form'));
  ok(!component.get('isDefaultLayout'));
  ok(!component.get('isInline'));
  return ok(component.get('isHorizontal'));
});

test("Ensure model is set", function() {
  var component;
  component = this.subject({
    model: somePerson
  });
  return equal(component.get('model.name'), 'asaf', 'model was set.');
});

test("Form cannot be submitted if model is invalid", function() {
  var $component, component;
  expect(0);
  component = this.subject({
    targetObject: FormController.create(),
    model: somePerson
  });
  $component = this.append();
  Ember.run(function() {
    return component.get('model').set('isValid', false);
  });
  return click('button');
});

test("Form can be submitted if a validation supported model is valid", function() {
  var $component, component;
  expect(1);
  component = this.subject({
    targetObject: FormController.create(),
    model: somePerson
  });
  $component = this.append();
  Ember.run(function() {
    return component.get('model').set('isValid', true);
  });
  return click('button');
});

test("Form submission with custom action", function() {
  var $component, component;
  expect(1);
  component = this.subject({
    targetObject: FormControllerCustomAction.create(),
    model: somePerson
  });
  $component = this.append();
  Ember.run(function() {
    component.get('model').set('isValid', true);
    return component.set('action', 'submitNow');
  });
  return click('button');
});

test("Form submission with a model that has no validation support and no isValid property should be submitted", function() {
  var $component, component;
  expect(1);
  component = this.subject({
    targetObject: FormController.create(),
    model: {}
  });
  $component = this.append();
  return click('button');
});

moduleForComponent('form-control-help', 'Form Control Help Component');

test("Form Control Help rendering", function() {
  var component;
  component = this.subject();
  return ok(this.$().hasClass('help-block'), 'DOM element has default css class');
});

test("Help extra css class", function() {
  var component;
  component = this.subject({
    extraClass: 'foo'
  });
  return ok(this.$().hasClass('foo'), 'has extra css class');
});

test("Help text is rendered properly", function() {
  var component;
  component = this.subject({
    text: 'Hello'
  });
  return equal(this.$().text(), 'Hello', 'Help text is rendered.');
});

test("Help properties", function() {
  var component;
  component = this.subject();
  ok(!this.$().text());
  ok(!component.get('helpText'), 'no help text');
  ok(!component.get('hasHelp'), 'hasHelp is false');
  ok(!component.get('hasError'), 'hasError is false');
  Em.run(function() {
    return component.set('text', 'Hello!');
  });
  equal(this.$().text(), 'Hello!', 'Help text is rendered.');
  ok(component.get('helpText'), 'has help text');
  ok(component.get('hasHelp'), 'hasHelp is true');
  return ok(!component.get('hasError'), 'hasError is false');
});

test("Help error binding", function() {
  var component;
  component = this.subject({
    model: Em.Object.create({
      name: 'asaf',
      errors: Em.Object.create()
    }),
    property: 'name'
  });
  this.$();
  ok(!component.get('hasError', 'hasError is false as there is no errors at all.'));
  Em.run(function() {
    return component.set('model.errors.age', ['age!']);
  });
  ok(!component.get('hasError'), 'hasError is false if errors has some props but not the bound prop');
  ok(!component.get('helpText'), 'no help text if errors has some props but not the bound prop');
  ok(!component.get('hasHelp'), 'hasHelp is false if errors has some props but not the bound prop');
  Em.run(function() {
    return component.set('model.errors.name', ['name!']);
  });
  ok(component.get('hasError'), 'hasError is true if prop has array with errors');
  ok(component.get('hasHelp'), 'has help text');
  equal(component.get('helpText'), 'name!', 'Help error text found!');
  Em.run(function() {
    return component.set('model.errors.name', []);
  });
  ok(!component.get('hasError'), 'hasError is false');
  ok(!component.get('helpText'), 'no help text');
  return ok(!component.get('hasHelp'), 'hasHelp is false');
});

moduleForComponent('form-group', 'Form Group Component', {
  needs: ['template:components/form-group', 'template:components/formgroup/_form-group', 'template:components/formgroup/_form-group-control', 'template:components/form-label']
});

test("Form Group rendering", function() {
  var component;
  component = this.subject({
    controlView: Em.View.extend({
      template: Em.Handlebars.compile('dummy control')
    })
  });
  ok(this.$().hasClass('form-group'), 'DOM element has default form-group class');
  ok(!component.get('hasLabel'), 'group has no label');
  return Ember.run(function() {
    return component.set('label', 'hello');
  });
});

moduleForComponent('form-label', 'Form Label Component');

test("Label rendering", function() {
  var component;
  component = this.subject({
    "for": 'name'
  });
  equal(this.$().attr("for"), "name", 'form has for property.');
  return ok(this.$().hasClass('control-label'), 'label has default class');
});

test("Label extra css class", function() {
  var component;
  component = this.subject({
    extraClass: 'foo'
  });
  return ok(this.$().hasClass('foo'), 'label has extra css class');
});

test("Label text is set", function() {
  var component;
  component = this.subject({
    text: 'Some Text'
  });
  return ok(this.$().text, 'Some Text');
});

test("Label as block", function() {
  var component;
  component = this.subject({
    template: Em.Handlebars.compile('Hello')
  });
  return equal(this.$().text().trim(), 'Hello', 'Label rendered as block');
});

moduleForComponent('form', 'Form Submit Button Component', {
  needs: ['component:form-submit', 'template:components/form-submit-button']
});

test("Form submit button rendering", function() {
  var component;
  component = this.subject({
    submit_button: false,
    template: Em.Handlebars.compile('{{form-submit text="Submit!"}}')
  });
  this.$();
  equal(this.$().find('button').length, 1, '1 button found.');
  return equal(this.$().find('button').text().trim(), 'Submit!', 'Submit button found.');
});

test("Form submit button is disabled when model isnt valid & enabled when is valid", function() {
  var component;
  component = this.subject({
    submit_button: false,
    template: Em.Handlebars.compile('{{form-submit text="Submit!"}}'),
    model: Em.Object.create({
      isValid: false
    })
  });
  this.$();
  ok(this.$().find('button').attr('disabled'), 'Submit is disabled when model isValid = false');
  Ember.run((function() {
    return component.set('model.isValid', true);
  }));
  return ok(!this.$().find('button').attr('disabled'), 'Submit is enabled when model isValid = true');
});

moduleForComponent('form', 'In Form Mixin', {
  needs: ['component:form-submit', 'template:components/form-submit-button', 'component:form-input', 'component:form-group', 'template:components/form-group', 'template:components/formgroup/_form-group']
});

test("Get form & model", function() {
  var component, form, formGroupView;
  component = this.subject({
    submit_button: false,
    ctrlView: Em.View.extend({
      template: Em.Handlebars.compile('dummy control')
    }),
    template: Em.Handlebars.compile('{{#form-group controlView=view.ctrlView}}nothing{{/form-group}}'),
    foo: 'myForm',
    model: {
      foo: 'bar'
    }
  });
  this.$();
  ok(component.get('childViews').length === 1, '1 form child views found.');
  formGroupView = component.get('childViews')[0];
  ok(formGroupView, 'form-group view found');
  form = formGroupView.get('form');
  ok(form, 'form found');
  equal(form.foo, 'myForm', 'correct form found.');
  ok(formGroupView.get('model'), 'model found');
  return equal(formGroupView.get('model').foo, 'bar', 'correct model instance found.');
});
