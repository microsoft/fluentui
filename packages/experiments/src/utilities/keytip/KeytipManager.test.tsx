import * as React from 'react';

import { KeytipManager } from './KeytipManager';
import { IKeySequence, convertSequencesToKeytipID } from '../../utilities/keysequence/IKeySequence';
import { IKeytipTransitionKey } from '../../utilities/keysequence/IKeytipTransitionKey';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { KeytipLayer } from '../../KeytipLayer';
import { IKeytipProps, KeytipTransitionModifier } from '../../Keytip';
import { ktpSeparator, ktpFullPrefix } from '../../utilities/keytip/KeytipUtils';
import { mount, ReactWrapper } from 'enzyme';

const keytipStartSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
const keytipExitSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
const keytipReturnSequences: IKeytipTransitionKey[] = [{ key: 'Escape' }];
const layerID = 'my-layer-id';
const keytipIdB = ktpFullPrefix + 'b';
const keytipIdC = ktpFullPrefix + 'c';
const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
const keytipOverflowIdM = ktpFullPrefix + 'o' + ktpSeparator + 'm';

describe('KeytipManager', () => {
  const keytipManager = KeytipManager.getInstance();
  const onEnterKeytipMode: jest.Mock = jest.fn();
  const onExitKeytipMode: jest.Mock = jest.fn();

  let defaultKeytipLayer: ReactWrapper;

  beforeEach(() => {
    // Create layer
    defaultKeytipLayer = mount(
      <KeytipLayer
        id={ layerID }
        keytipStartSequences={ keytipStartSequences }
        keytipReturnSequences={ keytipReturnSequences }
        keytipExitSequences={ keytipExitSequences }
        onEnterKeytipMode={ onEnterKeytipMode }
        onExitKeytipMode={ onExitKeytipMode }
      />
    );
  });

  describe('getAriaDescribedBy', () => {

    it('returns just the layer ID when an empty sequence is passed in', () => {
      const keySequence: IKeySequence[] = [];
      const ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID);
    });

    it('for one singular key sequence', () => {
      const keySequence: IKeySequence[] = [{ keys: ['b'] }];
      const ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for one complex key sequence', () => {
      const keySequence: IKeySequence[] = [{ keys: ['b', 'c'] }];
      const ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequence);
      expect(ariaDescribedBy).toEqual(layerID + ' ' + convertSequencesToKeytipID(keySequence));
    });

    it('for multiple singular key sequences', () => {
      const keySequences: IKeySequence[] = [{ keys: ['b'] }, { keys: ['c'] }];
      const ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + convertSequencesToKeytipID([keySequences[0]]) +
        ' ' + convertSequencesToKeytipID(keySequences));
    });

    it('for multiple complex key sequences', () => {
      const keySequences: IKeySequence[] = [{ keys: ['a', 'n'] }, { keys: ['c', 'b'] }];
      const ariaDescribedBy = keytipManager.getAriaDescribedBy(keySequences);
      expect(ariaDescribedBy).toEqual(layerID +
        ' ' + convertSequencesToKeytipID([keySequences[0]]) +
        ' ' + convertSequencesToKeytipID(keySequences));
    });
  });

  describe('processInput tests', () => {

    beforeEach(() => {
      keytipManager.keytipTree = populateTreeMap(keytipManager.keytipTree, layerID);
    });

    // On Exit keytip mode
    it('Call on exit keytip mode when we process alt + left win ', () => {
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
      expect(onExitKeytipMode).toBeCalled();
    });

    // On Enter keytip mode
    it('Call on enter keytip mode when we process alt + left win', () => {
      keytipManager.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
      expect(onEnterKeytipMode).toBeCalled();
    });

    // Return Tests
    it('Should call on exit keytip mode because we are going back in the root', () => {
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processTransitionInput({ key: 'Escape' });
      expect(onExitKeytipMode).toBeCalled();
    });

    it('C`s Return func should be invoked and Current keytip pointer should return to equal root node', () => {
      const onReturnC: jest.Mock = jest.fn();
      keytipManager.keytipTree.currentKeytip = { ...keytipManager.keytipTree.nodeMap[keytipIdC], onReturn: onReturnC };
      keytipManager.processTransitionInput({ key: 'Escape' });
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.root);
      expect(onReturnC).toBeCalled();
    });

    // Processing keys tests
    it('Processing a leaf node should execute it`s onExecute func and trigger onExitKeytipMode', () => {
      const onExecuteC: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdC] = { ...keytipManager.keytipTree.nodeMap[keytipIdC], onExecute: onExecuteC };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('c');
      expect(onExecuteC).toBeCalled();
      expect(onExitKeytipMode).toBeCalled();
      expect(keytipManager.currentSequence.keys.length).toEqual(0);
    });

    it('Processing a node with two keys should save sequence and wait for second key', () => {
      const onExecuteE2: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdE2] = { ...keytipManager.keytipTree.nodeMap[keytipIdE2], onExecute: onExecuteE2 };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('e');
      // We are still waiting for second key
      expect(keytipManager.currentSequence.keys.length).toEqual(1);
      keytipManager.processInput('2');
      expect(onExecuteE2).toBeCalled();
      expect(keytipManager.currentSequence.keys.length).toEqual(0);
      expect(onExitKeytipMode).toBeCalled();
    });

    it('Processing a node with two keys should wait for second key and if not leaf make children visible', () => {
      const onExecuteE1: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdE1] = { ...keytipManager.keytipTree.nodeMap[keytipIdE1], onExecute: onExecuteE1 };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('e');
      // We are still waiting for second key
      expect(keytipManager.currentSequence.keys.length).toEqual(1);
      keytipManager.processInput('1');
      expect(onExecuteE1).toBeCalled();
      // There is no more buffer in the sequence
      expect(keytipManager.currentSequence.keys.length).toEqual(0);
      // Children keytips should be visible
      const childrenKeytips = getKeytips(defaultKeytipLayer, keytipManager.keytipTree.currentKeytip.children);
      for (const childrenKeytip of childrenKeytips) {
        expect(childrenKeytip.visible).toEqual(true);
      }
      // We haven't exited keytip mode (current keytip is not undefined and is set to the matched keytip)
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.nodeMap[keytipIdE1]);
    });

    it('Processing a node which is not leaf but its children are not in the DOM', () => {
      const onExecuteB: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdB] = { ...keytipManager.keytipTree.nodeMap[keytipIdB], onExecute: onExecuteB };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('b');
      // Node B' on execute should be called
      expect(onExecuteB).toBeCalled();
      // There is no more buffer in the sequence
      expect(keytipManager.currentSequence.keys.length).toEqual(0);
      // We haven't exited keytip mode (current keytip is not undefined and is set to the matched keytip)
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.nodeMap[keytipIdB]);
    });

    it('Processing a node with with a keytipLink should make currentKeytip its link', () => {
      const onExecuteOM: jest.Mock = jest.fn();
      const nodeOverflowM = keytipManager.keytipTree.nodeMap[keytipOverflowIdM];
      nodeOverflowM.onExecute = onExecuteOM;
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput('m');
      // Expect overflow m node's execute func to be
      expect(onExecuteOM).toBeCalled();
    });
  });

  describe('registerKeytip', () => {

    it('should automatically show Keytip when currentKeytip is its parent', () => {
      // Create keytip b
      const keytipSequenceB: IKeySequence[] = [{ keys: ['b'] }];
      const keytipBProps: IKeytipProps = {
        keySequences: keytipSequenceB,
        content: 'B'
      };
      keytipManager.registerKeytip(keytipBProps);

      // Set currentKeytip to 'b'
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.nodeMap[keytipIdB];

      // Add a node 'g' who's parent is 'b'
      const keytipSequenceG: IKeySequence[] = [{ keys: ['b'] }, { keys: ['g'] }];
      const keytipIdG = ktpFullPrefix + 'b' + ktpSeparator + 'g';
      const keytipGProps: IKeytipProps = {
        keySequences: keytipSequenceG,
        content: 'G'
      };
      keytipManager.registerKeytip(keytipGProps);

      // G should now be visible in the layer
      const keytipG = getKeytips(defaultKeytipLayer, [keytipIdG]);
      expect(keytipG).toHaveLength(1);
      expect(keytipG[0].visible).toEqual(true);
    });

    it('should update the keytip if it has the same key sequence', () => {
      // Create keytip b
      const keytipSequenceB: IKeySequence[] = [{ keys: ['b'] }];
      const keytipBProps: IKeytipProps = {
        keySequences: keytipSequenceB,
        content: 'B',
        disabled: false
      };
      keytipManager.registerKeytip(keytipBProps);

      let keytipB = getKeytips(defaultKeytipLayer, [keytipIdB]);
      let keytipNodeB = keytipManager.keytipTree.nodeMap[keytipIdB];
      expect(keytipB).toHaveLength(1);
      expect(keytipB[0].disabled).toEqual(false);
      expect(keytipB[0].content).toEqual('B');
      expect(keytipNodeB.disabled).toEqual(false);

      // Change some properties
      keytipBProps.disabled = true;
      keytipBProps.content = 'BEE';

      // Re-register
      keytipManager.registerKeytip(keytipBProps);

      keytipB = getKeytips(defaultKeytipLayer, [keytipIdB]);
      keytipNodeB = keytipManager.keytipTree.nodeMap[keytipIdB];
      expect(keytipB).toHaveLength(1);
      expect(keytipB[0].disabled).toEqual(true);
      expect(keytipB[0].content).toEqual('BEE');
      expect(keytipNodeB.disabled).toEqual(true);
    });
  });
});

function getKeytips(keytipLayer: ReactWrapper, keytipIDs?: string[]): IKeytipProps[] {
  const currentKeytips: IKeytipProps[] = keytipLayer.state('keytips');
  if (keytipIDs) {
    return currentKeytips.filter((currentKeytip: IKeytipProps) => {
      return keytipIDs.indexOf(convertSequencesToKeytipID(currentKeytip.keySequences)) !== -1;
    });
  } else {
    return currentKeytips;
  }
}

function populateTreeMap(keytipTree: KeytipTree, rootId: string): KeytipTree {
  /**
   *   Tree should end up looking like:
   *
   *            a
   *     /     /   |   \   \   \
   *     b   c    e1   e2   o   m
   *             / \        |
   *            d   f       m
   *
   */

  const keytipSequenceB: IKeySequence = { keys: ['b'] };
  // Node C
  const keytipSequenceC: IKeySequence = { keys: ['c'] };

  // Node D
  const keytipIdD = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'd';
  const keytipSequenceD: IKeySequence = { keys: ['d'] };

  // Node F
  const keytipIdF = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'f';
  const keytipSequenceF: IKeySequence = { keys: ['f'] };

  // Node E1
  const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

  // Node E2
  const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

  // Node O
  const keytipIdO = ktpFullPrefix + 'o';
  const keytipOverflowSeq: IKeySequence = { keys: ['o'] };

  // Node M
  const keytipIdM = ktpFullPrefix + 'm';
  const keytipSeqM: IKeySequence = { keys: ['m'] };

  const nodeB = createTreeNode(keytipIdB, rootId, [], keytipSequenceB, true /* hasChildrenNodes*/);
  const nodeC = createTreeNode(keytipIdC, rootId, [], keytipSequenceC);
  const nodeE1 = createTreeNode(keytipIdE1, rootId, [keytipIdD, keytipIdF], keytipSequenceE1);
  const nodeE2 = createTreeNode(keytipIdE2, rootId, [keytipIdD, keytipIdF], keytipSequenceE2);
  const nodeD = createTreeNode(keytipIdD, keytipIdE1, [], keytipSequenceD);
  const nodeF = createTreeNode(keytipIdF, keytipIdE1, [], keytipSequenceF);
  const nodeO = createTreeNode(keytipIdO, rootId, [keytipOverflowIdM], keytipOverflowSeq, true);
  const nodeOM = createTreeNode(keytipOverflowIdM, keytipIdO, [], keytipSeqM);
  const nodeM = createTreeNode(keytipIdM, rootId, [], keytipSeqM);
  nodeM.keytipLink = nodeOM;
  keytipTree.nodeMap[rootId].children.push(keytipIdB, keytipIdC, keytipIdE1, keytipIdE2, keytipIdO, keytipIdM);
  keytipTree.nodeMap[keytipIdB] = nodeB;
  keytipTree.nodeMap[keytipIdC] = nodeC;
  keytipTree.nodeMap[keytipIdE1] = nodeE1;
  keytipTree.nodeMap[keytipIdE2] = nodeE2;
  keytipTree.nodeMap[keytipIdD] = nodeD;
  keytipTree.nodeMap[keytipIdF] = nodeF;
  keytipTree.nodeMap[keytipIdO] = nodeO;
  keytipTree.nodeMap[keytipOverflowIdM] = nodeOM;
  keytipTree.nodeMap[keytipIdM] = nodeM;
  return keytipTree;
}

function createTreeNode(id: string, parentId: string, childrenIds: string[],
  sequence: IKeySequence, hasChildren?: boolean): IKeytipTreeNode {
  return {
    id,
    parent: parentId,
    children: childrenIds,
    keytipSequence: sequence,
    hasChildrenNodes: hasChildren
  };
}