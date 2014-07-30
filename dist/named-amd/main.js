define("ember-forms",
  ["./utils/utils","./mixins/control","./mixins/in_form","./mixins/has_property","./mixins/has_property_validation","./form/form","./form/form_group","./form/checkbox","./form/control_help","./form/input","./form/label","./form/select","./form/submit_button","./form/text","./templates/components/form","./templates/components/form-group","./templates/components/formgroup/_form-group","./templates/components/formgroup/_form-group-control","./templates/components/formgroup/_control-within-label","./templates/components/form-label","./templates/components/form-control-help","./templates/components/form-submit-button","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __exports__) {
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
    var FormGroupComponent = __dependency7__["default"] || __dependency7__;
    var FormCheckboxComponent = __dependency8__["default"] || __dependency8__;
    var FormControlHelpComponent = __dependency9__["default"] || __dependency9__;
    var FormInputComponent = __dependency10__["default"] || __dependency10__;
    var FormLabelComponent = __dependency11__["default"] || __dependency11__;
    var FormSelect = __dependency12__["default"] || __dependency12__;
    var FormSubmitComponent = __dependency13__["default"] || __dependency13__;
    var FormText = __dependency14__["default"] || __dependency14__;

    //-- Templates ------------------------------------------------------------
    var FormTemplate = __dependency15__["default"] || __dependency15__;
    var FormGroupTemplate = __dependency16__["default"] || __dependency16__;
    var FormGroupPartialTemplate = __dependency17__["default"] || __dependency17__;
    var FormGroupControlPartialTemplate = __dependency18__["default"] || __dependency18__;
    var FormGroupControlWithinLabelPartialTemplate = __dependency19__["default"] || __dependency19__;
    var FormLabelTemplate = __dependency20__["default"] || __dependency20__;
    var FormControlHelpTemplate = __dependency21__["default"] || __dependency21__;
    var SubmitButtonTemplate = __dependency22__["default"] || __dependency22__;

    Ember.TEMPLATES['components/form'] = FormTemplate;
    Ember.TEMPLATES['components/form-group'] = FormGroupTemplate;
    Ember.TEMPLATES['components/formgroup/_form-group'] = FormGroupPartialTemplate;
    Ember.TEMPLATES['components/formgroup/_form-group-control'] = FormGroupControlPartialTemplate;
    Ember.TEMPLATES['components/formgroup/_control-within-label'] = FormGroupControlWithinLabelPartialTemplate;
    Ember.TEMPLATES['components/form-label'] = FormLabelTemplate;
    Ember.TEMPLATES['components/form-control-help'] = FormControlHelpTemplate;
    Ember.TEMPLATES['components/form-submit-button'] = SubmitButtonTemplate;

    //-- Export Everything ----------------------------------------------------
    __exports__.Utils = Utils;
    __exports__.ControlMixin = ControlMixin;
    __exports__.HasPropertyMixin = HasPropertyMixin;
    __exports__.HasPropertyValidationMixin = HasPropertyValidationMixin;
    __exports__.FormComponent = FormComponent;
    __exports__.FormGroupComponent = FormGroupComponent;
    __exports__.FormCheckboxComponent = FormCheckboxComponent;
    __exports__.FormControlHelpComponent = FormControlHelpComponent;
    __exports__.FormInputComponent = FormInputComponent;
    __exports__.FormLabelComponent = FormLabelComponent;
    __exports__.FormSelect = FormSelect;
    __exports__.FormSubmitComponent = FormSubmitComponent;
    __exports__.FormText = FormText;
  });
define("ember-forms/form/checkbox",
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
define("ember-forms/form/control_help",
  ["../mixins/in_form","../mixins/has_property","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*
    Form Control Help

    Renders a textual help of the control.

    Note: currently must be a direct descendant of a form-group or 'property' must be explicitly defined

    Syntax:
    {{em-form-control-help}}
     */

    var InFormMixin = __dependency1__["default"] || __dependency1__;
    var HasPropertyMixin = __dependency2__["default"] || __dependency2__;

    var FormControlHelpComponent = Em.Component.extend(InFormMixin, HasPropertyMixin, {
      tagName: 'span',
      classNames: ['help-block'],
      classNameBindings: ['extraClass', 'horiClassCalc'],
      layoutName: 'components/form-control-help',
      text: void 0,
      extraClass: void 0,
      horiClass: 'col-sm-offset-2 col-sm-10',
      horiClassCalc: (function() {
        if (this.get('form.isHorizontal') && this.get('horiClass')) {
          return this.get('horiClass');
        }
      }).property('form.isHorizontal'),
      init: function() {
        this._super();
        return Em.Binding.from('model.errors.' + this.get('propertyName')).to('errors').connect(this);
      },
      helpText: (function() {
        return this.get('errors.firstObject') || this.get('text');
      }).property('text', 'errors.firstObject'),
      hasHelp: (function() {
        var _ref;
        return ((_ref = this.get('helpText')) != null ? _ref.length : void 0) > 0;
      }).property('helpText'),
      hasError: (function() {
        var _ref;
        return (_ref = this.get('errors')) != null ? _ref.length : void 0;
      }).property('errors.length')
    });

    Em.Handlebars.helper('em-form-control-help', FormControlHelpComponent);
    __exports__["default"] = FormControlHelpComponent;
  });
define("ember-forms/form/form",
  ["../utils/utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /*
    Form View

    A component for rendering a form element.

    Syntax:
    {{em-form
        //The layout of the form
        form_layout="form|inline|horizontal"
        //The model bound to the form if any
        model="some_model_instance"
        //The action to be invoked on the controller when a form is submitted.
        action="some_action"
        //if true a submit button will be rendered
        submit_button=true|false
        //if true validation icons will be rendered
        v_icons=true|false
    }}
     */

    var Utils = __dependency1__["default"] || __dependency1__;

    var FormComponent = Ember.Component.extend({
      tagName: 'form',
      layoutName: 'components/form',
      classNameBindings: ['form_layout_class'],
      attributeBindings: ['role'],
      role: 'form',
      form_layout_class: (function() {
        switch (this.get('form_layout')) {
          case 'horizontal':
          case 'inline':
            return "form-" + (this.get('form_layout'));
          default:
            return 'form';
        }
      }).property('form_layout'),
      isDefaultLayout: Utils.createBoundSwitchAccessor('form', 'form_layout', 'form'),
      isInline: Utils.createBoundSwitchAccessor('inline', 'form_layout', 'form'),
      isHorizontal: Utils.createBoundSwitchAccessor('horizontal', 'form_layout', 'form'),
      action: 'submit',
      model: void 0,
      form_layout: 'form',
      submit_button: true,
      v_icons: true,

      /*
      Form submit
      
      Optionally execute model validations and perform a form submission.
       */
      submit: function(e) {
        var promise;
        if (e) {
          e.preventDefault();
        }
        if (Ember.isNone(this.get('model.validate'))) {
          return this.get('targetObject').send(this.get('action'));
        } else {
          promise = this.get('model').validate();
          return promise.then((function(_this) {
            return function() {
              if (_this.get('model.isValid')) {
                return _this.get('targetObject').send(_this.get('action'));
              }
            };
          })(this));
        }
      }
    });

    Ember.Handlebars.helper('em-form', FormComponent);
    __exports__["default"] = FormComponent;
  });
define("ember-forms/form/form_group",
  ["../mixins/in_form","../mixins/has_property","../mixins/has_property_validation","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
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
        //Label of the form group, default is a human friendly form of the property name
        label="Some label"
    }}
     */

    var InFormMixin = __dependency1__["default"] || __dependency1__;
    var HasPropertyMixin = __dependency2__["default"] || __dependency2__;
    var HasPropertyValidationMixin = __dependency3__["default"] || __dependency3__;

    var FormGroupComponent = Em.Component.extend(InFormMixin, HasPropertyMixin, HasPropertyValidationMixin, {
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
        return this.set('canShowErrors', true);
      }
    });

    Em.Handlebars.helper('em-form-group', FormGroupComponent);
    __exports__["default"] = FormGroupComponent;
  });
define("ember-forms/form/input",
  ["../mixins/control","./form_group","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*
    Form Input

    Syntax:
    {{em-input property="property name"}}
     */

    var ControlMixin = __dependency1__["default"] || __dependency1__;
    var FormGroupComponent = __dependency2__["default"] || __dependency2__;

    var FormInputComponent = FormGroupComponent.extend({
      controlView: Em.TextField.extend(ControlMixin, {
        attributeBindings: ['placeholder', 'required', 'autofocus', 'disabled'],
        placeholder: Em.computed.alias('parentView.placeholder'),
        required: Em.computed.alias('parentView.required'),
        autofocus: Em.computed.alias('parentView.autofocus'),
        disabled: Em.computed.alias('parentView.disabled'),
        type: Em.computed.alias('parentView.type'),
        model: Em.computed.alias('parentView.model'),
        propertyName: Em.computed.alias('parentView.propertyName')
      }),
      property: void 0,
      label: void 0,
      placeholder: void 0,
      required: void 0,
      autofocus: void 0,
      disabled: void 0,
      controlWrapper: (function() {
        if (this.get('form.form_layout') === 'horizontal') {
          return 'col-sm-10';
        }
        return null;
      }).property('form.form_layout')
    });

    Ember.Handlebars.helper('em-input', function(options) {
      return Ember.Handlebars.helpers.view.call(this, FormInputComponent, options);
    });

    __exports__["default"] = FormInputComponent;
  });
define("ember-forms/form/label",
  ["../mixins/in_form","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /*
    Form Label

    When styled with bootstrap, when form is rendered horizontally, the label require the 'extraClass' property to
        be set to a value such 'col-sm-2' to be aligned properly.

    Syntax:
    {{em-form-label
        text="Some label"
        extraClass="col-sm-2"
    }}

    Or can serve as a block helper for elements that needs to be wrapped within label element.
    {{#em-form-label text="Active?"}}
        {{em-checkbox}}
    {{/em-form-label}}
     */

    var InFormMixin = __dependency1__["default"] || __dependency1__;

    var FormLabelComponent = Ember.Component.extend(InFormMixin, {
      tagName: 'label',
      layoutName: 'components/form-label',
      classNames: ['control-label'],
      classNameBindings: ['extraClass', 'inlineClassCalc', 'horiClassCalc'],
      attributeBindings: ['for'],
      horiClass: 'col-sm-2',
      horiClassCalc: (function() {
        if (this.get('form.isHorizontal') && this.get('horiClass')) {
          return this.get('horiClass');
        }
      }).property('form.isHorizontal'),
      inlineClass: 'sr-only',
      inlineClassCalc: (function() {
        if (this.get('form.isInline') && this.get('inlineClass')) {
          return this.get('inlineClass');
        }
      }).property('form.form_layout')
    });

    Ember.Handlebars.helper('em-form-label', FormLabelComponent);

    __exports__["default"] = FormLabelComponent;
  });
define("ember-forms/form/select",
  ["./form_group","../mixins/control","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*
    Form Select

    Syntax:
    {{em-select property="property name"
        content=array_of_options
        optionValuePath=keyForValue
        optionLabelPath=keyForLabel
        prompt="Optional default prompt"}}
     */

    var FormGroupComponent = __dependency1__["default"] || __dependency1__;
    var ControlMixin = __dependency2__["default"] || __dependency2__;

    var FormSelectComponent = FormGroupComponent.extend({
      v_icons: false,
      controlView: Em.Select.extend(ControlMixin, {
        model: Em.computed.alias('parentView.model'),
        propertyName: Em.computed.alias('parentView.propertyName'),
        content: Em.computed.alias('parentView.content'),
        optionValuePath: Em.computed.alias('parentView.optionValuePath'),
        optionLabelPath: Em.computed.alias('parentView.optionLabelPath'),
        prompt: Em.computed.alias('parentView.prompt')
      }),
      property: void 0,
      content: void 0,
      optionValuePath: void 0,
      optionLabelPath: void 0,
      prompt: void 0,
      controlWrapper: (function() {
        if (this.get('form.form_layout') === 'horizontal') {
          return 'col-sm-10';
        }
        return null;
      }).property('form.form_layout')
    });

    Ember.Handlebars.helper('em-select', function(options) {
      return Ember.Handlebars.helpers.view.call(this, FormSelectComponent, options);
    });

    __exports__["default"] = FormSelectComponent;
  });
define("ember-forms/form/submit_button",
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
define("ember-forms/form/text",
  ["./form_group","../mixins/control","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*
    Form Input

    Syntax:
    {{em-text property="property name" rows=4}}
     */

    var FormGroupComponent = __dependency1__["default"] || __dependency1__;
    var ControlMixin = __dependency2__["default"] || __dependency2__;

    var FormTextComponent = FormGroupComponent.extend({
      controlView: Em.TextArea.extend(ControlMixin, {
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
      return Ember.Handlebars.helpers.view.call(this, FormTextComponent, options);
    });

    __exports__["default"] = FormTextComponent;
  });
define("ember-forms/mixins/control",
  ["exports"],
  function(__exports__) {
    "use strict";
    /***
    Mixin that should be applied for all controls
     */
    __exports__["default"] = Ember.Mixin.create({
      classNameBindings: ['class'],
      "class": 'form-control',
      init: function() {
        this._super();
        return Ember.Binding.from("model." + (this.get('propertyName'))).to('value').connect(this);
      },
      hasValue: (function() {
        return this.get('value') !== null;
      }).property('value').readOnly()
    });
  });
define("ember-forms/mixins/has_property",
  ["exports"],
  function(__exports__) {
    "use strict";
    /*
    A mixin that enriches a view that is attached to a model property.

    The property name by default is taken from the parentView unless explictly
        defined in the `property` variable.

    This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
     */
    __exports__["default"] = Em.Mixin.create({
      property: void 0,
      propertyName: (function() {
        if (this.get('property')) {
          return this.get('property');
        } else if (this.get('parentView.property')) {
          return this.get('parentView.property');
        } else {
          return Em.assert(false, 'Property could not be found.');
        }
      }).property('parentView.property'),
      init: function() {
        this._super();
        return Em.Binding.from('model.errors.' + this.get('propertyName')).to('errors').connect(this);
      }
    });
  });
define("ember-forms/mixins/has_property_validation",
  ["exports"],
  function(__exports__) {
    "use strict";
    /*
    A mixin that enriches a view that is attached to a model property that has validation
        support.

    This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
     */
    __exports__["default"] = Em.Mixin.create({
      init: function() {
        this._super();
        Em.assert(!Em.isNone(this.get('propertyName')), 'propertyName is required.');
        return Em.Binding.from('model.errors.' + this.get('propertyName')).to('errors').connect(this);
      },
      status: (function() {
        if (this.get('errors.length')) {
          return 'error';
        } else {
          return 'success';
        }
      }).property('errors.length')
    });
  });
define("ember-forms/mixins/in_form",
  ["exports"],
  function(__exports__) {
    "use strict";
    /*
    Find the form of the view that merges this mixin
     */
    __exports__["default"] = Em.Mixin.create({
      form: (function() {
        var parentView;
        parentView = this.get('parentView');
        while (parentView) {
          if (parentView.get('tagName') === 'form') {
            return parentView;
          }
          parentView = parentView.get('parentView');
        }
        return Ember.assert(false, 'Cannot find form');
      }).property('parentView'),
      model: (function() {
        return this.get('form.model');
      }).property('form')
    });
  });
define("ember-forms/templates/components/form-control-help",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{helpText}}");
  });
define("ember-forms/templates/components/form-group",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if wrapperClass}}\n    <div {{bind-attr class=wrapperClass}}>\n        {{partial \'components/formgroup/form-group\'}}\n    </div>\n{{else}}\n    {{partial \'components/formgroup/form-group\'}}\n{{/if}}");
  });
define("ember-forms/templates/components/form-label",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{yield}}\n{{text}}");
  });
define("ember-forms/templates/components/form-submit-button",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if form.isHorizontal}}\n    <div {{bind-attr class=horiClass}}>\n        <button {{bind-attr class=classes}} {{bind-attr disabled=disabled}}>{{text}}</button>\n    </div>\n{{else}}\n    <button {{bind-attr class=classes}} {{bind-attr disabled=disabled}}>{{text}}</button>\n{{/if}}\n");
  });
define("ember-forms/templates/components/form",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{yield}}\n{{#if submit_button}}\n    {{em-form-submit}}\n{{/if}}");
  });
define("ember-forms/templates/components/formgroup/_control-within-label",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#em-form-label text=label horiClass=\'\' inlineClass=\'\' viewName=labelViewName}}\n    {{partial \'components/formgroup/form-group-control\'}}\n{{/em-form-label}}");
  });
define("ember-forms/templates/components/formgroup/_form-group-control",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if controlWrapper}}\n    <div {{bind-attr class=controlWrapper}}>\n        {{view controlView viewName=controlViewName property=propertyName}}\n    </div>\n{{else}}\n    {{view controlView viewName=controlViewName property=propertyName}}\n{{/if}}\n");
  });
define("ember-forms/templates/components/formgroup/_form-group",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#unless template}}\n    {{#if label}}\n        {{#if yieldInLabel}}\n            {{#if labelWrapperClass}}\n                <div {{bind-attr class=labelWrapperClass}}>\n                    {{partial \'components/formgroup/control-within-label\'}}\n                </div>\n            {{else}}\n                {{partial \'components/formgroup/control-within-label\'}}\n            {{/if}}\n        {{else}}\n            {{#if labelWrapperClass}}\n                <div {{bind-attr class=labelWrapperClass}}>\n                    {{em-form-label text=label viewName=labelViewName}}\n                    {{partial \'components/formgroup/form-group-control\'}}\n                </div>\n            {{else}}\n                {{em-form-label text=label viewName=labelViewName}}\n                {{partial \'components/formgroup/form-group-control\'}}\n            {{/if}}\n        {{/if}}\n    {{else}}\n        {{partial \'components/formgroup/form-group-control\'}}\n    {{/if}}\n\n    {{#if v_icons}}\n        <span class=\"form-control-feedback\"><i {{bind-attr class=v_icon}}></i></span>\n    {{/if}}\n\n    {{!Currently no errors when layout is inline}}\n    {{#unless form.isInline}}\n        {{#if canShowErrors}}\n            {{em-form-control-help text=help viewName=helpViewName}}\n        {{/if}}\n    {{/unless}}\n{{else}}\n    {{yield}}\n{{/unless}}");
  });
define("ember-forms/test",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<h1>TESTING</h1>\n\n");
  });
define("ember-forms/utils/utils",
  ["exports"],
  function(__exports__) {
    "use strict";
    function createBoundSwitchAccessor(switchValue, myProperty, myDefault) {
      if (myDefault == null) {
        myDefault = 'default';
      }
      return (function(key, value) {
        if (arguments.length === 2) {
          this.set(myProperty, (value ? switchValue : myDefault));
        }
        return this.get(myProperty) === switchValue;
      }).property(myProperty);
    }

    __exports__.createBoundSwitchAccessor = createBoundSwitchAccessor;function namelize(string) {
      return string.underscore().split('_').join(' ').capitalize();
    }
    __exports__.namelize = namelize;
  });