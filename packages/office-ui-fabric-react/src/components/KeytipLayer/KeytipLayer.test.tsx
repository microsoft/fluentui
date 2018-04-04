import * as React from 'react';
import { KeytipManager, KeytipTree } from '../../utilities/keytips';
import { mount } from 'enzyme';
import { KeytipLayerBase } from './KeytipLayer.base';
import { IKeytipProps } from '../../Keytip';
import {
  KeytipTransitionModifier,
  IKeytipTransitionKey
} from '../../Utilities';

describe('KeytipLayer', () => {
  const keytipManager = KeytipManager.getInstance();
  const keytipStartSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipExitSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipReturnSequences: IKeytipTransitionKey[] = [{ key: 'Escape' }];

  afterEach(() => {
    // Cleanup KeytipManager
    keytipManager.keytips = [];
    keytipManager.keytipTree = new KeytipTree();
  });

  it('constructor initializes the keytips state from KeytipManager.keytips', () => {
    // Add some keytips to the Manager
    const keytipB: IKeytipProps = {
      content: 'B',
      keySequences: ['b']
    };
    const keytipG: IKeytipProps = {
      content: 'G',
      keySequences: ['g']
    };
    keytipManager.keytips = [{ keytip: keytipB, uniqueID: '1' }, { keytip: keytipG, uniqueID: '2' }];

    // Create layer
    const defaultKeytipLayer = mount(
      <KeytipLayerBase
        content='Alt Windows'
        keytipStartSequences={ keytipStartSequences }
        keytipReturnSequences={ keytipReturnSequences }
        keytipExitSequences={ keytipExitSequences }
      />
    );

    const layerKeytips = defaultKeytipLayer.state('keytips');
    expect(layerKeytips).toHaveLength(2);
  });
});