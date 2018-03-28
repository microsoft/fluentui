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
  let keytipTree = new KeytipTree();

  afterEach(() => {
    // Reset tree
    keytipTree = new KeytipTree();
  });

  it('constructor creates a root node', () => {
    // Tree root ID should be the layer's ID
    expect(keytipTree.root.id).toEqual(ktpLayerId);
    // Tree root should not have any children
    expect(keytipTree.root.children).toHaveLength(0);

    // Only the root should be specified in the nodeMap
    expect(keytipTree.getNode(ktpLayerId)).toBeDefined();
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(1);
  });

  describe('addNode', () => {
    it('directly under root works correctly', () => {
      // TreeNode C, will be child of root
      const keytipIdC = ktpFullPrefix + 'c';
      const sampleKeySequence: IKeySequence[] = [{ keys: ['c'] }];

      keytipTree.addNode(createKeytipProps(sampleKeySequence));

      // Test C has been added to root's children
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);

      // Test C was added to nodeMap
      expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
      const keytipNodeC = keytipTree.getNode(keytipIdC);
      expect(keytipNodeC).toBeDefined();

      // Test TreeNode C properties
      expect(keytipNodeC!.id).toEqual(keytipIdC);
      expect(keytipNodeC!.children).toHaveLength(0);
      expect(keytipNodeC!.parent).toEqual(ktpLayerId);
    });

    it('two levels from root', () => {
      // Parent
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceC));
      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Test B was added to C's children
      const keytipCNode = keytipTree.getNode(keytipIdC);
      expect(keytipCNode!.children).toHaveLength(1);
      expect(keytipCNode!.children).toContain(keytipIdB);

      // Test B was added to nodeMap
      const keytipNodeB = keytipTree.getNode(keytipIdB);
      expect(keytipNodeB).toBeDefined();

      // Test TreeNode B properties
      expect(keytipNodeB!.id).toEqual(keytipIdB);
      expect(keytipNodeB!.children).toHaveLength(0);
      expect(keytipNodeB!.parent).toEqual(keytipIdC);
    });

    it('add a child node before its parent', () => {
      // Parent
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Child
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Test B was added to nodeMap
      const keytipNodeB = keytipTree.getNode(keytipIdB);
      expect(keytipNodeB).toBeDefined();

      // Test B has C set as parent
      expect(keytipNodeB!.parent).toEqual(keytipIdC);

      // Test root still has no children
      expect(keytipTree.root.children).toHaveLength(0);

      // Add parent
      keytipTree.addNode(createKeytipProps(keytipSequenceC));

      const keytipNodeC = keytipTree.getNode(keytipIdC);
      expect(keytipNodeC).toBeDefined();

      // Test C has B as its child
      expect(keytipNodeC!.children).toHaveLength(1);
      expect(keytipNodeC!.children).toContain(keytipIdB);

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
      const keytipNodeB = keytipTree.getNode(keytipIdB);
      expect(keytipNodeB).toBeDefined();
      const keytipNodeC = keytipTree.getNode(keytipIdC);
      expect(keytipNodeC).toBeDefined();
      const keytipNodeD = keytipTree.getNode(keytipIdD);
      expect(keytipNodeD).toBeDefined();
      const keytipNodeE = keytipTree.getNode(keytipIdE);
      expect(keytipNodeE).toBeDefined();
      const keytipNodeF = keytipTree.getNode(keytipIdF);
      expect(keytipNodeF).toBeDefined();

      // Test each node's parent and children
      expect(keytipNodeB!.parent).toEqual(keytipIdC);
      expect(keytipNodeB!.children).toHaveLength(0);

      expect(keytipNodeC!.parent).toEqual(ktpLayerId);
      expect(keytipNodeC!.children).toHaveLength(1);
      expect(keytipNodeC!.children).toContain(keytipIdB);

      expect(keytipNodeD!.parent).toEqual(keytipIdE);
      expect(keytipNodeD!.children).toHaveLength(0);

      expect(keytipNodeE!.parent).toEqual(ktpLayerId);
      expect(keytipNodeE!.children).toHaveLength(2);
      expect(keytipNodeE!.children).toContain(keytipIdD);
      expect(keytipNodeE!.children).toContain(keytipIdF);

      expect(keytipNodeF!.parent).toEqual(keytipIdE);
      expect(keytipNodeF!.children).toHaveLength(0);

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
      keytipTree.addNode(overflowNode);
      keytipTree.addNode(keytipProps);

      const keytipNode = keytipTree.getNode('ktp-x-a');
      expect(keytipNode).toBeDefined();
      expect(keytipNode!.parent).toEqual('ktp-x');
      expect(keytipTree.getNode('ktp-a')).toBeUndefined();
    });
  });

  describe('removeNode', () => {
    it('removes a child node of root and has no children', () => {
      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];
      const keytipCProps = createKeytipProps(keytipSequenceC);
      keytipCProps.uniqueID = '1';

      keytipTree.addNode(keytipCProps);

      // Remove C from the tree
      keytipTree.removeNode(keytipCProps);

      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();

      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removes multiple nodes in order correctly', () => {
      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];
      const keytipCProps = createKeytipProps(keytipSequenceC);
      keytipCProps.uniqueID = '1';

      // Node B
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];
      const keytipBProps = createKeytipProps(keytipSequenceB);
      keytipBProps.uniqueID = '2';

      keytipTree.addNode(keytipCProps);
      keytipTree.addNode(keytipBProps);

      // Remove B
      keytipTree.removeNode(keytipBProps);

      // Verify that B is not in the node map
      expect(keytipTree.getNode(keytipIdB)).toBeUndefined();

      // Verify C has no children
      const nodeC = keytipTree.getNode(keytipIdC);
      expect(nodeC!.children).toHaveLength(0);

      // Remove C
      keytipTree.removeNode(keytipCProps);

      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();

      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removed node will be able to be re-added in place', () => {
      // Node C
      const keytipIdC = ktpFullPrefix + 'c';
      const keytipSequenceC: IKeySequence[] = [{ keys: ['c'] }];

      // Node B
      const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
      const keytipSequenceB: IKeySequence[] = [{ keys: ['c'] }, { keys: ['b'] }];

      const keytipC = createKeytipProps(keytipSequenceC);
      keytipC.uniqueID = '1';
      keytipTree.addNode(keytipC);
      keytipTree.addNode(createKeytipProps(keytipSequenceB));

      // Remove C
      keytipTree.removeNode(keytipC);

      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that B still has C as its parent
      expect(keytipTree.getNode(keytipIdB)!.parent).toEqual(keytipIdC);
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);

      // Re-add C
      keytipTree.addNode(keytipC);

      // Verify that C is in the node map
      const keytipNodeC = keytipTree.getNode(keytipIdC);
      expect(keytipNodeC).toBeDefined();
      // Verify that C's parent is the root
      expect(keytipNodeC!.parent).toEqual(ktpLayerId);
      // Verify that the root has C as a child
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);
      // Verify that B is a child of C
      expect(keytipNodeC!.children).toHaveLength(1);
      expect(keytipNodeC!.children).toContain(keytipIdB);
      // Verify B has parent C
      expect(keytipTree.getNode(keytipIdB)!.parent).toEqual(keytipIdC);
    });

    it('correctly removes a node when overflowSetSequence is defined', () => {
      const keytipProps = {
        content: 'A',
        keySequences: [{ keys: ['a'] }],
        overflowSetSequence: [{ keys: ['x'] }],
        uniqueID: '1'
      };
      const overflowProps = {
        content: 'X',
        keySequences: [{ keys: ['x'] }],
        uniqueID: '2'
      };
      keytipTree.addNode(overflowProps);
      keytipTree.addNode(keytipProps);

      keytipTree.removeNode(keytipProps);

      const keytipNode = keytipTree.getNode('ktp-x-a');
      expect(keytipNode).toBeUndefined();
      const overflowNode = keytipTree.getNode('ktp-x');
      expect(overflowNode).toBeDefined();
      expect(overflowNode!.children).toHaveLength(0);
    });
  });

  describe('getExactlyMatchedNodes', () => {
    it('get matched node tests ', () => {
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

  describe('getChildren', () => {
    const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
    const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
    const keytipIdA = ktpFullPrefix + 'a';

    beforeEach(() => {
      // Node E1
      const keytipSequenceE1: IKeySequence = { keys: ['e', '1'] };

      // Node E2
      const keytipSequenceE2: IKeySequence = { keys: ['e', '2'] };

      // Node A
      const keytipSequenceA: IKeySequence = { keys: ['a'] };

      const nodeA = createTreeNode(keytipIdA, '', [keytipIdE1, keytipIdE2], keytipSequenceA);
      const nodeE1 = createTreeNode(keytipIdE1, keytipIdA, [], keytipSequenceE1);
      const nodeE2 = createTreeNode(keytipIdE2, keytipIdA, [], keytipSequenceE2);

      keytipTree.nodeMap[keytipIdA] = nodeA;
      keytipTree.nodeMap[keytipIdE1] = nodeE1;
      keytipTree.nodeMap[keytipIdE2] = nodeE2;
    });

    it('works for a passed in node', () => {
      const childrenOfA = keytipTree.getChildren(keytipTree.getNode(keytipIdA));
      expect(childrenOfA).toHaveLength(2);
      expect(childrenOfA).toContain(keytipIdE1);
      expect(childrenOfA).toContain(keytipIdE2);
    });

    it('gets the children of the current node when no parameter is passed', () => {
      keytipTree.currentKeytip = keytipTree.getNode(keytipIdA);
      const childrenOfA = keytipTree.getChildren();
      expect(childrenOfA).toHaveLength(2);
      expect(childrenOfA).toContain(keytipIdE1);
      expect(childrenOfA).toContain(keytipIdE2);
    });

    it('correctly omits persisted nodes', () => {
      keytipTree.nodeMap[keytipIdE1].persisted = true;
      const childrenOfA = keytipTree.getChildren(keytipTree.getNode(keytipIdA));
      expect(childrenOfA).toHaveLength(1);
      expect(childrenOfA).toContain(keytipIdE2);
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