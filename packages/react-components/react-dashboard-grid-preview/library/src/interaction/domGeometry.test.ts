import {
  createDashboardGridDomGeometrySession,
  dashboardGridPixelRectToRawRect,
  getDashboardGridDirectionalBias,
  mirrorDashboardGridResizeEdge,
} from './domGeometry';

const domRect = (left: number, top: number, width: number, height: number): DOMRect =>
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

describe('dashboard grid DOM geometry', () => {
  it('caches independent transformed scales until invalidated', () => {
    const root = document.createElement('div');
    Object.defineProperties(root, {
      offsetWidth: { configurable: true, value: 100 },
      offsetHeight: { configurable: true, value: 50 },
    });
    const getBoundingClientRect = jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(domRect(20, 30, 200, 150));
    const geometry = createDashboardGridDomGeometrySession({
      targetDocument: document,
      rootElement: root,
      direction: 'ltr',
    });

    expect(geometry.clientToLocal({ clientX: 40, clientY: 60 })).toEqual({ clientX: 10, clientY: 10 });
    expect(geometry.clientDeltaToLocal({ clientX: 20, clientY: 30 })).toEqual({ clientX: 10, clientY: 10 });
    expect(getBoundingClientRect).toHaveBeenCalledTimes(1);

    geometry.invalidate();
    geometry.clientToLocal({ clientX: 40, clientY: 60 });
    expect(getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('converts RTL rectangles from a right-side logical origin', () => {
    const root = document.createElement('div');
    Object.defineProperties(root, {
      offsetWidth: { configurable: true, value: 100 },
      offsetHeight: { configurable: true, value: 100 },
    });
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(domRect(10, 20, 200, 200));
    const geometry = createDashboardGridDomGeometrySession({
      targetDocument: document,
      rootElement: root,
      direction: 'rtl',
    });

    const clientRect = geometry.localRectToClientRect({ x: 10, y: 5, width: 20, height: 10 });
    expect(clientRect).toEqual({ x: 150, y: 30, width: 40, height: 20 });
    expect(geometry.clientRectToLocalRect(clientRect)).toEqual({ x: 10, y: 5, width: 20, height: 10 });
    expect(geometry.clientToLocal({ clientX: 30, clientY: 40 })).toEqual({ clientX: 90, clientY: 10 });
  });

  it('caps direction-sensitive gap bias at ten percent of a cell', () => {
    const metrics = {
      columnWidth: 100,
      rowHeight: 50,
      gapTop: 20,
      gapRight: 40,
      gapBottom: 30,
      gapLeft: 25,
    };

    expect(getDashboardGridDirectionalBias(metrics, { x: 1, y: -1 })).toEqual({ x: 10, y: -5 });
    expect(dashboardGridPixelRectToRawRect({ x: 115, y: 55, width: 175, height: 85 }, metrics, { x: 1, y: 1 })).toEqual(
      { column: 1, row: 1, columnSpan: 2, rowSpan: 3 },
    );
  });

  it('mirrors logical horizontal resize edges in RTL', () => {
    expect(mirrorDashboardGridResizeEdge('e', 'rtl')).toBe('w');
    expect(mirrorDashboardGridResizeEdge('nw', 'rtl')).toBe('ne');
    expect(mirrorDashboardGridResizeEdge('s', 'rtl')).toBe('s');
  });
});
