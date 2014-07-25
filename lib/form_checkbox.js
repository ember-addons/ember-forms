/*
Form Input

Syntax:
{{em-checkbox property="property name"}}
 */

Ember.Forms.FormCheckboxComponent = Ember.Forms.FormGroupComponent.extend({
  v_icons: false,
  validations: false,
  yieldInLabel: true,
  controlView: Ember.Checkbox.extend(Ember.Forms.ControlMixin, {
    "class": false,
    model: Ember.computed.alias('parentView.parentView.model'),
    propertyName: Ember.computed.alias('parentView.parentView.propertyName'),
    init: function() {
      this._super();
      return Ember.Binding.from("model." + (this.get('propertyName'))).to('checked').connect(this);
    }
  }),
  wrapperClass: (function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'col-sm-offset-2 col-sm-10';
    }
  }).property('form.form_layout'),
  labelWrapperClass: (function() {
    if (this.get('form.form_layout') === 'horizontal') {
      return 'checkbox';
    }
    return null;
  }).property('form.form_layout'),
  "class": (function() {
    if (this.get('form.form_layout') !== 'horizontal') {
      return 'checkbox';
    }
    return 'form-group';
  }).property('form.form_layout')
});

Ember.Handlebars.helper('em-checkbox', function(options) {
  return Ember.Handlebars.helpers.view.call(this, Ember.Forms.FormCheckboxComponent, options);
});
