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
    _rtl =
      typeof document !== 'undefined' &&
      !!document.documentElement &&
      document.documentElement.getAttribute('dir') === 'rtl';
  }
  return _rtl;
}

// This has been split into 2 lines because it was working in Fabric due to the code being transpiled to es5, so this
// was converted to var while not working in Fluent that uses babel to transpile the code to be es6-like. Splitting the
// logic into two lines, however, allows it to work in both scenarios.
let _rtl: boolean;
_rtl = getRTL();

export function getStyleOptions(): IStyleOptions {
  return {
    rtl: getRTL(),
  };
}
