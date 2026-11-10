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
    const pendingCloseEvents = new Set();
    afterEach(() => {
      for (const timeout of pendingCloseEvents) {
        clearTimeout(timeout);
      }
      pendingCloseEvents.clear();
    });

    proto.close = function close() {
      if (!this.open) {
        return;
      }
      this.removeAttribute('open');
      // Native close events are queued, not dispatched by close() synchronously.
      const timeout = setTimeout(() => {
        pendingCloseEvents.delete(timeout);
        this.dispatchEvent(new Event('close'));
      }, 0);
      pendingCloseEvents.add(timeout);
    };
  }
}
