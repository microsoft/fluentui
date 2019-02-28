import { IRectangle } from '../IRectangle';
/**
 * Helper to get bounding client rect. Passing in window will get the window size.
 *
 * @public
 */
export function getRect(element: HTMLElement | Window | null): IRectangle | undefined {
  let rect: IRectangle | undefined;
  if (element) {
    if (element === window) {
      rect = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        right: window.innerWidth,
        bottom: window.innerHeight
      };
    } else if ((element as HTMLElement).getBoundingClientRect) {
      rect = (element as HTMLElement).getBoundingClientRect();
    }
  }
  return rect;
}
