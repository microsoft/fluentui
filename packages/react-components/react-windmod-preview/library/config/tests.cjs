/** Jest test setup file. */

require('@testing-library/jest-dom');

// jsdom implements no native <dialog> methods, and the headless Dialog calls them unguarded.
// The same minimal shim the headless package's own setup installs, so the two run their specs
// against the same environment.
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
