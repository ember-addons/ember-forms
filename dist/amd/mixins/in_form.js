define(
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