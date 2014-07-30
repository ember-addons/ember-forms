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
    main: 'ember-forms',
    shim: {
      'ember': 'Ember'
    }
});


//-- Vendor dependencies used by our tests and docs -----------------------
var vendorJs = 'vendor';

var vendorJsFiles = [
  'jquery/dist/jquery.js',
  'handlebars/handlebars.js',
  'ember/ember.js',
  'ember-data/ember-data.js',
  'highlightjs/highlight.pack.js',
  'ember-validations/index.js',
  'qunit/qunit/qunit.js',
  'ember-qunit/dist/globals/main.js'
];

var vendorDependencies = pickFiles(vendorJs, {
  srcDir: '/',
  files: vendorJsFiles,
  destDir: '/'
});

vendorDependencies = concatTree(vendorDependencies, {
  inputFiles: vendorJsFiles,
  outputFile: '/vendor.js'
});

var vendorCss = 'vendor';

var vendorStyleFiles = [
  'bootstrap/dist/css/bootstrap.css',
  'font-awesome/css/font-awesome.css',
  'qunit/qunit/qunit.css'
];

vendorCss = pickFiles(vendorCss, {
  srcDir: '/',
  files: vendorStyleFiles,
  destDir: '/'
});

vendorCss = concatTree(vendorCss, {
  inputFiles: ['**/*.css'],
  outputFile: '/vendor.css'
});


//-- Build our tests ------------------------------------------------------
var tests = 'tests';

tests = pickFiles(tests, {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/tests'
});

tests = concatTree(tests, {
  inputFiles: ['**/*.js'],
  outputFile: '/tests.js',
});

var testIndex = 'tests';
testIndex = pickFiles(testIndex, {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/tests'
});


//-- Export our merged trees to broccoli  ---------------------------------
module.exports = mergeTrees([appModule, vendorDependencies, vendorCss, tests, testIndex]);