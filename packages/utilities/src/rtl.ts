import { KeyCodes } from './KeyCodes';
import { getDocument } from './dom/getDocument';
import { getItem, setItem } from './sessionStorage';
import { setRTL as mergeStylesSetRTL } from '@uifabric/merge-styles';

const RTL_LOCAL_STORAGE_KEY = 'isRTL';

// Default to undefined so that we initialize on first read.
let _isRTL: boolean | undefined;

/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
export function getRTL(): boolean {
  if (_isRTL === undefined) {
    // Fabric supports persisting the RTL setting between page refreshes via session storage
    let savedRTL = getItem(RTL_LOCAL_STORAGE_KEY);
    if (savedRTL !== null) {
      _isRTL = savedRTL === '1';
      setRTL(_isRTL);
    }

    let doc = getDocument();
    if (_isRTL === undefined && doc) {
      _isRTL = ((doc.body && doc.body.getAttribute('dir')) || doc.documentElement.getAttribute('dir')) === 'rtl';
      mergeStylesSetRTL(_isRTL);
    }
  }

  return !!_isRTL;
}

/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
export function setRTL(isRTL: boolean, persistSetting: boolean = false): void {
  let doc = getDocument();
  if (doc) {
    doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  if (persistSetting) {
    setItem(RTL_LOCAL_STORAGE_KEY, isRTL ? '1' : '0');
  }

  _isRTL = isRTL;
  mergeStylesSetRTL(_isRTL);
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
