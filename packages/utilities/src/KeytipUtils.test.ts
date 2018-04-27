import {
  convertSequencesToKeytipID,
  mergeOverflowKeySequences,
  getAriaDescribedBy
} from './KeytipUtils';
import { KTP_FULL_PREFIX, KTP_SEPERATOR, KTP_LAYER_ID, KTP_ARIA_SEPERATOR_ID } from './KeytipConstants';
import { isEqual } from './isEqual';

describe('KeytipUtils', () => {
  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      const keySequence: string[] = ['a'];
      const keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a');
    });

    it('for one complex key sequence', () => {
      const complexKeySequence: string[] = ['ad'];
      const keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' + KTP_SEPERATOR + 'd');
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['ac'];
      const keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' + KTP_SEPERATOR + 'c');
    });

    it('for multiple complex key sequences', () => {
      const complexKeySequences: string[] = ['an', 'cb'];
      const keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(KTP_FULL_PREFIX + 'a' +
        KTP_SEPERATOR + 'n' + KTP_SEPERATOR +
        'c' + KTP_SEPERATOR + 'b');
    });
  });

  describe('mergeOverflowKeySequences', () => {
    it('when overflow sequence is first', () => {
      const overflowSequence = ['01'];
      const keySequences = ['x', 'c'];
      const newKeySequence = mergeOverflowKeySequences(keySequences, overflowSequence);
      expect(isEqual(newKeySequence, ['01', 'x', 'c'])).toEqual(true);
    });

    it('when overflowSequence is in the middle', () => {
      const overflowSequence = ['h', '01'];
      const keySequences = ['h', 'x', 'c'];
      const newKeySequence = mergeOverflowKeySequences(keySequences, overflowSequence);
      expect(isEqual(newKeySequence,
        ['h', '01', 'x', 'c'])).toEqual(true);
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
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + KTP_ARIA_SEPERATOR_ID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for one complex key sequence', () => {
      const keySequence: string[] = ['bc'];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID + ' ' + KTP_ARIA_SEPERATOR_ID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['b', 'c'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID +
        ' ' + KTP_ARIA_SEPERATOR_ID + ' ' + convertSequencesToKeytipID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      const keySequences: string[] = ['an', 'cb'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + KTP_LAYER_ID +
        ' ' + KTP_ARIA_SEPERATOR_ID + ' ' + convertSequencesToKeytipID(keySequences));
    });
  });
});