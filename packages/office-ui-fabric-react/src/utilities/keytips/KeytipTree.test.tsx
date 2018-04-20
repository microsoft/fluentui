import { IKeytipProps } from '../../Keytip';
import { KeytipTree } from './KeytipTree';
import { IKeytipTreeNode } from './IKeytipTreeNode';
import {
  IKeySequence,
  ktpSeparator,
  ktpFullPrefix,
  ktpLayerId
} from '../../Utilities';

let keytipTree = new KeytipTree();

// Sample Nodes
/**
 *   Tree should end up looking like (when all added)
 *
 *            a
 *          /   \
 *         c     e
 *        /     / \
 *       b     d   f
 *
 */

// Node B
const keytipIdB = ktpFullPrefix + 'c' + ktpSeparator + 'b';
const keytipSequenceB: IKeySequence[] = ['c', 'b'];
const keytipPropsB = createKeytipProps(keytipSequenceB);
// Node C
const keytipIdC = ktpFullPrefix + 'c';
const keytipSequenceC: IKeySequence[] = ['c'];
const keytipPropsC = createKeytipProps(keytipSequenceC);
// Node D
const keytipIdD = ktpFullPrefix + 'e' + ktpSeparator + 'd';
const keytipSequenceD: IKeySequence[] = ['e', 'd'];
const keytipPropsD = createKeytipProps(keytipSequenceD);
// Node E
const keytipIdE = ktpFullPrefix + 'e';
const keytipSequenceE: IKeySequence[] = ['e'];
const keytipPropsE = createKeytipProps(keytipSequenceE);
// Node F
const keytipIdF = ktpFullPrefix + 'e' + ktpSeparator + 'f';
const keytipSequenceF: IKeySequence[] = ['e', 'f'];
const keytipPropsF = createKeytipProps(keytipSequenceF);

function verifySampleTree() {
  const nodeB = keytipTree.getNode(keytipIdB)!;
  const nodeC = keytipTree.getNode(keytipIdC)!;
  const nodeD = keytipTree.getNode(keytipIdD)!;
  const nodeE = keytipTree.getNode(keytipIdE)!;
  const nodeF = keytipTree.getNode(keytipIdF)!;

  // Test each node's parent and children
  expect(nodeB.parent).toEqual(keytipIdC);
  expect(nodeB.children).toHaveLength(0);

  expect(nodeC.parent).toEqual(ktpLayerId);
  expect(nodeC.children).toHaveLength(1);
  expect(nodeC.children).toContain(keytipIdB);

  expect(nodeD.parent).toEqual(keytipIdE);
  expect(nodeD.children).toHaveLength(0);

  expect(nodeE.parent).toEqual(ktpLayerId);
  expect(nodeE.children).toHaveLength(2);
  expect(nodeE.children).toContain(keytipIdD);
  expect(nodeE.children).toContain(keytipIdF);

  expect(nodeF.parent).toEqual(keytipIdE);
  expect(nodeF.children).toHaveLength(0);

  // Test root's children
  expect(keytipTree.root.children).toHaveLength(2);
  expect(keytipTree.root.children).toContain(keytipIdC);
  expect(keytipTree.root.children).toContain(keytipIdE);
}

function createKeytipProps(keySequences: IKeySequence[]): IKeytipProps {
  return {
    keySequences,
    // Just add empty content since it's required in IKeytipProps, but not needed for these tests
    content: ''
  };
}

describe('KeytipTree', () => {

  beforeEach(() => {
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
      keytipTree.addNode(keytipPropsC, '1');
      // Test C has been added to root's children
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);
      // Test C was added to nodeMap
      expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
      const nodeC = keytipTree.getNode(keytipIdC)!;
      // Test TreeNode C properties
      expect(nodeC.id).toEqual(keytipIdC);
      expect(nodeC.children).toHaveLength(0);
      expect(nodeC.parent).toEqual(ktpLayerId);
    });

    it('two levels from root', () => {
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsB, '2');
      // Test B was added to C's children
      const nodeC = keytipTree.getNode(keytipIdC)!;
      expect(nodeC.children).toHaveLength(1);
      expect(nodeC.children).toContain(keytipIdB);
      // Test B was added to nodeMap
      const nodeB = keytipTree.getNode(keytipIdB)!;
      // Test TreeNode B properties
      expect(nodeB.id).toEqual(keytipIdB);
      expect(nodeB.children).toHaveLength(0);
      expect(nodeB.parent).toEqual(keytipIdC);
    });

    it('add a child node before its parent', () => {
      keytipTree.addNode(keytipPropsB, '1');
      const nodeB = keytipTree.getNode(keytipIdB)!;
      // Test B has C set as parent
      expect(nodeB.parent).toEqual(keytipIdC);
      // Test root still has no children
      expect(keytipTree.root.children).toHaveLength(0);
      // Add parent C
      keytipTree.addNode(keytipPropsC, '2');
      const nodeC = keytipTree.getNode(keytipIdC)!;
      // Test C has B as its child
      expect(nodeC.children).toHaveLength(1);
      expect(nodeC.children).toContain(keytipIdB);
      // Test root has C as its child
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);
    });

    it('creates a correct Tree when many nodes are added in order', () => {
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsE, '2');
      keytipTree.addNode(keytipPropsB, '3');
      keytipTree.addNode(keytipPropsD, '4');
      keytipTree.addNode(keytipPropsF, '5');
      verifySampleTree();
    });

    it('creates a correct Tree when many nodes are added out of order', () => {
      keytipTree.addNode(keytipPropsF, '1');
      keytipTree.addNode(keytipPropsC, '2');
      keytipTree.addNode(keytipPropsB, '3');
      keytipTree.addNode(keytipPropsD, '4');
      keytipTree.addNode(keytipPropsE, '5');
      verifySampleTree();
    });

    it('correctly adds node when overflowSetSequence is defined', () => {
      const keytipPropsEWithOverflow = {
        ...keytipPropsE,
        overflowSetSequence: keytipSequenceC
      };
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsEWithOverflow, '2');
      const nodeE = keytipTree.getNode('ktp-c-e')!;
      expect(nodeE.parent).toEqual(keytipIdC);
      expect(keytipTree.getNode(keytipIdE)).toBeUndefined();
    });
  });

  describe('updateNode', () => {
    it('correctly updates node attributes', () => {
      keytipTree.addNode(keytipPropsB, '1');
      const updatedKeytipProps = {
        ...keytipPropsB,
        disabled: true,
        hasDynamicChildren: true
      };
      keytipTree.updateNode(updatedKeytipProps, '1');
      const nodeB = keytipTree.getNode(keytipIdB)!;
      expect(nodeB.disabled).toEqual(true);
      expect(nodeB.hasDynamicChildren).toEqual(true);
    });
  });

  describe('removeNode', () => {
    it('removes a child node of root and has no children', () => {
      keytipTree.addNode(keytipPropsC, '1');
      // Remove C from the tree
      keytipTree.removeNode(keytipPropsC, '1');
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removes multiple nodes in order correctly', () => {
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsB, '2');
      // Remove B
      keytipTree.removeNode(keytipPropsB, '2');
      // Verify that B is not in the node map
      expect(keytipTree.getNode(keytipIdB)).toBeUndefined();
      // Verify C has no children
      const nodeC = keytipTree.getNode(keytipIdC)!;
      expect(nodeC.children).toHaveLength(0);
      // Remove C
      keytipTree.removeNode(keytipPropsC, '1');
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removed node will be able to be re-added in place', () => {
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsB, '2');
      // Remove C
      keytipTree.removeNode(keytipPropsC, '1');
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that B still has C as its parent
      expect(keytipTree.getNode(keytipIdB)!.parent).toEqual(keytipIdC);
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
      // Re-add C
      keytipTree.addNode(keytipPropsC, '1');
      // Verify that C is in the node map
      const nodeC = keytipTree.getNode(keytipIdC)!;
      // Verify that C's parent is the root
      expect(nodeC.parent).toEqual(ktpLayerId);
      // Verify that the root has C as a child
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);
      // Verify that B is a child of C
      expect(nodeC.children).toHaveLength(1);
      expect(nodeC.children).toContain(keytipIdB);
      // Verify B has parent C
      expect(keytipTree.getNode(keytipIdB)!.parent).toEqual(keytipIdC);
    });

    it('correctly removes a node when overflowSetSequence is defined', () => {
      const keytipPropsEWithOverflow = {
        ...keytipPropsE,
        overflowSetSequence: keytipSequenceC
      };
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsEWithOverflow, '2');
      // Remove E
      keytipTree.removeNode(keytipPropsEWithOverflow, '2');
      const nodeE = keytipTree.getNode('ktp-c-e');
      expect(nodeE).toBeUndefined();
      const nodeC = keytipTree.getNode(keytipIdC)!;
      expect(nodeC.children).toHaveLength(0);
    });
  });

  it('adding and removing out of order (simulate mounting/unmounting) handled correctly', () => {
    keytipTree.addNode(keytipPropsC, '1');
    keytipTree.addNode(keytipPropsC, '2');
    keytipTree.removeNode(keytipPropsC, '1');
    // Root should still have 'c' as a child
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipIdC);
  });

  describe('matching tests', () => {
    // Matching tests tree
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
    const keytipPropsQ = createKeytipProps(keytipSequenceQ);

    // Node K
    const keytipSequenceK: IKeySequence[] = ['e1', 'k'];
    const keytipPropsK = createKeytipProps(keytipSequenceK);

    // Node P
    const keytipSequenceP: IKeySequence[] = ['e1', 'p'];
    const keytipPropsP = createKeytipProps(keytipSequenceP);

    // Node E1
    const keytipIdE1 = ktpFullPrefix + 'e' + ktpSeparator + '1';
    const keytipSequenceE1: IKeySequence[] = ['e1'];
    const keytipPropsE1 = createKeytipProps(keytipSequenceE1);

    // Node E2
    const keytipIdE2 = ktpFullPrefix + 'e' + ktpSeparator + '2';
    const keytipSequenceE2: IKeySequence[] = ['e2'];
    const keytipPropsE2 = createKeytipProps(keytipSequenceE2);

    beforeEach(() => {
      keytipTree.addNode(keytipPropsQ, '1');
      keytipTree.addNode(keytipPropsK, '2');
      keytipTree.addNode(keytipPropsP, '3');
      keytipTree.addNode(keytipPropsE1, '4');
      keytipTree.addNode(keytipPropsE2, '5');
    });

    describe('getExactMatchedNode', () => {
      it('gets the matched node under the specified node', () => {
        expect(keytipTree.getExactMatchedNode('n', keytipTree.root)).toBeUndefined();
        expect(keytipTree.getExactMatchedNode('q', keytipTree.root)).toEqual(keytipTree.getNode(keytipIdQ));
      });

      it('should be undefined if the matching node is disabled ', () => {
        // Disabled node Q
        const disabledQ = {
          ...keytipPropsQ,
          disabled: true
        };
        keytipTree.updateNode(disabledQ, '1');
        expect(keytipTree.getExactMatchedNode('q', keytipTree.root)).toBeUndefined();
      });

      it('should get the matched node if it`s persisted', () => {
        // Persisted node Q
        const nodeQ = keytipTree.getNode(keytipIdQ)!;
        nodeQ.persisted = true;
        expect(keytipTree.getExactMatchedNode('q', keytipTree.root)).toBeDefined();
      });
    });

    describe('getPartiallyMatchedNodes', () => {
      it('gets the correct list of matching nodes', () => {
        expect(keytipTree.getPartiallyMatchedNodes('n', keytipTree.root)).toHaveLength(0);
        expect(keytipTree.getPartiallyMatchedNodes('', keytipTree.root)).toHaveLength(0);
        const matchingENodes = keytipTree.getPartiallyMatchedNodes('e', keytipTree.root);
        expect(matchingENodes).toHaveLength(2);
        const matchingNodeIDs = matchingENodes.map((node: IKeytipTreeNode) => {
          return node.id;
        });
        expect(matchingNodeIDs).toContain(keytipIdE1);
        expect(matchingNodeIDs).toContain(keytipIdE2);
      });

      it('omits disabled nodes when matching', () => {
        // Disabled node E1
        const disabledE1 = {
          ...keytipPropsE1,
          disabled: true
        };
        keytipTree.updateNode(disabledE1, '4');
        const matchedNodes = keytipTree.getPartiallyMatchedNodes('e', keytipTree.root);
        expect(matchedNodes.length).toEqual(1);
        expect(matchedNodes[0].id).toEqual(keytipIdE2);
      });

      it('includes persisted nodes when matching', () => {
        // Persisted node E1
        const nodeE1 = keytipTree.getNode(keytipIdE1)!;
        nodeE1.persisted = true;
        const matchedNodes = keytipTree.getPartiallyMatchedNodes('e', keytipTree.root);
        expect(matchedNodes).toHaveLength(2);
        const matchingNodeIDs = matchedNodes.map((node: IKeytipTreeNode) => {
          return node.id;
        });
        expect(matchingNodeIDs).toContain(keytipIdE1);
        expect(matchingNodeIDs).toContain(keytipIdE2);
      });
    });
  });

  describe('getChildren', () => {
    beforeEach(() => {
      keytipTree.addNode(keytipPropsC, '1');
      keytipTree.addNode(keytipPropsE, '2');
      keytipTree.addNode(keytipPropsB, '3');
      keytipTree.addNode(keytipPropsD, '4');
      keytipTree.addNode(keytipPropsF, '5');
    });

    it('works for a passed in node', () => {
      const childrenOfE = keytipTree.getChildren(keytipTree.getNode(keytipIdE));
      expect(childrenOfE).toHaveLength(2);
      expect(childrenOfE).toContain(keytipIdD);
      expect(childrenOfE).toContain(keytipIdF);
    });

    it('gets the children of the current node when no parameter is passed', () => {
      keytipTree.currentKeytip = keytipTree.getNode(keytipIdE);
      const childrenOfE = keytipTree.getChildren();
      expect(childrenOfE).toHaveLength(2);
      expect(childrenOfE).toContain(keytipIdD);
      expect(childrenOfE).toContain(keytipIdF);
    });

    it('correctly omits persisted nodes', () => {
      // Persisted node D
      const nodeD = keytipTree.getNode(keytipIdD)!;
      nodeD.persisted = true;
      const childrenOfA = keytipTree.getChildren(keytipTree.getNode(keytipIdE));
      expect(childrenOfA).toHaveLength(1);
      expect(childrenOfA).toContain(keytipIdF);
    });
  });
});