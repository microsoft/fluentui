import { createDashboardGridNestedOptions, getDashboardGridNestedColumns } from './nestedGrid';

describe('nested grid options', () => {
  it('inherits safe options and resolves automatic columns', () => {
    expect(
      createDashboardGridNestedOptions(
        { id: 'parent', columns: 12, layout: 'compact', responsive: {} },
        { columns: 'auto' },
        4,
        6,
      ),
    ).toEqual({
      columns: 6,
      layout: 'compact',
    });
  });

  it('uses the larger parent or incoming span for automatic columns', () => {
    expect(getDashboardGridNestedColumns('auto', 3, 5)).toBe(5);
  });
});
