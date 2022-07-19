import * as React from 'react';
import { getWindow } from './dom/getWindow';
import { isDirectionalKeyCode } from './keyboard';
import { setFocusVisibility } from './setFocusVisibility';

/**
 * Counter for mounted components that use focus rectangles.
 * We want to cleanup the listeners before the last component that uses focus rectangles unmounts.
 */
let mountCounters = new WeakMap<Window | HTMLElement, WeakMap<Window | HTMLElement, number> | number>();
let lastInteraction = '';
let focusEventCounters = 0;

function setMountCounters(key: Window | HTMLElement, delta: number, relatedTarget?: Window | HTMLElement): number {
  let newValue;
  let currValue = mountCounters.get(key);
  if (currValue) {
    if (typeof currValue === 'number') {
      newValue = currValue + delta;
      mountCounters.set(key, newValue);
    } else {
      if (relatedTarget) {
        const currValueOfTarget = currValue.get(relatedTarget);
        if (currValueOfTarget) {
          newValue = currValueOfTarget + delta;
        } else {
          newValue = 1;
        }
        currValue.set(relatedTarget, newValue);
      }
    }
  } else {
    newValue = 1;
    if (relatedTarget) {
      mountCounters.set(key, new WeakMap<Window | HTMLElement, number>());
      currValue = mountCounters.get(key);
      if (currValue && typeof currValue !== 'number') {
        currValue.set(relatedTarget, newValue);
      }
    } else {
      mountCounters.set(key, newValue);
    }
  }

  return newValue ?? NaN;
}

type AppWindow =
  | (Window & {
      FabricConfig?: {
        applyFocusClassNamesToTarget?: boolean;
        disableFocusRects?: boolean;
      };
    })
  | undefined;

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

    const applyFocusClassNamesToTarget = win.FabricConfig?.applyFocusClassNamesToTarget;
    const onFocus = (ev: FocusEvent) =>
      _onFocusWithClassNameTarget(
        ev,
        applyFocusClassNamesToTarget && el?.parentElement ? el?.parentElement : undefined,
      );
    const onMouseDown = (ev: MouseEvent) =>
      _onMouseDownWithClassNameTarget(
        ev,
        applyFocusClassNamesToTarget && el?.parentElement ? el?.parentElement : undefined,
      );
    const onPointerDown = (ev: PointerEvent) =>
      _onPointerDownWithClassNameTarget(
        ev,
        applyFocusClassNamesToTarget && el?.parentElement ? el?.parentElement : undefined,
      );

    let elCount;
    if (el && el.addEventListener && typeof el.addEventListener === 'function') {
      elCount = setMountCounters(el, 1);
      if (elCount <= 1) {
        el.addEventListener('focus', onFocus, true);
      }
    } else {
      focusEventCounters += 1;
      if (focusEventCounters <= 1) {
        win.addEventListener('focus', onFocus, true);
      }
    }

    let winCount = setMountCounters(win, 1, (applyFocusClassNamesToTarget && el) || win);
    if (winCount <= 1) {
      win.addEventListener('mousedown', onMouseDown, true);
      win.addEventListener('pointerdown', onPointerDown, true);
      win.addEventListener('keydown', _onKeyDown, true);
    }

    return () => {
      if (!win || win.FabricConfig?.disableFocusRects === true) {
        return;
      }

      if (el && el.removeEventListener && typeof el.removeEventListener === 'function') {
        elCount = setMountCounters(el, -1);
        if (elCount === 0) {
          el.removeEventListener('focus', onFocus, true);
        }
      } else {
        focusEventCounters -= 1;
        if (focusEventCounters === 0) {
          win.removeEventListener('focus', onFocus, true);
        }
      }

      winCount = setMountCounters(win, -1, (applyFocusClassNamesToTarget && el) || win);
      if (winCount === 0) {
        win.removeEventListener('mousedown', onMouseDown, true);
        win.removeEventListener('pointerdown', onPointerDown, true);
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

function _onMouseDownWithClassNameTarget(ev: MouseEvent, classNameTarget?: Element): void {
  lastInteraction = 'mouse';
  setFocusVisibility(false, ev.target as Element, classNameTarget);
}

function _onPointerDownWithClassNameTarget(ev: PointerEvent, classNameTarget?: Element): void {
  if (ev.pointerType !== 'mouse') {
    lastInteraction = 'pointer';
    setFocusVisibility(false, ev.target as Element, classNameTarget);
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

function _onFocusWithClassNameTarget(ev: FocusEvent, classNameTarget?: Element): void {
  if (ev.target && lastInteraction === 'keyboard') {
    setFocusVisibility(true, ev.target as Element, classNameTarget);
  }
}
