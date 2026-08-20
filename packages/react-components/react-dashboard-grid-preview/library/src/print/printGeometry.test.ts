import { getDashboardGridGeometryStyle, getDashboardGridPrintGeometryStyle } from './printGeometry';

describe('dashboard grid print geometry', () => {
  const rect = { column: 2, row: 3, columnSpan: 4, rowSpan: 2 };

  it('creates deterministic SSR geometry variables', () => {
    expect(getDashboardGridGeometryStyle(rect, 12)).toEqual({
      '--dashboard-grid-column': 2,
      '--dashboard-grid-row': 3,
      '--dashboard-grid-column-span': 4,
      '--dashboard-grid-row-span': 2,
      '--dashboard-grid-columns': 12,
    });
  });

  it('creates exact and flow print projections', () => {
    expect(getDashboardGridPrintGeometryStyle(rect, 'exact', 12)).toMatchObject({
      gridColumnStart: 3,
      gridColumnEnd: 'span 4',
      gridRowStart: 4,
      gridRowEnd: 'span 2',
    });
    expect(
      Number.parseFloat(
        String(
          getDashboardGridPrintGeometryStyle(rect, 'flow', 12)[
            '--dashboard-grid-print-width'
          ],
        ),
      ),
    ).toBeCloseTo(100 / 3);
  });
});
