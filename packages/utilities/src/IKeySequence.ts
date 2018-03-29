import { ktpPrefix, ktpSeparator } from './KeytipConstants';
import { addElementAtIndex } from './array';

export type IKeySequence = string;

/**
 * Tests for equality between two arrays of IKeySequence
 *
 * @param seq1 - First IKeySequence[]
 * @param seq2 - Second IKeySequence[]
 * @returns {boolean} T/F if the sequences are equal
 */
export function fullKeySequencesAreEqual(seq1: IKeySequence[], seq2: IKeySequence[]): boolean {
  if (seq1.length !== seq2.length) {
    return false;
  }

  for (let i = 0; i < seq1.length; i++) {
    if (seq1[i] !== seq2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Method returns true if the key squence with minimum length is in the other key sequence.
 * If the minium length is zero, then it will default to false.
 *
 * @param seq1 - First IKeySequence
 * @param seq2 - Second IKeySequence
 * @returns {boolean} T/F if seq1 starts with seq2, or vice versa
 */
export function keySequenceStartsWith(seq1: IKeySequence, seq2: IKeySequence): boolean {
  if (seq1.length === 0 || seq2.length === 0) {
    return false;
  }
  return seq1.indexOf(seq2) === 0 || seq2.indexOf(seq1) === 0;
}

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence
 *
 * @param keySequences - Full path of IKeySequences for one keytip
 * @returns {string} String to use for the keytip ID
 */
export function convertSequencesToKeytipID(keySequences: IKeySequence[]): string {
  return keySequences.reduce((prevValue: string, keySequence: IKeySequence): string => {
    return prevValue + ktpSeparator + keySequence.split('').join(ktpSeparator);
  }, ktpPrefix);
}

/**
 * Merges an overflow sequence with a key sequence
 *
 * @param keySequences - Full sequence for one keytip
 * @param overflowKeySequences - Full overflow keytip sequence
 * @returns {IKeySequence[]} Sequence that will be used by the keytip when in the overflow
 */
export function mergeOverflowKeySequences(keySequences: IKeySequence[], overflowKeySequences: IKeySequence[]): IKeySequence[] {
  const overflowSequenceLen = overflowKeySequences.length;
  const overflowSequence = [...overflowKeySequences].pop();
  const newKeySequences = [...keySequences];
  return addElementAtIndex(newKeySequences, overflowSequenceLen - 1, overflowSequence!);
}