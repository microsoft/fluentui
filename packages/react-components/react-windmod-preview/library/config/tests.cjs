/** Jest test setup file. */

require('@testing-library/jest-dom');

// jsdom implements neither ResizeObserver nor the native <dialog> methods, and the headless
// components this package decorates call both unguarded. Same shims, same reasons, as the headless
// package's own config/tests.cjs.
global.ResizeObserver = class ResizeObserver {
  observe() {
    // no-op for jsdom
  }
  unobserve() {
    // no-op for jsdom
  }
  disconnect() {
    // no-op for jsdom
  }
};

if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype;

  if (!proto.showModal) {
    proto.showModal = function showModal() {
      this.setAttribute('open', '');
    };
  }

  if (!proto.show) {
    proto.show = function show() {
      this.setAttribute('open', '');
    };
  }

  if (!proto.close) {
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}
