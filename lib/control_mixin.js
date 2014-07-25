/***
Mixin that should be applied for all controls
 */
Ember.Forms.ControlMixin = Ember.Mixin.create({
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
