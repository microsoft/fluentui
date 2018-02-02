import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { ktpPrefix, ktpSeparator } from '../keytip/KeytipUtils';
// REMOVE IKEYSEQUENCE FROM CORE PACKAGE FOR NOW????
export interface IKeySequence {
  keyCodes: KeyCodes[];
}

/**
 * Tests for equality between two IKeySequences
 * @param seq1 - First IKeySequence
 * @param seq2 - Second IKeySequence
 */
export function keySequencesAreEqual(seq1: IKeySequence, seq2: IKeySequence): boolean {
  let keyCodes1 = seq1.keyCodes;
  let keyCodes2 = seq2.keyCodes;
  if (keyCodes1.length !== keyCodes2.length) {
    return false;
  }
  for (let i = 0; i < keyCodes1.length; i++) {
    if (keyCodes1[i] !== keyCodes2[i]) {
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
export function keySequencesContain(sequences: IKeySequence[], seq: IKeySequence): boolean {
  for (let i = 0; i < sequences.length; i++) {
    if (keySequencesAreEqual(sequences[i], seq)) {
      return true;
    }
  }
  return false;
}

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence
 * @param keySequences - Full path of IKeySequences for one keytip
 */
export function convertSequencesToKeytipID(keySequences: IKeySequence[]): string {
  let conversion = ktpPrefix;
  for (let keySequence of keySequences) {
    conversion += ktpSeparator + keySequence.keyCodes.join(ktpSeparator);
  }
  return conversion;
}