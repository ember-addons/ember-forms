define(
  ["./utils/utils","./mixins/control","./mixins/in_form","./mixins/has_property","./mixins/has_property_validation","./form/form","./form/checkbox","./form/control_help","./form/input","./form/label","./form/select","./form/submit_button","./form/text","./templates/components/form","./templates/components/form-group","./templates/components/formgroup/form-group","./templates/components/formgroup/form-group-control","./templates/components/formgroup/control-within-label","./templates/components/form-label","./templates/components/form-control-help","./templates/components/form-submit-button","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __exports__) {
    "use strict";
    /***
    Import all the ember-forms modules
     */

    //-- Utils ----------------------------------------------------------------
    var Utils = __dependency1__["default"] || __dependency1__;

    //-- Mixins ---------------------------------------------------------------
    var ControlMixin = __dependency2__["default"] || __dependency2__;
    var InFormMixin = __dependency3__["default"] || __dependency3__;
    var HasPropertyMixin = __dependency4__["default"] || __dependency4__;
    var HasPropertyValidationMixin = __dependency5__["default"] || __dependency5__;

    //-- Form Components ------------------------------------------------------
    var FormComponent = __dependency6__["default"] || __dependency6__;
    var FormCheckboxComponent = __dependency7__["default"] || __dependency7__;
    var FormControlHelp = __dependency8__["default"] || __dependency8__;
    var FormInputComponent = __dependency9__["default"] || __dependency9__;
    var FormLabel = __dependency10__["default"] || __dependency10__;
    var FormSelect = __dependency11__["default"] || __dependency11__;
    var FormSubmitButton = __dependency12__["default"] || __dependency12__;
    var FormText = __dependency13__["default"] || __dependency13__;

    //-- Templates ------------------------------------------------------------
    var FormTemplate = __dependency14__["default"] || __dependency14__;
    var FormGroupTemplate = __dependency15__["default"] || __dependency15__;
    var FormGroupFormGroupTemplate = __dependency16__["default"] || __dependency16__;
    var FormGroupControlTemplate = __dependency17__["default"] || __dependency17__;
    var FormGroupControlWithinLabelTemplate = __dependency18__["default"] || __dependency18__;
    var FormLabelTemplate = __dependency19__["default"] || __dependency19__;
    var FormControlHelpTemplate = __dependency20__["default"] || __dependency20__;
    var SubmitButtonTemplate = __dependency21__["default"] || __dependency21__;

    Ember.TEMPLATES['components/form'] = FormTemplate;
    Ember.TEMPLATES['components/form-group'] = FormGroupTemplate;
    Ember.TEMPLATES['components/formgroup/form-group'] = FormGroupFormGroupTemplate;
    Ember.TEMPLATES['components/formgroup/form-group-control'] = FormGroupControlTemplate;
    Ember.TEMPLATES['components/formgroup/control-within-label'] = FormGroupControlWithinLabelTemplate;
    Ember.TEMPLATES['components/form-label'] = FormLabelTemplate;
    Ember.TEMPLATES['components/form-control-help'] = FormControlHelpTemplate;
    Ember.TEMPLATES['components/form-submit-button'] = SubmitButtonTemplate;

    //-- Export Everything ----------------------------------------------------
    __exports__.Utils = Utils;
    __exports__.ControlMixin = ControlMixin;
    __exports__.HasPropertyMixin = HasPropertyMixin;
    __exports__.HasPropertyValidationMixin = HasPropertyValidationMixin;
    __exports__.FormComponent = FormComponent;
    __exports__.FormCheckboxComponent = FormCheckboxComponent;
    __exports__.FormControlHelp = FormControlHelp;
    __exports__.FormInputComponent = FormInputComponent;
    __exports__.FormLabel = FormLabel;
    __exports__.FormSelect = FormSelect;
    __exports__.FormSubmitButton = FormSubmitButton;
    __exports__.FormText = FormText;
  });