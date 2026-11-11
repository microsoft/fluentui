import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Calendar } from './Calendar';
import { useCalendar } from './useCalendar';
import { focusCalendarGrid } from './calendarGrid';
import type { CalendarCellData, CalendarProps } from './Calendar.types';

// Month-grid behavior, ported from the former standalone CalendarMonth suite. Calendar renders only the month panel
// here (`dayPicker={null}`), so activating a month selects it.

const today = new Date(2020, 8, 18);

type MonthOptions = {
  allFocusable?: boolean;
  minDate?: Date;
  restrictedDates?: Date[];
  onGridKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
  onCellClick?: React.MouseEventHandler<HTMLElement>;
  onCellKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onRowClick?: React.MouseEventHandler<HTMLElement>;
  onRowKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onSelectDate?: CalendarProps['onSelectDate'];
};

/** Renders a month-only Calendar with a controlled displayed date, so navigation requests are only reported. */
function renderMonth(options: MonthOptions = {}) {
  const onSelect = jest.fn(options.onSelectDate);
  const onNavigate = jest.fn();
  const result = render(
    <Calendar
      today={today}
      value={today}
      displayedDate={today}
      dayPicker={null}
      allFocusable={options.allFocusable}
      minDate={options.minDate}
      restrictedDates={options.restrictedDates}
      onSelectDate={onSelect}
      onDisplayedDateChange={onNavigate}
      grid={{ onKeyDown: options.onGridKeyDown, onKeyDownCapture: options.onGridKeyDownCapture }}
      getCellProps={() => ({ root: { onClick: options.onCellClick, onKeyDown: options.onCellKeyDown } })}
      getRowProps={() => ({ root: { onClick: options.onRowClick, onKeyDown: options.onRowKeyDown } })}
    />,
  );
  return {
    ...result,
    cells: result.getAllByRole('gridcell'),
    onSelect,
    onNavigate,
  };
}

const MonthPicker = (props: CalendarProps) => <Calendar today={today} dayPicker={null} {...props} />;

describe('Calendar month grid', () => {
  it('renders a noninteractive heading without button attributes when the year picker is hidden', () => {
    const { container } = render(<MonthPicker yearPickerHidden />);
    const heading = container.querySelector('[data-view="month"] > div > div')!;

    expect(heading.tagName).toBe('DIV');
    expect(heading).not.toHaveAttribute('type');
    expect(heading).not.toHaveAttribute('aria-label');
  });

  it('keeps row and month state data-only and resolves HTML props on demand', () => {
    const getCellProps = jest.fn(() => ({ root: { title: 'Custom month' } }));
    const getRowProps = jest.fn(() => ({ root: { title: 'Custom row' } }));
    const { result } = renderHook(() =>
      useCalendar({ today, displayedDate: today, dayPicker: null, getCellProps, getRowProps }, null),
    );
    const state = result.current;
    const { rows } = state.panels[0];
    expect(state.panels[0].view).toBe('month');
    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).not.toHaveBeenCalled();
    rows.forEach(row => {
      expect(row).not.toHaveProperty('root');
      (row.cells as CalendarCellData[]).forEach(cell => {
        expect(cell).not.toHaveProperty('root');
        expect(cell.label).toEqual(expect.any(String));
      });
    });
    const row = rows[2];
    const month = row.cells[0] as CalendarCellData;
    const cellProps = state.resolveCellProps(month);
    expect(cellProps.root).toMatchObject({
      role: 'gridcell',
      'aria-label': 'September',
      title: 'Custom month',
      tabIndex: 0,
    });
    expect(cellProps.button).toMatchObject({ type: 'button', children: month.label, tabIndex: -1 });
    expect(state.resolveRowProps(row).root).toMatchObject({ role: 'row', title: 'Custom row' });
    expect(getCellProps).toHaveBeenCalledWith(month);
    expect(getRowProps).toHaveBeenCalledWith(row);
    expect(month).not.toHaveProperty('root');
  });

  it('marks the navigated month as the roving tab stop', () => {
    const { container } = render(<MonthPicker />);
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid).not.toHaveAttribute('focusgroup');
    expect(grid.querySelector('[tabindex="0"]')).toHaveAttribute('aria-label', 'September');
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(grid.querySelectorAll('[role="row"]')).toHaveLength(3);
    expect(grid.childNodes).toHaveLength(3);
  });

  it.each([3, 4] as const)('renders %s month columns and preserves selection and grid focus', columns => {
    const onSelectDate = jest.fn();
    const getRowProps = jest.fn(() => ({ root: {} }));
    const { container, getByRole, getAllByRole } = render(
      <MonthPicker
        value={today}
        calendarMonthColumns={columns}
        onSelectDate={onSelectDate}
        getRowProps={getRowProps}
      />,
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(12 / columns);
    rows.forEach(row => expect(row.children).toHaveLength(columns));
    expect(getRowProps.mock.calls).toHaveLength(12 / columns);

    act(() => {
      focusCalendarGrid(container.firstElementChild);
    });
    expect(getByRole('gridcell', { name: 'September' })).toHaveFocus();
    fireEvent.click(getByRole('gridcell', { name: 'May' }));
    expect(onSelectDate.mock.calls[0][1].date).toEqual(new Date(2020, 4, 18));

    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    const yearRows = getAllByRole('row');
    expect(yearRows).toHaveLength(3);
    yearRows.forEach(row => expect(row.children).toHaveLength(4));
  });

  it('preserves the roving tab stop without stealing focus when the displayed month changes', () => {
    const { container, getByRole, rerender } = render(<MonthPicker displayedDate={today} />);
    act(() => getByRole('gridcell', { name: 'October' }).focus());

    rerender(<MonthPicker displayedDate={new Date(2020, 10, 18)} />);

    expect(getByRole('gridcell', { name: 'October' })).toHaveFocus();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('tabindex', '0');
    expect(getByRole('gridcell', { name: 'November' })).not.toHaveAttribute('tabindex', '0');
  });

  it('keeps focus and the tab stop on a month that becomes disabled', () => {
    const { container, getByRole, rerender } = render(<MonthPicker displayedDate={today} />);
    act(() => getByRole('gridcell', { name: 'October' }).focus());

    rerender(<MonthPicker displayedDate={today} minDate={new Date(2020, 10, 1)} />);

    expect(getByRole('gridcell', { name: 'October' }).querySelector('button')).toBeDisabled();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'October' })).toHaveFocus();
    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('tabindex', '0');
  });

  it('keeps the active month focused when a maximum bound clamps the displayed month', () => {
    const { container, getByRole, rerender } = render(<MonthPicker displayedDate={today} />);
    const september = getByRole('gridcell', { name: 'September' });
    act(() => september.focus());

    rerender(<MonthPicker displayedDate={new Date(2020, 6, 31)} maxDate={new Date(2020, 6, 31)} />);

    expect(september).toHaveFocus();
    expect(september).toHaveAttribute('aria-disabled', 'true');
    expect(september).toHaveAttribute('tabindex', '0');
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(september, { key: 'End' });
    expect(getByRole('gridcell', { name: 'July' })).toHaveFocus();
  });

  it('keeps the active month focusable when a maximum bound clamps the displayed year', () => {
    const start = new Date(2026, 8, 18);
    const { container, getByRole, rerender } = render(<MonthPicker today={start} displayedDate={start} />);
    const september = getByRole('gridcell', { name: 'September' });
    act(() => september.focus());

    rerender(<MonthPicker today={start} displayedDate={new Date(2025, 6, 31)} maxDate={new Date(2025, 6, 31)} />);

    expect(september).toHaveFocus();
    expect(september).toHaveAttribute('aria-disabled', 'true');
    expect(september).toHaveAttribute('tabindex', '-1');
    expect(getByRole('gridcell', { name: 'July' })).toHaveAttribute('tabindex', '0');
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    fireEvent.keyDown(september, { key: 'End' });
    expect(getByRole('gridcell', { name: 'July' })).toHaveFocus();
  });

  it('swaps in the year grid from its heading', () => {
    const { getByRole, container } = render(<MonthPicker value={today} />);

    fireEvent.click(getByRole('button', { name: '2020, change year' }));

    expect(container.querySelector('[data-view="year"]')).not.toBeNull();
    expect(container.textContent).toContain('2020 - 2031');
  });

  it.each([2020, 2021])('exposes factual current and selected month state in %s without styling flags', year => {
    const { getByRole, container } = render(
      <MonthPicker displayedDate={new Date(year, 8, 18)} value={new Date(2020, 2, 18)} />,
    );

    expect(getByRole('gridcell', { name: 'September' }).hasAttribute('data-current')).toBe(year === 2020);
    expect(getByRole('gridcell', { name: 'March' }).hasAttribute('data-selected')).toBe(year === 2020);
    expect(container.querySelectorAll('[data-current]')).toHaveLength(year === 2020 ? 1 : 0);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(year === 2020 ? 1 : 0);
  });

  it('customizes resolved cells and rows without changing the grid structure or focus target', () => {
    const pickerRef = React.createRef<HTMLDivElement>();
    const cellRef = React.createRef<HTMLElement>();
    const rowRef = React.createRef<HTMLDivElement>();
    const getCellProps = jest.fn((cell: CalendarCellData) => {
      expect(cell).not.toHaveProperty('root');
      expect(cell.label).toEqual(expect.any(String));
      const isSeptember = cell.type === 'month' && cell.index === 8;
      return {
        root: isSeptember ? { ref: cellRef, title: 'Custom month' } : {},
        button: isSeptember ? { children: <strong>{cell.label}</strong> } : {},
      };
    });
    const { getByRole, container, unmount } = render(
      <MonthPicker
        monthPicker={{ ref: pickerRef }}
        getCellProps={getCellProps}
        getRowProps={row => {
          expect(row).not.toHaveProperty('root');
          (row.cells as CalendarCellData[]).forEach(cell => {
            expect(cell).not.toHaveProperty('root');
            expect(cell.label).toEqual(expect.any(String));
          });
          return { root: { title: `Row ${row.key}`, ref: row.key === 2 ? rowRef : undefined } };
        }}
      />,
    );
    const september = getByRole('gridcell', { name: 'September' });
    expect(pickerRef.current).toHaveAttribute('data-view', 'month');
    expect(getCellProps).toHaveBeenCalledTimes(12);
    expect(cellRef.current).toBe(september);
    expect(september.querySelector('button strong')).toHaveTextContent('Sep');
    expect(september).toHaveAttribute('title', 'Custom month');
    expect(rowRef.current).toContainElement(september);
    expect(rowRef.current).toHaveAttribute('title', 'Row 2');
    expect(container.querySelectorAll('[role="row"]')).toHaveLength(3);
    act(() => {
      focusCalendarGrid(pickerRef.current);
    });
    expect(september).toHaveFocus();
    unmount();
    expect(pickerRef.current).toBeNull();
    expect(cellRef.current).toBeNull();
    expect(rowRef.current).toBeNull();
  });

  it('lets consumer getters override default month and row attributes', () => {
    const { getByRole, queryByRole, container } = render(
      <MonthPicker
        minDate={new Date(2020, 8, 1)}
        value={today}
        getCellProps={() => ({
          root: {
            role: 'link',
            tabIndex: -1,
            'aria-disabled': false,
            'aria-selected': false,
            'data-selected': 'custom',
          } as React.HTMLAttributes<HTMLElement>,
          button: { disabled: false },
        })}
        getRowProps={() => ({ root: { role: 'presentation' } })}
      />,
    );
    expect(getByRole('link', { name: 'August' })).toBeEnabled();
    expect(getByRole('link', { name: 'August' })).toHaveAttribute('aria-disabled', 'false');
    expect(getByRole('link', { name: 'September' })).toHaveAttribute('tabindex', '-1');
    expect(getByRole('link', { name: 'September' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('link', { name: 'September' })).toHaveAttribute('data-selected', 'custom');
    expect(queryByRole('gridcell')).toBeNull();
    expect(container.querySelectorAll('[role="presentation"]')).toHaveLength(3);
    expect(queryByRole('row')).toBeNull();
  });

  it.each([undefined, null, ''])('preserves month content override semantics for %p', children => {
    const { getByRole } = render(<MonthPicker getCellProps={() => ({ button: { children } })} />);
    expect(getByRole('gridcell', { name: 'September' }).textContent).toBe(children === undefined ? 'Sep' : '');
  });

  it('moves focus into the year grid with a consumer panel ref', async () => {
    const pickerRef = React.createRef<HTMLDivElement>();
    const { getByRole, unmount } = render(<MonthPicker value={today} monthPicker={{ ref: pickerRef }} />);

    fireEvent.click(getByRole('button', { name: '2020, change year' }));

    expect(pickerRef.current).toHaveAttribute('data-view', 'year');
    expect(pickerRef.current).toContainElement(getByRole('gridcell', { name: '2020' }));
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());
    unmount();
    expect(pickerRef.current).toBeNull();
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const defaultGrid = render(<MonthPicker />);
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<MonthPicker grid={{ children: null }} />);
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });

  it.each(['Enter', ' '])('activates the focused month gridcell with %s', key => {
    const { cells, onSelect, onNavigate } = renderMonth();
    act(() => cells[2].focus());

    expect(fireEvent.keyDown(cells[2], { key })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][1].type).toBe('keydown');
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('honors grid cancellation when activating a focused month gridcell', () => {
    const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderMonth({ onGridKeyDown });
    act(() => cells[2].focus());

    expect(fireEvent.keyDown(cells[2], { key: 'Enter' })).toBe(false);
    expect(onGridKeyDown).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('leaves nested month buttons to native keyboard activation', () => {
    const { cells, onSelect } = renderMonth();
    const button = cells[2].querySelector('button')!;

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('moves focus from a clicked month button to its gridcell for keyboard navigation', () => {
    const { cells } = renderMonth();
    const button = cells[2].querySelector('button')!;
    act(() => button.focus());

    fireEvent.click(button);

    expect(cells[2]).toHaveFocus();
    fireEvent.keyDown(cells[2], { key: 'ArrowRight' });
    expect(cells[3]).toHaveFocus();
  });

  describe('keyboard navigation', () => {
    it('has no cell Tab stop when every month is unavailable', () => {
      // Calendar clamps the displayed date into minDate/maxDate, so restrict every day of the displayed year instead.
      const { cells } = renderMonth({
        restrictedDates: Array.from({ length: 366 }, (_, index) => new Date(2020, 0, index + 1)),
      });
      expect(cells.every(cell => cell.querySelector('button')!.disabled)).toBe(true);
      expect(cells.filter(cell => cell.tabIndex === 0)).toHaveLength(0);
    });

    it('provides one Tab entry point', () => {
      const { getByRole, cells } = renderMonth();
      const grid = getByRole('grid');
      expect(grid).not.toHaveAttribute('data-tabster');
      expect(cells.filter(cell => cell.tabIndex === 0)).toHaveLength(1);
      const rows = grid.querySelectorAll('[role="row"]');
      expect(rows).toHaveLength(3);
      rows.forEach(row => expect(row.children).toHaveLength(4));
    });

    it.each([
      ['ArrowLeft', 4],
      ['ArrowRight', 6],
      ['ArrowUp', 1],
      ['ArrowDown', 9],
      ['Home', 0],
      ['End', 11],
    ] as const)('moves focus with %s without selecting', (key, targetIndex) => {
      const { cells, onSelect, onNavigate } = renderMonth();
      const cell = cells[5];
      act(() => cell.focus());
      expect(fireEvent.keyDown(cell, { key })).toBe(false);
      expect(cells[targetIndex]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(cells.filter(item => item.tabIndex === 0)).toEqual([cells[targetIndex]]);
    });

    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('leaves modified arrows uncancelled with %s', modifier => {
      const { cells, onSelect, onNavigate } = renderMonth();
      act(() => cells[0].focus());
      for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
        expect(fireEvent.keyDown(cells[0], { key, [modifier]: true })).toBe(true);
      }
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each(['click', 'keydown'] as const)('selects with %s independently of navigation', type => {
      const { cells, onSelect } = renderMonth();
      if (type === 'click') {
        fireEvent.click(cells[2]);
      } else {
        expect(fireEvent.keyDown(cells[2], { key: 'Enter' })).toBe(false);
      }
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][1].type).toBe(type);
    });

    it.each(['cell', 'row'] as const)('honors click cancellation from the %s prop getter', target => {
      const onClick = jest.fn((event: React.MouseEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderMonth(
        target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick },
      );
      expect(fireEvent.click(cells[2])).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderMonth(
        target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown },
      );
      fireEvent.keyDown(cells[2], { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('runs cell and row handlers before delegated selection', () => {
      const order: string[] = [];
      const { cells } = renderMonth({
        onCellClick: () => order.push('cell'),
        onRowClick: () => order.push('row'),
        onSelectDate: () => order.push('selection'),
      });
      fireEvent.click(cells[2]);
      expect(order).toEqual(['cell', 'row', 'selection']);
    });

    it.each(['ArrowLeft', 'Enter'])('honors consumer cancellation of %s', key => {
      const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderMonth({ onGridKeyDown });
      act(() => cells[0].focus());
      fireEvent.keyDown(cells[0], { key });
      expect(onGridKeyDown).toHaveBeenCalledTimes(1);
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('honors grid capture cancellation', () => {
      const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderMonth({ onGridKeyDownCapture });
      fireEvent.keyDown(cells[0], { key: 'Enter' });
      expect(onGridKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each([false, true])('preserves unavailable-cell semantics with allFocusable=%s', allFocusable => {
      const { cells, onSelect } = renderMonth({
        allFocusable,
        minDate: new Date(2020, 8, 1),
        restrictedDates: [today],
      });
      const unavailable = cells.find(cell => cell.getAttribute('aria-disabled') === 'true')!;
      expect(unavailable).toBeDefined();
      expect(unavailable.querySelector('button')!.disabled).toBe(!allFocusable);
      fireEvent.keyDown(unavailable, { key: 'Enter' });
      fireEvent.click(unavailable);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it.each(['input', 'textarea', 'select', 'contenteditable', 'grid', 'toolbar'])(
      'preserves input ownership inside nested %s content',
      owner => {
        const { cells, onSelect, onNavigate } = renderMonth();
        const nested = cells[0].ownerDocument.createElement(
          ['input', 'textarea', 'select'].includes(owner) ? owner : 'span',
        );
        if (owner === 'contenteditable') {
          nested.setAttribute('contenteditable', 'true');
        } else if (owner === 'grid' || owner === 'toolbar') {
          nested.setAttribute('role', owner);
        }
        nested.tabIndex = 0;
        cells[0].appendChild(nested);
        act(() => nested.focus());
        for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter']) {
          expect(fireEvent.keyDown(nested, { key })).toBe(true);
          expect(nested).toHaveFocus();
        }
        expect(onSelect).not.toHaveBeenCalled();
        expect(onNavigate).not.toHaveBeenCalled();
      },
    );

    it.each(['click', 'keydown'] as const)('lets onSelectDate cancel and stop the %s event', type => {
      const onSelectDate = jest.fn<void, Parameters<NonNullable<CalendarProps['onSelectDate']>>>(event => {
        event.preventDefault();
        event.stopPropagation();
      });
      const { cells, container } = renderMonth({ onSelectDate });
      const onBubble = jest.fn();
      container.ownerDocument.body.addEventListener(type, onBubble);
      const defaultAllowed =
        type === 'click' ? fireEvent.click(cells[2]) : fireEvent.keyDown(cells[2], { key: 'Enter' });
      container.ownerDocument.body.removeEventListener(type, onBubble);
      expect(onSelectDate).toHaveBeenCalledTimes(1);
      expect(defaultAllowed).toBe(false);
      expect(onBubble).not.toHaveBeenCalled();
    });
  });
});
