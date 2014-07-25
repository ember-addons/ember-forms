/*
Form Input

Syntax:
{{em-text property="property name" rows=4}}
 */
Em.Forms.FormTextComponent = Em.Forms.FormGroupComponent.extend({
  controlView: Em.TextArea.extend(Em.Forms.ControlMixin, {
    attributeBindings: ['placeholder'],
    placeholder: Em.computed.alias('parentView.placeholder'),
    model: Em.computed.alias('parentView.model'),
    propertyName: Em.computed.alias('parentView.propertyName'),
    rows: Em.computed.alias('parentView.rows')
  }),
  property: void 0,
  label: void 0,
  placeholder: void 0,
  rows: 4,
  controlWrapper: (function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-10';
    }
    return null;
  }).property('form.form_layout')
});

Ember.Handlebars.helper('em-text', function(options) {
  return Ember.Handlebars.helpers.view.call(this, Ember.Forms.FormTextComponent, options);
});
