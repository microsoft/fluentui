import { IKeySequence, keySequencesAreEqual, keySequencesContain } from './IKeySequence';
import { KeyCodes } from './KeyCodes';

describe('IKeySequence', () => {
  it('keySequencesAreEqual single KeyCode', () => {
    let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
    let seq2: IKeySequence = { keyCodes: [KeyCodes.a] };
    let seq3: IKeySequence = { keyCodes: [KeyCodes.b] };
    expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
    expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
  });

  it('keySequencesAreEqual multiple KeyCodes', () => {
    let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
    let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
    let seq3: IKeySequence = { keyCodes: [KeyCodes.b, KeyCodes.a] };
    expect(keySequencesAreEqual(seq1, seq2)).toEqual(true);
    expect(keySequencesAreEqual(seq1, seq3)).toEqual(false);
  });

  it('keySequencesAreEqual should be false when sequences are different length', () => {
    let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
    let seq2: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
    expect(keySequencesAreEqual(seq1, seq2)).toEqual(false);
  });

  it('keySequencesContain single KeyCode', () => {
    let seq1: IKeySequence = { keyCodes: [KeyCodes.a] };
    let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
    let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }];
    expect(keySequencesContain(sequences, seq1)).toEqual(true);
    expect(keySequencesContain(sequences2, seq1)).toEqual(false);
  });

  it('keySequencesContain multiple KeyCodes', () => {
    let seq1: IKeySequence = { keyCodes: [KeyCodes.a, KeyCodes.b] };
    let sequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.b] }];
    let sequences2: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.b] }, { keyCodes: [KeyCodes.c, KeyCodes.d] }];
    expect(keySequencesContain(sequences, seq1)).toEqual(false);
    expect(keySequencesContain(sequences2, seq1)).toEqual(true);
  });
});