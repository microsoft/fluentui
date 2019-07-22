export const isIE11 = (): boolean => {
  if (!window || !window.navigator || !window.navigator.userAgent) {
    return false;
  }

  if (window.navigator.userAgent.indexOf('rv:11.0') > -1) {
    return true;
  } else {
    return false;
  }
};
