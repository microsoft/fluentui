import { KeytipTree } from './KeytipTree';
import { KTP_SEPARATOR, KTP_FULL_PREFIX, KTP_LAYER_ID } from '../../utilities/keytips/KeytipConstants';
import type { IKeytipProps } from '../../Keytip';
import type { IKeytipTreeNode } from './IKeytipTreeNode';

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
const keytipIdB = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'b';
const keytipSequenceB: string[] = ['c', 'b'];
const keytipPropsB = createKeytipProps(keytipSequenceB);
const uniqueIdB = '1';
// Node C
const keytipIdC = KTP_FULL_PREFIX + 'c';
const keytipSequenceC: string[] = ['c'];
const keytipPropsC = createKeytipProps(keytipSequenceC);
const uniqueIdC = '2';
// Node D
const keytipIdD = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + 'd';
const keytipSequenceD: string[] = ['e', 'd'];
const keytipPropsD = createKeytipProps(keytipSequenceD);
const uniqueIdD = '3';
// Node E
const keytipIdE = KTP_FULL_PREFIX + 'e';
const keytipSequenceE: string[] = ['e'];
const keytipPropsE = createKeytipProps(keytipSequenceE);
const uniqueIdE = '4';
// Node F
const keytipIdF = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + 'f';
const keytipSequenceF: string[] = ['e', 'f'];
const keytipPropsF = createKeytipProps(keytipSequenceF);
const uniqueIdF = '5';

function verifySampleTree() {
  const nodeB = keytipTree.getNode(keytipIdB)!;
  const nodeC = keytipTree.getNode(keytipIdC)!;
  const nodeD = keytipTree.getNode(keytipIdD)!;
  const nodeE = keytipTree.getNode(keytipIdE)!;
  const nodeF = keytipTree.getNode(keytipIdF)!;

  // Test each node's parent and children
  expect(nodeB.parent).toEqual(keytipIdC);
  expect(nodeB.children).toHaveLength(0);

  expect(nodeC.parent).toEqual(KTP_LAYER_ID);
  expect(nodeC.children).toHaveLength(1);
  expect(nodeC.children).toContain(keytipIdB);

  expect(nodeD.parent).toEqual(keytipIdE);
  expect(nodeD.children).toHaveLength(0);

  expect(nodeE.parent).toEqual(KTP_LAYER_ID);
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

function createKeytipProps(keySequences: string[]): IKeytipProps {
  return {
    keySequences,
    // Just add empty content since it's required in IKeytipProps, but not needed for these tests
    content: '',
  };
}

describe('KeytipTree', () => {
  beforeEach(() => {
    // Reset tree
    keytipTree = new KeytipTree();
  });

  it('constructor creates a root node', () => {
    // Tree root ID should be the layer's ID
    expect(keytipTree.root.id).toEqual(KTP_LAYER_ID);
    // Tree root should not have any children
    expect(keytipTree.root.children).toHaveLength(0);
    // Only the root should be specified in the nodeMap
    expect(keytipTree.getNode(KTP_LAYER_ID)).toBeDefined();
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
      expect(nodeC.parent).toEqual(KTP_LAYER_ID);
    });

    it('two levels from root', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
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
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      const nodeB = keytipTree.getNode(keytipIdB)!;
      // Test B has C set as parent
      expect(nodeB.parent).toEqual(keytipIdC);
      // Test root still has no children
      expect(keytipTree.root.children).toHaveLength(0);
      // Add parent C
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      const nodeC = keytipTree.getNode(keytipIdC)!;
      // Test C has B as its child
      expect(nodeC.children).toHaveLength(1);
      expect(nodeC.children).toContain(keytipIdB);
      // Test root has C as its child
      expect(keytipTree.root.children).toHaveLength(1);
      expect(keytipTree.root.children).toContain(keytipIdC);
    });

    it('creates a correct Tree when many nodes are added in order', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsE, uniqueIdE);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      keytipTree.addNode(keytipPropsD, uniqueIdD);
      keytipTree.addNode(keytipPropsF, uniqueIdF);
      verifySampleTree();
    });

    it('creates a correct Tree when many nodes are added out of order', () => {
      keytipTree.addNode(keytipPropsF, uniqueIdF);
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      keytipTree.addNode(keytipPropsD, uniqueIdD);
      keytipTree.addNode(keytipPropsE, uniqueIdE);
      verifySampleTree();
    });

    it('correctly adds node when overflowSetSequence is defined', () => {
      const keytipPropsEWithOverflow = {
        ...keytipPropsE,
        overflowSetSequence: keytipSequenceC,
      };
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsEWithOverflow, uniqueIdE);
      const nodeE = keytipTree.getNode('ktp-c-e')!;
      expect(nodeE.parent).toEqual(keytipIdC);
      expect(keytipTree.getNode(keytipIdE)).toBeUndefined();
    });
  });

  describe('updateNode', () => {
    it('correctly updates node attributes', () => {
      keytipTree.addNode(keytipPropsB, uniqueIdC);
      const updatedKeytipProps = {
        ...keytipPropsB,
        disabled: true,
        hasDynamicChildren: true,
      };
      keytipTree.updateNode(updatedKeytipProps, uniqueIdC);
      const nodeB = keytipTree.getNode(keytipIdB)!;
      expect(nodeB.disabled).toEqual(true);
      expect(nodeB.hasDynamicChildren).toEqual(true);
    });

    it('correctly updates node when keytip sequence changes', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      const updatedKeytipId = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'g';
      const updatedKeytipSequence = ['c', 'g'];
      const updatedKeytipProps = createKeytipProps(updatedKeytipSequence);
      keytipTree.updateNode(updatedKeytipProps, uniqueIdB);
      const updatedNode = keytipTree.getNode(updatedKeytipId)!;
      const updatedNodeParent = keytipTree.getNode(keytipIdC)!;
      expect(updatedNode.id).toEqual(updatedKeytipId);
      expect(updatedNode.keySequences).toEqual(updatedKeytipSequence);
      expect(updatedNodeParent.children).toContain(updatedNode.id);
    });

    it('correctly updates when the keytips parent has changed', () => {
      // Add all nodes to the tree
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsE, uniqueIdE);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      keytipTree.addNode(keytipPropsD, uniqueIdD);
      keytipTree.addNode(keytipPropsF, uniqueIdF);
      verifySampleTree();

      // Change node 'd' to have parent 'c' instead of parent 'e'
      const updatedKeytipId = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'd';
      const updatedKeytipSequence = ['c', 'd'];
      const updatedKeytipProps = createKeytipProps(updatedKeytipSequence);
      keytipTree.updateNode(updatedKeytipProps, uniqueIdD);
      const updatedNode = keytipTree.getNode(updatedKeytipId)!;
      const updatedParent = keytipTree.getNode(keytipIdC)!;
      const previousParent = keytipTree.getNode(keytipIdE)!;
      // Validate updated node properties
      expect(updatedNode.id).toEqual(updatedKeytipId);
      expect(updatedNode.parent).toEqual(keytipIdC);
      // Validate new parent properties
      expect(updatedParent.children).toContain(updatedKeytipId);
      // Validate old parent properties, shouldn't have it in children
      expect(previousParent.children.indexOf(updatedKeytipId)).toEqual(-1);
      expect(previousParent.children.indexOf(keytipIdD)).toEqual(-1);

      // Revert, make node 'd' have parent 'e' again
      keytipTree.updateNode(keytipPropsD, uniqueIdD);
      const nodeD = keytipTree.getNode(keytipIdD)!;
      const nodeC = keytipTree.getNode(keytipIdC)!;
      const nodeE = keytipTree.getNode(keytipIdE)!;
      // Node props are back to original
      expect(nodeD.id).toEqual(keytipIdD);
      expect(nodeD.parent).toEqual(keytipIdE);
      // E has D as a child
      expect(nodeE.children).toContain(keytipIdD);
      // C does not have D as a child
      expect(nodeC.children.indexOf(keytipIdD)).toEqual(-1);
      expect(nodeC.children.indexOf(updatedKeytipId)).toEqual(-1);
    });
  });

  describe('removeNode', () => {
    it('removes a child node of root and has no children', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      // Remove C from the tree
      keytipTree.removeNode(keytipPropsC, uniqueIdC);
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removes multiple nodes in order correctly', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      // Remove B
      keytipTree.removeNode(keytipPropsB, uniqueIdB);
      // Verify that B is not in the node map
      expect(keytipTree.getNode(keytipIdB)).toBeUndefined();
      // Verify C has no children
      const nodeC = keytipTree.getNode(keytipIdC)!;
      expect(nodeC.children).toHaveLength(0);
      // Remove C
      keytipTree.removeNode(keytipPropsC, uniqueIdC);
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
    });

    it('removed node will be able to be re-added in place', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      // Remove C
      keytipTree.removeNode(keytipPropsC, uniqueIdC);
      // Verify that C is not in the node map
      expect(keytipTree.getNode(keytipIdC)).toBeUndefined();
      // Verify that B still has C as its parent
      expect(keytipTree.getNode(keytipIdB)!.parent).toEqual(keytipIdC);
      // Verify that root has no children
      expect(keytipTree.root.children).toHaveLength(0);
      // Re-add C
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      // Verify that C is in the node map
      const nodeC = keytipTree.getNode(keytipIdC)!;
      // Verify that C's parent is the root
      expect(nodeC.parent).toEqual(KTP_LAYER_ID);
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
        overflowSetSequence: keytipSequenceC,
      };
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsEWithOverflow, uniqueIdE);
      // Remove E
      keytipTree.removeNode(keytipPropsEWithOverflow, uniqueIdE);
      const nodeE = keytipTree.getNode('ktp-c-e');
      expect(nodeE).toBeUndefined();
      const nodeC = keytipTree.getNode(keytipIdC)!;
      expect(nodeC.children).toHaveLength(0);
    });
  });

  it('adding and removing out of order (simulate mounting/unmounting) handled correctly', () => {
    keytipTree.addNode(keytipPropsC, uniqueIdC);
    keytipTree.addNode(keytipPropsC, '2');
    keytipTree.removeNode(keytipPropsC, uniqueIdC);
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
    const keytipIdQ = KTP_FULL_PREFIX + 'q';
    const keytipSequenceQ: string[] = ['q'];
    const keytipPropsQ = createKeytipProps(keytipSequenceQ);
    const uniqueIdQ = '1';

    // Node K
    const keytipSequenceK: string[] = ['e1', 'k'];
    const keytipPropsK = createKeytipProps(keytipSequenceK);
    const uniqueIdK = '2';

    // Node P
    const keytipSequenceP: string[] = ['e1', 'p'];
    const keytipPropsP = createKeytipProps(keytipSequenceP);
    const uniqueIdP = '3';

    // Node E1
    const keytipIdE1 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '1';
    const keytipSequenceE1: string[] = ['e1'];
    const keytipPropsE1 = createKeytipProps(keytipSequenceE1);
    const uniqueIdE1 = '4';

    // Node E2
    const keytipIdE2 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '2';
    const keytipSequenceE2: string[] = ['e2'];
    const keytipPropsE2 = createKeytipProps(keytipSequenceE2);
    const uniqueIdE2 = '5';

    beforeEach(() => {
      keytipTree.addNode(keytipPropsQ, uniqueIdQ);
      keytipTree.addNode(keytipPropsK, uniqueIdK);
      keytipTree.addNode(keytipPropsP, uniqueIdP);
      keytipTree.addNode(keytipPropsE1, uniqueIdE1);
      keytipTree.addNode(keytipPropsE2, uniqueIdE2);
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
          disabled: true,
        };
        keytipTree.updateNode(disabledQ, uniqueIdQ);
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
          disabled: true,
        };
        keytipTree.updateNode(disabledE1, uniqueIdE1);
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
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.addNode(keytipPropsE, uniqueIdE);
      keytipTree.addNode(keytipPropsB, uniqueIdB);
      keytipTree.addNode(keytipPropsD, uniqueIdD);
      keytipTree.addNode(keytipPropsF, uniqueIdF);
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

  describe('isCurrentKeytipParent', () => {
    it('matches the root', () => {
      keytipTree.currentKeytip = keytipTree.root;
      expect(keytipTree.isCurrentKeytipParent(keytipPropsC)).toEqual(true);
    });

    it('matches a keytip to its parent', () => {
      keytipTree.addNode(keytipPropsC, uniqueIdC);
      keytipTree.currentKeytip = keytipTree.getNode(keytipIdC);
      expect(keytipTree.isCurrentKeytipParent(keytipPropsB)).toEqual(true);
    });

    it('matches a keytip when both it and its parent have an overflowSetSequence', () => {
      const cWithOverflow = {
        ...keytipPropsC,
        overflowSetSequence: ['x'],
      };
      const bWithOverflow = {
        ...keytipPropsB,
        overflowSetSequence: ['x'],
      };
      keytipTree.addNode(cWithOverflow, uniqueIdC);
      keytipTree.currentKeytip = keytipTree.getNode('ktp-x-c');
      expect(keytipTree.isCurrentKeytipParent(bWithOverflow)).toEqual(true);
    });

    it('matches a keytip when the currentKeytip has an overflowSetSequence but the passed in one doesn`t', () => {
      const cWithOverflow = {
        ...keytipPropsC,
        overflowSetSequence: ['x'],
      };
      keytipTree.addNode(cWithOverflow, uniqueIdC);
      keytipTree.currentKeytip = keytipTree.getNode('ktp-x-c');
      expect(keytipTree.isCurrentKeytipParent(keytipPropsB)).toEqual(true);
    });
  });

  describe('tree updating with multiple parents and children', () => {
    it('correctly tracks parents and children on add and removal', () => {
      keytipTree.currentKeytip = keytipTree.root;
      // Duplicate parents
      const parent1 = createKeytipProps(['c']);
      const parent2 = createKeytipProps(['c']);
      keytipTree.addNode(parent1, '1');
      keytipTree.addNode(parent2, '2');
      // Verify parents are both there
      expect(keytipTree.currentKeytip?.children).toHaveLength(2);

      // Add children
      const child1 = createKeytipProps(['c', 'a']);
      const child2 = createKeytipProps(['c', 'b']);
      keytipTree.addNode(child1, '3');
      keytipTree.addNode(child2, '4');

      // Verify both parents have 2 children
      let parents = keytipTree.currentKeytip?.children;
      expect(parents).toHaveLength(2);
      let parentNodes = keytipTree.getNodes(parents!);
      parentNodes.forEach(node => {
        expect(node.children).toHaveLength(2);
        expect(node.children[0]).toEqual('ktp-c-a');
        expect(node.children[1]).toEqual('ktp-c-b');
      });

      // Update child1 with a new parent
      const newParent = createKeytipProps(['x']);
      keytipTree.addNode(newParent, '5');
      const child1Updated = createKeytipProps(['x', 'a']);
      keytipTree.updateNode(child1Updated, '3');
      parents = keytipTree.currentKeytip?.children;
      parentNodes = keytipTree.getNodes(parents!);
      expect(parents).toHaveLength(3);
      parentNodes.forEach(node => {
        expect(node.children).toHaveLength(1);
        if (node.id === 'ktp-c') {
          expect(node.children[0]).toEqual('ktp-c-b');
        }
        if (node.id === 'ktp-x') {
          expect(node.children[0]).toEqual('ktp-x-a');
        }
      });

      // Remove one of the children and new parent, add back the original child
      keytipTree.removeNode(child2, '4');
      keytipTree.removeNode(newParent, '5');
      keytipTree.updateNode(child1, '3');
      parents = keytipTree.currentKeytip?.children;
      parentNodes = keytipTree.getNodes(parents!);
      parentNodes.forEach(node => {
        expect(node.children).toHaveLength(1);
        expect(node.children[0]).toEqual('ktp-c-a');
      });

      // Remove one of the parents
      keytipTree.removeNode(parent1, '1');
      parents = keytipTree.currentKeytip?.children;
      expect(parents).toHaveLength(1);
      parentNodes = keytipTree.getNodes(parents!);
      parentNodes.forEach(node => {
        expect(node.children).toHaveLength(1);
        expect(node.children[0]).toEqual('ktp-c-a');
      });
    });
  });
});
