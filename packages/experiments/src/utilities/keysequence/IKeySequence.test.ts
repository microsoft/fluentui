import { IKeySequence, keySequencesAreEqual, keySequenceStartsWith, keySequencesContain, convertSequencesToKeytipID } from './IKeySequence';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { ktpFullPrefix, ktpSeparator } from '../keytip/KeytipUtils';

describe('IKeySequence', () => {

  describe('keySequencesAreEqual', () => {
    it('empty keyCode', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });

    it('single KeyCode', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq3: IKeySequence = { keyCodes: [KeyCodes.b] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('multiple KeyCodes', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let seq3: IKeySequence = { keyCodes: [KeyCodes.b, KeyCodes.a] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
      expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
    });

    it('should be false when sequences are different length', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
    });
  });

  describe('keySequencesContain', () => {
    it('empty sequences', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let sequences: IKeySequence[] = [{ keyCodes: [] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('empty keycode sequence', () => {
      let seq1: IKeySequence = { keyCodes: [] };
      let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
    });

    it('single KeyCode', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
      let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(true);
      expect(keySequencesContain(sequences2, seq1)).toEqual(false);
    });

    it('multiple KeyCodes', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
      let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }, { keyCodes: [KeyCodes.c, KeyCodes.d] }];
      expect(keySequencesContain(sequences, seq1)).toEqual(false);
      expect(keySequencesContain(sequences2, seq1)).toEqual(true);
    });
  });

  describe('keySequencesStartsWith', () => {
    it('false when the key sequence for seq1 is zero ', () => {
      let seq1: IKeySequence = { keyCodes: [] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.b] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when the key sequence for seq2 is zero ', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('false when sequence start is different', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.b] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(false);
    });

    it('true when sequences are equal', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence1 is a subset of sequence 2', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });

    it('true when sequence2 is a subset of sequence 1', () => {
      let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
      let seq2: IKeySequence = { keyCodes: [KeyCodes.a] };
      expect(keySequenceStartsWith(seq1, seq2)).toEqual(true);
    });
  });

  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
      let keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a);
    });

    it('for one complex key sequence', () => {
      let complexKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.d] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a + ktpSeparator + KeyCodes.d);
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.c] }];
      let keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a + ktpSeparator + KeyCodes.c);
    });

    it('for multiple complex key sequences', () => {
      let complexKeySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
      let keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + KeyCodes.a +
        ktpSeparator + KeyCodes.n + ktpSeparator +
        KeyCodes.c + ktpSeparator + KeyCodes.b);
    });
  });
});