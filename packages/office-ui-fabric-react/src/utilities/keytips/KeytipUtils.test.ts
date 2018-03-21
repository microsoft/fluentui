import * as React from 'react';
import { getAriaDescribedBy } from './KeytipUtils';
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

  it('correctly omits the overflowSequence if defined', () => {
    const keySequences: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }, { keys: ['b'] }];
    const overflowSequence: IKeySequence = { keys: ['c', 'b'] };
    const ariaDescribedBy = getAriaDescribedBy(keySequences, overflowSequence);
    expect(ariaDescribedBy).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences[0], keySequences[2]]));

    const keySequences2: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['b'] }];
    const ariaDescribedBy2 = getAriaDescribedBy(keySequences2, overflowSequence);
    expect(ariaDescribedBy2).toEqual(' ' + ktpLayerId +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID([keySequences2[0]]) +
      ' ' + ktpAriaSeparatorId + ' ' + convertSequencesToKeytipID(keySequences2));
  });
});