moduleForComponent('form', 'In Form Mixin', {
  needs: ['component:form-submit', 'template:components/form-submit-button', 'component:form-input', 'component:form-group', 'template:components/form-group', 'template:components/_form-group']
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
