import { areDashboardGridItemsEqual, areDashboardGridLayoutsEqual } from './reconcileOptions';

describe('areDashboardGridItemsEqual', () => {
  it('compares supported fields without stringifying callers', () => {
    const content = 'content';
    const items = [{ id: 'a', column: 0, row: 0, content }];

    expect(areDashboardGridItemsEqual(items, [{ ...items[0] }])).toBe(true);
    expect(areDashboardGridItemsEqual(items, [{ ...items[0], row: 1 }])).toBe(false);
    expect(areDashboardGridItemsEqual(items, [{ ...items[0], content: 'other' }])).toBe(false);
  });

  it('distinguishes layout reconciliation from render metadata identity', () => {
    expect(
      areDashboardGridLayoutsEqual(
        [{ id: 'a', column: 0, row: 0, content: 'first' }],
        [{ id: 'a', column: 0, row: 0, content: 'second' }],
      ),
    ).toBe(true);
  });
});
