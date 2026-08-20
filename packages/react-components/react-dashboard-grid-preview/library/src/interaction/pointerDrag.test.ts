import { createDashboardGridInteractionCoordinator } from './coordinator';
import { createDashboardGridDomGeometrySession } from './domGeometry';
import {
  createDashboardGridPointerDrag,
  DASHBOARD_GRID_DRAG_THRESHOLD,
  DASHBOARD_GRID_TOUCH_LEAVE_DELAY,
} from './pointerDrag';
import type { DashboardGridInteractionStore, DashboardGridResolvedItem } from './types';

const pointerEvent = (
  type: string,
  init: { x: number; y: number; pointerId?: number; pointerType?: string; isPrimary?: boolean },
): PointerEvent => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: init.x,
    clientY: init.y,
    button: 0,
  });
  Object.defineProperties(event, {
    pointerId: { value: init.pointerId ?? 1 },
    pointerType: { value: init.pointerType ?? 'mouse' },
    isPrimary: { value: init.isPrimary ?? true },
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

describe('dashboard grid pointer drag', () => {
  it('keeps the source-backed drag and touch-leave thresholds', () => {
    expect(DASHBOARD_GRID_DRAG_THRESHOLD).toBe(3);
    expect(DASHBOARD_GRID_TOUCH_LEAVE_DELAY).toBe(10);
  });

  it('starts only after Manhattan movement is strictly greater than three', async () => {
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
    const focused = document.createElement('button');
    document.body.append(focused, grid);
    grid.appendChild(item);
    focused.focus();
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
      movable: true,
      resizable: true,
      locked: false,
    });
    const controller = createDashboardGridPointerDrag({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      geometry: createDashboardGridDomGeometrySession({
        targetDocument: document,
        rootElement: grid,
        direction: 'ltr',
      }),
    });
    item.addEventListener('pointerdown', controller.onPointerDown);
    const onClick = jest.fn();
    item.addEventListener('click', onClick);

    item.dispatchEvent(pointerEvent('pointerdown', { x: 0, y: 0 }));
    document.dispatchEvent(pointerEvent('pointermove', { x: 3, y: 0 }));
    frames.shift()?.(0);
    expect(beginInteraction).not.toHaveBeenCalled();

    document.dispatchEvent(pointerEvent('pointermove', { x: 4, y: 0 }));
    frames.shift()?.(0);
    expect(beginInteraction).toHaveBeenCalledTimes(1);
    expect(move).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(focused);

    controller.destroy();
    await Promise.resolve();
    document.dispatchEvent(pointerEvent('pointerup', { x: 4, y: 0 }));
    await Promise.resolve();
    expect(commitInteraction).toHaveBeenCalledTimes(1);
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    item.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    controller.destroy();
  });

  it('ignores non-primary touch pointers', () => {
    const coordinator = createDashboardGridInteractionCoordinator({ targetDocument: document });
    const grid = document.createElement('div');
    const item = document.createElement('div');
    const store: DashboardGridInteractionStore = {
      getSnapshot: () => ({ revision: 0, columns: 1, float: false, items: [] }),
      getItem: () => undefined,
      beginInteraction: jest.fn(),
      move: jest.fn(),
      rotate: jest.fn(),
      commitInteraction: jest.fn(),
      cancelInteraction: jest.fn(),
    };
    coordinator.registerGrid({
      id: 'grid',
      element: grid,
      direction: 'ltr',
      store,
      getMetrics: () => ({
        columnWidth: 1,
        rowHeight: 1,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      }),
    });
    const controller = createDashboardGridPointerDrag({
      targetDocument: document,
      coordinator,
      gridId: 'grid',
      itemId: 'item',
      itemElement: item,
      geometry: createDashboardGridDomGeometrySession({
        targetDocument: document,
        rootElement: grid,
        direction: 'ltr',
      }),
    });

    controller.onPointerDown(pointerEvent('pointerdown', { x: 0, y: 0, pointerType: 'touch', isPrimary: false }));
    expect(coordinator.getSession()).toBeNull();
    controller.destroy();
  });
});
