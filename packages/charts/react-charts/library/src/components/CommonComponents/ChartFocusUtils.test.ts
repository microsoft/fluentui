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
    expect(areChartDataEqual({ x: undefined }, {})).toBe(false);
    expect(areChartDataEqual({ x: undefined }, { y: undefined })).toBe(false);
    expect(areChartDataEqual([], {})).toBe(false);
  });

  it('ignores callback identity, additions and removals', () => {
    const callback = () => undefined;
    expect(areChartDataEqual({ onClick: callback }, { onClick: callback })).toBe(true);
    expect(areChartDataEqual({ onClick: callback }, { onClick: () => undefined })).toBe(true);
    expect(areChartDataEqual({}, { onClick: callback })).toBe(true);
    expect(areChartDataEqual({ onClick: callback }, {})).toBe(true);
    expect(areChartDataEqual({ onClick: callback }, { onClick: 'changed' })).toBe(false);
    expect(areChartDataEqual({ onClick: 'changed' }, { onClick: callback })).toBe(false);
  });

  it('still detects nested value changes when callbacks change', () => {
    const previous = [{ data: [{ x: 1, y: 2, onDataPointClick: () => undefined }], onLineClick: () => undefined }];
    const equivalent = [{ data: [{ x: 1, y: 2, onDataPointClick: () => undefined }], onLineClick: () => undefined }];
    const changed = [{ data: [{ x: 1, y: 3, onDataPointClick: () => undefined }], onLineClick: () => undefined }];
    expect(areChartDataEqual(previous, equivalent)).toBe(true);
    expect(areChartDataEqual(previous, changed)).toBe(false);
  });

  it.each([false, true])('ignores conditional handlers (initially enabled: %s)', initiallyEnabled => {
    const callback = () => undefined;
    const previous = { x: 1, y: 2, onClick: initiallyEnabled ? callback : undefined };
    const current = { x: 1, y: 2, onClick: initiallyEnabled ? undefined : callback };
    expect(areChartDataEqual(previous, current)).toBe(true);
    expect(areChartDataEqual([{ data: [previous] }], [{ data: [current] }])).toBe(true);
    expect(areChartDataEqual(previous, { ...current, y: 3 })).toBe(false);
    expect(areChartDataEqual(previous, { ...current, onClick: null })).toBe(false);
  });
});
