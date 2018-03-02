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
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: [] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });

    it('single key', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: ['a'] };
      let seq3: IKeySequence = { keys: ['b'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('multiple keys', () => {
      let seq1: IKeySequence = { keys: ['a', 'b'] };
      let seq2: IKeySequence = { keys: ['a', 'b'] };
      let seq3: IKeySequence = { keys: ['b', 'a'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('should be false when sequences are different length', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: ['a', 'b'] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });
  });

  describe('keySequencesContain', () => {
    it('empty sequences', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let sequences: IKeySequence[] = [{ keys: [] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('empty key sequence', () => {
      let seq1: IKeySequence = { keys: [] };
      let sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('single key', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      let sequences2: IKeySequence[] = [{ keys: ['a', 'b'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(true);
      expect(keySequencesContain(sequences2, seq1)).toEqual(false);
    });

    it('multiple keys', () => {
      let seq1: IKeySequence = { keys: ['a', 'b'] };
      let sequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['b'] }];
      let sequences2: IKeySequence[] = [{ keys: ['a', 'b'] }, { keys: ['c', 'd'] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
      expect(keySequencesContain(sequences2, seq1)).toEqual(true);
    });
  });

  describe('keySequencesStartsWith', () => {
    it('false when the key sequence for seq1 is zero ', () => {
      let seq1: IKeySequence = { keys: [] };
      let seq2: IKeySequence = { keys: ['b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when the key sequence for seq2 is zero ', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: [] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when sequence start is different', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: ['b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('true when sequences are equal', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: ['a'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence1 is a subset of sequence 2', () => {
      let seq1: IKeySequence = { keys: ['a'] };
      let seq2: IKeySequence = { keys: ['a', 'b'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence2 is a subset of sequence 1', () => {
      let seq1: IKeySequence = { keys: ['a', 'b'] };
      let seq2: IKeySequence = { keys: ['a'] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });
  });

  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      let keySequence: IKeySequence[] = [{ keys: ['a'] }];
      let keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a');
    });

    it('for one complex key sequence', () => {
      let complexKeySequence: IKeySequence[] = [{ keys: ['a', 'd'] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'd');
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keys: ['a'] }, { keys: ['c'] }];
      let keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'c');
    });

    it('for multiple complex key sequences', () => {
      let complexKeySequences: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' +
        ktpSeparator + 'n' + ktpSeparator +
        'c' + ktpSeparator + 'b');
    });
  });

  describe('fullKeySequencesAreEqual', () => {
    it('different lengths should not be equal', () => {
      let keySequences1: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      let keySequences2: IKeySequence[] = [{ keys: ['a', 'n'] }];
      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(false);
    });

    it('should correctly be equal', () => {
      let keySequences1: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      let keySequences2: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      let keySequences3: IKeySequence[] = [{ keys: ['n', 'a'] }, { keys: ['c', 'b'] }];
      let keySequences4: IKeySequence[] = [{ keys: ['a'] }, { keys: ['c', 'b'] }];

      expect(fullKeySequencesAreEqual(keySequences1, keySequences2)).toEqual(true);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences3)).toEqual(false);
      expect(fullKeySequencesAreEqual(keySequences1, keySequences4)).toEqual(false);
    });
  });
});