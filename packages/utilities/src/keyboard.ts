import { KeyCodes } from './KeyCodes';

const DirectionalKeyCodes: { [key: number]: number } = {
  [KeyCodes.up]: 1,
  [KeyCodes.down]: 1,
  [KeyCodes.left]: 1,
  [KeyCodes.right]: 1,
  [KeyCodes.home]: 1,
  [KeyCodes.end]: 1,
  [KeyCodes.tab]: 1,
  [KeyCodes.pageUp]: 1,
  [KeyCodes.pageDown]: 1,
};

/**
 * Returns true if the keycode is a directional keyboard key.
 */
export function isDirectionalKeyCode(which: number): boolean {
  return !!DirectionalKeyCodes[which];
}

/**
 * Adds a keycode to the list of keys that, when pressed, should cause the focus outlines to be visible.
 * This can be used to add global shortcut keys that directionally move from section to section within
 * an app or between focus trap zones.
 */
export function addDirectionalKeyCode(which: number): void {
  DirectionalKeyCodes[which] = 1;
}

/**
 * Removes a keycode to the list of keys that, when pressed, should cause the focus outlines to be visible.
 * This can be used to remove global shortcut keys that directionally move from section to section within
 * an app or between focus trap zones.
 */
export function removeDirectionalKeyCode(which: number): void {
  delete DirectionalKeyCodes[which];
}
