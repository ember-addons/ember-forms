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
