/* eslint-disable @typescript-eslint/no-deprecated -- Verify compatibility of the retained public legacy types. */
import type { GVDataPoint, GVSingleDataPoint } from '../index';

describe('Legacy grouped-chart public types', () => {
  it('preserves string and numeric dictionary entries for existing consumers', () => {
    const point: GVDataPoint = { legend: 'Revenue', data: 10 };
    point.customLabel = 'Existing consumer metadata';
    point.customValue = 20;
    const dataset: GVSingleDataPoint = { Revenue: point };

    expect(dataset.Revenue).toEqual({
      legend: 'Revenue',
      data: 10,
      customLabel: 'Existing consumer metadata',
      customValue: 20,
    });
  });
});
