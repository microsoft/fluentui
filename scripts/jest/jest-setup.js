// Save references to the real console.error and console.warn
global.consoleError = console.error;
global.consoleWarn = console.warn;

// Fail on warnings.
console.error = console.warn = message => {
  global.consoleError(message);

  if (typeof message === 'object' && message.stack) {
    // If the "message" was an exception, re-throw it to get the full stack trace
    throw message;
  } else {
    throw new Error('Caught: ' + message);
  }
};
