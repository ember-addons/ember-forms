//-- Require our broccoli toolchain ---------------------------------------
var filterTemplates = require('broccoli-template');
var mergeTrees = require('broccoli-merge-trees');
var makeModule = require('broccoli-dist-es6-module');
var pickFiles = require('broccoli-static-compiler');
var concatTree = require('broccoli-concat');
var templateCompiler = require('broccoli-ember-hbs-template-compiler');


//-- Build Ember-Forms as amd, cjs, and global modules --------------------
var app = 'lib';
var vendor = 'vendor';

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
var vendorFiles = [
  'jquery/dist/jquery.js',
  'handlebars/handlebars.runtime.js',
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


//-- Export our merged trees to broccoli  ---------------------------------
module.exports = mergeTrees([appModule, vendorDependencies]);