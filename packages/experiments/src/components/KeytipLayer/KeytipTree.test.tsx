import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { KeytipLayer } from './KeytipLayer';
import { KeytipManager } from './KeytipManager';
import { IKeySequence } from '../../utilities/keysequence';
import { KeyCodes } from '../../Utilities';

describe('KeytipTree', () => {
  function emptyCallback(): void {
    return undefined;
  }

  const layerID = 'my-layer-id';
  const keytipStartSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
  const keytipExitSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.alt, KeyCodes.leftWindow] }];
  const keytipGoBackSequences: IKeySequence[] = [{ keyCodes: [KeyCodes.escape] }];
  const keytipManager = KeytipManager.getInstance();

  const ktp = 'ktp';
  const separator = '-';
  const ktpPrefix = ktp + separator;

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

  it('constructor creates a root node', () => {
    let keytipTree = keytipManager.keytipTree;

    // Tree root ID should be the layer's ID
    expect(keytipTree.root.id).toEqual(layerID);
    // Tree root should not have any children
    expect(keytipTree.root.children).toHaveLength(0);

    // Only the root should be specified in the nodeMap
    expect(keytipTree.nodeMap[layerID]).toBeDefined();
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(1);
  });

  it('addNode directly under root works correctly', () => {
    let keytipTree = keytipManager.keytipTree;

    // TreeNode C, will be child of root
    const keytipIdC = ktpPrefix + KeyCodes.c;
    const sampleKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    keytipTree.addNode(sampleKeySequence, emptyCallback);

    // Test C has been added to root's children
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipIdC);

    // Test C was added to nodeMap
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
    let keytipNodeC = keytipTree.nodeMap[keytipIdC];
    expect(keytipNodeC).toBeDefined();

    // Test TreeNode C properties
    expect(keytipNodeC.id).toEqual(keytipIdC);
    expect(keytipNodeC.children).toHaveLength(0);
    expect(keytipNodeC.parent).toEqual(layerID);
  });

  it('addNode two levels from root', () => {
    let keytipTree = keytipManager.keytipTree;

    // Parent
    const keytipIdC = ktpPrefix + KeyCodes.c;
    const keytipSequenceC: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Child
    const keytipIdB = ktpPrefix + KeyCodes.c + separator + KeyCodes.b;
    const keytipSequenceB: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    keytipTree.addNode(keytipSequenceC, emptyCallback);
    keytipTree.addNode(keytipSequenceB, emptyCallback);

    // Test B was added to C's children
    expect(keytipTree.nodeMap[keytipIdC].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipIdC].children).toContain(keytipIdB);

    // Test B was added to nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipIdB];
    expect(keytipNodeB).toBeDefined();

    // Test TreeNode B properties
    expect(keytipNodeB.id).toEqual(keytipIdB);
    expect(keytipNodeB.children).toHaveLength(0);
    expect(keytipNodeB.parent).toEqual(keytipIdC);
  });

  it('add a child node before its parent', () => {
    let keytipTree = keytipManager.keytipTree;

    // Parent
    const keytipIdC = ktpPrefix + KeyCodes.c;
    const keytipSequenceC: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Child
    const keytipIdB = ktpPrefix + KeyCodes.c + separator + KeyCodes.b;
    const keytipSequenceB: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    keytipTree.addNode(keytipSequenceB, emptyCallback);

    // Test B was added to nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipIdB];
    expect(keytipNodeB).toBeDefined();

    // Test B has C set as parent
    expect(keytipNodeB.parent).toEqual(keytipIdC);

    // Test root still has no children
    expect(keytipTree.root.children).toHaveLength(0);

    // Test C is added to nodeMap
    let keytipNodeC = keytipTree.nodeMap[keytipIdC];
    expect(keytipNodeC).toBeDefined();

    // Test C has no parent
    expect(keytipNodeC.parent).toBeUndefined();

    // Test C has B as its child
    expect(keytipTree.nodeMap[keytipIdC].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipIdC].children).toContain(keytipIdB);

    // Add parent
    keytipTree.addNode(keytipSequenceC, emptyCallback);

    keytipNodeC = keytipTree.nodeMap[keytipIdC];
    expect(keytipNodeC).toBeDefined();

    // Test C has B as its child
    expect(keytipTree.nodeMap[keytipIdC].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipIdC].children).toContain(keytipIdB);

    // Test root has C as its child
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipIdC);
  });

  it('creates a correct Tree when many nodes are added out of order', () => {
    /**
     *   Tree should end up looking like:
     *
     *            a
     *          /   \
     *         c     e
     *        /     / \
     *       b     d   f
     *
     * Nodes will be added in order: F, C, B, D, E
     */

    let keytipTree = keytipManager.keytipTree;

    // Node B
    const keytipIdB = ktpPrefix + KeyCodes.c + separator + KeyCodes.b;
    const keytipSequenceB: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    // Node C
    const keytipIdC = ktpPrefix + KeyCodes.c;
    const keytipSequenceC: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Node D
    const keytipIdD = ktpPrefix + KeyCodes.e + separator + KeyCodes.d;
    const keytipSequenceD: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }, { keyCodes: [KeyCodes.d] }];

    // Node E
    const keytipIdE = ktpPrefix + KeyCodes.e;
    const keytipSequenceE: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }];

    // Node F
    const keytipIdF = ktpPrefix + KeyCodes.e + separator + KeyCodes.f;
    const keytipSequenceF: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }, { keyCodes: [KeyCodes.f] }];

    keytipTree.addNode(keytipSequenceF, emptyCallback);
    keytipTree.addNode(keytipSequenceC, emptyCallback);
    keytipTree.addNode(keytipSequenceB, emptyCallback);
    keytipTree.addNode(keytipSequenceD, emptyCallback);
    keytipTree.addNode(keytipSequenceE, emptyCallback);

    // Test all nodes are in the nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipIdB];
    expect(keytipNodeB).toBeDefined();
    let keytipNodeC = keytipTree.nodeMap[keytipIdC];
    expect(keytipNodeC).toBeDefined();
    let keytipNodeD = keytipTree.nodeMap[keytipIdD];
    expect(keytipNodeD).toBeDefined();
    let keytipNodeE = keytipTree.nodeMap[keytipIdE];
    expect(keytipNodeE).toBeDefined();
    let keytipNodeF = keytipTree.nodeMap[keytipIdF];
    expect(keytipNodeF).toBeDefined();

    // Test each node's parent and children
    expect(keytipNodeB.parent).toEqual(keytipIdC);
    expect(keytipNodeB.children).toHaveLength(0);

    expect(keytipNodeC.parent).toEqual(layerID);
    expect(keytipNodeC.children).toHaveLength(1);
    expect(keytipNodeC.children).toContain(keytipIdB);

    expect(keytipNodeD.parent).toEqual(keytipIdE);
    expect(keytipNodeD.children).toHaveLength(0);

    expect(keytipNodeE.parent).toEqual(layerID);
    expect(keytipNodeE.children).toHaveLength(2);
    expect(keytipNodeE.children).toContain(keytipIdD);
    expect(keytipNodeE.children).toContain(keytipIdF);

    expect(keytipNodeF.parent).toEqual(keytipIdE);
    expect(keytipNodeF.children).toHaveLength(0);

    // Test root's children
    expect(keytipTree.root.children).toHaveLength(2);
    expect(keytipTree.root.children).toContain(keytipIdC);
    expect(keytipTree.root.children).toContain(keytipIdE);
  });
});