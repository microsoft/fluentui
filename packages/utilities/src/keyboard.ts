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
  [KeyCodes.pageDown]: 1
};

/**
 * Returns true if the keycode is a directional keyboard key.
 */
export function isDirectionalKeyCode(which: number): boolean {
  return !!DirectionalKeyCodes[which];
}
