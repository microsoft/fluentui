import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
import { IKeytipProps, } from '../../Keytip';
import { KeytipTree, IKeytipTreeNode } from './KeytipTree';
import { KeytipLayer } from '../../KeytipLayer';
import { KeytipManager } from './KeytipManager';
import {
  IKeySequence,
  KeytipTransitionModifier,
  IKeytipTransitionKey,
  ktpSeparator,
  ktpFullPrefix,
  ktpLayerId
} from '../../Utilities';

describe('KeytipTree', () => {
  const layerID = ktpLayerId;
  const keytipStartSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipExitSequences: IKeytipTransitionKey[] = [{ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] }];
  const keytipReturnSequences: IKeytipTransitionKey[] = [{ key: 'Escape' }];
  const keytipManager = KeytipManager.getInstance();

  beforeEach(() => {
    // Create layer
    ReactTestUtils.renderIntoDocument<KeytipLayer>(
      <KeytipLayer
        content='Alt Windows'
        keytipStartSequences={ keytipStartSequences }
        keytipReturnSequences={ keytipReturnSequences }
        keytipExitSequences={ keytipExitSequences }
      />
    );
  });

  afterEach(() => {
    keytipManager.keytipTree = new KeytipTree();
    keytipManager.keytips = [];
  });

  it('constructor creates a root node', () => {
    const keytipTree = keytipManager.keytipTree;

    // Tree root ID should be the layer's ID
    expect(keytipTree.root.id).toEqual(layerID);
    // Tree root should not have any children
    expect(keytipTree.root.children).toHaveLength(0);

    // Only the root should be specified in the nodeMap
    expect(keytipTree.nodeMap[layerID]).toBeDefined();
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(1);
  });

  describe('addNode', () => {
    it('directly under root works correctly', () => {
      const keytipTree = keytipManager.keytipTree;

      // TreeNode C, will be child of root
      const keytipIdC = ktpFullPrefix + 'c';
      const sampleKeySequence: IKeySequence[] = [{ keys: ['c'] }];

      keytipTree.addNode(createKeytipProps(sampleKeySequence));

      // Test C has been added to root's children
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);

      // Test C was added to nodeMap
      expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
      const keytipNodeC = keytipTree.nodeMap[keytipIdC];
      expect(keytipNodeC).toBeDefined();

      // Test TreeNode C properties
      expect(keytipNodeC.id).toEqual(keytipIdC);
      expect(keytipNodeC.children).toHaveLength(0);
      expect(keytipNodeC.parent).toEqual(layerID);
    });

    it('two levels from root', () => {
      const keytipTree = keytipManager.keytipTree;

      // Parent
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceC));
      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Test B was added to C's children
      expect(keytipTree.nodeMap[keytipIdC].children).toHaveLength(1);
      expect(keytipTree.nodeMap[keytipIdC].children).toContain(keytipIdB);

      // Test B was added to nodeMap
      const keytipNodeB = keytipTree.nodeMap[keytipIdB];
      expect(keytipNodeB).toBeDefined();

      // Test TreeNode B properties
      expect(keytipNodeB.id).toEqual(keytipIdB);
      expect(keytipNodeB.children).toHaveLength(0);
      expect(keytipNodeB.parent).toEqual(keytipIdC);
    });

    it('add a child node before its parent', () => {
      const keytipTree = keytipManager.keytipTree;

      // Parent
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Child
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Test B was added to nodeMap
      const keytipNodeB = keytipTree.nodeMap[keytipIdB];
      expect(keytipNodeB).toBeDefined();

      // Test B has C set as parent
      expect(keytipNodeB.parent).toEqual(keytipIdC);

      // Test root still has no children
      expect(keytipTree.root.children).toHaveLength(0);

      // Test C is added to nodeMap
      let keytipNodeC = keytipTree.nodeMap[keytipIdC];
      expect(keytipNodeC).toBeDefined();

      // Test C has no parent
      expect(keytipNodeC.parent).toBeFalsy();

      // Test C has B as its child
      expect(keytipTree.nodeMap[keytipIdC].children).toHaveLength(1);
      expect(keytipTree.nodeMap[keytipIdC].children).toContain(keytipIdB);

      // Add parent
      keytipTree.addNode(createKeytipProps(keytipSequenceC));

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

      const keytipTree = keytipManager.keytipTree;

      // Node B
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Node D
      const keytipIdD = ktpFullPrefix + 'e' + ktpSeparator + 'd';
      const keytipSequenceD: IKeySequence[] = [{ keys: ['e'] }, { keys: ['d'] }];

      // Node E
      const keytipIdE = ktpFullPrefix + 'e';
      const keytipSequenceE: IKeySequence[] = [{ keys: ['e'] }];

      // Node F
      const keytipIdF = ktpFullPrefix + 'e' + ktpSeparator + 'f';
      const keytipSequenceF: IKeySequence[] = [{ keys: ['e'] }, { keys: ['f'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceF));
      keytipTree.addNode(createKeytipProps(keytipSequenceC));
      keytipTree.addNode(createKeytipProps(keytipSequenceB));
      keytipTree.addNode(createKeytipProps(keytipSequenceD));
      keytipTree.addNode(createKeytipProps(keytipSequenceE));

      // Test all nodes are in the nodeMap
      const keytipNodeB = keytipTree.nodeMap[keytipIdB];
      expect(keytipNodeB).toBeDefined();
      const keytipNodeC = keytipTree.nodeMap[keytipIdC];
      expect(keytipNodeC).toBeDefined();
      const keytipNodeD = keytipTree.nodeMap[keytipIdD];
      expect(keytipNodeD).toBeDefined();
      const keytipNodeE = keytipTree.nodeMap[keytipIdE];
      expect(keytipNodeE).toBeDefined();
      const keytipNodeF = keytipTree.nodeMap[keytipIdF];
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

    it('correctly adds node when overflowSetSequence is defined', () => {
      const keytipProps = {
        content: 'A',
        keySequences: [{ keys: ['a'] }],
        overflowSetSequence: [{ keys: ['x'] }]
      };
      const overflowNode = {
        content: 'X',
        keySequences: [{ keys: ['x'] }]
      };
      const keytipTree = keytipManager.keytipTree;
      keytipTree.addNode(overflowNode);
      keytipTree.addNode(keytipProps);

      const keytipNode = keytipTree.nodeMap['ktp-x-a'];
      expect(keytipNode).toBeDefined();
      expect(keytipNode.parent).toEqual('ktp-x');
      expect(keytipTree.nodeMap['ktp-a']).toBeUndefined();
    });
  });

  describe('removeNode', () => {
    it('removes a child node of root and has no children', () => {
      const keytipTree = keytipManager.keytipTree;

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceC));

      // Remove C from the tree
      keytipTree.removeNode(keytipSequenceC);

      // Verify that C is not in the node map
      expect(keytipTree.nodeMap[keytipIdC]).toBeUndefined();

      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removes multiple nodes in order correctly', () => {
      const keytipTree = keytipManager.keytipTree;

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Node B
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceC));
      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Remove B
      keytipTree.removeNode(keytipSequenceB);

      // Verify that B is not in the node map
      expect(keytipTree.nodeMap[keytipIdB]).toBeUndefined();

      // Verify C has no children
      const nodeC = keytipTree.nodeMap[keytipIdC];
      expect(nodeC.children).toHaveLength(0);

      // Remove C
      keytipTree.removeNode(keytipSequenceC);

      // Verify that C is not in the node map
      expect(keytipTree.nodeMap[keytipIdC]).toBeUndefined();

      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removes children as well when a parent is removed', () => {
      const keytipTree = keytipManager.keytipTree;

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Node B
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceC));
      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Remove C
      keytipTree.removeNode(keytipSequenceC);

      // Verify that C is not in the node map
      expect(keytipTree.nodeMap[keytipIdC]).toBeUndefined();
      // Verify that B is not in the node map
      expect(keytipTree.nodeMap[keytipIdB]).toBeUndefined();

      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('correctly removes a node when overflowSetSequence is defined', () => {
      const keytipProps = {
        content: 'A',
        keySequences: [{ keys: ['a'] }],
        overflowSetSequence: [{ keys: ['x'] }]
      };
      const overflowProps = {
        content: 'X',
        keySequences: [{ keys: ['x'] }]
      };
      const keytipTree = keytipManager.keytipTree;
      keytipTree.addNode(overflowProps);
      keytipTree.addNode(keytipProps);

      keytipTree.removeNode(keytipProps.keySequences, keytipProps.overflowSetSequence);

      const keytipNode = keytipTree.nodeMap['ktp-x-a'];
      expect(keytipNode).toBeUndefined();
      const overflowNode = keytipTree.nodeMap['ktp-x'];
      expect(overflowNode).toBeDefined();
      expect(overflowNode.children).toHaveLength(0);
    });
  });

  describe('getExactlyMatchedNodes', () => {
    it('get matched node tests ', () => {
      const keytipTree = new KeytipTree();

      /**
       *   Tree should end up looking like:
       *
       *              a
       *          /   |   \
       *         c    e1   e2
       *              / \
       *             d   f
       *
       */

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence = { keys: ['c'] };

      // Node D
      const keytipIdD = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'd';
      const keytipSequenceD: IKeySequence = { keys: ['d'] };

      // Node F
      const keytipIdF = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'f';
      const keytipSequenceF: IKeySequence = { keys: ['f'] };

      // Node E1
      const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
      const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

      // Node E2
      const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
      const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

      // Node A
      const keytipIdA = ktpFullPrefix + 'a';
      const keytipSequenceA: IKeySequence = { keys: ['a'] };

      const nodeA = createTreeNode(keytipIdA, '', [keytipIdC, keytipIdE1, keytipIdE2], keytipSequenceA);
      const nodeC = createTreeNode(keytipIdC, keytipIdA, [], keytipSequenceC);
      const nodeE1 = createTreeNode(keytipIdE1, keytipIdA, [keytipIdD, keytipIdF], keytipSequenceE1);
      const nodeE2 = createTreeNode(keytipIdE2, keytipIdA, [keytipIdD, keytipIdF], keytipSequenceE2);
      const nodeD = createTreeNode(keytipIdD, keytipIdE1, [], keytipSequenceD);
      const nodeF = createTreeNode(keytipIdF, keytipIdE1, [], keytipSequenceF);

      keytipTree.nodeMap[keytipIdA] = nodeA;
      keytipTree.nodeMap[keytipIdC] = nodeC;
      keytipTree.nodeMap[keytipIdE1] = nodeE1;
      keytipTree.nodeMap[keytipIdE2] = nodeE2;
      keytipTree.nodeMap[keytipIdD] = nodeD;
      keytipTree.nodeMap[keytipIdF] = nodeF;

      // node should be undefined because it is not a child of node A.
      const matchedNode1 = keytipTree.getExactMatchedNode({ keys: ['n'] }, nodeA);
      expect(matchedNode1).toBeUndefined();

      // node should be equal to node c due to keysequnce.
      const matchedNode2 = keytipTree.getExactMatchedNode({ keys: ['c'] }, nodeA);
      expect(matchedNode2).toEqual(nodeC);
    });

    it('should be undefined is matched node is disabled ', () => {
      const keytipTree = new KeytipTree();

      /**
       *   Tree should end up looking like:
       *
       *              a
       *          /   |   \
       *         c    e1   e2

       *
       */

      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence = { keys: ['c'] };

      // Node E1
      const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
      const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

      // Node E2
      const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
      const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

      // Node A
      const keytipIdA = ktpFullPrefix + 'a';
      const keytipSequenceA: IKeySequence = { keys: ['a'] };

      const nodeA = createTreeNode(keytipIdA, '', [keytipIdC, keytipIdE1, keytipIdE2], keytipSequenceA);
      const nodeC = createTreeNode(keytipIdC, keytipIdA, [], keytipSequenceC);
      nodeC.disabled = true;
      const nodeE1 = createTreeNode(keytipIdE1, keytipIdA, [], keytipSequenceE1);
      const nodeE2 = createTreeNode(keytipIdE2, keytipIdA, [], keytipSequenceE2);

      keytipTree.nodeMap[keytipIdA] = nodeA;
      keytipTree.nodeMap[keytipIdC] = nodeC;
      keytipTree.nodeMap[keytipIdE1] = nodeE1;
      keytipTree.nodeMap[keytipIdE2] = nodeE2;

      // node should be undefined because it is disabled.
      const matchedNode1 = keytipTree.getExactMatchedNode({ keys: ['c'] }, nodeA);
      expect(matchedNode1).toBeUndefined();
    });
  });

  describe('getPartiallyMatchedNodes', () => {
    it('get partially matched node tests ', () => {
      const keytipTree = new KeytipTree();

      /**
       *   Tree should end up looking like:
       *
       *              a
       *             |   \
       *            e1   e2
       *              / \
       *             d   f
       *
       */

      // Node D
      const keytipIdD = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'd';
      const keytipSequenceD: IKeySequence = { keys: ['d'] };

      // Node F
      const keytipIdF = ktpFullPrefix + 'e' + ktpSeparator + '1' + ktpSeparator + 'f';
      const keytipSequenceF: IKeySequence = { keys: ['f'] };

      // Node E1
      const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
      const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

      // Node E2
      const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
      const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

      // Node A
      const keytipIdA = ktpFullPrefix + 'a';
      const keytipSequenceA: IKeySequence = { keys: ['a'] };

      const nodeA = createTreeNode(keytipIdA, '', [keytipIdE1, keytipIdE2], keytipSequenceA);
      const nodeE1 = createTreeNode(keytipIdE1, keytipIdA, [keytipIdD, keytipIdF], keytipSequenceE1);
      const nodeE2 = createTreeNode(keytipIdE2, keytipIdA, [keytipIdD, keytipIdF], keytipSequenceE2);
      const nodeD = createTreeNode(keytipIdD, keytipIdE1, [], keytipSequenceD);
      const nodeF = createTreeNode(keytipIdF, keytipIdE1, [], keytipSequenceF);

      keytipTree.nodeMap[keytipIdA] = nodeA;
      keytipTree.nodeMap[keytipIdE1] = nodeE1;
      keytipTree.nodeMap[keytipIdE2] = nodeE2;
      keytipTree.nodeMap[keytipIdD] = nodeD;
      keytipTree.nodeMap[keytipIdF] = nodeF;

      // nodes array should be empty.
      const matchedNodes1 = keytipTree.getPartiallyMatchedNodes({ keys: ['n'] }, nodeA);
      expect(matchedNodes1.length).toEqual(0);

      // nodes array should be empty.
      const matchedNodes2 = keytipTree.getPartiallyMatchedNodes({ keys: [] }, nodeA);
      expect(matchedNodes2.length).toEqual(0);

      // nodes array should be equal to 2.
      const matchedNodes3 = keytipTree.getPartiallyMatchedNodes({ keys: ['e'] }, nodeA);
      expect(matchedNodes3.length).toEqual(2);
    });

    it('get partially matched nodes that are not disabled ', () => {
      const keytipTree = new KeytipTree();

      /**
       *   Tree should end up looking like:
       *
       *              a
       *             |   \
       *            e1   e2
       *              / \
       *             d   f
       *
       */

      // Node E1
      const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
      const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

      // Node E2
      const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
      const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

      // Node A
      const keytipIdA = ktpFullPrefix + 'a';
      const keytipSequenceA: IKeySequence = { keys: ['a'] };

      const nodeA = createTreeNode(keytipIdA, '', [keytipIdE1, keytipIdE2], keytipSequenceA);
      const nodeE1 = createTreeNode(keytipIdE1, keytipIdA, [], keytipSequenceE1);
      const nodeE2 = createTreeNode(keytipIdE2, keytipIdA, [], keytipSequenceE2);
      nodeE2.disabled = true;

      keytipTree.nodeMap[keytipIdA] = nodeA;
      keytipTree.nodeMap[keytipIdE1] = nodeE1;
      keytipTree.nodeMap[keytipIdE2] = nodeE2;

      // nodes array should equal 1, for node e2 is disabled.
      const matchedNodes = keytipTree.getPartiallyMatchedNodes({ keys: ['e'] }, nodeA);
      expect(matchedNodes.length).toEqual(1);
    });
  });
});

function createKeytipProps(keySequences: IKeySequence[]): IKeytipProps {
  return {
    keySequences,
    // Just add empty content since it's required, but not needed for tests
    content: ''
  };
}

function createTreeNode(id: string, parentId: string, childrenIds: string[], sequence: IKeySequence): IKeytipTreeNode {
  return {
    id,
    parent: parentId,
    children: childrenIds,
    keytipSequence: sequence
  };
}