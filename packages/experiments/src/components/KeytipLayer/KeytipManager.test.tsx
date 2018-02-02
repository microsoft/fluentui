import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { KeytipManager } from './KeytipManager';
import { KeyCodes, IKeySequence } from '../../Utilities';
import { KeytipLayer } from './KeytipLayer';

describe('KeytipManager', () => {
  const keytipManager = KeytipManager.getInstance();

  const ktp = 'ktp';
  const separator = '-';
  const ktpPrefix = ktp + separator;

  describe('convertSequencesToID', () => {
    it('for one singular key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
      let keytipID = keytipManager.convertSequencesToID(keySequence);
      expect(keytipID).toEqual(ktpPrefix + KeyCodes.a);
    });

    it('for one complex key sequence', () => {
      let complexKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.d] }];
      let keytipID = keytipManager.convertSequencesToID(complexKeySequence);
      expect(keytipID).toEqual(ktpPrefix + KeyCodes.a + separator + KeyCodes.d);
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.c] }];
      let keytipID = keytipManager.convertSequencesToID(keySequences);
      expect(keytipID).toEqual(ktpPrefix + KeyCodes.a + separator + KeyCodes.c);
    });

    it('for multiple complex key sequences', () => {
      let complexKeySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
      let keytipID = keytipManager.convertSequencesToID(complexKeySequences);
      expect(keytipID).toEqual(ktpPrefix + KeyCodes.a + separator + KeyCodes.n + separator + KeyCodes.c + separator + KeyCodes.b);
    });
  });

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
      expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID(keySequence));
    });

    it('for one complex key sequence', () => {
      let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.b, KeyCodes.c] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.b] }, { keyCodes: [KeyCodes.c] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + keytipManager.convertSequencesToID([keySequences[0]]) +
        ' ' + keytipManager.convertSequencesToID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
      let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + keytipManager.convertSequencesToID([keySequences[0]]) +
        ' ' + keytipManager.convertSequencesToID(keySequences));
    });
  });
});