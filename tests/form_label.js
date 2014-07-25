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
