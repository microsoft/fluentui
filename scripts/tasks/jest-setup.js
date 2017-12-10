// Polyfill requestAnimiationFrame
require('raf/polyfill');

// Fail on warnings.
const consoleError = console.error;

console.error = console.warn = (message) => {
  consoleError(message);
  throw new Error("Caught: " + message);
};
