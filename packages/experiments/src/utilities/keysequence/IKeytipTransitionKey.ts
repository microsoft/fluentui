import { ModifierKeyCodes } from '../keytip/ModifierKeyCodes';

export interface IKeytipTransitionKey {
  key: string;
  modifierKeys?: ModifierKeyCodes[];
}

/**
 *
 * @param seq1
 * @param seq2
 */
export function transitionKeysAreEqual(seq1: IKeytipTransitionKey, seq2: IKeytipTransitionKey): boolean {
  if (seq1.key !== seq2.key) {
    return false;
  }
  let mod1 = seq1.modifierKeys;
  let mod2 = seq2.modifierKeys;
  if (!mod1 && !mod2) {
    // If they're both null return true, nothing more to check
    return true;
  }

  if ((!mod1 && mod2) || (mod1 && !mod2)) {
    // Not equal if one is defined and the other isn't
    return false;
  }

  if (mod1 && mod2) {
    // Null check needed for ts
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
 *
 * @param sequences
 * @param seq
 */
export function transitionKeysContain(sequences: IKeytipTransitionKey[], seq: IKeytipTransitionKey): boolean {
  for (let i = 0; i < sequences.length; i++) {
    if (transitionKeysAreEqual(sequences[i], seq)) {
      return true;
    }
  }
  return false;
}
