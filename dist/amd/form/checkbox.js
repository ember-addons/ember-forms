define(
  ["../mixins/control","./form_group","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*
    Form Input

    Syntax:
    {{em-checkbox property="property name"}}
     */

    var ControlMixin = __dependency1__["default"] || __dependency1__;
    var FormGroupComponent = __dependency2__["default"] || __dependency2__;

    var FormCheckboxComponent = FormGroupComponent.extend({
      v_icons: false,
      validations: false,
      yieldInLabel: true,
      controlView: Ember.Checkbox.extend(ControlMixin, {
        attributeBindings: ['name'],
        name: Em.computed.alias('parentView.name'),
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
      return Ember.Handlebars.helpers.view.call(this, FormCheckboxComponent, options);
    });

    __exports__["default"] = FormCheckboxComponent;
  });