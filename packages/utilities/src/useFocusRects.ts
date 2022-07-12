import * as React from 'react';
import { getWindow } from './dom/getWindow';
import { isDirectionalKeyCode } from './keyboard';
import { setFocusVisibility } from './setFocusVisibility';

/**
 * Counter for mounted components that use focus rectangles.
 * We want to cleanup the listeners before the last component that uses focus rectangles unmounts.
 */
let mountCounters = new WeakMap<Window | HTMLElement, number>();
let lastInteraction = '';
let focusEventCounters = 0;

function setMountCounters(key: Window | HTMLElement, delta: number): number {
  let newValue;
  const currValue = mountCounters.get(key);
  if (currValue) {
    newValue = currValue + delta;
  } else {
    newValue = 1;
  }

  mountCounters.set(key, newValue);
  return newValue;
}

type AppWindow = (Window & { FabricConfig?: { disableFocusRects?: boolean } }) | undefined;

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
 * @param rootRef - A Ref object. Focus rectangle can be applied on itself and all its children.
 */
export function useFocusRects(rootRef?: React.RefObject<HTMLElement>): void {
  React.useEffect(() => {
    const win = getWindow(rootRef?.current) as AppWindow;

    if (!win || win.FabricConfig?.disableFocusRects === true) {
      return undefined;
    }

    let el: HTMLElement | undefined = undefined;
    if (rootRef && rootRef.current) {
      el = rootRef.current;
    }

    let elCount;
    if (el && el.addEventListener && typeof el.addEventListener === 'function') {
      elCount = setMountCounters(el, 1);
      if (elCount <= 1) {
        el.addEventListener('focus', _onFocus, true);
      }
    } else {
      focusEventCounters += 1;
      if (focusEventCounters <= 1) {
        win.addEventListener('focus', _onFocus, true);
      }
    }

    let winCount = setMountCounters(win, 1);
    if (winCount <= 1) {
      win.addEventListener('mousedown', _onMouseDown, true);
      win.addEventListener('pointerdown', _onPointerDown, true);
      win.addEventListener('keydown', _onKeyDown, true);
    }

    return () => {
      if (!win || win.FabricConfig?.disableFocusRects === true) {
        return;
      }

      if (el && el.removeEventListener && typeof el.removeEventListener === 'function') {
        elCount = setMountCounters(el, -1);
        if (elCount === 0) {
          el.removeEventListener('focus', _onFocus, true);
        }
      } else {
        focusEventCounters -= 1;
        if (focusEventCounters === 0) {
          win.removeEventListener('focus', _onFocus, true);
        }
      }

      winCount = setMountCounters(win, -1);
      if (winCount === 0) {
        win.removeEventListener('mousedown', _onMouseDown, true);
        win.removeEventListener('pointerdown', _onPointerDown, true);
        win.removeEventListener('keydown', _onKeyDown, true);
      }
    };
  }, [rootRef]);
}

/**
 * Function Component wrapper which enables calling `useFocusRects` hook.
 * Renders nothing.
 */
export const FocusRects: React.FunctionComponent<{ rootRef?: React.RefObject<HTMLElement> }> = props => {
  useFocusRects(props.rootRef);
  return null;
};

function _onMouseDown(ev: MouseEvent): void {
  lastInteraction = 'mouse';
  setFocusVisibility(false, ev.target as Element);
}

function _onPointerDown(ev: PointerEvent): void {
  if (ev.pointerType !== 'mouse') {
    lastInteraction = 'pointer';
    setFocusVisibility(false, ev.target as Element);
  }
}

function _onKeyDown(ev: KeyboardEvent): void {
  // eslint-disable-next-line deprecation/deprecation
  if (isDirectionalKeyCode(ev.which)) {
    lastInteraction = 'keyboard';
  } else {
    lastInteraction = '';
  }
}

function _onFocus(ev: FocusEvent): void {
  if (ev.target && lastInteraction === 'keyboard') {
    setFocusVisibility(true, ev.target as Element);
  }
}
