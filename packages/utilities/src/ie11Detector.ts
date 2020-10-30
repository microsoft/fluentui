import { getWindow } from './dom/getWindow';

export const isIE11 = (): boolean => {
  const win = getWindow();

  if (!win?.navigator?.userAgent) {
    return false;
  }

  return win.navigator.userAgent.indexOf('rv:11.0') > -1;
};
