import { createDashboardGridInteractionCoordinator } from './coordinator';
import { createDashboardGridKeyboardInteraction, getDashboardGridKeyboardResizeProposal } from './keyboardInteraction';
import type {
  DashboardGridInteractionIntent,
  DashboardGridInteractionStore,
  DashboardGridMoveProposal,
  DashboardGridResolvedItem,
} from './types';

describe('dashboard grid keyboard interaction', () => {
  it.each([
    ['n', 'ArrowUp', { row: 1, rowSpan: 4, resizeEdge: 'n' }],
    ['e', 'ArrowRight', { columnSpan: 4, resizeEdge: 'e' }],
    ['s', 'ArrowDown', { rowSpan: 4, resizeEdge: 's' }],
    ['w', 'ArrowLeft', { column: 1, columnSpan: 4, resizeEdge: 'w' }],
    ['ne', 'ArrowUp', { row: 1, rowSpan: 4, resizeEdge: 'ne' }],
    ['nw', 'ArrowLeft', { column: 1, columnSpan: 4, resizeEdge: 'nw' }],
    ['se', 'ArrowDown', { rowSpan: 4, resizeEdge: 'se' }],
    ['sw', 'ArrowLeft', { column: 1, columnSpan: 4, resizeEdge: 'sw' }],
  ] as const)('creates a keyboard resize proposal for the %s handle', (edge, key, expected) => {
    expect(
      getDashboardGridKeyboardResizeProposal({
        current: { column: 2, row: 2, columnSpan: 3, rowSpan: 3 },
        edge,
        key,
        direction: 'ltr',
      }),
    ).toMatchObject({
      input: 'keyboard',
      resizing: true,
      ...expected,
    });
  });

  it('mirrors keyboard resize edges while preserving physical RTL arrow intent', () => {
    expect(
      getDashboardGridKeyboardResizeProposal({
        current: { column: 2, row: 2, columnSpan: 3, rowSpan: 3 },
        edge: 'e',
        key: 'ArrowLeft',
        direction: 'rtl',
      }),
    ).toMatchObject({ columnSpan: 4, resizeEdge: 'w' });
    expect(
      getDashboardGridKeyboardResizeProposal({
        current: { column: 2, row: 2, columnSpan: 3, rowSpan: 3 },
        edge: 'w',
        key: 'ArrowRight',
        direction: 'rtl',
      }),
    ).toMatchObject({ column: 1, columnSpan: 4, resizeEdge: 'e' });
  });

  it('operates a native resize button through one shared keyboard transaction', async () => {
    let current: DashboardGridResolvedItem = {
      id: 'item',
      column: 2,
      row: 2,
      columnSpan: 3,
      rowSpan: 3,
      movable: true,
      resizable: true,
      locked: false,
    };
    const beginInteraction = jest.fn();
    const move = jest.fn((_id: string, proposal: DashboardGridMoveProposal) => {
      current = {
        ...current,
        column: proposal.column ?? current.column,
        row: proposal.row ?? current.row,
        columnSpan: proposal.columnSpan ?? current.columnSpan,
        rowSpan: proposal.rowSpan ?? current.rowSpan,
      };
      return { status: 'accepted' as const, item: current, affected: [] };
    });
    const commitInteraction = jest.fn();
    const cancelInteraction = jest.fn();
    const intents: DashboardGridInteractionIntent[] = [];
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 8, float: false, items: [current] }),
      getItem: () => current,
      beginInteraction,
      move,
      rotate: () => ({ status: 'unchanged', item: current }),
      commitInteraction,
      cancelInteraction,
    };
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      eventQueue: { enqueue: intent => intents.push(intent) },
    });
    const grid = document.createElement('div');
    const item = document.createElement('div');
    const westHandle = document.createElement('button');
    item.appendChild(westHandle);
    grid.appendChild(item);
    document.body.appendChild(grid);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'grid',
      element: item,
      resizeHandles: { w: westHandle },
      movable: true,
      resizable: true,
      locked: false,
      resizeDirections: ['w'],
    });
    const onResizeHandleActiveChange = jest.fn();
    const keyboard = createDashboardGridKeyboardInteraction({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      onResizeHandleActiveChange,
    });
    item.addEventListener('keydown', keyboard.onKeyDown);

    westHandle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(westHandle.getAttribute('aria-pressed')).toBe('true');
    expect(westHandle.getAttribute('aria-keyshortcuts')).toContain('ArrowLeft');
    westHandle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    westHandle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await Promise.resolve();

    expect(beginInteraction).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledWith(
      'item',
      expect.objectContaining({
        input: 'keyboard',
        resizing: true,
        resizeEdge: 'w',
        column: 1,
        columnSpan: 4,
      }),
    );
    expect(commitInteraction).toHaveBeenCalledTimes(1);
    expect(cancelInteraction).not.toHaveBeenCalled();
    expect(onResizeHandleActiveChange.mock.calls).toEqual([['w'], [undefined]]);
    expect(westHandle.getAttribute('aria-pressed')).toBe('false');
    expect(westHandle.getAttribute('aria-keyshortcuts')).toBe('Enter Space F2');
    expect(intents.map(intent => [intent.type, intent.operation, intent.input])).toEqual([
      ['start', 'resize', 'keyboard'],
      ['update', 'resize', 'keyboard'],
      ['stop', 'resize', 'keyboard'],
    ]);
  });

  it('keeps descendant activation native and uses one transaction for Arrange mode', () => {
    let current: DashboardGridResolvedItem = {
      id: 'item',
      column: 0,
      row: 0,
      columnSpan: 1,
      rowSpan: 1,
      movable: true,
      resizable: true,
      locked: false,
    };
    const proposals: DashboardGridMoveProposal[] = [];
    const beginInteraction = jest.fn();
    const cancelInteraction = jest.fn();
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [current] }),
      getItem: () => current,
      beginInteraction,
      move: (_id, proposal) => {
        proposals.push(proposal);
        current = {
          ...current,
          column: proposal.column ?? current.column,
          row: proposal.row ?? current.row,
          columnSpan: proposal.columnSpan ?? current.columnSpan,
          rowSpan: proposal.rowSpan ?? current.rowSpan,
        };
        return { status: 'accepted', item: current, affected: [] };
      },
      rotate: () => ({ status: 'unchanged', item: current }),
      commitInteraction: jest.fn(),
      cancelInteraction,
    };
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const item = document.createElement('div');
    const descendantButton = document.createElement('button');
    item.appendChild(descendantButton);
    grid.appendChild(item);
    document.body.appendChild(grid);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'grid',
      element: item,
      movable: true,
      resizable: true,
      locked: false,
    });
    const onArrangeChange = jest.fn();
    const keyboard = createDashboardGridKeyboardInteraction({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      onArrangeChange,
    });
    item.addEventListener('keydown', keyboard.onKeyDown);

    descendantButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    expect(beginInteraction).not.toHaveBeenCalled();

    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    item.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true, bubbles: true, cancelable: true }),
    );
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

    expect(beginInteraction).toHaveBeenCalledTimes(1);
    expect(proposals[0]).toMatchObject({ input: 'keyboard', column: 1, row: 0 });
    expect(proposals[1]).toMatchObject({ input: 'keyboard', resizing: true, rowSpan: 2, resizeEdge: 's' });
    expect(cancelInteraction).toHaveBeenCalledTimes(1);
    expect(onArrangeChange).toHaveBeenNthCalledWith(1, true);
    expect(onArrangeChange).toHaveBeenLastCalledWith(false);
  });

  it('mirrors horizontal keyboard movement in RTL', () => {
    const current: DashboardGridResolvedItem = {
      id: 'item',
      column: 1,
      row: 0,
      columnSpan: 1,
      rowSpan: 1,
      movable: true,
      resizable: true,
      locked: false,
    };
    const move = jest.fn(() => ({ status: 'unchanged' as const, item: current }));
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [current] }),
      getItem: () => current,
      beginInteraction: jest.fn(),
      move,
      rotate: () => ({ status: 'unchanged', item: current }),
      commitInteraction: jest.fn(),
      cancelInteraction: jest.fn(),
    };
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const item = document.createElement('div');
    grid.appendChild(item);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'rtl',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'grid',
      element: item,
      movable: true,
      resizable: true,
      locked: false,
    });
    const keyboard = createDashboardGridKeyboardInteraction({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      direction: 'rtl',
    });
    item.addEventListener('keydown', keyboard.onKeyDown);

    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2', bubbles: true, cancelable: true }));
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));

    expect(move).toHaveBeenCalledWith('item', expect.objectContaining({ column: 2 }));
  });

  it('allows a locked item to enter Arrange mode and move by keyboard', () => {
    const current: DashboardGridResolvedItem = {
      id: 'item',
      column: 0,
      row: 0,
      columnSpan: 1,
      rowSpan: 1,
      movable: true,
      resizable: true,
      locked: true,
    };
    const move = jest.fn(() => ({ status: 'unchanged' as const, item: current }));
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [current] }),
      getItem: () => current,
      beginInteraction: jest.fn(),
      move,
      rotate: () => ({ status: 'unchanged', item: current }),
      commitInteraction: jest.fn(),
      cancelInteraction: jest.fn(),
    };
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    grid.appendChild(itemElement);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'grid',
      element: itemElement,
      movable: true,
      resizable: true,
      locked: true,
    });
    const keyboard = createDashboardGridKeyboardInteraction({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement,
    });
    itemElement.addEventListener('keydown', keyboard.onKeyDown);

    itemElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2', bubbles: true, cancelable: true }));
    itemElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));

    expect(move).toHaveBeenCalledWith('item', expect.objectContaining({ input: 'keyboard', column: 1 }));
  });
});
