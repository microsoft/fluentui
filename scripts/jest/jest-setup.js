// Fail on warnings.
const consoleError = console.error;

console.error = console.warn = message => {
  consoleError(message);

  if (typeof message === 'object' && message.stack) {
    // If the "message" was an exception, re-throw it to get the full stack trace
    throw message;
  } else {
    throw new Error('Caught: ' + message);
  }
};
