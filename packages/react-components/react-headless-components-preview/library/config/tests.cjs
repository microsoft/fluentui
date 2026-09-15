/** Jest test setup file. */

require('@testing-library/jest-dom');
require('@oddbird/popover-polyfill');

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

// JSDOM provides `CSS.escape` but not `CSS.supports`, so feature detection has nothing to call.
// Provide it, defaulting to "unsupported" — which is what this environment genuinely is, and what
// the missing method already resolved to. Tests exercising a feature-gated path opt in with
// `jest.spyOn(CSS, 'supports')`.
if (typeof CSS === 'undefined') {
  global.CSS = { supports: () => false };
} else if (typeof CSS.supports !== 'function') {
  CSS.supports = () => false;
}

// JSDOM does not implement native <dialog> APIs yet.
// Provide a minimal test shim so components using showModal/show/close can run in Jest.
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
