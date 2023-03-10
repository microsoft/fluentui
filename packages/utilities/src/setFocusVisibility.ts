import * as React from 'react';
import { getWindow } from './dom/getWindow';
export const IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
export const IsFocusHiddenClassName = 'ms-Fabric--isFocusHidden';

function updateClassList(el: HTMLElement | null | undefined, enabled: boolean) {
  if (el) {
    el.classList.add(enabled ? IsFocusVisibleClassName : IsFocusHiddenClassName);
    el.classList.remove(enabled ? IsFocusHiddenClassName : IsFocusVisibleClassName);
  }
}

/**
 * Sets the visibility of focus styling.
 *
 * By default, focus styles (the box surrounding a focused Button, for example) only show up when navigational
 * keypresses occur (through Tab, arrows, PgUp/PgDn, Home and End), and are hidden when mouse interactions occur.
 * This API provides an imperative way to turn them on/off.
 *
 * A use case might be when you have a keypress like ctrl-f6 navigate to a particular region on the page,
 * and want focus to show up.
 *
 * @param enabled - Whether to turn focus visibility on or off.
 * @param target - Optional target from which to get window in case no `providerElem` has been specified.
 * @param registeredProviders - Array of provider refs that are associated with a FocusRectsProvider. If no array
 *                              is passed in, the classnames are attached to the document body that contains `target`.
 */
export function setFocusVisibility(
  enabled: boolean,
  target?: Element,
  registeredProviders?: React.RefObject<HTMLElement>[],
): void {
  if (registeredProviders) {
    registeredProviders.forEach(ref => updateClassList(ref.current, enabled));
  } else {
    updateClassList(getWindow(target)?.document.body, enabled);
  }
}
