import * as React from 'react';
import { getWindow } from './dom/getWindow';
import { isDirectionalKeyCode } from './keyboard';
import { setFocusVisibility } from './setFocusVisibility';

export { IsFocusVisibleClassName } from './setFocusVisibility';

/**
 * Counter for mounting component that uses focus rectangle.
 * We want to cleanup the listners before last component that uses focus rectangle unmounts.
 */
let mountCounter = 0;

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
export function useFocusRects(window?: Window): void {
  const win = (window || getWindow()) as Window & { __hasInitializeFocusRects__: boolean; disableFabricFocusRects: boolean };
  React.useEffect(() => {
    if (win.disableFabricFocusRects === true) {
      return;
    }

    mountCounter++;
    if (win && !win.__hasInitializeFocusRects__ && win.disableFabricFocusRects !== false) {
      win.__hasInitializeFocusRects__ = true;
      win.addEventListener('mousedown', _onMouseDown, true);
      win.addEventListener('pointerdown', _onPointerDown, true);
      win.addEventListener('keydown', _onKeyDown, true);
    }

    return () => {
      if (win.disableFabricFocusRects === true) {
        return;
      }

      mountCounter--;
      if (mountCounter === 0) {
        win.__hasInitializeFocusRects__ = false;
        win.removeEventListener('mousedown', _onMouseDown, true);
        win.removeEventListener('pointerdown', _onPointerDown, true);
        win.removeEventListener('keydown', _onKeyDown, true);
      }
    };
  }, [win]);
}

/**
 * Function Component wrapper which enables calling `useFocusRects` hook.
 * Renders nothing.
 */
export const FocusRects: React.FunctionComponent<{ window?: Window }> = props => {
  useFocusRects(props.window);
  return null;
};

function _onMouseDown(ev: MouseEvent): void {
  setFocusVisibility(false, ev.target as Element);
}

function _onPointerDown(ev: PointerEvent): void {
  if (ev.pointerType !== 'mouse') {
    setFocusVisibility(false, ev.target as Element);
  }
}

function _onKeyDown(ev: KeyboardEvent): void {
  isDirectionalKeyCode(ev.which) && setFocusVisibility(true, ev.target as Element);
}
