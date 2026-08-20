import { createDashboardGridEngine } from './DefaultDashboardGridEngine';

describe('dashboard grid serialization', () => {
  it('saves the highest-resolution cache by default and a requested cache on demand', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: [
        { id: 'left', column: 0, row: 0, columnSpan: 6 },
        { id: 'right', column: 6, row: 0, columnSpan: 6 },
      ],
    });
    engine.setColumns(1);

    const highest = engine.save();
    const narrow = engine.save({ columns: 1 });

    expect(highest.itemColumns).toBe(12);
    expect(highest.items.map(item => item.columnSpan)).toEqual([6, 6]);
    expect(narrow.itemColumns).toBe(1);
    expect(narrow.items.map(item => item.columnSpan)).toEqual([1, 1]);
  });

  it('round-trips versioned state without runtime or opaque fields', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: [
        {
          id: 'item',
          column: 2,
          row: 3,
          columnSpan: 4,
          rowSpan: 2,
          minColumnSpan: 2,
        },
      ],
    });
    const saved = engine.save({ includeLayouts: true });
    const restored = createDashboardGridEngine({ serializedState: saved });

    expect(restored.getSnapshot().items).toEqual(engine.getSnapshot().items);
    expect(JSON.stringify(saved)).not.toMatch(/key|sequence|engine|element/i);
    expect(Object.isFrozen(saved)).toBe(true);
    expect(Object.isFrozen(saved.items)).toBe(true);
  });

  it('removes items from every cache and clears all caches on removeAll', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: [{ id: 'item', column: 0, row: 0, columnSpan: 6 }],
    });
    engine.setColumns(1);
    engine.remove('item');

    const afterRemove = engine.save({ includeLayouts: true });
    expect(
      Object.values(afterRemove.layouts ?? {}).flatMap(layout => layout),
    ).toHaveLength(0);

    engine.add({ id: 'next', autoPosition: true });
    engine.removeAll();
    expect(engine.save({ includeLayouts: true }).layouts).toEqual({});
  });
});
