import { _isSSR } from './setSSR';

let _window: Window | undefined = undefined;

// Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
// hits a memory leak, whereas aliasing it and calling "typedef _window" does not.
// Caching the window value at the file scope lets us minimize the impact.
try {
  _window = window;
} catch (e) {
  /* no-op */
}

/**
 * Helper to get the window object. Note that in popup scenarios the window object
 * may not be the window use ex
 *
 * @public
 */
export function getWindow(rootElement?: Element | null): Window | undefined {
  if (_isSSR || typeof _window === 'undefined') {
    return undefined;
  } else {
    return rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView
      ? rootElement.ownerDocument.defaultView
      : _window;
  }
}
