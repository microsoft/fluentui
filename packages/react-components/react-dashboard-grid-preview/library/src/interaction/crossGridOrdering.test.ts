import { createDashboardGridRegistry } from '../provider/createDashboardGridRegistry';
import { createDashboardGridStore } from '../state/createDashboardGridStore';
import { createDashboardGridInteractionCoordinator } from './coordinator';

const rect = (left: number, top: number, width: number, height: number): DOMRect =>
  ({
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect);

describe('dashboard grid cross-grid event ordering', () => {
  it('dispatches stop after commit and before source and target layouts', async () => {
    const order: string[] = [];
    const sourceStore = createDashboardGridStore({
      id: 'source',
      columns: 4,
      defaultItems: [{ id: 'moving', column: 0, row: 0 }],
      callbacks: {
        onLayoutChange: () => order.push('source-layout'),
      },
    });
    const targetStore = createDashboardGridStore({
      id: 'target',
      columns: 4,
      callbacks: {
        onLayoutChange: () => order.push('target-layout'),
        onIntent: intent => {
          if (intent.type === 'stop') {
            order.push('stop');
          }
        },
      },
    });
    const registry = createDashboardGridRegistry();
    const sourceRoot = document.createElement('div');
    const targetRoot = document.createElement('div');
    const movingElement = document.createElement('div');
    sourceRoot.appendChild(movingElement);
    document.body.append(sourceRoot, targetRoot);
    jest.spyOn(sourceRoot, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));
    jest.spyOn(targetRoot, 'getBoundingClientRect').mockReturnValue(rect(200, 0, 200, 200));
    registry.registerGrid({
      id: 'source',
      store: sourceStore,
      targetDocument: document,
      rootElement: sourceRoot,
      surfaceElement: sourceRoot,
      direction: 'ltr',
      label: 'Source',
    });
    registry.registerGrid({
      id: 'target',
      store: targetStore,
      targetDocument: document,
      rootElement: targetRoot,
      surfaceElement: targetRoot,
      direction: 'ltr',
      label: 'Target',
    });
    registry.registerItem({ id: 'moving', gridId: 'source', content: 'Moving' });
    const coordinator = createDashboardGridInteractionCoordinator({
      targetDocument: document,
      provider: registry,
      eventQueue: {
        enqueue: intent => {
          const gridId = intent.targetGridId ?? intent.sourceGridId;
          if (gridId) {
            registry.getGrid(gridId)?.store.events.enqueue(intent);
          }
        },
      },
    });
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
      element: sourceRoot,
      direction: 'ltr',
      store: sourceStore,
      getMetrics: () => metrics,
    });
    coordinator.registerGrid({
      id: 'target',
      element: targetRoot,
      direction: 'ltr',
      store: targetStore,
      getMetrics: () => metrics,
    });
    coordinator.registerItem({
      id: 'moving',
      gridId: 'source',
      element: movingElement,
      movable: true,
      resizable: true,
      locked: false,
    });
    coordinator.beginPointer({
      operation: 'drag',
      pointer: { pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0 },
      timeStamp: 1,
      point: { clientX: 10, clientY: 10 },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      sourceGridId: 'source',
      itemId: 'moving',
      ownerElement: movingElement,
    });
    coordinator.activatePointer({ pixelRect: { x: 0, y: 0, width: 100, height: 100 } });
    coordinator.updatePointer({
      point: { clientX: 250, clientY: 50 },
      pixelRect: { x: 250, y: 50, width: 100, height: 100 },
      clientPixelRect: { x: 250, y: 50, width: 100, height: 100 },
    });

    await coordinator.commit();
    await Promise.resolve();
    sourceStore.events.flush();
    targetStore.events.flush();

    expect(sourceStore.getItem('moving')).toBeUndefined();
    expect(targetStore.getItem('moving')).toBeDefined();
    expect(order).toEqual(['stop', 'source-layout', 'target-layout']);

    coordinator.destroy();
    registry.dispose();
    sourceStore.dispose();
    targetStore.dispose();
  });
});
