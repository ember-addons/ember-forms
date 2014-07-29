//-- Require our broccoli build tools -------------------------------------
var filterTemplates = require('broccoli-template');
var mergeTrees = require('broccoli-merge-trees');
var makeModule = require('broccoli-dist-es6-module');
var pickFiles = require('broccoli-static-compiler');
var concatTree = require('broccoli-concat');


//-- Build Ember-Forms as amd, cjs, and global modules --------------------
var app = 'lib';

function preprocess (tree) {
  tree = filterTemplates(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  });
  return tree;
}

app = preprocess(app);

var appModule = makeModule(app, {
    global: 'Ember.Forms',
    packageName: 'ember-forms',
    main: 'main',
    shim: {
      'ember': 'Ember'
    }
});


//-- Vendor dependencies used by our tests and docs -----------------------
var vendor = 'vendor';
var vendorFiles = [
  'jquery/dist/jquery.js',
  'handlebars/handlebars.js',
  'ember/ember.js',
  'ember-data/ember-data.js',
  'highlightjs/highlight.pack.js',
  'ember-validations/index.js'
]

var vendorDependencies = pickFiles(vendor, {
  srcDir: '/',
  files: vendorFiles,
  destDir: '/'
});

vendorDependencies = concatTree(vendorDependencies, {
  inputFiles: vendorFiles,
  outputFile: '/vendor.js'
});


//-- Build our tests ------------------------------------------------------


//-- Build our docs -------------------------------------------------------

//-- Export our merged trees to broccoli  ---------------------------------
module.exports = mergeTrees([appModule, vendorDependencies]);