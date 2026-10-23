import { getCalendarPickerCellProps, getCalendarPickerRows } from './useCalendarGrid';

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

  it.each([false, true])('provides the focusgroup start target with allFocusable=%s', allFocusable => {
    expect(getCalendarPickerCellProps(allFocusable, false, true, false, true)).toMatchObject({
      root: {
        role: 'gridcell',
        tabIndex: 0,
        focusgroupstart: '',
        'aria-selected': true,
      },
      button: { type: 'button', tabIndex: -1 },
    });
  });

  it('keeps unavailable picker cells out of the tab order unless allFocusable is enabled', () => {
    expect(getCalendarPickerCellProps(false, true, false, false, true)).toMatchObject({
      root: { tabIndex: -1, focusgroupstart: '', 'aria-disabled': true },
      button: { disabled: true },
    });
    expect(getCalendarPickerCellProps(true, true, false, false, true)).toMatchObject({
      root: { tabIndex: 0, focusgroupstart: '', 'aria-disabled': true },
      button: { disabled: false },
    });
  });
});
