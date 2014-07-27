/***
Import all the ember-forms modules
 */

//-- Utils ----------------------------------------------------------------
import Utils from './utils/utils';

//-- Mixins ---------------------------------------------------------------
import ControlMixin from './mixins/control';
import InFormMixin from './mixins/in_form';
import HasPropertyMixin from './mixins/has_property';
import HasPropertyValidationMixin from './mixins/has_property_validation';

//-- Form Components ------------------------------------------------------
import FormComponent from './form/form';
import FormCheckboxComponent from './form/checkbox';
import FormControlHelp from './form/control_help';
import FormInputComponent from './form/input';
import FormLabel from './form/label';
import FormSelect from './form/select';
import FormSubmitButton from './form/submit_button';
import FormText from './form/text';

//-- Templates ------------------------------------------------------------
import FormTemplate from './templates/components/form';
import FormGroupTemplate from './templates/components/form-group';
import FormGroupFormGroupTemplate from './templates/components/formgroup/form-group';
import FormGroupControlTemplate from './templates/components/formgroup/form-group-control';
import FormGroupControlWithinLabelTemplate from './templates/components/formgroup/control-within-label';
import FormLabelTemplate from './templates/components/form-label';
import FormControlHelpTemplate from './templates/components/form-control-help';
import SubmitButtonTemplate from './templates/components/form-submit-button';

Ember.TEMPLATES['components/form'] = FormTemplate;
Ember.TEMPLATES['components/form-group'] = FormGroupTemplate;
Ember.TEMPLATES['components/formgroup/form-group'] = FormGroupFormGroupTemplate;
Ember.TEMPLATES['components/formgroup/form-group-control'] = FormGroupControlTemplate;
Ember.TEMPLATES['components/formgroup/control-within-label'] = FormGroupControlWithinLabelTemplate;
Ember.TEMPLATES['components/form-label'] = FormLabelTemplate;
Ember.TEMPLATES['components/form-control-help'] = FormControlHelpTemplate;
Ember.TEMPLATES['components/form-submit-button'] = SubmitButtonTemplate;

//-- Export Everything ----------------------------------------------------
export {Utils, ControlMixin, HasPropertyMixin, HasPropertyValidationMixin,
        FormComponent, FormCheckboxComponent, FormControlHelp,
        FormInputComponent, FormLabel, FormSelect, FormSubmitButton,
        FormText}