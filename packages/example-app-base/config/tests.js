/** Jest test setup file. */
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
