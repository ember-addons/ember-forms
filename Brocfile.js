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




// var compileES6 = require('broccoli-es6-concatenator');
// var pickFiles = require('broccoli-static-compiler');
// var mergeTrees = require('broccoli-merge-trees');
// var concatTree = require('broccoli-concat');

// var docs = pickFiles('gh_pages', {
//   srcDir: '/',
//   files: ['index.html', 'docs.js', 'docs.css', 'img/ember_logo.png'],
//   destDir: '/'
// });

// var vendorJsDependencies = pickFiles('vendor', {
//   srcDir: '/',
//   files: [
//     'jquery/dist/jquery.js',
//     'handlebars/handlebars.runtime.js',
//     'ember/ember.js',
//     'ember-data/ember-data.js',
//     'highlightjs/highlight.pack.js',
//     'ember-validations/index.js'
//   ],
//   destDir: '/lib'
// });

// var vendorCssDependencies = pickFiles('vendor', {
//   srcDir: '/',
//   files: [
//     'bootstrap/dist/css/bootstrap.css',
//     'font-awesome/css/font-awesome.css',
//     'font-awesome/fonts/fontawesome-webfont.eot',
//     'font-awesome/fonts/fontawesome-webfont.svg',
//     'font-awesome/fonts/fontawesome-webfont.ttf',
//     'font-awesome/fonts/fontawesome-webfont.woff',
//     'highlightjs/styles/tomorrow.css'
//   ],
//   destDir: '/css'
// });

// var emberForms = compileES6('lib', {
//   inputFiles: ['**/*.js'],
//   outputFile: '/ember-forms.js',
//   legacyFilesToAppend: [
//     '../vendor/ember/ember.js'
//   ]
// });

// var testDependencies = pickFiles('tests', {
//   srcDir: '/',
//   files: [
//     '../vendor/qunit/qunit/qunit.js',
//     '../vendor/qunit/qunit/qunit.css',
//     '../vendor/ember-qunit/dist/globals/main.js',
//     'index.html'
//   ],
//   destDir: 'tests'
// });

// var tests = concatTree('tests', {
//   inputFiles: [
//     '**/*.js'
//   ],
//   outputFile: '/tests/tests.js'
// });

// module.exports = mergeTrees([emberForms, docs, tests, testDependencies, vendorJsDependencies, vendorCssDependencies]);