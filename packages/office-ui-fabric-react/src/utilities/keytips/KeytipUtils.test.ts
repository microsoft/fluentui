import { getAriaDescribedBy, getNativeKeytipProps } from './KeytipUtils';
import { IKeySequence, convertSequencesToKeytipID, ktpLayerId, ktpAriaSeparatorId } from '../../Utilities';

describe('getAriaDescribedBy', () => {
  it('returns just the layer ID when an empty sequence is passed in', () => {
    const keySequence: IKeySequence[] = [];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId);
  });

  it('for one singular key sequence', () => {
    const keySequence: IKeySequence[] = ['b'];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
  });

  it('for one complex key sequence', () => {
    const keySequence: IKeySequence[] = ['bc'];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
  });

  it('for multiple singular key sequences', () => {
    const keySequences: IKeySequence[] = ['b', 'c'];
    const ariaDescribedBy = getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
  });

  it('for multiple complex key sequences', () => {
    const keySequences: IKeySequence[] = ['an', 'cb'];
    const ariaDescribedBy = getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
  });
});

describe('getNativeKeytipProps', () => {
  it('sets the three properties', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a']
    };

    const nativeProps = getNativeKeytipProps(keytipProps);
    expect(nativeProps['data-ktp-execute-target']).toBeDefined();
    expect(nativeProps['data-ktp-target']).toBeDefined();
    expect(nativeProps['aria-describedby']).toBeDefined();
  });

  it('will handle overflowSequence correctly', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a'],
      overflowSetSequence: ['x']
    };
    const nativeProps = getNativeKeytipProps(keytipProps);
    // Both target properties should include the overflow sequence
    expect(nativeProps['data-ktp-execute-target']).toEqual('ktp-x-a');
    expect(nativeProps['data-ktp-target']).toEqual('ktp-x-a');
  });

  it('will prepend a given aria-describedby', () => {
    const keytipProps = {
      content: 'A',
      keySequences: ['a']
    };
    const ariaPrepend = 'my-prepend-string';
    const nativeProps = getNativeKeytipProps(keytipProps, ariaPrepend);
    expect(nativeProps['aria-describedby']).toEqual(ariaPrepend + ' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ktp-a');
  });
});