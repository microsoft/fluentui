/** Jest test setup file. */

// Mock ResizeObserver for test environment
// Required because MessageBar components use useMessageBarReflow which depends on ResizeObserver,
// but jsdom doesn't provide this browser API
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    // Do nothing in tests - we're only testing component behavior, not resize functionality
  }

  unobserve() {
    // Do nothing in tests
  }

  disconnect() {
    // Do nothing in tests
  }
};
