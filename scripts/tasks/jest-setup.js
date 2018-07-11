// Fail on warnings.
const consoleError = console.error;

console.error = console.warn = message => {
  // Ignore error boundary warnings so that tests which throw exceptions can be validated.
  if (message.indexOf('error boundary') >= 0) {
    return;
  }

  consoleError(message);
  throw new Error('Caught: ' + message);
};
