/* eslint-disable @typescript-eslint/no-empty-function */
/** Jest test setup file. */
require('@testing-library/jest-dom');

// https://github.com/jsdom/jsdom/issues/3368
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};

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

// Mock getComputedTextLength for SVG tspan elements
Object.defineProperty(
  Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
  'getComputedTextLength',
  {
    value: () => 100,
    writable: true,
    configurable: true,
  },
);
