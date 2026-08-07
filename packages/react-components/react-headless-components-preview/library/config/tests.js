/** Jest test setup file. */

require('@testing-library/jest-dom');

// Unit tests exercise native behavior by default. Focused fallback tests override
// this value before their first overlay runtime lookup.
window.__FUI_HEADLESS_OVERLAY_RUNTIME_MODE__ = 'native';

const openPopovers = new WeakSet();
const dispatchToggle = (element, newState) => {
  const event = new Event('toggle');
  Object.defineProperty(event, 'newState', { value: newState });
  element.dispatchEvent(event);
};

if (!HTMLElement.prototype.showPopover) {
  HTMLElement.prototype.showPopover = function showPopover() {
    openPopovers.add(this);
    dispatchToggle(this, 'open');
  };
}

if (!HTMLElement.prototype.hidePopover) {
  HTMLElement.prototype.hidePopover = function hidePopover() {
    if (openPopovers.delete(this)) {
      dispatchToggle(this, 'closed');
    }
  };
}

const nativeMatches = Element.prototype.matches;
Element.prototype.matches = function matches(selector) {
  if (selector === ':popover-open') {
    return openPopovers.has(this);
  }

  return nativeMatches.call(this, selector);
};

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
