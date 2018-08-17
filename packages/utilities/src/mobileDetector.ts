export const isIOS = (): boolean => {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  return /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
};
