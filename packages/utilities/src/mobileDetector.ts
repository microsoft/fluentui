/**
 * Returns true if and only if the user is on a iOS device.
 * Used to determine whether iOS-specific behavior should be applied.
 */
export const isIOS = (): boolean => {
  // eslint-disable-next-line no-restricted-globals
  const win = window;
  if (!win || !win.navigator || !win.navigator.userAgent) {
    return false;
  }
  return /iPad|iPhone|iPod/i.test(win.navigator.userAgent);
};
