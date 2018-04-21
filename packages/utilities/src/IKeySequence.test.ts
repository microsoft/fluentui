import {
  IKeySequence,
  keySequenceStartsWith,
  convertSequencesToKeytipID,
  fullKeySequencesAreEqual,
  mergeOverflowKeySequences
} from './IKeySequence';
import { ktpFullPrefix, ktpSeparator } from './KeytipConstants';

describe('IKeySequence', () => {
  describe('keySequencesStartsWith', () => {
    it('false when the key sequence for seq1 is zero ', () => {
      const seq1: IKeySequence = '';
      const seq2: IKeySequence = 'b';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when the key sequence for seq2 is zero ', () => {
      const seq1: IKeySequence = 'a';
      const seq2: IKeySequence = '';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when sequence start is different', () => {
      const seq1: IKeySequence = 'a';
      const seq2: IKeySequence = 'b';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('true when sequences are equal', () => {
      const seq1: IKeySequence = 'a';
      const seq2: IKeySequence = 'a';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence1 is a subset of sequence 2', () => {
      const seq1: IKeySequence = 'a';
      const seq2: IKeySequence = 'ab';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence2 is a subset of sequence 1', () => {
      const seq1: IKeySequence = 'ab';
      const seq2: IKeySequence = 'a';
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });
  });

  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      const keySequence: IKeySequence[] = ['a'];
      const keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a');
    });

    it('for one complex key sequence', () => {
      const complexKeySequence: IKeySequence[] = ['ad'];
      const keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'd');
    });

    it('for multiple singular key sequences', () => {
      const keySequences: IKeySequence[] = ['ac'];
      const keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'c');
    });

    it('for multiple complex key sequences', () => {
      const complexKeySequences: IKeySequence[] = ['an', 'cb'];
      const keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' +
        ktpSeparator + 'n' + ktpSeparator +
        'c' + ktpSeparator + 'b');
    });
  });

  describe('fullKeySequencesAreEqual', () => {
    it('different lengths should not be equal', () => {
      const keySequences1: IKeySequence[] = ['an', 'cb'];
      const keySequences2: IKeySequence[] = ['a', 'n'];
      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(false);
    });

    it('should correctly be equal', () => {
      const keySequences1: IKeySequence[] = ['an', 'cb'];
      const keySequences2: IKeySequence[] = ['an', 'cb'];
      const keySequences3: IKeySequence[] = ['na', 'cb'];
      const keySequences4: IKeySequence[] = ['a', 'cb'];

      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(true);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences3)).toEqual(false);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences4)).toEqual(false);
    });
  });

  describe('mergeOverflowKeySequences', () => {
    it('when overflow sequence is first', () => {
      const overflowSequence = ['01'];
      const keySequences = ['x', 'c'];
      const newKeySequence = mergeOverflowKeySequences(keySequences, overflowSequence);
      expect(fullKeySequencesAreEqual(newKeySequence, ['01', 'x', 'c'])).toEqual(true);
    });

    it('when overflowSequence is in the middle', () => {
      const overflowSequence = ['h', '01'];
      const keySequences = ['h', 'x', 'c'];
      const newKeySequence = mergeOverflowKeySequences(keySequences, overflowSequence);
      expect(fullKeySequencesAreEqual(newKeySequence,
        ['h', '01', 'x', 'c'])).toEqual(true);
    });
  });
});