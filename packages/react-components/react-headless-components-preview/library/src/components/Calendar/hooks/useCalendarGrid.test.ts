import { getCalendarGridTargetIndex, getCalendarPickerCellProps, getCalendarPickerRows } from './useCalendarGrid';

describe('calendar grid helpers', () => {
  it.each([3, 4] as const)('groups cells into %s-column rows without changing order or identity', columns => {
    const cells = Array.from({ length: 12 }, (_, index) => ({ index }));
    const rows = getCalendarPickerRows(cells, columns);

    expect(rows.map(row => row.key)).toEqual(Array.from({ length: 12 / columns }, (_, index) => index));
    expect(rows.every(row => row.cells.length === columns)).toBe(true);
    rows.flatMap(row => row.cells).forEach((cell, index) => expect(cell).toBe(cells[index]));
  });

  it.each([0, 2, 5, NaN, Infinity])('rejects unsupported column count %s', columns => {
    // @ts-expect-error Verify invalid runtime configuration cannot produce invalid rows.
    expect(() => getCalendarPickerRows([], columns)).toThrow('Calendar picker columns must be 3 or 4.');
  });

  it.each([false, true])('makes only the tab-stop cell tabbable with allFocusable=%s', allFocusable => {
    expect(getCalendarPickerCellProps(allFocusable, false, true, false, true)).toMatchObject({
      root: { role: 'gridcell', tabIndex: 0, 'aria-selected': true },
      button: { type: 'button', tabIndex: -1 },
    });
    expect(getCalendarPickerCellProps(allFocusable, false, false, false, false).root.tabIndex).toBe(-1);
  });

  it('keeps unavailable picker cells out of the tab order unless focused or allFocusable is enabled', () => {
    expect(getCalendarPickerCellProps(false, true, false, false, true)).toMatchObject({
      root: { tabIndex: 0, 'aria-disabled': true },
      button: { disabled: true },
    });
    expect(getCalendarPickerCellProps(false, true, false, false, false).root.tabIndex).toBeUndefined();
    expect(getCalendarPickerCellProps(true, true, false, false, true)).toMatchObject({
      root: { tabIndex: 0, 'aria-disabled': true },
      button: { disabled: false },
    });
  });

  it.each([
    ['ArrowRight', 5, 6],
    ['ArrowLeft', 5, 4],
    ['ArrowDown', 5, 9],
    ['ArrowUp', 5, 1],
    ['Home', 5, 0],
    ['End', 5, 11],
    ['ArrowRight', 3, undefined],
    ['ArrowLeft', 4, undefined],
  ] as const)('moves %s from %i to %s in a four-column picker grid', (key, from, to) => {
    expect(getCalendarGridTargetIndex(key, 'ltr', from, 12, 4, () => true)).toBe(to);
  });

  it('mirrors horizontal arrows in RTL and skips ineligible cells', () => {
    expect(getCalendarGridTargetIndex('ArrowLeft', 'rtl', 5, 12, 4, () => true)).toBe(6);
    expect(getCalendarGridTargetIndex('ArrowRight', 'ltr', 4, 12, 4, index => index !== 5)).toBe(6);
    expect(getCalendarGridTargetIndex('ArrowUp', 'ltr', 4, 12, 4, index => index !== 0)).toBeUndefined();
  });

  it('wraps across rows and scopes Home/End to the row in the day grid', () => {
    expect(getCalendarGridTargetIndex('ArrowRight', 'ltr', 6, 42, 7, () => true, true)).toBe(7);
    expect(getCalendarGridTargetIndex('ArrowLeft', 'ltr', 7, 42, 7, () => true, true)).toBe(6);
    expect(getCalendarGridTargetIndex('Home', 'ltr', 10, 42, 7, () => true, true)).toBe(7);
    expect(getCalendarGridTargetIndex('End', 'ltr', 10, 42, 7, index => index !== 13, true)).toBe(12);
  });

  it('finds an eligible Home or End target when the current picker cell becomes unavailable', () => {
    const isAfterJuly = (index: number) => index >= 6;
    const isBeforeAugust = (index: number) => index <= 6;

    expect(getCalendarGridTargetIndex('Home', 'ltr', 2, 12, 3, isAfterJuly)).toBe(6);
    expect(getCalendarGridTargetIndex('End', 'ltr', 8, 12, 3, isBeforeAugust)).toBe(6);
  });

  it('searches the whole week for Home and End when the focused day is unavailable', () => {
    expect(getCalendarGridTargetIndex('Home', 'ltr', 10, 42, 7, index => index > 10, true)).toBe(11);
    expect(getCalendarGridTargetIndex('End', 'ltr', 10, 42, 7, index => index < 10, true)).toBe(9);
  });
});
