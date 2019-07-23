export const isIE11 = (): boolean => {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false;
  }

  return window.navigator.userAgent.indexOf('rv:11.0') > -1;
};
