import { getWindow } from './dom/getWindow';
import { isDirectionalKeyCode } from './keyboard';

export const IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';

/**
 * Initializes the logic which:
 *
 * 1. Subscribes keydown and mousedown events. (It will only do it once per window,
 *    so it's safe to call this method multiple times.)
 * 2. When the user presses directional keyboard keys, adds the 'ms-Fabric--isFocusVisible' classname
 *    to the document body.
 * 3. When the user clicks a mouse button, we remove the classname if it exists.
 *
 * This logic allows components on the page to conditionally render focus treatments only
 * if the global classname exists, which simplifies logic overall.
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
  const win = getWindow(ev.target as Element);

  if (win) {
    const { classList } = win.document.body;

    if (classList.contains(IsFocusVisibleClassName)) {
      classList.remove(IsFocusVisibleClassName);
    }
  }
}

function _onKeyDown(ev: KeyboardEvent): void {
  const win = getWindow(ev.target as Element);

  if (win) {
    const { classList } = win.document.body;

    if (isDirectionalKeyCode(ev.which) && !classList.contains(IsFocusVisibleClassName)) {
      classList.add(IsFocusVisibleClassName);
    }
  }
}
