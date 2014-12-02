define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if controlWrapper}}\n    <div {{bind-attr class=controlWrapper}}>\n        {{#if data-html}}\n            {{view controlView viewName=controlViewName property=propertyName id=cid data-html=data-html data-placement=data-placement data-toggle=data-toggle title=title}}\n        {{else}}\n            {{view controlView viewName=controlViewName property=propertyName id=cid}}\n        {{/if}}\n    </div>\n{{else}}\n    {{#if data-html}}\n        {{view controlView viewName=controlViewName property=propertyName id=cid data-html=data-html data-placement=data-placement data-toggle=data-toggle title=title}}\n    {{else}}\n        {{view controlView viewName=controlViewName property=propertyName id=cid}}\n    {{/if}}\n{{/if}}\n\n");
  });