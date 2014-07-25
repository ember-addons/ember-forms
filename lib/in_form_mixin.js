/*
Find the form of the view that merges this mixin
 */
Ember.Forms.InFormMixin = Em.Mixin.create({
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
