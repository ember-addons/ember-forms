eval("define(\"control_mixin\", \n  [\"exports\"],\n  function(__exports__) {\n    \"use strict\";\n    /***\n    Mixin that should be applied for all controls\n     */\n    __exports__[\"default\"] = Ember.Mixin.create({\n      classNameBindings: [\'class\'],\n      class: \'form-control\',\n      init: function() {\n        this._super();\n        return Ember.Binding.from(\"model.\" + (this.get(\'propertyName\'))).to(\'value\').connect(this);\n      },\n      hasValue: function() {\n        return this.get(\'value\') !== null;\n      }.property(\'value\').readOnly()\n\n    });\n  });//# sourceURL=control_mixin.js");

;eval("define(\"es6\", \n  [],\n  function() {\n    \"use strict\";\n    // export default Ember.View.extend({\n    //   say: \'hello\'\n    // });\n  });//# sourceURL=es6.js");

;eval("define(\"example\", \n  [],\n  function() {\n    \"use strict\";\n    // var test = function(str) {\n    //   console.log(str);\n    // }\n  });//# sourceURL=example.js");
