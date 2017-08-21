'use strict';


/**
 * This is a test entry point to help karma-webpack find all tests in the project.
 **/

// Polyfills
require('es6-weak-map/implement');
require('es6-map/implement');
console.log('hi')
// Before loading modules, treat errors and warnings as test failures.
console.error = console.warn = function (warning) {
  throw new Error(warning);
}

var context = require.context('..', true, /.+\.test\.js?$/);

context.keys().forEach(context);


module.exports = context;
