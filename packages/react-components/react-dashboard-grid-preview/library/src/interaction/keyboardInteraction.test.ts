import { createDashboardGridInteractionCoordinator } from './coordinator';
import { createDashboardGridKeyboardInteraction } from './keyboardInteraction';
import type {
  DashboardGridInteractionStore,
  DashboardGridMoveProposal,
  DashboardGridResolvedItem,
} from './types';

describe('dashboard grid keyboard interaction', () => {
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
});
