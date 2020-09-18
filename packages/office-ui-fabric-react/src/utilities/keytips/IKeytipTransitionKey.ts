import { find, KeyCodes } from '../../Utilities';

export type KeytipTransitionModifier =
  | typeof KeyCodes.shift
  | typeof KeyCodes.ctrl
  | typeof KeyCodes.alt
  | typeof KeyCodes.leftWindow;

export interface IKeytipTransitionKey {
  key: string;
  modifierKeys?: KeytipTransitionModifier[];
}

/**
 * Tests for equality between two IKeytipTransitionKeys.
 *
 * @param key1 - First IKeytipTransitionKey.
 * @param key2 - Second IKeytipTransitionKey.
 * @returns T/F if the transition keys are equal.
 */
export function transitionKeysAreEqual(key1: IKeytipTransitionKey, key2: IKeytipTransitionKey): boolean {
  if (key1.key !== key2.key) {
    return false;
  }

  let mod1 = key1.modifierKeys;
  let mod2 = key2.modifierKeys;

  if ((!mod1 && mod2) || (mod1 && !mod2)) {
    // Not equal if one modifier is defined and the other isn't
    return false;
  }

  if (mod1 && mod2) {
    if (mod1.length !== mod2.length) {
      return false;
    }

    // Sort both arrays
    mod1 = mod1.sort();
    mod2 = mod2.sort();
    for (let i = 0; i < mod1.length; i++) {
      if (mod1[i] !== mod2[i]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Tests if 'key' is present in 'keys'.
 *
 * @param keys - Array of IKeytipTransitionKey.
 * @param key - IKeytipTransitionKey to find in 'keys'.
 * @returns T/F if 'keys' contains 'key'.
 */
export function transitionKeysContain(keys: IKeytipTransitionKey[], key: IKeytipTransitionKey): boolean {
  return !!find(keys, (transitionKey: IKeytipTransitionKey) => {
    return transitionKeysAreEqual(transitionKey, key);
  });
}
