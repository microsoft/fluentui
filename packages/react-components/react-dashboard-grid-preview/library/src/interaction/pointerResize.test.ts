import { createDashboardGridInteractionCoordinator } from './coordinator';
import { createDashboardGridDomGeometrySession } from './domGeometry';
import { createDashboardGridPointerResize } from './pointerResize';
import type { DashboardGridInteractionStore, DashboardGridResolvedItem } from './types';

const pointerEvent = (type: string, x: number, y: number): PointerEvent => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
    button: 0,
  });
  Object.defineProperties(event, {
    pointerId: { value: 1 },
    pointerType: { value: 'mouse' },
    isPrimary: { value: true },
  });
  return event as PointerEvent;
};

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
  }) as DOMRect;

describe('dashboard grid pointer resize', () => {
  it('starts only after movement is strictly greater than two and submits the resolved edge', async () => {
    const targetWindow = document.defaultView!;
    const frames: FrameRequestCallback[] = [];
    jest.spyOn(targetWindow, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);
      return frames.length;
    });
    jest.spyOn(targetWindow, 'cancelAnimationFrame').mockImplementation(() => undefined);

    const resolved: DashboardGridResolvedItem = {
      id: 'item',
      column: 0,
      row: 0,
      columnSpan: 1,
      rowSpan: 1,
      movable: true,
      resizable: true,
      locked: false,
    };
    const beginInteraction = jest.fn();
    const move = jest.fn(() => ({ status: 'unchanged' as const, item: resolved }));
    const commitInteraction = jest.fn();
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 4, float: false, items: [resolved] }),
      getItem: () => resolved,
      beginInteraction,
      move,
      rotate: () => ({ status: 'unchanged', item: resolved }),
      commitInteraction,
      cancelInteraction: jest.fn(),
    };
    const grid = document.createElement('div');
    const item = document.createElement('div');
    const handle = document.createElement('button');
    item.appendChild(handle);
    grid.appendChild(item);
    document.body.appendChild(grid);
    Object.defineProperties(grid, {
      offsetWidth: { configurable: true, value: 400 },
      offsetHeight: { configurable: true, value: 400 },
    });
    jest.spyOn(grid, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 400, 400));
    jest.spyOn(item, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 100, 100));

    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
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
      resizeHandles: { w: handle },
      movable: true,
      resizable: true,
      locked: false,
      resizeDirections: ['w'],
    });
    const controller = createDashboardGridPointerResize({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      handleElement: handle,
      edge: 'w',
      geometry: createDashboardGridDomGeometrySession({
        targetDocument: document,
        rootElement: grid,
        direction: 'ltr',
      }),
    });
    handle.addEventListener('pointerdown', controller.onPointerDown);

    handle.dispatchEvent(pointerEvent('pointerdown', 0, 0));
    document.dispatchEvent(pointerEvent('pointermove', 2, 0));
    frames.shift()?.(0);
    expect(beginInteraction).not.toHaveBeenCalled();

    document.dispatchEvent(pointerEvent('pointermove', 3, 0));
    frames.shift()?.(0);
    expect(beginInteraction).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledWith(
      'item',
      expect.objectContaining({
        input: 'pointer',
        resizing: true,
        resizeEdge: 'w',
        pixelRect: expect.objectContaining({ x: 3, width: 97 }),
      }),
    );

    document.dispatchEvent(pointerEvent('pointerup', 3, 0));
    await Promise.resolve();
    expect(commitInteraction).toHaveBeenCalledTimes(1);
    document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    controller.destroy();
  });
});
