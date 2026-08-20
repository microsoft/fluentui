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

describe('dashboard grid responsive layouts', () => {
  it('restores exact 12 to 1 to 12 and 24 to 1 to 24 layouts', () => {
    const twelve = createDashboardGridEngine({
      columns: 12,
      items: [
        { id: 'left', column: 0, row: 0, columnSpan: 6 },
        { id: 'right', column: 6, row: 0, columnSpan: 6 },
      ],
    });
    twelve.setColumns(1);
    twelve.setColumns(12);
    expect(twelve.getSnapshot().items.map(item => [item.column, item.columnSpan])).toEqual([
      [0, 6],
      [6, 6],
    ]);

    const twentyFour = createDashboardGridEngine({
      columns: 24,
      items: [
        { id: 'left', column: 0, row: 0, columnSpan: 12 },
        { id: 'right', column: 12, row: 0, columnSpan: 12 },
      ],
    });
    twentyFour.setColumns(1);
    twentyFour.setColumns(24);
    expect(
      twentyFour.getSnapshot().items.map(item => [
        item.column,
        item.columnSpan,
      ]),
    ).toEqual([
      [0, 12],
      [12, 12],
    ]);
  });

  it('preserves a 24-column authored layout while initially rendering at 12', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: [
        { id: 'left', column: 0, row: 0, columnSpan: 12 },
        { id: 'right', column: 12, row: 0, columnSpan: 12 },
      ],
    });

    engine.setColumns(1);
    engine.setColumns(12);
    expect(engine.getItem('right')?.row).toBe(1);
    engine.setColumns(24);

    expect(engine.getSnapshot().items.map(item => [item.column, item.row])).toEqual([
      [0, 0],
      [12, 0],
    ]);
  });

  it('restores auto-positioned items added while at one column', () => {
    const engine = createDashboardGridEngine({ columns: 12 });

    engine.setColumns(1);
    engine.add({ id: 'wide', autoPosition: true, columnSpan: 6 });
    engine.setColumns(12);

    expect(engine.getItem('wide')).toEqual(
      expect.objectContaining({ columnSpan: 6 }),
    );
  });

  it('never overlaps after repeated switches and invalidates bad custom layouts', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      items: Array.from({ length: 20 }, (_, index) => ({
        id: String(index),
        autoPosition: true,
        columnSpan: (index % 4) + 1,
        rowSpan: (index % 3) + 1,
      })),
    });

    for (let index = 0; index < 5; index++) {
      engine.setColumns(1);
      engine.setColumns(12);
    }

    const items = engine.getSnapshot().items;
    expect(
      items.some((item, index) =>
        items.slice(index + 1).some(other => overlaps(item, other)),
      ),
    ).toBe(false);
    expect(engine.setColumns(6, () => []).status).toBe('rejected');
  });

  it('propagates narrow-layout row edits into larger cached layouts', () => {
    const engine = createDashboardGridEngine({
      columns: 12,
      float: true,
      items: [
        { id: 'first', column: 0, row: 0, columnSpan: 6 },
        { id: 'second', column: 6, row: 0, columnSpan: 6 },
      ],
    });
    engine.setColumns(1);
    engine.move('second', { input: 'api', row: 3, pack: false });
    engine.setColumns(12);

    expect(engine.getItem('second')?.row).toBe(2);
  });
});
