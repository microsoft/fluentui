// Polyfills
import 'es6-map/implement';

/**
 * This is a test entry point to help karma-webpack find all tests in the project.
 **/

// Before loading modules, treat errors and warnings as test failures.
console.error = console.warn = (warning: string) => {
  throw new Error(warning);
};

const testContext = require.context('..', true, /.+\.test\.js?$/);

testContext.keys().forEach(testContext);
module.exports = testContext;
