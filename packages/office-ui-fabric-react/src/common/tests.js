/** This is a test entry point to help karma-webpack find all tests in the project. Do not modify. */

var context = require.context('..', true, /.+\.test\.js?$/);

context.keys().forEach(context);
module.exports = context;
