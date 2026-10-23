import { areChartDataEqual } from './ChartFocusUtils';

describe('areChartDataEqual', () => {
  it('compares nested chart values and colors by content', () => {
    expect(
      areChartDataEqual([{ data: [{ x: 1, y: 2 }], color: 'red' }], [{ data: [{ x: 1, y: 2 }], color: 'red' }]),
    ).toBe(true);
    expect(areChartDataEqual([{ x: 1, y: 2 }], [{ x: 1, y: 3 }])).toBe(false);
    expect(areChartDataEqual(['red'], ['blue'])).toBe(false);
    expect(areChartDataEqual([1], [1, 2])).toBe(false);
  });

  it('compares dates by value', () => {
    expect(areChartDataEqual({ x: new Date(1000) }, { x: new Date(1000) })).toBe(true);
    expect(areChartDataEqual({ x: new Date(1000) }, { x: new Date(2000) })).toBe(false);
  });

  it('distinguishes missing properties, null, arrays and objects', () => {
    expect(areChartDataEqual(undefined, undefined)).toBe(true);
    expect(areChartDataEqual(undefined, null)).toBe(false);
    expect(areChartDataEqual({}, { x: undefined })).toBe(false);
    expect(areChartDataEqual({ x: undefined }, { y: undefined })).toBe(false);
    expect(areChartDataEqual([], {})).toBe(false);
  });

  it('preserves callback identity', () => {
    const callback = () => undefined;
    expect(areChartDataEqual({ onClick: callback }, { onClick: callback })).toBe(true);
    expect(areChartDataEqual({ onClick: callback }, { onClick: () => undefined })).toBe(false);
  });
});
