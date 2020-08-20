/** Jest test setup file. */

// Mock requestAnimationFrame for React 16+.
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
