import { act, renderHook } from '@testing-library/react-hooks';
import {
  getCalendarGridTarget,
  getCalendarPickerCellProps,
  getCalendarPickerRows,
  isCalendarGridArrow,
  useCalendarRovingFocus,
} from './useCalendarGrid';

describe('calendar grid helpers', () => {
  it('groups semantic cells into rows without copying or mutating them', () => {
    const cells = Array.from({ length: 6 }, (_, index) => ({ index }));
    const rows = getCalendarPickerRows(cells, 3);

    expect(rows).toEqual([
      { key: 0, cells: cells.slice(0, 3) },
      { key: 1, cells: cells.slice(3) },
    ]);
    expect(rows[0].cells[0]).toBe(cells[0]);
    expect(cells[0]).toEqual({ index: 0 });
    expect(getCalendarPickerRows([], 3)).toEqual([]);
  });

  it.each([false, true])('resolves unavailable cell props with allFocusable=%s', allFocusable => {
    expect(getCalendarPickerCellProps(allFocusable, true, true, false, true)).toMatchObject({
      type: 'button',
      role: 'gridcell',
      disabled: !allFocusable,
      'aria-disabled': true,
      'aria-selected': true,
      tabIndex: allFocusable ? 0 : -1,
      'data-current': undefined,
      'data-selected': '',
      'data-outside-bounds': '',
    });
  });

  it.each([3, 4] as const)('groups cells into %s-column rows without changing their order or identity', columns => {
    const cells = Array.from({ length: 12 }, (_, index) => ({ index }));
    const rows = getCalendarPickerRows(cells, columns);
    expect(rows.map(row => row.key)).toEqual(Array.from({ length: 12 / columns }, (_, index) => index));
    expect(rows.every(row => row.cells.length === columns)).toBe(true);
    rows.flatMap(row => row.cells).forEach((cell, index) => expect(cell).toBe(cells[index]));
  });

  it.each([0, 2, 5, NaN, Infinity])('rejects unsupported column count %s', columns => {
    // @ts-expect-error Verify invalid runtime configuration cannot produce invalid rows or navigation.
    expect(() => getCalendarPickerRows([], columns)).toThrow('Calendar picker columns must be 3 or 4.');
  });

  it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'])(
    'recognizes only unmodified grid arrows for %s',
    key => {
      const event = {
        key,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      };
      expect(isCalendarGridArrow(event)).toBe(key !== 'Enter');
      for (const modifier of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const) {
        expect(isCalendarGridArrow({ ...event, [modifier]: true })).toBe(false);
      }
    },
  );

  it.each([
    [7, 'ArrowRight', 'ltr', 8],
    [8, 'ArrowRight', 'ltr', undefined],
    [6, 'ArrowLeft', 'ltr', undefined],
    [8, 'ArrowUp', 'ltr', 5],
    [8, 'ArrowDown', 'ltr', 11],
    [11, 'ArrowDown', 'ltr', undefined],
    [0, 'ArrowUp', 'ltr', undefined],
    [7, 'ArrowLeft', 'rtl', 8],
    [8, 'ArrowLeft', 'rtl', undefined],
    [8, 'ArrowRight', 'rtl', 7],
    [7, 'Home', 'ltr', 0],
    [7, 'End', 'rtl', 11],
  ] as const)('resolves %s + %s in %s to %s', (index, key, dir, expected) => {
    expect(getCalendarGridTarget(index, key, dir, 3, () => true)).toBe(expected);
  });

  it('skips unavailable coordinates without collapsing rows or columns', () => {
    expect(getCalendarGridTarget(0, 'ArrowRight', 'ltr', 3, index => index !== 1)).toBe(2);
    expect(getCalendarGridTarget(2, 'ArrowDown', 'ltr', 3, index => index !== 5)).toBe(8);
    expect(getCalendarGridTarget(8, 'ArrowUp', 'ltr', 3, index => index !== 5)).toBe(2);
    expect(getCalendarGridTarget(5, 'Home', 'ltr', 3, index => index >= 4)).toBe(4);
    expect(getCalendarGridTarget(5, 'End', 'ltr', 3, index => index < 10)).toBe(9);
    expect(getCalendarGridTarget(5, 'End', 'ltr', 3, () => false)).toBeUndefined();
  });

  it.each([3, 4] as const)('uses %s columns for boundaries, RTL and unavailable coordinates', columns => {
    expect(getCalendarGridTarget(columns - 1, 'ArrowRight', 'ltr', columns, () => true)).toBeUndefined();
    expect(getCalendarGridTarget(columns, 'ArrowLeft', 'ltr', columns, () => true)).toBeUndefined();
    expect(getCalendarGridTarget(columns - 1, 'ArrowLeft', 'rtl', columns, () => true)).toBeUndefined();
    expect(getCalendarGridTarget(columns, 'ArrowRight', 'rtl', columns, () => true)).toBeUndefined();
    expect(getCalendarGridTarget(0, 'ArrowLeft', 'rtl', columns, () => true)).toBe(1);
    expect(getCalendarGridTarget(0, 'ArrowDown', 'ltr', columns, index => index !== columns)).toBe(columns * 2);
    expect(getCalendarGridTarget(columns * 2, 'ArrowUp', 'rtl', columns, index => index !== columns)).toBe(0);
  });

  it('remembers focus and falls back when the initial target, scope or eligibility changes', () => {
    const { result, rerender } = renderHook(
      ({ initialKey, keys, scope }) => useCalendarRovingFocus(initialKey, keys, scope),
      { initialProps: { initialKey: 2, keys: [0, 1, 2, 3], scope: 2020 } },
    );
    expect(result.current[0]).toBe(2);
    act(() => result.current[1](3));
    rerender({ initialKey: 2, keys: [0, 1, 2, 3], scope: 2020 });
    expect(result.current[0]).toBe(3);
    rerender({ initialKey: 2, keys: [0, 1, 2, 3], scope: 2021 });
    expect(result.current[0]).toBe(2);
    rerender({ initialKey: 1, keys: [0, 1, 2, 3], scope: 2021 });
    expect(result.current[0]).toBe(1);
    rerender({ initialKey: 1, keys: [2, 3], scope: 2021 });
    expect(result.current[0]).toBe(2);
    rerender({ initialKey: 1, keys: [], scope: 2021 });
    expect(result.current[0]).toBeUndefined();
  });
});
