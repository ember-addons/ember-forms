define(
  ["../mixins/in_form","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /*
    Form Submit Button

    Syntax:
    {{em-form-submit text="Submit"}}
     */

    var InFormMixin = __dependency1__["default"] || __dependency1__;

    var FormSubmitComponent = Ember.Component.extend(InFormMixin, {
      classes: 'btn btn-default',
      layoutName: 'components/form-submit-button',
      classNames: ['form-group'],
      text: 'Submit',
      type: 'submit',
      attributeBindings: ['disabled'],
      horiClass: 'col-sm-offset-2 col-sm-10',
      disabled: (function() {
        if (!Ember.isNone(this.get('model.isValid'))) {
          return !this.get('model.isValid');
        } else {
          return false;
        }
      }).property('model.isValid')
    });

    Ember.Handlebars.helper('em-form-submit', FormSubmitComponent);

    __exports__["default"] = FormSubmitComponent;
  });