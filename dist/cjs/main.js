"use strict";
/***
Import all the ember-forms modules
 */

//-- Utils ----------------------------------------------------------------
var Utils = require("./utils/utils")["default"] || require("./utils/utils");

//-- Mixins ---------------------------------------------------------------
var ControlMixin = require("./mixins/control")["default"] || require("./mixins/control");
var InFormMixin = require("./mixins/in_form")["default"] || require("./mixins/in_form");
var HasPropertyMixin = require("./mixins/has_property")["default"] || require("./mixins/has_property");
var HasPropertyValidationMixin = require("./mixins/has_property_validation")["default"] || require("./mixins/has_property_validation");

//-- Form Components ------------------------------------------------------
var FormComponent = require("./form/form")["default"] || require("./form/form");
var FormCheckboxComponent = require("./form/checkbox")["default"] || require("./form/checkbox");
var FormControlHelp = require("./form/control_help")["default"] || require("./form/control_help");
var FormInputComponent = require("./form/input")["default"] || require("./form/input");
var FormLabel = require("./form/label")["default"] || require("./form/label");
var FormSelect = require("./form/select")["default"] || require("./form/select");
var FormSubmitButton = require("./form/submit_button")["default"] || require("./form/submit_button");
var FormText = require("./form/text")["default"] || require("./form/text");

//-- Templates ------------------------------------------------------------
var FormTemplate = require("./templates/components/form")["default"] || require("./templates/components/form");
var FormGroupTemplate = require("./templates/components/form-group")["default"] || require("./templates/components/form-group");
var FormGroupFormGroupTemplate = require("./templates/components/formgroup/form-group")["default"] || require("./templates/components/formgroup/form-group");
var FormGroupControlTemplate = require("./templates/components/formgroup/form-group-control")["default"] || require("./templates/components/formgroup/form-group-control");
var FormGroupControlWithinLabelTemplate = require("./templates/components/formgroup/control-within-label")["default"] || require("./templates/components/formgroup/control-within-label");
var FormLabelTemplate = require("./templates/components/form-label")["default"] || require("./templates/components/form-label");
var FormControlHelpTemplate = require("./templates/components/form-control-help")["default"] || require("./templates/components/form-control-help");
var SubmitButtonTemplate = require("./templates/components/form-submit-button")["default"] || require("./templates/components/form-submit-button");

Ember.TEMPLATES['components/form'] = FormTemplate;
Ember.TEMPLATES['components/form-group'] = FormGroupTemplate;
Ember.TEMPLATES['components/formgroup/form-group'] = FormGroupFormGroupTemplate;
Ember.TEMPLATES['components/formgroup/form-group-control'] = FormGroupControlTemplate;
Ember.TEMPLATES['components/formgroup/control-within-label'] = FormGroupControlWithinLabelTemplate;
Ember.TEMPLATES['components/form-label'] = FormLabelTemplate;
Ember.TEMPLATES['components/form-control-help'] = FormControlHelpTemplate;
Ember.TEMPLATES['components/form-submit-button'] = SubmitButtonTemplate;

//-- Export Everything ----------------------------------------------------
exports.Utils = Utils;
exports.ControlMixin = ControlMixin;
exports.HasPropertyMixin = HasPropertyMixin;
exports.HasPropertyValidationMixin = HasPropertyValidationMixin;
exports.FormComponent = FormComponent;
exports.FormCheckboxComponent = FormCheckboxComponent;
exports.FormControlHelp = FormControlHelp;
exports.FormInputComponent = FormInputComponent;
exports.FormLabel = FormLabel;
exports.FormSelect = FormSelect;
exports.FormSubmitButton = FormSubmitButton;
exports.FormText = FormText;