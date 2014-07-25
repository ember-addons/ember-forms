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
