import { getWindow } from './dom/getWindow';
export const IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
export const IsFocusHiddenClassName = 'ms-Fabric--isFocusHidden';

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
 * @param registeredProviders - Array of provider elements that are associated with a FocusRectsProvider. If no array
 *                              is passed in, the classnames are attached to the document body that contains `target`.
 */
export function setFocusVisibility(enabled: boolean, target?: Element, registeredProviders?: HTMLElement[]): void {
  const updateClassList = (el: HTMLElement) => {
    el.classList.add(enabled ? IsFocusVisibleClassName : IsFocusHiddenClassName);
    el.classList.remove(enabled ? IsFocusHiddenClassName : IsFocusVisibleClassName);
  };

  if (registeredProviders) {
    registeredProviders.forEach(updateClassList);
  } else {
    const win = target ? getWindow(target) : getWindow();
    if (win) {
      updateClassList(win.document.body);
    }
  }
}
