var compileES6 = require('broccoli-es6-concatenator');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var docs = pickFiles('gh_pages', {
  srcDir: '/',
  files: ['index.html', 'docs.js', 'docs.css', 'img/ember_logo.png'],
  destDir: '/'
});


var vendorJsDependencies = pickFiles('vendor', {
  srcDir: '/',
  files: [
    'jquery/dist/jquery.js',
    'handlebars/handlebars.runtime.js',
    'ember/ember.js',
    'ember-data/ember-data.js',
    'highlightjs/highlight.pack.js',
    'ember-validations/index.js'
  ],
  destDir: '/lib'
});

var vendorCssDependencies = pickFiles('vendor', {
  srcDir: '/',
  files: [
    'bootstrap/dist/css/bootstrap.css',
    'font-awesome/css/font-awesome.css',
    'font-awesome/fonts/fontawesome-webfont.eot',
    'font-awesome/fonts/fontawesome-webfont.svg',
    'font-awesome/fonts/fontawesome-webfont.ttf',
    'font-awesome/fonts/fontawesome-webfont.woff',
    'highlightjs/styles/tomorrow.css'
  ],
  destDir: '/css'
});

var emberForms = compileES6('lib', {
  inputFiles: ['**/*.js'],
  outputFile: '/ember-forms.js',
  legacyFilesToAppend: [
    '../vendor/ember/ember.js'
  ]
});

module.exports = mergeTrees([emberForms, docs, vendorJsDependencies, vendorCssDependencies]);