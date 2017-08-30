import { KeyCodes } from './KeyCodes';

// Default to undefined so that we initialize on first read.
let _isRTL: boolean | undefined;

/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */
export function getRTL(): boolean {
  let isRTL: boolean = _isRTL as boolean;

  if (isRTL === undefined) {
    let doc = typeof document === 'undefined' ? undefined : document;

    if (doc && doc.documentElement) {
      isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
    }
  }

  return isRTL;
}

/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */
export function setRTL(isRTL: boolean): void {
  let doc = typeof document === 'undefined' ? undefined : document;

  if (doc && doc.documentElement) {
    doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  _isRTL = isRTL;
}

/**
 * Returns the given key, but flips right/left arrows if necessary.
 *
 * @public
 */
export function getRTLSafeKeyCode(key: number): number {
  if (getRTL()) {
    if (key === KeyCodes.left) {
      key = KeyCodes.right;
    } else if (key === KeyCodes.right) {
      key = KeyCodes.left;
    }
  }

  return key;
}
