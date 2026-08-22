import { createDashboardGridInteractionCoordinator } from './coordinator';
import type {
  DashboardGridInteractionIntent,
  DashboardGridInteractionPreview,
  DashboardGridInteractionStore,
  DashboardGridMoveProposal,
  DashboardGridResolvedItem,
  DashboardGridTransferIntent,
} from './types';

const item: DashboardGridResolvedItem = {
  id: 'item',
  column: 0,
  row: 0,
  columnSpan: 1,
  rowSpan: 1,
  movable: true,
  resizable: true,
  locked: false,
};

const createStore = (order: string[]): DashboardGridInteractionStore => ({
  getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [item] }),
  getItem: id => (id === item.id ? item : undefined),
  beginInteraction: () => {
    order.push('begin');
  },
  move: (_id: string, proposal: DashboardGridMoveProposal) => {
    order.push('move');
    return {
      status: 'accepted',
      item: {
        ...item,
        column: proposal.column ?? item.column,
        row: proposal.row ?? item.row,
      },
      affected: [],
    };
  },
  rotate: () => ({ status: 'unchanged', item }),
  commitInteraction: () => {
    order.push('commit');
  },
  cancelInteraction: () => {
    order.push('rollback');
  },
});

describe('dashboard grid interaction coordinator', () => {
  it('allows locked items to begin pointer drag, pointer resize, and keyboard interactions', () => {
    const lockedItem = { ...item, locked: true };
    const store: DashboardGridInteractionStore = {
      ...createStore([]),
      getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [lockedItem] }),
      getItem: () => lockedItem,
    };
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    const resizeHandle = document.createElement('button');
    itemElement.appendChild(resizeHandle);
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
      resizeHandles: { e: resizeHandle },
      movable: true,
      resizable: true,
      locked: true,
      resizeDirections: ['e'],
    });
    const pointer = { pointerId: 1, pointerType: 'mouse' as const, isPrimary: true, button: 0 };
    const pointerRequest = {
      pointer,
      timeStamp: 1,
      point: { clientX: 0, clientY: 0 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    };

    expect(coordinator.beginPointer({ ...pointerRequest, operation: 'drag' })).not.toBeNull();
    coordinator.cancel();
    expect(
      coordinator.beginPointer({
        ...pointerRequest,
        timeStamp: 2,
        operation: 'resize',
        resizeEdge: 'e',
        ownerElement: resizeHandle,
      }),
    ).not.toBeNull();
    coordinator.cancel();
    expect(
      coordinator.beginKeyboard({
        gridId: 'grid',
        itemId: 'item',
      }),
    ).not.toBeNull();
    coordinator.cancel();
  });

  it('passes the configured nesting dwell into the public pointer session', () => {
    const beginInteraction = jest.fn();
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    grid.appendChild(itemElement);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store: { ...createStore([]), beginInteraction },
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
      nestingDwell: 250,
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'grid',
      element: itemElement,
      movable: true,
      resizable: true,
      locked: false,
    });

    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 1,
      point: { clientX: 0, clientY: 0 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({
      pixelRect: { x: 0, y: 0, width: 100, height: 100 },
    });

    expect(beginInteraction).toHaveBeenCalledWith(
      'item',
      expect.objectContaining({
        allowNesting: true,
        nestingDwell: 250,
      }),
    );
    coordinator.cancel();
  });

  it('orders start before mutation and stop after commit', async () => {
    const order: string[] = [];
    const intents: DashboardGridInteractionIntent[] = [];
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      eventQueue: {
        enqueue: intent => {
          intents.push(intent);
          order.push(intent.type);
        },
      },
    });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    jest.spyOn(grid, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 400,
      bottom: 400,
      width: 400,
      height: 400,
      toJSON: () => ({}),
    } as DOMRect);
    grid.appendChild(itemElement);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store: createStore(order),
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
      locked: false,
    });

    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 1,
      point: { clientX: 0, clientY: 0 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 100, clientY: 0 },
      pixelRect: { x: 100, y: 0, width: 100, height: 100 },
      proposal: { input: 'pointer', column: 1, row: 0 },
    });
    await coordinator.commit();

    expect(order.indexOf('start')).toBeLessThan(order.indexOf('begin'));
    expect(order.indexOf('commit')).toBeLessThan(order.indexOf('stop'));
    expect(intents.map(intent => intent.type)).toEqual(['start', 'update', 'stop']);
    expect(intents[0]).toMatchObject({ kind: 'drag', input: 'pointer' });
  });

  it('publishes current and origin pixel geometry for every deferred pointer move', () => {
    const previews: DashboardGridInteractionPreview[] = [];
    const move = jest.fn(() => ({
      status: 'deferred' as const,
      reason: 'coverage-threshold' as const,
    }));
    const store: DashboardGridInteractionStore = {
      ...createStore([]),
      move,
      publishPreview: preview => previews.push(preview),
    };
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    jest.spyOn(grid, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 400,
      bottom: 400,
      width: 400,
      height: 400,
      toJSON: () => ({}),
    } as DOMRect);
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
      locked: false,
    });
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 1,
      point: { clientX: 10, clientY: 20 },
      originPixelRect: { x: 10, y: 20, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 10, y: 20, width: 100, height: 100 } });
    previews.length = 0;

    coordinator.updatePointer({
      point: { clientX: 25, clientY: 28 },
      pixelRect: { x: 25, y: 28, width: 100, height: 100 },
      proposal: { input: 'pointer', column: 0, row: 0 },
    });
    coordinator.updatePointer({
      point: { clientX: 47, clientY: 35 },
      pixelRect: { x: 47, y: 35, width: 100, height: 100 },
      proposal: { input: 'pointer', column: 0, row: 0 },
    });

    expect(move).toHaveBeenCalledTimes(2);
    expect(previews).toHaveLength(2);
    expect(previews.map(preview => preview.pixelRect)).toEqual([
      { x: 25, y: 28, width: 100, height: 100 },
      { x: 47, y: 35, width: 100, height: 100 },
    ]);
    expect(previews.every(preview => preview.originPixelRect?.x === 10 && preview.originPixelRect.y === 20)).toBe(
      true,
    );
    expect(previews.every(preview => preview.rect?.column === 0 && preview.originRect?.column === 0)).toBe(true);

    coordinator.cancel();
  });

  it('prevents an ancestor from claiming the same timestamp after a nested item', () => {
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    grid.appendChild(parent);
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store: createStore([]),
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
      element: child,
      movable: true,
      resizable: true,
      locked: false,
    });

    expect(
      coordinator.beginPointer({
        operation: 'drag',
        pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
        timeStamp: 10,
        point: { clientX: 0, clientY: 0 },
        originPixelRect: { x: 0, y: 0, width: 1, height: 1 },
        sourceGridId: 'grid',
        itemId: 'item',
        ownerElement: child,
      }),
    ).not.toBeNull();
    coordinator.cancel();

    expect(
      coordinator.beginPointer({
        operation: 'drag',
        pointer: { pointerId: 2, pointerType: 'mouse', isPrimary: true, button: 0 },
        timeStamp: 10,
        point: { clientX: 0, clientY: 0 },
        originPixelRect: { x: 0, y: 0, width: 1, height: 1 },
        sourceGridId: 'grid',
        itemId: 'item',
        ownerElement: parent,
      }),
    ).toBeNull();
  });

  it('falls back from a rejected nested target to its eligible parent', () => {
    const preflightTransfer = jest.fn((intent: DashboardGridTransferIntent) =>
      intent.targetGridId === 'child'
        ? { status: 'rejected' as const, reason: 'target-full' as const }
        : { status: 'accepted' as const, targetGridId: intent.targetGridId, rect: intent.rect },
    );
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      provider: { preflightTransfer },
    });
    const parent = document.createElement('div');
    const child = document.createElement('div');
    const source = document.createElement('div');
    parent.appendChild(child);
    document.body.append(parent, source);
    Object.defineProperties(parent, {
      offsetWidth: { configurable: true, value: 400 },
      offsetHeight: { configurable: true, value: 400 },
    });
    Object.defineProperties(child, {
      offsetWidth: { configurable: true, value: 200 },
      offsetHeight: { configurable: true, value: 200 },
    });
    jest.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 400,
      bottom: 400,
      width: 400,
      height: 400,
      toJSON: () => ({}),
    } as DOMRect);
    jest.spyOn(child, 'getBoundingClientRect').mockReturnValue({
      x: 50,
      y: 50,
      left: 50,
      top: 50,
      right: 250,
      bottom: 250,
      width: 200,
      height: 200,
      toJSON: () => ({}),
    } as DOMRect);
    const metrics = {
      columnWidth: 100,
      rowHeight: 100,
      gapTop: 0,
      gapRight: 0,
      gapBottom: 0,
      gapLeft: 0,
    };
    coordinator.registerGrid({
      id: 'parent',
      element: parent,
      direction: 'ltr',
      store: createStore([]),
      getMetrics: () => metrics,
    });
    coordinator.registerGrid({
      id: 'child',
      element: child,
      parentGridId: 'parent',
      direction: 'ltr',
      store: createStore([]),
      getMetrics: () => metrics,
    });
    coordinator.registerDragSource({
      id: 'source',
      element: source,
      descriptor: { id: 'external', columnSpan: 1, rowSpan: 1 },
    });
    coordinator.beginPointer({
      operation: 'external',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 20,
      point: { clientX: 60, clientY: 60 },
      originPixelRect: { x: 10, y: 10, width: 100, height: 100 },
      sourceId: 'source',
      ownerElement: source,
    });
    coordinator.activatePointer({ pixelRect: { x: 10, y: 10, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 60, clientY: 60 },
      pixelRect: { x: 10, y: 10, width: 100, height: 100 },
      clientPixelRect: { x: 10, y: 10, width: 100, height: 100 },
    });

    expect(preflightTransfer).toHaveBeenNthCalledWith(1, expect.objectContaining({ targetGridId: 'child' }));
    expect(preflightTransfer).toHaveBeenNthCalledWith(2, expect.objectContaining({ targetGridId: 'parent' }));
    expect(coordinator.getSession()?.targetGridId).toBe('parent');
  });

  it('keeps an active session through same-turn StrictMode re-registration', async () => {
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    const registration = {
      id: 'item',
      gridId: 'grid',
      element: itemElement,
      movable: true,
      resizable: true,
      locked: false,
    };
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store: createStore([]),
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    const unregister = coordinator.registerItem(registration);
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 30,
      point: { clientX: 0, clientY: 0 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });

    unregister();
    coordinator.registerItem(registration);
    await Promise.resolve();

    expect(coordinator.getSession()).not.toBeNull();
  });

  it('waits for provider commit completion before emitting cross-grid stop', async () => {
    const order: string[] = [];
    const finalize = jest.fn(() => {
      order.push('source-layout', 'target-layout');
    });
    let resolveTransfer:
      | ((result: {
          status: 'accepted';
          targetGridId: string;
          finalize: () => void;
        }) => void)
      | undefined;
    const transfer = jest.fn(
      () =>
        new Promise<{
          status: 'accepted';
          targetGridId: string;
          finalize: () => void;
        }>(resolve => {
          resolveTransfer = resolve;
        }),
    );
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      provider: {
        preflightTransfer: intent => ({
          status: 'accepted',
          targetGridId: intent.targetGridId,
          rect: intent.rect,
        }),
        transfer,
      },
      eventQueue: {
        enqueue: intent => {
          if (intent.type === 'stop') {
            order.push('stop');
          }
        },
      },
    });
    const sourceGrid = document.createElement('div');
    const targetGrid = document.createElement('div');
    const itemElement = document.createElement('div');
    sourceGrid.appendChild(itemElement);
    jest.spyOn(sourceGrid, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect);
    jest.spyOn(targetGrid, 'getBoundingClientRect').mockReturnValue({
      x: 200,
      y: 0,
      left: 200,
      top: 0,
      right: 400,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON: () => ({}),
    } as DOMRect);
    const metrics = {
      columnWidth: 100,
      rowHeight: 100,
      gapTop: 0,
      gapRight: 0,
      gapBottom: 0,
      gapLeft: 0,
    };
    coordinator.registerGrid({
      id: 'source',
      element: sourceGrid,
      direction: 'ltr',
      store: createStore(order),
      getMetrics: () => metrics,
    });
    coordinator.registerGrid({
      id: 'target',
      element: targetGrid,
      direction: 'ltr',
      store: createStore(order),
      getMetrics: () => metrics,
    });
    coordinator.registerItem({
      id: 'item',
      gridId: 'source',
      element: itemElement,
      movable: true,
      resizable: true,
      locked: false,
    });
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 40,
      point: { clientX: 10, clientY: 10 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'source',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 250, clientY: 50 },
      pixelRect: { x: 250, y: 50, width: 100, height: 100 },
      clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
    });

    const commit = coordinator.commit();
    await Promise.resolve();
    expect(transfer).toHaveBeenCalledTimes(1);
    expect(order).not.toContain('stop');

    order.push('provider-commit');
    resolveTransfer?.({
      status: 'accepted',
      targetGridId: 'target',
      finalize,
    });
    await commit;

    expect(finalize).toHaveBeenCalledTimes(1);
    expect(order.slice(-4)).toEqual([
      'provider-commit',
      'stop',
      'source-layout',
      'target-layout',
    ]);
  });

  it('does not emit stop after a rejected external drop', async () => {
    const intents: DashboardGridInteractionIntent[] = [];
    const transfer = jest.fn(() => ({
      status: 'rejected' as const,
      reason: 'target-full' as const,
    }));
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      provider: {
        preflightTransfer: intent => ({
          status: 'accepted',
          targetGridId: intent.targetGridId,
          rect: intent.rect,
        }),
        transfer,
      },
      eventQueue: { enqueue: intent => intents.push(intent) },
    });
    const source = document.createElement('div');
    const target = document.createElement('div');
    jest.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      x: 200,
      y: 0,
      left: 200,
      top: 0,
      right: 400,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON: () => ({}),
    } as DOMRect);
    coordinator.registerDragSource({
      id: 'external',
      element: source,
      descriptor: { id: 'new-item' },
    });
    coordinator.registerGrid({
      id: 'target',
      element: target,
      direction: 'ltr',
      store: createStore([]),
      getMetrics: () => ({
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    coordinator.beginPointer({
      operation: 'external',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 50,
      point: { clientX: 10, clientY: 10 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceId: 'external',
      ownerElement: source,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 250, clientY: 50 },
      pixelRect: { x: 250, y: 50, width: 100, height: 100 },
      clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
    });

    await expect(coordinator.commit()).resolves.toEqual({
      status: 'rejected',
      reason: 'target-full',
    });
    expect(transfer).toHaveBeenCalledTimes(1);
    expect(intents.some(intent => intent.type === 'rejected')).toBe(true);
    expect(intents.some(intent => intent.type === 'cancel')).toBe(true);
    expect(intents.some(intent => intent.type === 'stop')).toBe(false);
  });

  it('emits cancellation without stop for an active uncommitted drag', () => {
    const intents: DashboardGridInteractionIntent[] = [];
    const store = createStore([]);
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      eventQueue: { enqueue: intent => intents.push(intent) },
    });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
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
      locked: false,
    });
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 60,
      point: { clientX: 0, clientY: 0 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.cancel();

    expect(intents.some(intent => intent.type === 'cancel')).toBe(true);
    expect(intents.some(intent => intent.type === 'stop')).toBe(false);
  });

  it('closes the source interaction exactly once before provider removal', async () => {
    const order: string[] = [];
    const store = createStore(order);
    const remove = jest.fn(() => {
      order.push('provider-remove');
      return {
        status: 'accepted' as const,
        finalize: () => {
          order.push('source-layout');
        },
      };
    });
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      provider: { remove },
      eventQueue: {
        enqueue: intent => {
          if (intent.type === 'stop') {
            order.push('stop');
          }
        },
      },
    });
    const grid = document.createElement('div');
    const itemElement = document.createElement('div');
    const removeZone = document.createElement('div');
    jest.spyOn(grid, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect);
    jest.spyOn(removeZone, 'getBoundingClientRect').mockReturnValue({
      x: 200,
      y: 0,
      left: 200,
      top: 0,
      right: 300,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect);
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
      locked: false,
    });
    coordinator.registerDropZone({
      id: 'remove',
      element: removeZone,
      kind: 'remove',
    });
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 70,
      point: { clientX: 10, clientY: 10 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'grid',
      itemId: 'item',
      ownerElement: itemElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 250, clientY: 50 },
      pixelRect: { x: 250, y: 50, width: 100, height: 100 },
      clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
    });

    await expect(coordinator.commit()).resolves.toMatchObject({ status: 'accepted' });
    expect(remove).toHaveBeenCalledTimes(1);
    expect(order.filter(entry => entry === 'rollback')).toHaveLength(1);
    expect(order.slice(-4)).toEqual([
      'rollback',
      'provider-remove',
      'stop',
      'source-layout',
    ]);
  });
});
