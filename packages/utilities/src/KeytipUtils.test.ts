import {
  convertSequencesToKeytipID,
  mergeOverflowKeySequences,
  getAriaDescribedBy
} from './KeytipUtils';
import { ktpFullPrefix, ktpSeparator, ktpLayerId, ktpAriaSeparatorId } from './KeytipConstants';
import { isEqual } from './isEqual';

describe('KeytipUtils', () => {
  describe('convertSequencesToKeytipID', () => {
    it('for one singular key sequence', () => {
      const keySequence: string[] = ['a'];
      const keytipID = convertSequencesToKeytipID(keySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a');
    });

    it('for one complex key sequence', () => {
      const complexKeySequence: string[] = ['ad'];
      const keytipID = convertSequencesToKeytipID(complexKeySequence);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'd');
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['ac'];
      const keytipID = convertSequencesToKeytipID(keySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' + ktpSeparator + 'c');
    });

    it('for multiple complex key sequences', () => {
      const complexKeySequences: string[] = ['an', 'cb'];
      const keytipID = convertSequencesToKeytipID(complexKeySequences);
      expect(keytipID).toEqual(ktpFullPrefix + 'a' +
        ktpSeparator + 'n' + ktpSeparator +
        'c' + ktpSeparator + 'b');
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
      expect(ariaDescribedBy).toEqual(' ' + ktpLayerId);
    });

    it('for one singular key sequence', () => {
      const keySequence: string[] = ['b'];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for one complex key sequence', () => {
      const keySequence: string[] = ['bc'];
      const ariaDescribedBy = getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      const keySequences: string[] = ['b', 'c'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
        ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      const keySequences: string[] = ['an', 'cb'];
      const ariaDescribedBy = getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
        ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
    });
  });
});