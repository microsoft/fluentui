import * as React from 'react';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { mount, ReactWrapper } from 'enzyme';
import { KeytipLayerBase } from './KeytipLayer.base';
import { IKeytipProps } from '../../Keytip';
import { find } from '../../Utilities';
import { KeytipTree } from './KeytipTree';
import { KTP_FULL_PREFIX, KTP_SEPARATOR } from '../../utilities/keytips/KeytipConstants';
import { KeytipTransitionModifier } from '../../utilities/keytips/IKeytipTransitionKey';

describe('KeytipLayer', () => {
  const ktpMgr = KeytipManager.getInstance();
  const layerRef = React.createRef<KeytipLayerBase>();
  let ktpLayer: ReactWrapper;
  let ktpTree: KeytipTree;

  // Sample keytips
  const keytipIdB = KTP_FULL_PREFIX + 'b';
  const uniqueIdB = '1';
  const keytipB: IKeytipProps = {
    content: 'B',
    keySequences: ['b']
  };

  const keytipIdC = KTP_FULL_PREFIX + 'c';
  const uniqueIdC = '2';
  const keytipC: IKeytipProps = {
    content: 'C',
    keySequences: ['c']
  };

  const keytipIdD = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'd';
  const uniqueIdD = '3';
  const keytipD: IKeytipProps = {
    content: 'D',
    keySequences: ['c', 'd']
  };

  const uniqueIdE1 = '4';
  const keytipE1: IKeytipProps = {
    content: 'E1',
    keySequences: ['e1']
  };

  const keytipIdE2 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '2';
  const uniqueIdE2 = '5';
  const keytipE2: IKeytipProps = {
    content: 'E2',
    keySequences: ['e2']
  };

  const keytipIdG = KTP_FULL_PREFIX + 'g';
  const uniqueIdG = '6';
  const keytipG: IKeytipProps = {
    content: 'G',
    keySequences: ['g']
  };

  function getKeytip(keytips: IKeytipProps[], content: string): IKeytipProps | undefined {
    return find(keytips, (keytip: IKeytipProps) => {
      return keytip.content === content;
    });
  }

  afterEach(() => {
    if (ktpLayer) {
      ktpLayer.unmount();
    }
  });

  it('constructor initializes the keytips state from KeytipManager.keytips', () => {
    // Add some keytips to the Manager
    ktpMgr.keytips = [{ keytip: keytipB, uniqueID: '1' }, { keytip: keytipG, uniqueID: '2' }];

    // Create layer
    ktpLayer = mount(<KeytipLayerBase content="Alt Windows" />);

    const layerKeytips = ktpLayer.state('keytips');
    expect(layerKeytips).toHaveLength(2);
  });

  describe('enter and exit test', () => {
    const onEnter = jest.fn();
    const onExit = jest.fn();

    beforeEach(() => {
      // Add keytips to the manager
      ktpMgr.keytips = [
        { keytip: keytipB, uniqueID: uniqueIdB },
        { keytip: keytipC, uniqueID: uniqueIdC },
        { keytip: keytipD, uniqueID: uniqueIdD }
      ];
      ktpMgr.persistedKeytips = [{ keytip: keytipG, uniqueID: uniqueIdG }];

      // Create layer
      ktpLayer = mount(
        <KeytipLayerBase componentRef={layerRef} content="Alt Windows" onEnterKeytipMode={onEnter} onExitKeytipMode={onExit} />
      );
    });

    it('correctly sets variables when entering and exiting', () => {
      // Call enterKeytipMode
      ktpMgr.enterKeytipMode();
      expect(ktpLayer.state('inKeytipMode')).toEqual(true);
      expect(onEnter).toBeCalled();
      ktpTree = layerRef.current!.getKeytipTree();

      // 4 nodes + the root
      expect(Object.keys(ktpTree.nodeMap)).toHaveLength(5);
      expect(ktpTree.getNode(keytipIdB)).toBeDefined();
      expect(ktpTree.getNode(keytipIdC)).toBeDefined();
      expect(ktpTree.getNode(keytipIdD)).toBeDefined();
      expect(ktpTree.getNode(keytipIdG)).toBeDefined();

      // Should show B and C
      let visibleKeytips: IKeytipProps[] = ktpLayer.state('visibleKeytips');
      expect(visibleKeytips).toHaveLength(2);
      expect(getKeytip(visibleKeytips, 'B')).toBeDefined();
      expect(getKeytip(visibleKeytips, 'C')).toBeDefined();

      expect(ktpTree.currentKeytip).toEqual(ktpTree.root);

      // Call enterKeytipMode
      ktpMgr.exitKeytipMode();
      expect(ktpLayer.state('inKeytipMode')).toEqual(false);
      expect(onExit).toBeCalled();
      ktpTree = layerRef.current!.getKeytipTree();

      visibleKeytips = ktpLayer.state('visibleKeytips');
      expect(visibleKeytips).toHaveLength(0);

      expect(layerRef.current!.getCurrentSequence()).toEqual('');
      expect(ktpTree.currentKeytip).toBeUndefined();
    });

    it('respects shouldEnterKeytipMode', () => {
      ktpMgr.shouldEnterKeytipMode = false;
      ktpMgr.enterKeytipMode();
      expect(ktpLayer.state('inKeytipMode')).toEqual(false);
      ktpMgr.shouldEnterKeytipMode = true;
      ktpMgr.enterKeytipMode();
      expect(ktpLayer.state('inKeytipMode')).toEqual(true);
      expect(onEnter).toBeCalled();
    });
  });

  describe('input tests', () => {
    let layerValue: KeytipLayerBase;

    const onEnter = jest.fn();
    const onExit = jest.fn();

    describe('processTransitionInput', () => {
      describe('with a default layer', () => {
        beforeEach(() => {
          // Add keytips to the manager
          ktpMgr.keytips = [
            { keytip: keytipB, uniqueID: uniqueIdB },
            { keytip: keytipC, uniqueID: uniqueIdC },
            { keytip: keytipD, uniqueID: uniqueIdD }
          ];
          ktpMgr.persistedKeytips = [{ keytip: keytipG, uniqueID: uniqueIdG }];

          // Create layer
          ktpLayer = mount(
            <KeytipLayerBase componentRef={layerRef} content="Alt Windows" onEnterKeytipMode={onEnter} onExitKeytipMode={onExit} />
          );
          layerValue = layerRef.current!;
          ktpTree = layerValue.getKeytipTree();
        });

        it('calls on enter keytip mode when we process alt + left win', () => {
          layerValue.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
          expect(onEnter).toBeCalled();
        });

        it('calls on exit keytip mode when we process alt + left win', () => {
          ktpTree.currentKeytip = ktpTree.root;
          layerValue.processTransitionInput({ key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] });
          expect(onExit).toBeCalled();
        });

        it('calls on exit keytip mode because we are going back when on the root', () => {
          ktpTree.currentKeytip = ktpTree.root;
          layerValue.processTransitionInput({ key: 'Escape' });
          expect(onExit).toBeCalled();
        });

        it('hitting Esc when on a root child node will go up to the root', () => {
          const onReturn: jest.Mock = jest.fn();
          const nodeC = ktpTree.getNode(keytipIdC)!;
          nodeC.onReturn = onReturn;
          ktpTree.currentKeytip = nodeC;
          layerValue.processTransitionInput({ key: 'Escape' });
          expect(ktpTree.currentKeytip).toEqual(ktpTree.root);
          expect(onReturn).toBeCalled();
        });

        it('hitting Esc when on a child node will go up one level', () => {
          const onReturn: jest.Mock = jest.fn();
          const nodeD = ktpTree.getNode(keytipIdD)!;
          nodeD.onReturn = onReturn;
          ktpTree.currentKeytip = nodeD;
          layerValue.processTransitionInput({ key: 'Escape' });
          expect(ktpTree.currentKeytip).toEqual(ktpTree.getNode(keytipIdC));
        });
      });

      it('can handle using a single key that is also a modifier for transitions', () => {
        // Create layer
        ktpLayer = mount(
          <KeytipLayerBase
            content="Alt Windows"
            componentRef={layerRef}
            keytipStartSequences={[{ key: 'Meta' }]}
            onEnterKeytipMode={onEnter}
          />
        );
        layerValue.processTransitionInput({ key: 'Meta' });
        expect(onEnter).toBeCalled();
      });
    });

    describe('processInput', () => {
      beforeEach(() => {
        // Add keytips to the manager
        ktpMgr.keytips = [
          { keytip: keytipB, uniqueID: uniqueIdB },
          { keytip: keytipC, uniqueID: uniqueIdC },
          { keytip: keytipD, uniqueID: uniqueIdD },
          { keytip: keytipE1, uniqueID: uniqueIdE1 },
          { keytip: keytipE2, uniqueID: uniqueIdE2 }
        ];
        ktpMgr.persistedKeytips = [{ keytip: keytipG, uniqueID: uniqueIdG }];

        // Create layer
        ktpLayer = mount(
          <KeytipLayerBase componentRef={layerRef} content="Alt Windows" onEnterKeytipMode={onEnter} onExitKeytipMode={onExit} />
        );
        layerValue = layerRef.current!;
        ktpTree = layerValue.getKeytipTree();
      });

      // Processing keys tests
      it('Processing a leaf node should execute it`s onExecute func and trigger onExitKeytipMode', () => {
        const onExecute: jest.Mock = jest.fn();
        ktpTree.addNode({ ...keytipB, onExecute }, uniqueIdB);
        ktpTree.currentKeytip = ktpTree.root;
        layerValue.processInput('b');
        expect(onExecute).toBeCalled();
        expect(onExit).toBeCalled();
        expect(layerValue.getCurrentSequence().length).toEqual(0);
      });

      it('Processing a node with two keys should save sequence and wait for second key', () => {
        const onExecuteE2: jest.Mock = jest.fn();
        ktpTree.addNode({ ...keytipE2, onExecute: onExecuteE2 }, uniqueIdE2);
        ktpTree.currentKeytip = ktpTree.root;
        layerValue.processInput('e');
        // We are still waiting for second key
        expect(layerValue.getCurrentSequence().length).toEqual(1);
        layerValue.processInput('2');
        expect(onExecuteE2).toBeCalled();
        expect(layerValue.getCurrentSequence().length).toEqual(0);
        expect(onExit).toBeCalled();
      });

      it('Processing a node which is not leaf but its children are not in the DOM', () => {
        const onExecute: jest.Mock = jest.fn();
        ktpTree.addNode({ ...keytipB, onExecute, hasDynamicChildren: true }, uniqueIdB);
        ktpTree.currentKeytip = ktpTree.root;
        layerValue.processInput('b');
        // Node B's onExecute should be called
        expect(onExecute).toBeCalled();
        // There is no more buffer in the sequence
        expect(layerValue.getCurrentSequence().length).toEqual(0);
        // We haven't exited keytip mode (current keytip is set to the matched keytip)
        expect(ktpTree.currentKeytip.id).toEqual(keytipIdB);
      });

      it('with a persisted node will partially match the keytip but won`t show it', () => {
        // Make E2 a persisted node
        const nodeE2 = ktpTree.getNode(keytipIdE2)!;
        nodeE2.persisted = true;
        nodeE2.onExecute = jest.fn();
        ktpTree.currentKeytip = ktpTree.root;
        layerValue.processInput('e');
        // Only E1 should be visible
        const visibleLayerKtps: IKeytipProps[] = ktpLayer.state('visibleKeytips');
        expect(visibleLayerKtps).toHaveLength(1);
        expect(visibleLayerKtps[0].content).toEqual('E1');
        layerValue.processInput('2');
        // E2 should be triggered
        expect(nodeE2.onExecute).toBeCalled();
      });
    });
  });

  describe('showKeytips', () => {
    // Create layer
    it('shows the defined keytips and hides all others', () => {
      ktpMgr.keytips = [
        { keytip: keytipB, uniqueID: uniqueIdB },
        { keytip: keytipC, uniqueID: uniqueIdC },
        { keytip: keytipD, uniqueID: uniqueIdD },
        { keytip: keytipE1, uniqueID: uniqueIdE1 },
        { keytip: keytipE2, uniqueID: uniqueIdE2 }
      ];
      ktpLayer = mount(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      layerRef.current!.showKeytips([keytipIdB, keytipIdC]);
      const visibleKeytips: IKeytipProps[] = ktpLayer.state('visibleKeytips');
      expect(visibleKeytips).toHaveLength(2);
      expect(getKeytip(visibleKeytips, 'B')).toBeDefined();
      expect(getKeytip(visibleKeytips, 'C')).toBeDefined();
    });

    it('should handle overflowSetSequence correctly', () => {
      ktpMgr.keytips = [
        {
          keytip: {
            ...keytipB,
            overflowSetSequence: ['x']
          },
          uniqueID: uniqueIdB
        },
        { keytip: keytipC, uniqueID: uniqueIdC },
        { keytip: keytipD, uniqueID: uniqueIdD },
        { keytip: keytipE1, uniqueID: uniqueIdE1 },
        { keytip: keytipE2, uniqueID: uniqueIdE2 }
      ];
      ktpLayer = mount(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      layerRef.current!.showKeytips(['ktp-x-b']);
      const visibleKeytips: IKeytipProps[] = ktpLayer.state('visibleKeytips');
      expect(visibleKeytips).toHaveLength(1);
      expect(getKeytip(visibleKeytips, 'B')).toBeDefined();
    });
  });

  describe('event listeners', () => {
    beforeEach(() => {
      jest.useFakeTimers();

      // Add keytips to the manager
      ktpMgr.keytips = [
        { keytip: keytipB, uniqueID: uniqueIdB },
        { keytip: keytipC, uniqueID: uniqueIdC },
        { keytip: keytipD, uniqueID: uniqueIdD },
        { keytip: keytipE1, uniqueID: uniqueIdE1 },
        { keytip: keytipE2, uniqueID: uniqueIdE2 }
      ];
      ktpMgr.persistedKeytips = [{ keytip: keytipG, uniqueID: uniqueIdG }];

      // Create layer
      ktpLayer = mount(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      ktpTree = layerRef.current!.getKeytipTree();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('keytipAdded event delay-shows a keytip if the current keytip is its parent', () => {
      ktpTree.currentKeytip = ktpTree.getNode(keytipIdB);
      // Add a child under B
      ktpMgr.register({
        content: 'X',
        keySequences: ['b', 'x']
      });
      jest.runAllTimers();

      const visibleKeytips: IKeytipProps[] = ktpLayer.state('visibleKeytips');
      expect(visibleKeytips).toHaveLength(1);
      expect(getKeytip(visibleKeytips, 'X')).toBeDefined();
    });
  });
});
