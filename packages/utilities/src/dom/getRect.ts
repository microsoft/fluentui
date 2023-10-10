import type { IRectangle } from '../IRectangle';

/**
 * Helper to get bounding client rect. Passing in window will get the window size.
 *
 * @public
 */
export function getRect(
  element: HTMLElement | Window | null,
  // eslint-disable-next-line no-restricted-globals
  win: Window = window,
): IRectangle | undefined {
  let rect: IRectangle | undefined;
  if (element) {
    if (element === win) {
      rect = {
        left: 0,
        top: 0,
        width: win.innerWidth,
        height: win.innerHeight,
        right: win.innerWidth,
        bottom: win.innerHeight,
      };
    } else if ((element as { getBoundingClientRect?: unknown }).getBoundingClientRect) {
      rect = (element as HTMLElement).getBoundingClientRect();
    }
  }
  return rect;
}
