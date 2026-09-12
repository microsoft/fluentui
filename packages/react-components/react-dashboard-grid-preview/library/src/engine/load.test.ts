import { createDashboardGridEngine } from './DefaultDashboardGridEngine';

describe('dashboard grid loading', () => {
  it('does not mutate frozen caller arrays or items', () => {
    const items = Object.freeze([
      Object.freeze({ id: 'first', column: 0, row: 0, rowSpan: 2 }),
      Object.freeze({ id: 'second', column: 0, row: 0 }),
    ]);
    const engine = createDashboardGridEngine();

    expect(engine.load(items).status).toBe('accepted');
    expect(items[1]).toEqual({ id: 'second', column: 0, row: 0 });
    expect(engine.getItem('second')?.row).toBe(2);
  });

  it('forces same-position matched items through collision repair', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'first', column: 0, row: 0 },
        { id: 'second', column: 0, row: 1 },
      ],
    });

    engine.load([
      { id: 'first', column: 0, row: 0, rowSpan: 2 },
      { id: 'second', column: 0, row: 1 },
    ]);

    expect(engine.getItem('second')?.row).toBe(2);
  });

  it('supports independent addMissing and removeMissing flags', () => {
    const engine = createDashboardGridEngine({
      items: [
        { id: 'kept', column: 0, row: 0 },
        { id: 'updated', column: 1, row: 0 },
      ],
    });

    engine.load(
      [
        { id: 'updated', column: 2, row: 0 },
        { id: 'ignored', column: 3, row: 0 },
      ],
      { addMissing: false, removeMissing: false },
    );

    expect(engine.getItem('kept')).toBeDefined();
    expect(engine.getItem('updated')?.column).toBe(2);
    expect(engine.getItem('ignored')).toBeUndefined();
  });

  it('preserves wide source geometry loaded while narrow', () => {
    const engine = createDashboardGridEngine({ columns: 1 });

    engine.load(
      [
        { id: 'left', column: 0, row: 0, columnSpan: 6 },
        { id: 'right', column: 6, row: 0, columnSpan: 6 },
      ],
      { sourceColumns: 12 },
    );
    engine.setColumns(12);

    expect(engine.getSnapshot().items.map(item => [item.column, item.columnSpan])).toEqual([
      [0, 6],
      [6, 6],
    ]);
  });
});
