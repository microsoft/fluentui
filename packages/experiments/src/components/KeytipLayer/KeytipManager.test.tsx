import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { KeytipManager } from './KeytipManager';
import { KeyCodes } from '../../Utilities';
import { IKeySequence, convertSequencesToKeytipID } from '../../utilities/keysequence';
import { KeytipLayer } from './KeytipLayer';

describe('KeytipManager', () => {
  const keytipManager = KeytipManager.getInstance();

  describe('getAriaDescribedBy', () => {
    const layerID = 'my-layer-id';
    const keytipStartSequence: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
    const keytipExitSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
    const keytipGoBackSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.escape] }];

    beforeEach(() => {
      // Create layer
      ReactTestUtils.renderIntoDocument<KeytipLayer>(
        <KeytipLayer
          id={ layerID }
          keytipStartSequences={ keytipStartSequence }
          keytipGoBackSequences={ keytipGoBackSequences }
          keytipExitSequences={ keytipExitSequences }
        />
      );
    });

    it('returns just the layer ID when an empty sequence is passed in', () => {
      let keySequence: IKeySequence[] = [];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID);
    });

    it('for one singular key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.b] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for one complex key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.b, KeyCodes.c] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.b] }, { keyCodes: [KeyCodes.c] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + convertSequencesToKeytipID([keySequences[0]]) +
        ' ' + convertSequencesToKeytipID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + convertSequencesToKeytipID([keySequences[0]]) +
        ' ' + convertSequencesToKeytipID(keySequences));
    });
  });
});