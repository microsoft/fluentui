/** Jest test setup file. */

require('@testing-library/jest-dom');

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
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}

// JSDOM does not implement the Popover API yet.
// Provide a minimal test shim so components using showPopover/hidePopover can run in Jest.
if (typeof HTMLElement !== 'undefined') {
  const proto = HTMLElement.prototype;

  if (!proto.showPopover) {
    proto.showPopover = function showPopover() {
      /* no-op */
    };
  }

  if (!proto.hidePopover) {
    proto.hidePopover = function hidePopover() {
      /* no-op */
    };
  }
}
