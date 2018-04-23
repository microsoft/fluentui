import {
  IKeySequence,
  keySequencesAreEqual,
  keySequenceStartsWith,
  keySequencesContain,
  convertSequencesToKeytipID,
  fullKeySequencesAreEqual
} from './IKeySequence';
import { ktpFullPrefix, ktpSeparator } from '../keytip/KeytipUtils';

describe('IKeySequence', () => {

  describe('keySequencesAreEqual', () => {
    it('empty key', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: [] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });

    it('single key', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: ['a'] };
      const seq3: IKeySequence = { keys: ['b'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('multiple keys', () => {
      const seq1: IKeySequence = { keys: ['a', 'b'] };
      const seq2: IKeySequence = { keys: ['a', 'b'] };
      const seq3: IKeySequence = { keys: ['b', 'a'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('should be false when sequences are different length', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: ['a', 'b'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });
  });

  describe('keySequencesContain', () => {
    it('empty sequences', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const sequences: IKeySequence[] = [{ keys: [] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('empty key sequence', () => {
      const seq1: IKeySequence = { keys: [] };
      const sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('single key', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      const sequences2: IKeySequence[] = [{ keys: ['a', 'b'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(true);
      expect(keySequencesContain(sequences2, seq1)).toEqual(false);
    });

    it('multiple keys', () => {
      const seq1: IKeySequence = { keys: ['a', 'b'] };
      const sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      const sequences2: IKeySequence[] = [{ keys: ['a', 'b'] }, { keys: ['c', 'd'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
      expect(keySequencesContain(sequences2, seq1)).toEqual(true);
    });
  });

  describe('keySequencesStartsWith', () => {
    it('false when the key sequence for seq1 is zero ', () => {
      const seq1: IKeySequence = { keys: [] };
      const seq2: IKeySequence = { keys: ['b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when the key sequence for seq2 is zero ', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: [] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when sequence start is different', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: ['b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('true when sequences are equal', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: ['a'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence1 is a subset of sequence 2', () => {
      const seq1: IKeySequence = { keys: ['a'] };
      const seq2: IKeySequence = { keys: ['a', 'b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence2 is a subset of sequence 1', () => {
      const seq1: IKeySequence = { keys: ['a', 'b'] };
      const seq2: IKeySequence = { keys: ['a'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });
  });

  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      const keySequence: IKeySequence[] = [{ keys: ['a'] }];
      const keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a');
    });

    it('for one complex key sequence', () => {
      const complexKeySequence: IKeySequence[] = [{ keys: ['a', 'd'] }];
      const keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'd');
    });

    it('for multiple singular key sequences', () => {
      const keySequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['c'] }];
      const keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'c');
    });

    it('for multiple complex key sequences', () => {
      const complexKeySequences: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      const keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' +
        ktpSeparator + 'n' + ktpSeparator +
        'c' + ktpSeparator + 'b');
    });
  });

  describe('fullKeySequencesAreEqual', () => {
    it('different lengths should not be equal', () => {
      const keySequences1: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      const keySequences2: IKeySequence[] = [{ keys: ['a', 'n'] }];
      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(false);
    });

    it('should correctly be equal', () => {
      const keySequences1: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      const keySequences2: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      const keySequences3: IKeySequence[] = [{ keys: ['n', 'a'] }, { keys: ['c', 'b'] }];
      const keySequences4: IKeySequence[] = [{ keys: ['a'] }, { keys: ['c', 'b'] }];

      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(true);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences3)).toEqual(false);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences4)).toEqual(false);
    });
  });
});