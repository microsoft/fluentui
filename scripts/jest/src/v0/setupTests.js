/**
 * Setup for northstar/v0 packages (under packages/fluentui).
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const enzyme = require('enzyme');

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

if (process.env.TF_BUILD) {
  jest.spyOn(console, 'log');
  jest.spyOn(console, 'info');
  jest.spyOn(console, 'warn');
  jest.spyOn(console, 'error');
}
