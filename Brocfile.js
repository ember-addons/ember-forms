var compileES6 = require('broccoli-es6-concatenator');

var emberForms = compileES6('lib', {
  inputFiles: ['**/*.js'],
  outputFile: '/ember-forms.js'
});

module.exports = emberForms;

// var broccoli            = require('broccoli')
// var compileES6          = require('broccoli-es6-concatenator')
// var mergeTrees          = require('broccoli-merge-trees')
// var moveFile            = require('broccoli-file-mover')
// // var compileCoffeeScript = require('broccoli-coffee')
// var pickFiles           = require('broccoli-static-compiler')


// var lib    = 'lib'
// lib = pickFiles(lib, {
//   srcDir:  '/', 
//   destDir: '/es6'
// })

// var moveTree = moveFile('lib', {
//   files: {
//     'control_mixin.js': 'new_control_mixin.js'
//   }
// })

// // var tests   = 'tests'
// // tests = pickFiles(tests, {srcDir: '/', destDir: 'es6/tests'})




// // var lib = pickFiles('lib', {
// //   srcDir:  '/',
// //   destDir: '/es6'
// // });

// // var appJs = compileES6(lib, {
// //   inputFiles: 'lib/**/*.js',
// //   outputFile: 'es6/test.js'
// // })

// // module.exports = appJs;

// var appJs = compileES6(lib, {
//   inputFiles: [''],
//   outputFile: 'es6/test.js'
// });

// module.exports = appJs;