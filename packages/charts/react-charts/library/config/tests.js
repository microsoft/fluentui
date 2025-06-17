/* eslint-disable @typescript-eslint/no-empty-function */
/** Jest test setup file. */
require('@testing-library/jest-dom');
HTMLCanvasElement.prototype.getContext = () => {
  // return a mock context object
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x, y, w, h) => {
      return {
        data: new Array(w * h * 4),
      };
    },
    putImageData: () => {},
    createImageData: () => {
      return [];
    },
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => {
      return {
        width: 0,
      };
    },
  };
};
