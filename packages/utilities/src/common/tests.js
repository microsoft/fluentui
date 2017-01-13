'use strict';

/**
 * This is a test entry point to help karma-webpack find all tests in the project.
 **/

// Before loading modules, treat errors and warnings as test failures.
console.error = console.warn = function (warning) {
  throw new Error(warning);
}

var context = require.context('..', true, /.+\.test\.js?$/);

context.keys().forEach(context);
module.exports = context;
