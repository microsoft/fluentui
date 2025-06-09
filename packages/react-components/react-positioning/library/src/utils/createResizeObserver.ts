export function createResizeObserver(targetWindow: Window & typeof globalThis, callback: ResizeObserverCallback) {
  // https://github.com/jsdom/jsdom/issues/3368
  // Add the polyfill here so it is not needed for all unit tests that leverage positioning
  if (process.env.NODE_ENV === 'test') {
    targetWindow.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  }

  return new targetWindow.ResizeObserver(callback);
}
