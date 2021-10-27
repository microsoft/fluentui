import { getWindow } from './dom/getWindow';

let isMacResult: boolean | undefined;

/**
 * Returns true if the user is on a Mac. Caches the result value.
 * @param reset - Reset the cached result value (mainly for testing).
 */
export function isMac(reset?: boolean): boolean {
  if (typeof isMacResult === 'undefined' || reset) {
    const win = getWindow();
    // In certain SSR frameworks, `window` will be defined even on the server but `navigator` will be undefined
    const userAgent = win?.navigator?.userAgent;
    isMacResult = !!userAgent && userAgent.indexOf('Macintosh') !== -1;
  }
  return !!isMacResult;
}
