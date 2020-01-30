import { IStyleOptions } from './IStyleOptions';

/**
 * Sets the current RTL value.
 */
export function setRTL(isRTL: boolean): void {
  if (_rtl !== isRTL) {
    _rtl = isRTL;
  }
}

/**
 * Gets the current RTL value.
 */
export function getRTL(): boolean {
  if (_rtl === undefined) {
    _rtl = typeof document !== 'undefined' && !!document.documentElement && document.documentElement.getAttribute('dir') === 'rtl';
  }
  return _rtl;
}

let _rtl = getRTL();

export function getStyleOptions(): IStyleOptions {
  return {
    rtl: getRTL()
  };
}
