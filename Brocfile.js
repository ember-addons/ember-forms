//-- Require our broccoli build tools -------------------------------------

var findBowerTrees = require('broccoli-bower');
var filterCoffeeScript = require('broccoli-coffee');
var filterTemplates = require('broccoli-template');
var mergeTrees = require('broccoli-merge-trees');
var makeModule = require('broccoli-dist-es6-module');
var pickFiles = require('broccoli-static-compiler');
var templateCompiler = require('broccoli-ember-hbs-template-compiler')

//-- Build Ember-Forms as amd, cjs, and global modules --------------------
var app = 'lib';

function preprocessTemplates(tree) {
  tree = pickFiles(tree, {
      srcDir: '/templates',
      destDir: '/templates'
    });
  templates = templateCompiler(tree, {
    modules: false,
  });
  return templates;
}

function preprocess (tree) {
  templates = preprocessTemplates(tree);
  tree = filterCoffeeScript(tree, {
    bare: true
  })
  return new mergeTrees([templates, tree]);
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

//-- Export our merged trees to broccoli  ---------------------------------
module.exports = appModule