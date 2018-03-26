import * as React from 'react';
import { getAriaDescribedBy, getNativeKeytipProps } from './KeytipUtils';
import { IKeySequence, convertSequencesToKeytipID, ktpLayerId, ktpAriaSeparatorId } from '../../Utilities';

describe('getAriaDescribedBy', () => {

  it('returns just the layer ID when an empty sequence is passed in', () => {
    const keySequence: IKeySequence[] = [];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId);
  });

  it('for one singular key sequence', () => {
    const keySequence: IKeySequence[] = [{ keys: ['b'] }];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
  });

  it('for one complex key sequence', () => {
    const keySequence: IKeySequence[] = [{ keys: ['b', 'c'] }];
    const ariaDescribedBy = getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId + ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequence));
  });

  it('for multiple singular key sequences', () => {
    const keySequences: IKeySequence[] = [{ keys: ['b'] }, { keys: ['c'] }];
    const ariaDescribedBy = getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
  });

  it('for multiple complex key sequences', () => {
    const keySequences: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
    const ariaDescribedBy = getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences));
  });
});

it('getNativeKeytipProps will handle overflowSequence correctly', () => {
  const keytipProps = {
    content: 'A',
    keySequences: [{ keys: ['a'] }],
    overflowSetSequence: [{ keys: ['x'] }]
  };
  const nativeProps = getNativeKeytipProps(keytipProps);
  expect(nativeProps['data-ktp-execute-target']).toEqual('ktp-x-a');
  expect(nativeProps['data-ktp-target']).toEqual('ktp-x-a');
});