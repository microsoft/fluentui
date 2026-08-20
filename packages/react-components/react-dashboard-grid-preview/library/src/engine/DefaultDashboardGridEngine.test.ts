import { createDashboardGridEngine } from './DefaultDashboardGridEngine';

const overlaps = (
  first: {
    column: number;
    row: number;
    columnSpan: number;
    rowSpan: number;
  },
  second: {
    column: number;
    row: number;
    columnSpan: number;
    rowSpan: number;
  },
): boolean =>
  !(
    first.row >= second.row + second.rowSpan ||
    first.row + first.rowSpan <= second.row ||
    first.column + first.columnSpan <= second.column ||
    first.column >= second.column + second.columnSpan
  );

describe('DefaultDashboardGridEngine', () => {
  it('keeps immutable snapshots referentially stable until revision changes', () => {
    const engine = createDashboardGridEngine({ items: [{ id: 'item' }] });
    const initial = engine.getSnapshot();
    const listener = jest.fn();
    engine.subscribe(listener);

    expect(engine.getSnapshot()).toBe(initial);
    expect(engine.update('item', {}).status).toBe('unchanged');
    expect(engine.getSnapshot()).toBe(initial);
    expect(listener).not.toHaveBeenCalled();

    engine.update('item', { columnSpan: 2 });
    expect(engine.getSnapshot()).not.toBe(initial);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(Object.isFrozen(engine.getSnapshot().items[0])).toBe(true);
  });

  it('atomically rejects capacity overflow without publishing', () => {
    const onError = jest.fn();
    const engine = createDashboardGridEngine({
      columns: 2,
      maxRows: 1,
      items: [{ id: 'first', column: 0, row: 0 }],
      onError,
    });
    const initial = engine.getSnapshot();

    expect(engine.add({ id: 'second', column: 0, row: 0 }).status).toBe(
      'rejected',
    );
    expect(engine.getSnapshot()).toBe(initial);
    expect(onError).toHaveBeenCalled();
  });

  it('keeps canPlace observationally pure', () => {
    const engine = createDashboardGridEngine({
      columns: 2,
      items: [{ id: 'first', column: 0, row: 0 }],
    });
    const initial = engine.getSnapshot();
    const candidate = Object.freeze({
      id: 'candidate',
      column: 0,
      row: 0,
    });

    expect(engine.canPlace(candidate)).toEqual(
      expect.objectContaining({
        fits: true,
        resolvedPosition: expect.objectContaining({ row: 0 }),
      }),
    );
    expect(engine.getSnapshot()).toBe(initial);
    expect(candidate).toEqual({ id: 'candidate', column: 0, row: 0 });
  });

  it('reports unchanged when packing restores a move proposal', () => {
    const engine = createDashboardGridEngine({
      items: [{ id: 'item', column: 0, row: 0 }],
    });

    expect(engine.move('item', { input: 'api', row: 5 }).status).toBe(
      'unchanged',
    );
    expect(engine.getItem('item')?.row).toBe(0);
  });

  it('rotates constraints and cancellation restores the full pre-rotation snapshot', () => {
    const engine = createDashboardGridEngine({
      items: [
        {
          id: 'item',
          column: 0,
          row: 0,
          columnSpan: 3,
          rowSpan: 2,
          minColumnSpan: 2,
          maxRowSpan: 4,
        },
      ],
    });
    const initial = engine.getSnapshot();

    engine.beginInteraction('item', {
      kind: 'keyboard',
      source: 'internal',
    });
    expect(engine.rotate('item', { input: 'keyboard' }).status).toBe(
      'accepted',
    );
    expect(engine.getItem('item')).toEqual(
      expect.objectContaining({
        columnSpan: 2,
        rowSpan: 3,
        minRowSpan: 2,
        maxColumnSpan: 4,
      }),
    );
    engine.cancelInteraction();

    expect(engine.getSnapshot().items).toEqual(initial.items);
  });

  it('uses strict pointer thresholds and refreshes displaced target rectangles', () => {
    const metrics = {
      columnWidth: 100,
      rowHeight: 100,
      gapTop: 0,
      gapRight: 0,
      gapBottom: 0,
      gapLeft: 0,
    };
    const engine = createDashboardGridEngine({
      columns: 2,
      items: [
        { id: 'active', column: 0, row: 0 },
        { id: 'target', column: 1, row: 0 },
      ],
    });
    engine.beginInteraction('active', {
      kind: 'drag',
      source: 'internal',
      metrics,
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
    });

    expect(
      engine.move('active', {
        input: 'pointer',
        column: 1,
        row: 0,
        pixelRect: { x: 50, y: 0, width: 100, height: 100 },
      }).status,
    ).toBe('deferred');
    expect(
      engine.move('active', {
        input: 'pointer',
        column: 1,
        row: 0,
        pixelRect: { x: 51, y: 0, width: 100, height: 100 },
      }).status,
    ).toBe('accepted');
    expect(
      engine.move('active', {
        input: 'pointer',
        column: 0,
        row: 0,
        pixelRect: { x: 0, y: 0, width: 100, height: 100 },
      }).status,
    ).toBe('accepted');
  });

  it('requests nesting only above eighty percent without mutating', () => {
    const create = () => {
      const engine = createDashboardGridEngine({
        columns: 2,
        items: [
          { id: 'active', column: 0, row: 0 },
          { id: 'target', column: 1, row: 0 },
        ],
      });
      engine.beginInteraction('active', {
        kind: 'drag',
        source: 'internal',
        allowNesting: true,
        metrics: {
          columnWidth: 100,
          rowHeight: 100,
          gapTop: 0,
          gapRight: 0,
          gapBottom: 0,
          gapLeft: 0,
        },
        originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
      });
      return engine;
    };

    expect(
      create().move('active', {
        input: 'pointer',
        column: 1,
        row: 0,
        pixelRect: { x: 80, y: 0, width: 100, height: 100 },
      }).status,
    ).toBe('accepted');

    const above = create();
    const initial = above.getSnapshot();
    expect(
      above.move('active', {
        input: 'pointer',
        column: 1,
        row: 0,
        pixelRect: { x: 81, y: 0, width: 100, height: 100 },
      }),
    ).toEqual(
      expect.objectContaining({
        status: 'nest-requested',
        targetId: 'target',
      }),
    );
    expect(above.getSnapshot()).toBe(initial);
  });

  it('never swaps external items', () => {
    const engine = createDashboardGridEngine({
      columns: 2,
      items: [
        { id: 'active', column: 0, row: 0 },
        { id: 'target', column: 1, row: 0 },
      ],
    });
    engine.beginInteraction('active', {
      kind: 'drag',
      source: 'external',
      metrics: {
        columnWidth: 100,
        rowHeight: 100,
        gapTop: 0,
        gapRight: 0,
        gapBottom: 0,
        gapLeft: 0,
      },
      originPixelRect: { x: 0, y: 0, width: 100, height: 100 },
    });
    engine.move('active', {
      input: 'pointer',
      column: 1,
      row: 0,
      pixelRect: { x: 51, y: 0, width: 100, height: 100 },
    });

    expect(engine.getItem('active')).toEqual(
      expect.objectContaining({ column: 1, row: 0 }),
    );
    expect(engine.getItem('target')).toEqual(
      expect.objectContaining({ column: 1, row: 1 }),
    );
  });

  it('preserves invariants for a seeded 200-item layout', () => {
    const engine = createDashboardGridEngine({ columns: 12 });
    let seed = 0x12345678;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 2 ** 32;
    };

    for (let index = 0; index < 200; index++) {
      expect(
        engine.add({
          id: String(index),
          autoPosition: true,
          columnSpan: 1 + Math.floor(random() * 4),
          rowSpan: 1 + Math.floor(random() * 3),
        }).status,
      ).not.toBe('rejected');
    }
    engine.setColumns(1);
    engine.setColumns(12);

    const items = engine.getSnapshot().items;
    expect(
      items.some((item, index) =>
        items.slice(index + 1).some(other => overlaps(item, other)),
      ),
    ).toBe(false);
  });
});
