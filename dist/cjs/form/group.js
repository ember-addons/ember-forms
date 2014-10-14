"use strict";
var Component = require("ember").Component;
var InFormMixin = require("../mixins/in_form")["default"] || require("../mixins/in_form");
var HasPropertyMixin = require("../mixins/has_property")["default"] || require("../mixins/has_property");
var HasPropertyValidationMixin = require("../mixins/has_property_validation")["default"] || require("../mixins/has_property_validation");

/*
Form Group

Wraps labels, controls and help message for optimum spacing and validation styles.
A wrapper for a single input with its assistances views such as label, help message.

A form group can yield the control's view after or within a label, this is dependent on the control
    required layout and is defined byt he yieldInLabel property


Syntax:
{{em-form-group
    //The state of the form group
    status="none|error|warning|success"
    //If true the control view is yieled within the label
    yieldInLabel=true|false
    //If true validation icons will be rendered, by default inherited from the form
    v_icons: true
    //if true show all errors, by default inherited from the form
    showAllErrors=false
    //Label of the form group, default is a human friendly form of the property name
    label="Some label"
}}
 */
var FormGroupComponent;

FormGroupComponent = Component.extend(InFormMixin, HasPropertyMixin, HasPropertyValidationMixin, {
  tagName: 'div',
  layoutName: 'components/form-group',
  "class": 'form-group',
  classNameBindings: ['class', 'hasSuccess', 'hasWarning', 'hasError', 'v_icons:has-feedback'],
  attributeBindings: ['disabled'],
  hasSuccess: (function() {
    return this.get('validations') && this.get('status') === 'success' && this.get('canShowErrors');
  }).property('status', 'canShowErrors'),
  hasWarning: (function() {
    return this.get('validations') && this.get('status') === 'warning' && this.get('canShowErrors');
  }).property('status', 'canShowErrors'),
  hasError: (function() {
    return this.get('validations') && this.get('status') === 'error' && this.get('canShowErrors');
  }).property('status', 'canShowErrors'),
  v_icons: Em.computed.alias('form.v_icons'),
  showAllErrors: Em.computed.alias('form.showAllErrors'),
  v_success_icon: 'fa fa-check',
  v_warn_icon: 'fa fa-exclamation-triangle',
  v_error_icon: 'fa fa-times',
  validations: true,
  yieldInLabel: false,
  v_icon: (function() {
    if (!this.get('canShowErrors')) {
      return;
    }
    switch (this.get('status')) {
      case 'success':
        return this.get('v_success_icon');
      case 'warning':
      case 'warn':
        return this.get('v_warn_icon');
      case 'error':
        return this.get('v_error_icon');
      default:
        return null;
    }
  }).property('status', 'canShowErrors'),
  canShowErrors: (function() {
    return (this.get('showAllErrors')) || this.get('canShowErrorsFromFocusOut');
  }).property('showAllErrors', 'canShowErrorsFromFocusOut'),
  shouldShowHelp: (function() {
    var _ref;
    console.log("helpText:", this.get('helpText'));
    return ((_ref = this.get('helpText')) != null ? _ref.length : void 0) > 0 && this.get('canShowErrors');
  }).property('canShowErrors', 'helpText'),
  helpText: (function() {
    return this.get('errors.firstObject') || this.get('text');
  }).property('text', 'errors.firstObject'),
  init: function() {
    return this._super();
  },

  /*
  Observes the helpHasErrors of the help control and modify the 'status' property accordingly.
   */

  /*
  Listen to the focus out of the form group and display the errors
   */
  focusOut: function() {
    return this.set('canShowErrorsFromFocusOut', true);
  }
});

Em.Handlebars.helper('em-form-group', FormGroupComponent);

exports["default"] = FormGroupComponent;