import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { KeytipLayer } from './KeytipLayer';
import { KeytipManager } from './KeytipManager';
import { KeyCodes, IKeySequence } from '../../Utilities';

describe('KeytipTree', () => {
  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  function emptyCallback(): void {
    return undefined;
  }

  const layerID = 'my-layer-id';
  const keytipStartSequence: IKeySequence[] = [{ keyCodes: [KeyCodes.a] }];
  const keytipManager = KeytipManager.getInstance();

  it('constructor creates a root node', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );
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
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );
    let keytipTree = keytipManager.keytipTree;

    // TreeNode C, will be child of root
    const keytipID_C = 'ktp-' + KeyCodes.c;
    const sampleKeySequence: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    keytipTree.addNode(sampleKeySequence, emptyCallback);

    // Test C has been added to root's children
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipID_C);

    // Test C was added to nodeMap
    expect(Object.keys(keytipTree.nodeMap)).toHaveLength(2);
    let keytipNodeC = keytipTree.nodeMap[keytipID_C];
    expect(keytipNodeC).toBeDefined();

    // Test TreeNode C properties
    expect(keytipNodeC.id).toEqual(keytipID_C);
    expect(keytipNodeC.children).toHaveLength(0);
    expect(keytipNodeC.parent).toEqual(layerID);
  });

  it('addNode two levels from root', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );
    let keytipTree = keytipManager.keytipTree;

    // Parent
    const keytipID_C = 'ktp-' + KeyCodes.c;
    const keytipSequence_C: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Child
    const keytipID_B = 'ktp-' + KeyCodes.c + '-' + KeyCodes.b;
    const keytipSequence_B: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    keytipTree.addNode(keytipSequence_C, emptyCallback);
    keytipTree.addNode(keytipSequence_B, emptyCallback);

    // Test B was added to C's children
    expect(keytipTree.nodeMap[keytipID_C].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipID_C].children).toContain(keytipID_B);

    // Test B was added to nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipID_B];
    expect(keytipNodeB).toBeDefined();

    // Test TreeNode B properties
    expect(keytipNodeB.id).toEqual(keytipID_B);
    expect(keytipNodeB.children).toHaveLength(0);
    expect(keytipNodeB.parent).toEqual(keytipID_C);
  });

  it('add a child node before its parent', () => {
    // Create layer
    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );
    let keytipTree = keytipManager.keytipTree;

    // Parent
    const keytipID_C = 'ktp-' + KeyCodes.c;
    const keytipSequence_C: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Child
    const keytipID_B = 'ktp-' + KeyCodes.c + '-' + KeyCodes.b;
    const keytipSequence_B: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    keytipTree.addNode(keytipSequence_B, emptyCallback);

    // Test B was added to nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipID_B];
    expect(keytipNodeB).toBeDefined();

    // Test B has C set as parent
    expect(keytipNodeB.parent).toEqual(keytipID_C);

    // Test root still has no children
    expect(keytipTree.root.children).toHaveLength(0);

    // Test C is added to nodeMap
    let keytipNodeC = keytipTree.nodeMap[keytipID_C];
    expect(keytipNodeC).toBeDefined();

    // Test C has no parent
    expect(keytipNodeC.parent).toBeUndefined();

    // Test C has B as its child
    expect(keytipTree.nodeMap[keytipID_C].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipID_C].children).toContain(keytipID_B);

    // Add parent
    keytipTree.addNode(keytipSequence_C, emptyCallback);

    keytipNodeC = keytipTree.nodeMap[keytipID_C];
    expect(keytipNodeC).toBeDefined();

    // Test C has B as its child
    expect(keytipTree.nodeMap[keytipID_C].children).toHaveLength(1);
    expect(keytipTree.nodeMap[keytipID_C].children).toContain(keytipID_B);

    // Test root has C as its child
    expect(keytipTree.root.children).toHaveLength(1);
    expect(keytipTree.root.children).toContain(keytipID_C);
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

    const layer = ReactTestUtils.renderIntoDocument<any>(
      <KeytipLayer id={ layerID } keytipStartSequences={ keytipStartSequence } />
    );
    let keytipTree = keytipManager.keytipTree;

    // Node B
    const keytipID_B = 'ktp-' + KeyCodes.c + '-' + KeyCodes.b;
    const keytipSequence_B: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }, { keyCodes: [KeyCodes.b] }];

    // Node C
    const keytipID_C = 'ktp-' + KeyCodes.c;
    const keytipSequence_C: IKeySequence[] = [{ keyCodes: [KeyCodes.c] }];

    // Node D
    const keytipID_D = 'ktp-' + KeyCodes.e + '-' + KeyCodes.d;
    const keytipSequence_D: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }, { keyCodes: [KeyCodes.d] }];

    // Node E
    const keytipID_E = 'ktp-' + KeyCodes.e;
    const keytipSequence_E: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }];

    // Node F
    const keytipID_F = 'ktp-' + KeyCodes.e + '-' + KeyCodes.f;
    const keytipSequence_F: IKeySequence[] = [{ keyCodes: [KeyCodes.e] }, { keyCodes: [KeyCodes.f] }];

    keytipTree.addNode(keytipSequence_F, emptyCallback);
    keytipTree.addNode(keytipSequence_C, emptyCallback);
    keytipTree.addNode(keytipSequence_B, emptyCallback);
    keytipTree.addNode(keytipSequence_D, emptyCallback);
    keytipTree.addNode(keytipSequence_E, emptyCallback);

    // Test all nodes are in the nodeMap
    let keytipNodeB = keytipTree.nodeMap[keytipID_B];
    expect(keytipNodeB).toBeDefined();
    let keytipNodeC = keytipTree.nodeMap[keytipID_C];
    expect(keytipNodeC).toBeDefined();
    let keytipNodeD = keytipTree.nodeMap[keytipID_D];
    expect(keytipNodeD).toBeDefined();
    let keytipNodeE = keytipTree.nodeMap[keytipID_E];
    expect(keytipNodeE).toBeDefined();
    let keytipNodeF = keytipTree.nodeMap[keytipID_F];
    expect(keytipNodeF).toBeDefined();

    // Test each node's parent and children
    expect(keytipNodeB.parent).toEqual(keytipID_C);
    expect(keytipNodeB.children).toHaveLength(0);

    expect(keytipNodeC.parent).toEqual(layerID);
    expect(keytipNodeC.children).toHaveLength(1);
    expect(keytipNodeC.children).toContain(keytipID_B);

    expect(keytipNodeD.parent).toEqual(keytipID_E);
    expect(keytipNodeD.children).toHaveLength(0);

    expect(keytipNodeE.parent).toEqual(layerID);
    expect(keytipNodeE.children).toHaveLength(2);
    expect(keytipNodeE.children).toContain(keytipID_D);
    expect(keytipNodeE.children).toContain(keytipID_F);

    expect(keytipNodeF.parent).toEqual(keytipID_E);
    expect(keytipNodeF.children).toHaveLength(0);

    // Test root's children
    expect(keytipTree.root.children).toHaveLength(2);
    expect(keytipTree.root.children).toContain(keytipID_C);
    expect(keytipTree.root.children).toContain(keytipID_E);
  });
});