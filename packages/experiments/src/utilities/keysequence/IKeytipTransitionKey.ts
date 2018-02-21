import { KeytipTransitionModifier } from '../../Keytip';

export interface IKeytipTransitionKey {
  key: string;
  modifierKeys?: KeytipTransitionModifier[];
}

/**
 * Tests for equality between two IKeytipTransitionKeys
 *
 * @param key1 - First IKeytipTransitionKey
 * @param key2 - Second IKeytipTransitionKey
 * @returns {boolean} T/F if the transition keys are equal
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

    // Check that all items in mod1 are in mod2
    // Order doesn't matter
    let mod2Copy = [...mod2];
    for (let i = 0; i < mod1.length; i++) {
      let index = mod2Copy.indexOf(mod1[i]);
      if (index < 0) {
        return false;
      }
      mod2Copy.splice(index, 1);
    }
    if (mod2Copy.length !== 0) {
      return false;
    }
  }

  return true;
}

/**
 * Tests if 'key' is present in 'keys'
 *
 * @param keys - Array of IKeytipTransitionKey
 * @param key - IKeytipTransitionKey to find in 'keys'
 * @returns {boolean} T/F if 'keys' contains 'key'
 */
export function transitionKeysContain(keys: IKeytipTransitionKey[], key: IKeytipTransitionKey): boolean {
  for (let i = 0; i < keys.length; i++) {
    if (transitionKeysAreEqual(keys[i], key)) {
      return true;
    }
  }
  return false;
}
