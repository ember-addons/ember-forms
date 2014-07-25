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
