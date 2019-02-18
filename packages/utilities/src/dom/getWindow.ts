import { _isSSR } from './setSSR';
/**
 * Helper to get the window object.
 *
 * @public
 */
export function getWindow(rootElement?: Element | null): Window | undefined {
  if (_isSSR || typeof window === 'undefined') {
    return undefined;
  } else {
    return rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView
      ? rootElement.ownerDocument.defaultView
      : window;
  }
}
