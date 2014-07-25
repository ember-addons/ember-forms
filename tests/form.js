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
