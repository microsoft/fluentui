import type { IRectangle } from '../IRectangle';
import { getWindow } from './getWindow';

/**
 * Helper to get bounding client rect. Passing in window will get the window size.
 *
 * @public
 */
export function getRect(element: HTMLElement | Window | null, win?: Window): IRectangle | undefined {
  const theWin = win ?? getWindow()!;
  let rect: IRectangle | undefined;
  if (element) {
    if (element === win) {
      rect = {
        left: 0,
        top: 0,
        width: theWin.innerWidth,
        height: theWin.innerHeight,
        right: theWin.innerWidth,
        bottom: theWin.innerHeight,
      };
    } else if ((element as { getBoundingClientRect?: unknown }).getBoundingClientRect) {
      rect = (element as HTMLElement).getBoundingClientRect();
    }
  }
  return rect;
}
