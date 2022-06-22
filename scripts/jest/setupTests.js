/**
 * Setup for northstar/v0 packages (under packages/fluentui).
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

if (process.env.TF_BUILD) {
  jest.spyOn(console, 'log');
  jest.spyOn(console, 'info');
  jest.spyOn(console, 'warn');
  jest.spyOn(console, 'error');

  afterAll(() => {
    expect(console.log).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
}
