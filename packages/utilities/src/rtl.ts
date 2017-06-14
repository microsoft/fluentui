import { KeyCodes } from './KeyCodes';
import { getDocument, getWindow } from './dom';

// Default to undefined so that we initialize on first read.
let _isRTL: boolean | undefined;

/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
export function getRTL(): boolean {
  if (_isRTL === undefined) {
    let doc = getDocument();
    let win = getWindow();

    // tslint:disable-next-line:no-string-literal
    if (win && win['localStorage']) {
      let savedRTL = localStorage.getItem('isRTL');

      if (savedRTL !== null) {
        _isRTL = savedRTL === '1';
      }
    }
    if (_isRTL === undefined && doc) {
      _isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
    }

    if (_isRTL !== undefined) {
      setRTL(_isRTL, true);
    } else {
      throw new Error(
        'getRTL was called in a server environment without setRTL being called first. ' +
        'Call setRTL to set the correct direction first.'
      );
    }
  }

  return _isRTL;
}

/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
export function setRTL(isRTL: boolean | undefined, avoidPersisting = false) {
  let doc = getDocument();
  if (doc) {
    doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  let win = getWindow();
  // tslint:disable-next-line:no-string-literal
  if (win && win['localStorage'] && !avoidPersisting) {
    try {
      localStorage.setItem('isRTL', isRTL ? '1' : '0');
    } catch (e) {
      /*  swallow the exception, because safari private mode does not have local storage */
    }
  }

  _isRTL = isRTL;
}

/**
 * Returns the given key, but flips right/left arrows if necessary.
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
