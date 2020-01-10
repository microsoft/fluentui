import { getWindow } from './dom/getWindow';
import { isDirectionalKeyCode } from './keyboard';
import { setFocusVisibility } from './setFocusVisibility';

export { IsFocusVisibleClassName } from './setFocusVisibility';

/**
 * Initializes the logic which:
 *
 * 1. Subscribes keydown and mousedown events. (It will only do it once per window,
 *    so it's safe to call this method multiple times.)
 * 2. When the user presses directional keyboard keys, adds the 'ms-Fabric--isFocusVisible' classname
 *    to the document body, removes the 'ms-Fabric-isFocusHidden' classname.
 * 3. When the user clicks a mouse button, adds the 'ms-Fabric-isFocusHidden' classname to the
 *    document body, removes the 'ms-Fabric--isFocusVisible' classname.
 *
 * This logic allows components on the page to conditionally render focus treatments based on
 * the existence of global classnames, which simplifies logic overall.
 *
 * @param window - the window used to add the event listeners
 */
export function initializeFocusRects(window?: Window): void {
  const win = (window || getWindow()) as Window & { __hasInitializeFocusRects__: boolean };

  if (win && !win.__hasInitializeFocusRects__) {
    win.__hasInitializeFocusRects__ = true;
    win.addEventListener('mousedown', _onMouseDown, true);
    win.addEventListener('keydown', _onKeyDown as () => void, true);
  }
}

function _onMouseDown(ev: MouseEvent): void {
  setFocusVisibility(false, ev.target as Element);
}

function _onKeyDown(ev: KeyboardEvent): void {
  isDirectionalKeyCode(ev.which) && setFocusVisibility(true, ev.target as Element);
}
