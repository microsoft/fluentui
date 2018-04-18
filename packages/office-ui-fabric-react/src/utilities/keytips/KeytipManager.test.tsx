import * as React from 'react';

import { KeytipManager } from './KeytipManager';
import {
  IKeySequence,
  convertSequencesToKeytipID,
  KeytipTransitionModifier,
  IKeytipTransitionKey,
  ktpSeparator,
  ktpFullPrefix
} from '../../Utilities';
import { KeytipTree } from './KeytipTree';
import { IKeytipTreeNode } from './IKeytipTreeNode';
import { KeytipLayerBase } from '../../KeytipLayer';
import { IKeytipProps, } from '../../Keytip';
import { mount, ReactWrapper } from 'enzyme';

const keytipStartSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
const keytipExitSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
const keytipReturnSequences: IKeytipTransitionKey[] = [{ key: 'Escape' }];
const onEnterKeytipMode: jest.Mock = jest.fn();
const onExitKeytipMode: jest.Mock = jest.fn();

// Sample keytips
/**
 *   Tree should end up looking like:
 *
 *              a
 *           /  |  \
 *          q   e1  e2
 *             / \
 *            k   p
 *
 */

// Node Q
const keytipIdQ = ktpFullPrefix + 'q';
const keytipSequenceQ: IKeySequence[] = ['q'];
const keytipPropsQ = createKeytipProps(keytipSequenceQ, 'Q');

// Node K
const keytipIdK = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'k';
const keytipSequenceK: IKeySequence[] = ['e1', 'k'];
const keytipPropsK = createKeytipProps(keytipSequenceK, 'K');

// Node P
const keytipIdP = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'p';
const keytipSequenceP: IKeySequence[] = ['e1', 'p'];
const keytipPropsP = createKeytipProps(keytipSequenceP, 'P');

// Node E1
const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
const keytipSequenceE1: IKeySequence[] = ['e1'];
const keytipPropsE1 = createKeytipProps(keytipSequenceE1, 'E1');

// Node E2
const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
const keytipSequenceE2: IKeySequence[] = ['e2'];
const keytipPropsE2 = createKeytipProps(keytipSequenceE2, 'E2');

const ktpMgr: KeytipManager = KeytipManager.getInstance();
let ktpLayer: ReactWrapper;
let ktpTree: KeytipTree;

function getLayerKeytips(keytipLayer: ReactWrapper, keytipIds?: string[]): IKeytipProps[] {
  const currentKeytips: IKeytipProps[] = keytipLayer.state('keytips');
  if (keytipIds) {
    return currentKeytips.filter((currentKeytip: IKeytipProps) => {
      return keytipIds.indexOf(convertSequencesToKeytipID(currentKeytip.keySequences)) !== -1;
    });
  } else {
    return currentKeytips;
  }
}

function createKeytipProps(keySequences: IKeySequence[], content: string): IKeytipProps {
  return {
    keySequences,
    content
  };
}

function delay(millisecond: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, millisecond));
}

describe('KeytipManager', () => {

  beforeEach(() => {
    // Reset KeytipManager instance
    ktpMgr.keytips = [];
    ktpMgr.keytipTree = ktpTree = new KeytipTree();
  });

  describe('register, update, and unregister tests', () => {
    // Sample keytip B
    const keytipIdB = ktpFullPrefix + 'b';
    const keytipSequenceB: IKeySequence[] = ['b'];
    const keytipBProps: IKeytipProps = {
      keySequences: keytipSequenceB,
      content: 'B'
    };

    beforeEach(() => {
      // Create layer
      ktpLayer = mount(
        <KeytipLayerBase
          content='Alt Windows'
          keytipStartSequences={ keytipStartSequences }
          keytipReturnSequences={ keytipReturnSequences }
          keytipExitSequences={ keytipExitSequences }
          onEnterKeytipMode={ onEnterKeytipMode }
          onExitKeytipMode={ onExitKeytipMode }
        />
      );
    });

    describe('registerKeytip', () => {
      it('should add the keytip to the Manager, Layer, and Tree', () => {
        ktpMgr.registerKeytip(keytipBProps);

        const mgrKeytips = ktpMgr.getKeytips();
        expect(mgrKeytips).toHaveLength(1);
        expect(mgrKeytips[0].content).toEqual('B');

        expect(ktpMgr.keytipTree.getNode(keytipIdB)).toBeDefined();
        const keytipB = getLayerKeytips(ktpLayer, [keytipIdB]);
        expect(keytipB).toHaveLength(1);
      });

      it('should automatically show Keytip when currentKeytip is its parent', () => {
        ktpMgr.registerKeytip(keytipBProps);

        // Set currentKeytip to 'b'
        ktpMgr.keytipTree.currentKeytip = ktpMgr.keytipTree.getNode(keytipIdB);

        // Add a node 'g' who's parent is 'b'
        const keytipSequenceG: IKeySequence[] = ['b', 'g'];
        const keytipIdG = ktpFullPrefix + 'b' + ktpSeparator + 'g';
        const keytipGProps: IKeytipProps = {
          keySequences: keytipSequenceG,
          content: 'G'
        };
        ktpMgr.registerKeytip(keytipGProps);

        delay(750).then(() => {
          // G should now be visible in the layer
          const keytipG = getLayerKeytips(ktpLayer, [keytipIdG]);
          expect(keytipG).toHaveLength(1);
          expect(keytipG[0].visible).toEqual(true);
        });
      });

      it('should correctly take into account the uniqueID', () => {
        // Register duplicate keytips, but should both be in the keytips array
        // because they will have unique IDs
        ktpMgr.registerKeytip(keytipBProps);
        ktpMgr.registerKeytip(keytipBProps);
        expect(ktpMgr.getKeytips()).toHaveLength(2);
      });
    });

    it('updateKeytip should update the keytip if it has the same key sequence', () => {
      const uniqueID = ktpMgr.registerKeytip(keytipBProps);
      const updatedB = {
        ...keytipBProps,
        disabled: true,
        content: 'BEE'
      };

      // Update
      ktpMgr.updateKeytip(updatedB, uniqueID);

      const keytipB = getLayerKeytips(ktpLayer, [keytipIdB]);
      const keytipNodeB = ktpMgr.keytipTree.getNode(keytipIdB)!;
      expect(keytipB).toHaveLength(1);
      expect(keytipB[0].disabled).toEqual(true);
      expect(keytipB[0].content).toEqual('BEE');
      expect(keytipNodeB.disabled).toEqual(true);
    });

    it('unregisterKeytip should remove a keytip from the Manager, Layer, and Tree', () => {
      const uniqueID = ktpMgr.registerKeytip(keytipBProps);
      ktpMgr.unregisterKeytip(keytipBProps, uniqueID);
      expect(ktpMgr.getKeytips()).toHaveLength(0);
      expect(ktpMgr.keytipTree.getNode(keytipIdB)).toBeUndefined();
      const keytipB = getLayerKeytips(ktpLayer, [keytipIdB]);
      expect(keytipB).toHaveLength(0);
    });

    it('unregisterKeytip should correctly take into account the uniqueID', () => {
      // Register duplicate keytips, where the first will be deleted
      // Simulates React 16 lifecycle order
      const uniqueID1 = ktpMgr.registerKeytip(keytipBProps);
      const uniqueID2 = ktpMgr.registerKeytip(keytipBProps);
      ktpMgr.unregisterKeytip(keytipBProps, uniqueID1);

      expect(ktpMgr.getKeytips()).toHaveLength(1);
      expect(ktpMgr.keytips[0].uniqueID).toEqual(uniqueID2);
    });

    it('registerPersistedKeytip should add a keytip to the Tree only', () => {
      ktpMgr.registerPersistedKeytip(keytipBProps);
      expect(ktpMgr.getKeytips()).toHaveLength(0);
      expect(ktpMgr.keytipTree.getNode(keytipIdB)).toBeDefined();
      const keytipB = getLayerKeytips(ktpLayer, [keytipIdB]);
      expect(keytipB).toHaveLength(0);
    });

    it('unregisterPersistedKeytip should remove a keytip from the Tree only', () => {
      const uniqueID = ktpMgr.registerPersistedKeytip(keytipBProps);
      ktpMgr.unregisterPersistedKeytip(keytipBProps, uniqueID);
      expect(ktpMgr.getKeytips()).toHaveLength(0);
      expect(ktpMgr.keytipTree.getNode(keytipIdB)).toBeUndefined();
      const keytipB = getLayerKeytips(ktpLayer, [keytipIdB]);
      expect(keytipB).toHaveLength(0);
    });
  });

  describe('input tests', () => {
    let uniqueIDQ: string, uniqueIDE1: string, uniqueIDE2: string;

    beforeEach(() => {
      // Register sample keytips
      uniqueIDQ = ktpMgr.registerKeytip(keytipPropsQ);
      ktpMgr.registerKeytip(keytipPropsP);
      ktpMgr.registerKeytip(keytipPropsK);
      uniqueIDE1 = ktpMgr.registerKeytip(keytipPropsE1);
      uniqueIDE2 = ktpMgr.registerKeytip(keytipPropsE2);
    });

    describe('processTransitionInput', () => {
      describe('with a default layer', () => {
        beforeEach(() => {
          // Create layer
          ktpLayer = mount(
            <KeytipLayerBase
              content='Alt Windows'
              keytipStartSequences={ keytipStartSequences }
              keytipReturnSequences={ keytipReturnSequences }
              keytipExitSequences={ keytipExitSequences }
              onEnterKeytipMode={ onEnterKeytipMode }
              onExitKeytipMode={ onExitKeytipMode }
            />
          );
        });

        it('Call on exit keytip mode when we process alt + left win ', () => {
          ktpTree.currentKeytip = ktpTree.root;
          ktpMgr.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
          expect(onExitKeytipMode).toBeCalled();
          // Expect all keytips to be not visible
          for (const keytip of ktpMgr.getKeytips()) {
            expect(keytip.visible).toBeFalsy();
          }
        });

        it('Call on enter keytip mode when we process alt + left win', () => {
          ktpMgr.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
          expect(ktpTree.currentKeytip).toEqual(ktpTree.root);
          // Expect all children of root are showing
          for (const keytip of ktpMgr.getKeytips()) {
            if (keytip.keySequences.length === 1) {
              expect(keytip.visible).toEqual(true);
            } else {
              expect(keytip.visible).toBeFalsy();
            }
          }
          expect(onEnterKeytipMode).toBeCalled();
        });

        it('Should call on exit keytip mode because we are going back when on the root', () => {
          ktpTree.currentKeytip = ktpTree.root;
          ktpMgr.processTransitionInput({ key: 'Escape' });
          expect(onExitKeytipMode).toBeCalled();
        });

        it('Q`s Return func should be invoked and currentKeytip should be the root node', () => {
          const onReturnQ: jest.Mock = jest.fn();
          const nodeQ = ktpTree.getNode(keytipIdQ)!;
          nodeQ.onReturn = onReturnQ;
          ktpTree.currentKeytip = nodeQ;
          ktpMgr.processTransitionInput({ key: 'Escape' });
          expect(ktpTree.currentKeytip).toEqual(ktpTree.root);
          expect(onReturnQ).toBeCalled();
        });
      });

      it('can handle using a single key that is also a modifier for transitions', () => {
        // Create layer
        ktpLayer = mount(
          <KeytipLayerBase
            content='Alt Windows'
            keytipStartSequences={ [{ key: 'Meta' }] }
            keytipReturnSequences={ keytipReturnSequences }
            keytipExitSequences={ keytipExitSequences }
            onEnterKeytipMode={ onEnterKeytipMode }
            onExitKeytipMode={ onExitKeytipMode }
          />
        );
        ktpMgr.processTransitionInput({ key: 'Meta' });
        expect(onEnterKeytipMode).toBeCalled();
      });
    });

    describe('processInput', () => {
      beforeEach(() => {
        // Create layer
        ktpLayer = mount(
          <KeytipLayerBase
            content='Alt Windows'
            keytipStartSequences={ keytipStartSequences }
            keytipReturnSequences={ keytipReturnSequences }
            keytipExitSequences={ keytipExitSequences }
            onEnterKeytipMode={ onEnterKeytipMode }
            onExitKeytipMode={ onExitKeytipMode }
          />
        );
      });

      // Processing keys tests
      it('Processing a leaf node should execute it`s onExecute func and trigger onExitKeytipMode', () => {
        const onExecuteQ: jest.Mock = jest.fn();
        ktpMgr.updateKeytip({ ...keytipPropsQ, onExecute: onExecuteQ }, uniqueIDQ);
        ktpTree.currentKeytip = ktpTree.root;
        ktpMgr.processInput('q');
        expect(onExecuteQ).toBeCalled();
        expect(onExitKeytipMode).toBeCalled();
        expect(ktpMgr.currentSequence.length).toEqual(0);
      });

      it('Processing a node with two keys should save sequence and wait for second key', () => {
        const onExecuteE2: jest.Mock = jest.fn();
        ktpMgr.updateKeytip({ ...keytipPropsE2, onExecute: onExecuteE2 }, uniqueIDE2);
        ktpTree.currentKeytip = ktpTree.root;
        ktpMgr.processInput('e');
        // We are still waiting for second key
        expect(ktpMgr.currentSequence.length).toEqual(1);
        ktpMgr.processInput('2');
        expect(onExecuteE2).toBeCalled();
        expect(ktpMgr.currentSequence.length).toEqual(0);
        expect(onExitKeytipMode).toBeCalled();
      });

      it('Processing a node with two keys should wait for second key and make children visible', () => {
        const onExecuteE1: jest.Mock = jest.fn();
        ktpMgr.updateKeytip({ ...keytipPropsE1, onExecute: onExecuteE1 }, uniqueIDE1);
        ktpTree.currentKeytip = ktpTree.root;
        ktpMgr.processInput('e');
        // We are still waiting for second key
        expect(ktpMgr.currentSequence.length).toEqual(1);
        ktpMgr.processInput('1');
        expect(onExecuteE1).toBeCalled();
        // There is no more buffer in the sequence
        expect(ktpMgr.currentSequence.length).toEqual(0);
        // Children keytips should be visible
        const childrenKeytips = getLayerKeytips(ktpLayer, ktpTree.currentKeytip.children);
        for (const childrenKeytip of childrenKeytips) {
          expect(childrenKeytip.visible).toEqual(true);
        }
        // We haven't exited keytip mode (current keytip is set to the matched keytip)
        expect(ktpTree.currentKeytip.id).toEqual(keytipIdE1);
      });

      it('Processing a node which is not leaf but its children are not in the DOM', () => {
        const onExecuteQ: jest.Mock = jest.fn();
        ktpMgr.updateKeytip({ ...keytipPropsQ, onExecute: onExecuteQ, hasDynamicChildren: true }, uniqueIDQ);
        ktpTree.currentKeytip = ktpTree.root;
        ktpMgr.processInput('q');
        // Node Q's onExecute should be called
        expect(onExecuteQ).toBeCalled();
        // There is no more buffer in the sequence
        expect(ktpMgr.currentSequence.length).toEqual(0);
        // We haven't exited keytip mode (current keytip is set to the matched keytip)
        expect(ktpTree.currentKeytip.id).toEqual(keytipIdQ);
      });

      it('with a persisted node will partially match the keytip but won`t show it', () => {
        // Make E2 a persisted node
        const nodeE2 = ktpTree.getNode(keytipIdE2)!;
        nodeE2.persisted = true;
        nodeE2.onExecute = jest.fn();
        ktpTree.currentKeytip = ktpTree.root;
        ktpMgr.processInput('e');
        // Only E1 should be visible
        const visibleLayerKtps = ktpMgr.getKeytips().filter((layerKtp: IKeytipProps) => {
          return layerKtp.visible;
        });
        expect(visibleLayerKtps).toHaveLength(1);
        expect(visibleLayerKtps[0].content).toEqual('E1');
        ktpMgr.processInput('2');
        // E2 should be triggered
        expect(nodeE2.onExecute).toBeCalled();
      });
    });
  });

  describe('showKeytips', () => {
    let uniqueIDP: string;
    beforeEach(() => {
      // Register sample keytips
      ktpMgr.registerKeytip(keytipPropsQ);
      uniqueIDP = ktpMgr.registerKeytip(keytipPropsP);
      ktpMgr.registerKeytip(keytipPropsK);
      ktpMgr.registerKeytip(keytipPropsE1);
      ktpMgr.registerKeytip(keytipPropsE2);
    });

    it('should set visible properties in the Manager', () => {
      const idsToShow = [keytipIdQ, keytipIdE1, keytipIdE2];
      ktpMgr.showKeytips(idsToShow);

      // Test keytip manager has set visible correctly
      for (const keytip of ktpMgr.getKeytips()) {
        expect(keytip.visible).toEqual(idsToShow.indexOf(convertSequencesToKeytipID(keytip.keySequences)) >= 0);
      }
    });

    it('should handle overflow keytips correctly', () => {
      ktpMgr.updateKeytip({ ...keytipPropsP, overflowSetSequence: ['e1'] }, uniqueIDP);
      ktpMgr.showKeytips(['ktp-e-1-p']);
      for (const keytip of ktpMgr.getKeytips()) {
        if (keytip.content === 'P') {
          expect(keytip.visible).toEqual(true);
        } else {
          expect(keytip.visible).toBeFalsy();
        }
      }
    });
  });

  it('persistedKeytipExecute should call overflow`s onExecute', () => {
    const overflowCallback: jest.Mock = jest.fn();
    // Register sample keytips
    ktpMgr.registerKeytip(keytipPropsQ);
    ktpMgr.registerKeytip({ ...keytipPropsP, overflowSetSequence: ['e1'] });
    ktpMgr.registerKeytip(keytipPropsK);
    ktpMgr.registerKeytip({ ...keytipPropsE1, onExecute: overflowCallback });
    ktpMgr.registerKeytip(keytipPropsE2);

    ktpMgr.keytipTree.currentKeytip = ktpMgr.keytipTree.root;
    ktpMgr.persistedKeytipExecute(['e1'], ['e1', 'p']);
    expect(overflowCallback).toBeCalled();
  });
});