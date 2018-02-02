import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { KeytipManager } from './KeytipManager';
import { KeyCodes, IKeySequence } from '../../Utilities';
import { KeytipLayer } from './KeytipLayer';

describe('KeytipManager', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  const layerID = 'my-layer-id';
  const keytipStartSequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
  const keytipManager = KeytipManager.getInstance();

  it('convertSequencesToID for one singular key sequence', () => {
    let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
    let keytipID = keytipManager.convertSequencesToID(keySequence);
    expect(keytipID).toEqual('ktp-' + KeyCodes.a);
  });

  it('convertSequencesToID for one complex key sequence', () => {
    let complexKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.d] }];
    let keytipID = keytipManager.convertSequencesToID(complexKeySequence);
    expect(keytipID).toEqual('ktp-' + KeyCodes.a + '-' + KeyCodes.d);
  });

  it('convertSequencesToID for multiple singular key sequences', () => {
    let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }, { keyCodes: [KeyCodes.c] }];
    let keytipID = keytipManager.convertSequencesToID(keySequences);
    expect(keytipID).toEqual('ktp-' + KeyCodes.a + '-' + KeyCodes.c);
  });

  it('convertSequencesToID for multiple complex key sequences', () => {
    let complexKeySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
    let keytipID = keytipManager.convertSequencesToID(complexKeySequences);
    expect(keytipID).toEqual('ktp-' + KeyCodes.a + '-' + KeyCodes.n + '-' + KeyCodes.c + '-' + KeyCodes.b);
  });

  it('getAriaDescribedBy returns just the layer ID when an empty sequence is passed in', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );

    let keySequence: IKeySequence[] = [];
    let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(layerID);
  });

  it('getAriaDescribedBy for one singular key sequence', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );

    let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.b] }];
    let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID(keySequence));
  });

  it('getAriaDescribedBy for one complex key sequence', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );

    let keySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.b, KeyCodes.c] }];
    let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
    expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID(keySequence));
  });

  it('getAriaDescribedBy for multiple singular key sequences', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );

    let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.b] }, { keyCodes: [KeyCodes.c] }];
    let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID([keySequences[0]]) + ' ' + keytipManager.convertSequencesToID(keySequences));
  });

  it('getAriaDescribedBy for multiple complex key sequences', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );

    let keySequences: IKeySequence[] = [{ keyCodes: [KeyCodes.a, KeyCodes.n] }, { keyCodes: [KeyCodes.c, KeyCodes.b] }];
    let ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
    expect(ariaDescribedBy).toEqual(layerID + ' ' + keytipManager.convertSequencesToID([keySequences[0]]) + ' ' + keytipManager.convertSequencesToID(keySequences));
  });

});