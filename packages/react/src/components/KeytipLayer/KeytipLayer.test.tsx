import * as React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { KeytipLayerBase } from './KeytipLayer.base';
import { find, KeyCodes } from '../../Utilities';
import { KeytipTree } from './KeytipTree';
import { KTP_FULL_PREFIX, KTP_SEPARATOR } from '../../utilities/keytips/KeytipConstants';
import type { IKeytipProps } from '../../Keytip';

describe('KeytipLayer', () => {
  const ktpMgr = KeytipManager.getInstance();
  const layerRef = React.createRef<KeytipLayerBase>();
  let ktpTree: KeytipTree;

  // Sample keytips
  const keytipIdB = KTP_FULL_PREFIX + 'b';
  const uniqueIdB = '1';
  const keytipB: IKeytipProps = {
    content: 'B',
    keySequences: ['b'],
  };

  const keytipIdC = KTP_FULL_PREFIX + 'c';
  const uniqueIdC = '2';
  const uniqueIdC2 = '22';
  const keytipC: IKeytipProps = {
    content: 'C',
    keySequences: ['c'],
  };

  const keytipIdD = KTP_FULL_PREFIX + 'c' + KTP_SEPARATOR + 'd';
  const uniqueIdD = '3';
  const keytipD: IKeytipProps = {
    content: 'D',
    keySequences: ['c', 'd'],
  };

  const uniqueIdE1 = '4';
  const keytipE1: IKeytipProps = {
    content: 'E1',
    keySequences: ['e1'],
  };

  const keytipIdE2 = KTP_FULL_PREFIX + 'e' + KTP_SEPARATOR + '2';
  const uniqueIdE2 = '5';
  const keytipE2: IKeytipProps = {
    content: 'E2',
    keySequences: ['e2'],
  };

  const keytipIdG = KTP_FULL_PREFIX + 'g';
  const uniqueIdG = '6';
  const keytipG: IKeytipProps = {
    content: 'G',
    keySequences: ['g'],
  };

  function getKeytip(keytips: IKeytipProps[], content: string): IKeytipProps | undefined {
    return find(keytips, kt => kt.content === content);
  }

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('constructor', () => {
    it('initializes the keytips state from KeytipManager.keytips', () => {
      ktpMgr.keytips = {
        [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
        [uniqueIdG]: { keytip: keytipG, uniqueID: uniqueIdG },
      };

      render(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      const stateKeytips = layerRef.current!.state.keytips;
      expect(stateKeytips).toHaveLength(2);
    });
  });

  describe('enter and exit test', () => {
    const onEnter = jest.fn();
    const onExit = jest.fn();

    beforeEach(() => {
      ktpMgr.keytips = {
        [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
        [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
        [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
      };
      ktpMgr.persistedKeytips = { [uniqueIdG]: { keytip: keytipG, uniqueID: uniqueIdG } };

      render(
        <KeytipLayerBase
          componentRef={layerRef}
          content="Alt Windows"
          onEnterKeytipMode={onEnter}
          onExitKeytipMode={onExit}
        />,
      );
    });

    it('correctly sets variables when entering and exiting', () => {
      // enter
      act(() => {
        ktpMgr.enterKeytipMode();
      });
      expect(layerRef.current!.state.inKeytipMode).toBe(true);
      expect(onEnter).toHaveBeenCalled();

      ktpTree = layerRef.current!.getKeytipTree();
      // 4 nodes + root
      expect(Object.keys(ktpTree.nodeMap)).toHaveLength(5);
      expect(ktpTree.getNode(keytipIdB)).toBeDefined();
      expect(ktpTree.getNode(keytipIdC)).toBeDefined();
      expect(ktpTree.getNode(keytipIdD)).toBeDefined();
      expect(ktpTree.getNode(keytipIdG)).toBeDefined();

      let visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(2);
      expect(getKeytip(visible, 'B')).toBeDefined();
      expect(getKeytip(visible, 'C')).toBeDefined();

      expect(ktpTree.currentKeytip).toEqual(ktpTree.root);

      // exit
      act(() => {
        ktpMgr.exitKeytipMode();
      });
      expect(layerRef.current!.state.inKeytipMode).toBe(false);
      expect(onExit).toHaveBeenCalled();

      visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(0);
      expect(layerRef.current!.getCurrentSequence()).toBe('');
      expect(ktpTree.currentKeytip).toBeUndefined();
    });

    it('respects shouldEnterKeytipMode', () => {
      ktpMgr.shouldEnterKeytipMode = false;
      act(() => {
        ktpMgr.enterKeytipMode();
      });
      expect(layerRef.current!.state.inKeytipMode).toBe(false);

      ktpMgr.shouldEnterKeytipMode = true;
      act(() => {
        ktpMgr.enterKeytipMode();
      });
      expect(layerRef.current!.state.inKeytipMode).toBe(true);
      expect(onEnter).toHaveBeenCalled();
    });
  });

  describe('input tests', () => {
    let layerInstance: KeytipLayerBase;
    const onEnter = jest.fn();
    const onExit = jest.fn();

    describe('processTransitionInput', () => {
      beforeEach(() => {
        ktpMgr.keytips = {
          [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
          [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
          [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
        };
        ktpMgr.persistedKeytips = { [uniqueIdG]: { keytip: keytipG, uniqueID: uniqueIdG } };

        render(
          <KeytipLayerBase
            componentRef={layerRef}
            content="Alt Windows"
            onEnterKeytipMode={onEnter}
            onExitKeytipMode={onExit}
          />,
        );
        layerInstance = layerRef.current!;
        ktpTree = layerInstance.getKeytipTree();
      });

      it('calls onEnter when we process alt + Meta', () => {
        act(() => {
          layerInstance.processTransitionInput({ key: 'Meta', modifierKeys: [KeyCodes.alt] });
        });
        expect(onEnter).toHaveBeenCalledWith({ key: 'Meta', modifierKeys: [KeyCodes.alt] });
      });

      it('calls onExit when toggling off', () => {
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processTransitionInput({ key: 'Meta', modifierKeys: [KeyCodes.alt] });
        });
        expect(onExit).toHaveBeenCalled();
      });

      it('Escape at root exits', () => {
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processTransitionInput({ key: 'Escape' });
        });
        expect(onExit).toHaveBeenCalled();
      });

      it('Escape on child at root invokes onReturn', () => {
        const onReturn = jest.fn();
        const nodeC = ktpTree.getNode(keytipIdC)!;
        nodeC.onReturn = onReturn;
        ktpTree.currentKeytip = nodeC;
        act(() => {
          layerInstance.processTransitionInput({ key: 'Escape' });
        });
        expect(ktpTree.currentKeytip).toEqual(ktpTree.root);
        expect(onReturn).toHaveBeenCalled();
      });

      it('Escape on deeper node goes up one', () => {
        const onReturn = jest.fn();
        const nodeD = ktpTree.getNode(keytipIdD)!;
        nodeD.onReturn = onReturn;
        ktpTree.currentKeytip = nodeD;
        act(() => {
          layerInstance.processTransitionInput({ key: 'Escape' });
        });
        expect(ktpTree.currentKeytip).toEqual(ktpTree.getNode(keytipIdC));
      });

      it('single-key startSequences works', () => {
        cleanup();
        render(
          <KeytipLayerBase
            componentRef={layerRef}
            content="Alt Windows"
            keytipStartSequences={[{ key: 'Meta' }]}
            onEnterKeytipMode={onEnter}
          />,
        );
        layerInstance = layerRef.current!;
        act(() => {
          layerInstance.processTransitionInput({ key: 'Meta' });
        });
        expect(onEnter).toHaveBeenCalledWith({ key: 'Meta' });
      });
    });

    describe('processInput', () => {
      beforeEach(() => {
        ktpMgr.keytips = {
          [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
          [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
          [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
          [uniqueIdE1]: { keytip: keytipE1, uniqueID: uniqueIdE1 },
          [uniqueIdE2]: { keytip: keytipE2, uniqueID: uniqueIdE2 },
        };
        ktpMgr.persistedKeytips = { [uniqueIdG]: { keytip: keytipG, uniqueID: uniqueIdG } };

        render(
          <KeytipLayerBase
            componentRef={layerRef}
            content="Alt Windows"
            onEnterKeytipMode={onEnter}
            onExitKeytipMode={onExit}
          />,
        );
        layerInstance = layerRef.current!;
        ktpTree = layerInstance.getKeytipTree();
      });

      it('leaf node executes onExecute and exits', () => {
        const onExecute = jest.fn();
        ktpTree.addNode({ ...keytipB, onExecute }, uniqueIdB);
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processInput('b');
        });
        expect(onExecute).toHaveBeenCalled();
        expect(onExit).toHaveBeenCalled();
        expect(layerInstance.getCurrentSequence()).toHaveLength(0);
      });

      it('multi-key node buffers then executes', () => {
        const onExecute = jest.fn();
        ktpTree.addNode({ ...keytipE2, onExecute }, uniqueIdE2);
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processInput('e');
        });
        expect(layerInstance.getCurrentSequence()).toHaveLength(1);
        act(() => {
          layerInstance.processInput('2');
        });
        expect(onExecute).toHaveBeenCalled();
        expect(onExit).toHaveBeenCalled();
        expect(layerInstance.getCurrentSequence()).toHaveLength(0);
      });

      it('dynamic children node executes but stays in mode', () => {
        const onExecute = jest.fn();
        ktpTree.addNode({ ...keytipB, onExecute, hasDynamicChildren: true }, uniqueIdB);
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processInput('b');
        });
        expect(onExecute).toHaveBeenCalled();
        expect(ktpTree.currentKeytip.id).toEqual(keytipIdB);
        expect(layerInstance.getCurrentSequence()).toHaveLength(0);
      });

      it('persisted node doesn’t show intermediate keytip', () => {
        const nodeE2 = ktpTree.getNode(keytipIdE2)!;
        nodeE2.persisted = true;
        nodeE2.onExecute = jest.fn();
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processInput('e');
        });

        const visible = layerRef.current!.state.visibleKeytips;
        expect(visible).toHaveLength(1);
        expect(visible[0].content).toBe('E1');

        act(() => {
          layerInstance.processInput('2');
        });
        expect(nodeE2.onExecute).toHaveBeenCalled();
      });

      it('overflow submenu executes immediately', () => {
        const onExecute = jest.fn();
        ktpTree.addNode({ ...keytipC, hasOverflowSubMenu: true, onExecute }, uniqueIdC2);
        ktpTree.currentKeytip = ktpTree.root;
        act(() => {
          layerInstance.processInput('c');
        });
        expect(onExecute).toHaveBeenCalled();
      });
    });
  });

  describe('showKeytips', () => {
    it('shows only the requested keytips', () => {
      ktpMgr.keytips = {
        [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
        [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
        [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
        [uniqueIdE1]: { keytip: keytipE1, uniqueID: uniqueIdE1 },
        [uniqueIdE2]: { keytip: keytipE2, uniqueID: uniqueIdE2 },
      };
      render(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      act(() => {
        layerRef.current!.showKeytips([keytipIdB, keytipIdC]);
      });
      const visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(2);
      expect(getKeytip(visible, 'B')).toBeDefined();
      expect(getKeytip(visible, 'C')).toBeDefined();
    });

    it('respects overflowSetSequence', () => {
      ktpMgr.keytips = {
        [uniqueIdB]: {
          keytip: { ...keytipB, overflowSetSequence: ['x'] },
          uniqueID: uniqueIdB,
        },
        [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
        [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
        [uniqueIdE1]: { keytip: keytipE1, uniqueID: uniqueIdE1 },
        [uniqueIdE2]: { keytip: keytipE2, uniqueID: uniqueIdE2 },
      };
      render(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      act(() => {
        layerRef.current!.showKeytips(['ktp-x-b']);
      });
      const visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(1);
      expect(getKeytip(visible, 'B')).toBeDefined();
    });
  });

  describe('event listeners', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      ktpMgr.delayUpdatingKeytipChange = false;
      ktpMgr.inKeytipMode = false;

      ktpMgr.keytips = {
        [uniqueIdB]: { keytip: keytipB, uniqueID: uniqueIdB },
        [uniqueIdC]: { keytip: keytipC, uniqueID: uniqueIdC },
        [uniqueIdD]: { keytip: keytipD, uniqueID: uniqueIdD },
        [uniqueIdE1]: { keytip: keytipE1, uniqueID: uniqueIdE1 },
        [uniqueIdE2]: { keytip: keytipE2, uniqueID: uniqueIdE2 },
      };
      ktpMgr.persistedKeytips = { [uniqueIdG]: { keytip: keytipG, uniqueID: uniqueIdG } };

      render(<KeytipLayerBase componentRef={layerRef} content="Alt Windows" />);
      ktpTree = layerRef.current!.getKeytipTree();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('keytipAdded delay-shows child when active', () => {
      ktpTree.currentKeytip = ktpTree.getNode(keytipIdB);
      act(() => {
        ktpMgr.register({ content: 'X', keySequences: ['b', 'x'] });
      });
      act(() => {
        jest.runAllTimers();
      });
      const visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(1);
      expect(getKeytip(visible, 'X')).toBeDefined();
    });

    it('does not show when delaying and not in mode', () => {
      ktpMgr.delayUpdatingKeytipChange = true;
      ktpTree.currentKeytip = ktpTree.getNode(keytipIdB);
      act(() => {
        ktpMgr.register({ content: 'X', keySequences: ['b', 'x'] });
      });
      act(() => {
        jest.runAllTimers();
      });
      const visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(0);
    });

    it('does show when delaying and already in mode', () => {
      ktpMgr.delayUpdatingKeytipChange = true;
      ktpMgr.inKeytipMode = true;
      ktpTree.currentKeytip = ktpTree.getNode(keytipIdB);
      act(() => {
        ktpMgr.register({ content: 'X', keySequences: ['b', 'x'] });
      });
      act(() => {
        jest.runAllTimers();
      });
      const visible = layerRef.current!.state.visibleKeytips;
      expect(visible).toHaveLength(1);
      expect(getKeytip(visible, 'X')).toBeDefined();
    });
  });
});
