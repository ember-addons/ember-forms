#Import all the ember-forms files

#-- General --
`import { Application } from 'ember';`

#-- Utils --
`import Utils from './utils/utils';`

#-- Mixins --
`import ControlMixin from './mixins/control';`
`import InFormMixin from './mixins/in_form';`
`import HasPropertyMixin from './mixins/has_property';`
`import HasPropertyValidationMixin from './mixins/has_property_validation';`

#-- Form Components --
`import FormComponent from './form/form';`
`import FormGroupComponent from './form/group';`
`import FormCheckboxComponent from './form/checkbox';`
`import FormControlHelpComponent from './form/control_help';`
`import FormInputComponent from './form/input';`
`import FormLabelComponent from './form/label';`
`import FormSelectComponent from './form/select';`
`import FormSubmitComponent from './form/submit_button';`
`import FormTextComponent from './form/text';`

#-- Templates --
`import FormTemplate from './templates/components/form';`
`import FormGroupTemplate from './templates/components/form-group';`
`import FormGroupPartialTemplate from './templates/components/formgroup/form-group';`
`import FormGroupControlPartialTemplate from './templates/components/formgroup/form-group-control';`
`import FormGroupControlWithinLabelPartialTemplate from './templates/components/formgroup/control-within-label';`
`import FormLabelTemplate from './templates/components/form-label';`
`import FormControlHelpTemplate from './templates/components/form-control-help';`
`import SubmitButtonTemplate from './templates/components/form-submit-button';`

Application.initializer
    name: 'ember-forms',
    initialize: (container) ->
        container.register 'component:em-select', FormSelectComponent
        container.register 'component:em-input', FormInputComponent
        container.register 'component:em-checkbox', FormCheckboxComponent
        container.register 'component:em-text', FormTextComponent

#-- Export Everything --
`export {Utils, ControlMixin, HasPropertyMixin, HasPropertyValidationMixin,
        FormComponent, FormGroupComponent, FormCheckboxComponent,
        FormControlHelpComponent, FormInputComponent, FormLabelComponent,
        FormSelectComponent, FormSubmitComponent, FormTextComponent}`