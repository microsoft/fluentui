// Fail on warnings.
console.warn = (message) => {
  throw new Error(message);
};