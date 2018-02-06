import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { KeytipManager } from './KeytipManager';
import { KeyCodes } from '../../Utilities';
import { IKeySequence, convertSequencesToKeytipID } from '../../utilities/keysequence';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { KeytipLayer } from './KeytipLayer';
import { ktpSeparator, ktpFullPrefix } from '../../utilities/keytip/KeytipUtils';

const keytipStartSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
const keytipExitSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
const keytipGoBackSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.escape] }];
const layerID = 'my-layer-id';
const keytipIdB = ktpFullPrefix + KeyCodes.b;
const keytipIdC = ktpFullPrefix + KeyCodes.c;
const keytipIdE1 = ktpFullPrefix + KeyCodes.e + ktpSeparator + KeyCodes.one;
const keytipIdE2 = ktpFullPrefix + KeyCodes.e + ktpSeparator + KeyCodes.two;

describe('KeytipManager', () => {

  describe('getAriaDescribedBy', () => {
    const keytipManager = KeytipManager.getInstance();

    beforeEach(() => {
      // Create layer
      ReactTestUtils.renderIntoDocument<KeytipLayer>(
        <KeytipLayer
          id={ layerID }
          keytipStartSequences={ keytipStartSequences }
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

  describe('processInput tests', () => {
    const keytipManager = KeytipManager.getInstance();
    const onEnterKeytipMode: jest.Mock = jest.fn();
    const onExitKeytipMode: jest.Mock = jest.fn();

    beforeEach(() => {
      // Create layer
      ReactTestUtils.renderIntoDocument<KeytipLayer>(
        <KeytipLayer
          id={ layerID }
          keytipStartSequences={ keytipStartSequences }
          keytipGoBackSequences={ keytipGoBackSequences }
          keytipExitSequences={ keytipExitSequences }
          onEnterKeytipMode={ onEnterKeytipMode }
          onExitKeytipMode={ onExitKeytipMode }
        />
      );

      keytipManager.keytipTree = populateTreeMap(keytipManager.keytipTree, layerID);
    });

    // On Exit keytip mode
    it('Call on exit keytip mode when we process alt + left win ', () => {
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] });
      expect(onExitKeytipMode).toBeCalled();
    });

    // On Enter keytip mode
    it('Call on enter keytip mode when we process alt + left win', () => {
      keytipManager.processInput({ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] });
      expect(onEnterKeytipMode).toBeCalled();
    });

    // GO Back Tests
    it('Should call on exit keytip mode because we are going back in the root', () => {
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.escape] });
      expect(onExitKeytipMode).toBeCalled();
    });

    it('C`s goback func should be invoked and Current keytip pointer should return to equal root node', () => {
      const onGoBackC: jest.Mock = jest.fn();
      keytipManager.keytipTree.currentKeytip = { ...keytipManager.keytipTree.nodeMap[keytipIdC], onGoBack: onGoBackC };
      keytipManager.processInput({ keyCodes: [KeyCodes.escape] });
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.root);
      expect(onGoBackC).toBeCalled();
    });

    // Processing keys tests
    it('Processing a leaf node should execute it`s onExecute func and trigger onExitKeytipMode', () => {
      const onExecuteC: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdC] = { ...keytipManager.keytipTree.nodeMap[keytipIdC], onExecute: onExecuteC };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.c] });
      expect(onExecuteC).toBeCalled();
      expect(onExitKeytipMode).toBeCalled();
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(0);
    });

    it('Processing a node with two keycodes should save sequence and wait for second keycode', () => {
      const onExecuteE2: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdE2] = { ...keytipManager.keytipTree.nodeMap[keytipIdE2], onExecute: onExecuteE2 };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.e] });
      // We are still waiting for second keycode
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(1);
      keytipManager.processInput({ keyCodes: [KeyCodes.two] });
      expect(onExecuteE2).toBeCalled();
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(0);
      expect(onExitKeytipMode).toBeCalled();
    });

    it('Processing a node with two keycodes should wait for second keycode and if not leaf make children visible', () => {
      const onExecuteE1: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdE1] = { ...keytipManager.keytipTree.nodeMap[keytipIdE1], onExecute: onExecuteE1 };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.e] });
      // We are still waiting for second keycode
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(1);
      keytipManager.processInput({ keyCodes: [KeyCodes.one] });
      expect(onExecuteE1).toBeCalled();
      // There is no more buffer in the sequence
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(0);
      // Children keytips should be visible
      expect(childrenAreVisible(keytipManager.keytipTree, keytipManager.keytipTree.currentKeytip.children)).toEqual(true);
      // We haven't exited keytip mode (current keytip is not undefined and is set to the matched keytip)
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.nodeMap[keytipIdE1]);
    });

    it('Processing a node which is not leaf but its children are not in the DOM', () => {
      const onExecuteB: jest.Mock = jest.fn();
      keytipManager.keytipTree.nodeMap[keytipIdB] = { ...keytipManager.keytipTree.nodeMap[keytipIdB], onExecute: onExecuteB };
      keytipManager.keytipTree.currentKeytip = keytipManager.keytipTree.root;
      keytipManager.processInput({ keyCodes: [KeyCodes.b] });
      // Node B' on execute should be called
      expect(onExecuteB).toBeCalled();
      // There is no more buffer in the sequence
      expect(keytipManager.currentSequence.keyCodes.length).toEqual(0);
      // We haven't exited keytip mode (current keytip is not undefined and is set to the matched keytip)
      expect(keytipManager.keytipTree.currentKeytip).toEqual(keytipManager.keytipTree.nodeMap[keytipIdB]);
    });
  });
});

function childrenAreVisible(keytipTree: KeytipTree, ids: string[]): boolean {
  for (let id of ids) {
    if (!keytipTree.nodeMap[id].visible) {
      return false;
    }
  }
  return true;
}

function populateTreeMap(keytipTree: KeytipTree, rootId: string): KeytipTree {
  /**
   *   Tree should end up looking like:
   *
   *            a
   *     /     /   |   \
   *     b   c    e1   e2
   *             / \
   *            d   f
   *
   */

  const keytipSequenceB: IKeySequence = { keyCodes: [KeyCodes.b] };
  // Node C
  const keytipSequenceC: IKeySequence = { keyCodes: [KeyCodes.c] };

  // Node D
  const keytipIdD = ktpFullPrefix + KeyCodes.e + ktpSeparator + KeyCodes.one + ktpSeparator + KeyCodes.d;
  const keytipSequenceD: IKeySequence = { keyCodes: [KeyCodes.d] };

  // Node F
  const keytipIdF = ktpFullPrefix + KeyCodes.e + ktpSeparator + KeyCodes.one + ktpSeparator + KeyCodes.f;
  const keytipSequenceF: IKeySequence = { keyCodes: [KeyCodes.f] };

  // Node E1
  const keytipSequenceE1: IKeySequence = { keyCodes: [KeyCodes.e, KeyCodes.one] };

  // Node E2
  const keytipSequenceE2: IKeySequence = { keyCodes: [KeyCodes.e, KeyCodes.two] };

  let nodeB = createTreeNode(keytipIdB, rootId, [], keytipSequenceB, true /* hasChildrenNodes*/);
  let nodeC = createTreeNode(keytipIdC, rootId, [], keytipSequenceC);
  let nodeE1 = createTreeNode(keytipIdE1, rootId, [keytipIdD, keytipIdF], keytipSequenceE1);
  let nodeE2 = createTreeNode(keytipIdE2, rootId, [keytipIdD, keytipIdF], keytipSequenceE2);
  let nodeD = createTreeNode(keytipIdD, keytipIdE1, [], keytipSequenceD);
  let nodeF = createTreeNode(keytipIdF, keytipIdE1, [], keytipSequenceF);
  keytipTree.nodeMap[rootId].children.push(keytipIdB, keytipIdC, keytipIdE1, keytipIdE2);
  keytipTree.nodeMap[keytipIdB] = nodeB;
  keytipTree.nodeMap[keytipIdC] = nodeC;
  keytipTree.nodeMap[keytipIdE1] = nodeE1;
  keytipTree.nodeMap[keytipIdE2] = nodeE2;
  keytipTree.nodeMap[keytipIdD] = nodeD;
  keytipTree.nodeMap[keytipIdF] = nodeF;
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