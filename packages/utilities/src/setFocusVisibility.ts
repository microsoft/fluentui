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
 * @param enabled - whether to remove or add focus
 * @param target - optional target
 */
export function setFocusVisibility(enabled: boolean, target?: Element): void {
  const win = target ? getWindow(target) : getWindow();

  if (win) {
    const { classList } = win.document.body;
    classList.add(enabled ? IsFocusVisibleClassName : IsFocusHiddenClassName);
    classList.remove(enabled ? IsFocusHiddenClassName : IsFocusVisibleClassName);
  }
}
