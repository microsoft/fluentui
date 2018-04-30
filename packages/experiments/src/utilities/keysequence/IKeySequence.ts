import { ktpPrefix, ktpSeparator } from '../keytip/KeytipUtils';
import { find } from '../../Utilities';

export interface IKeySequence {
  keys: string[];
}

/**
 * Tests for equality between two IKeySequences
 *
 * @param seq1 - First IKeySequence
 * @param seq2 - Second IKeySequence
 * @returns {boolean} T/F if the two sequences are equal
 */
export function keySequencesAreEqual(seq1: IKeySequence, seq2: IKeySequence): boolean {
  const keyCodes1 = seq1.keys.join();
  const keyCodes2 = seq2.keys.join();
  return keyCodes1 === keyCodes2;
}

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
    if (!keySequencesAreEqual(seq1[i], seq2[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Tests if 'seq' is present in 'sequences'
 *
 * @param sequences - Array of IKeySequence
 * @param seq - IKeySequence to check for in 'sequences'
 * @returns {boolean} T/F if 'sequences' contains 'seq'
 */
export function keySequencesContain(sequences: IKeySequence[], seq: IKeySequence): boolean {
  return !!find(sequences, (sequence: IKeySequence) => {
    return keySequencesAreEqual(sequence, seq);
  });
}

/**
 * Method returns true if the key squence of the object with minimum length is in the other key sequence.
 * If the minium length is zero, then it will default to false.
 *
 * @param seq1 - First IKeySequence
 * @param seq2 - Second IKeySequence
 * @returns {boolean} T/F if seq1 starts with seq2, or vice versa
 */
export function keySequenceStartsWith(seq1: IKeySequence, seq2: IKeySequence): boolean {
  const keyCodes1 = seq1.keys.join();
  const keyCodes2 = seq2.keys.join();
  if (keyCodes1.length === 0 || keyCodes2.length === 0) {
    return false;
  }
  return keyCodes1.indexOf(keyCodes2) === 0 || keyCodes2.indexOf(keyCodes1) === 0;
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
    return prevValue + ktpSeparator + keySequence.keys.join(ktpSeparator);
  }, ktpPrefix);
}