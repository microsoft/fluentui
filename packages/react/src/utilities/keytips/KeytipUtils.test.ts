import { sequencesToID, mergeOverflows, getAriaDescribedBy } from './KeytipUtils';
import { KTP_FULL_PREFIX, KTP_SEPARATOR, KTP_LAYER_ID } from './KeytipConstants';
import { arraysEqual } from '../../Utilities';

describe('KeytipUtils', () => {
  describe('sequencesToID', () => {
    it('for one singular key sequence', () => {
      const keySequence: string[] = ['a'];
      const keytipID = sequencesToID(keySequence);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a');
    });

    it('for one complex key sequence', () => {
      const complexKeySequence: string[] = ['ad'];
      const keytipID = sequencesToID(complexKeySequence);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' + KTP_SEPARATOR + 'd');
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['ac'];
      const keytipID = sequencesToID(keySequences);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' + KTP_SEPARATOR + 'c');
    });

    it('for multiple complex key sequences', () => {
      const complexKeySequences: string[] = ['an', 'cb'];
      const keytipID = sequencesToID(complexKeySequences);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' + KTP_SEPARATOR + 'n' + KTP_SEPARATOR + 'c' + KTP_SEPARATOR + 'b');
    });
  });

  describe('mergeOverflows', () => {
    it('when overflow sequence is first', () => {
      const overflowSequence = ['01'];
      const keySequences = ['x', 'c'];
      const newKeySequence = mergeOverflows(keySequences, overflowSequence);
      expect(arraysEqual(newKeySequence, ['01', 'x', 'c'])).toEqual(true);
    });

    it('when overflowSequence is in the middle', () => {
      const overflowSequence = ['h', '01'];
      const keySequences = ['h', 'x', 'c'];
      const newKeySequence = mergeOverflows(keySequences, overflowSequence);
      expect(arraysEqual(newKeySequence, ['h', '01', 'x', 'c'])).toEqual(true);
    });
  });
  describe('getAriaDescribedBy', () => {
    it('returns just the layer ID when an empty sequence is passed in', () => {
      const keySequence: string[] = [];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID);
    });

    it('for one singular key sequence', () => {
      const keySequence: string[] = ['b'];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + sequencesToID(keySequence));
    });

    it('for one complex key sequence', () => {
      const keySequence: string[] = ['bc'];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + sequencesToID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['b', 'c'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + sequencesToID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      const keySequences: string[] = ['an', 'cb'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + sequencesToID(keySequences));
    });
  });
});
