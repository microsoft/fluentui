import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Calendar } from './Calendar';
import { useCalendar } from './useCalendar';
import { focusCalendarGrid } from './calendarGrid';
import type { CalendarCellData, CalendarProps } from './Calendar.types';

// Year-grid behavior, ported from the former standalone CalendarYear suite. Calendar renders only the month panel in
// its year view. Selecting a year reports `onViewChange` (back to the month grid) and, when the year differs,
// `onDisplayedDateChange`. The year range starts at the displayed year.

const today = new Date(2020, 8, 18);

type YearOptions = {
  allFocusable?: boolean;
  maxDate?: Date;
  restrictedDates?: Date[];
  onGridKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
  onCellClick?: React.MouseEventHandler<HTMLElement>;
  onCellKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onRowClick?: React.MouseEventHandler<HTMLElement>;
  onRowKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onViewChange?: CalendarProps['onViewChange'];
  renderIcon?: boolean;
};

/** Renders the year grid with a controlled view and displayed date, so selections and navigation are only reported. */
function renderYear(options: YearOptions = {}) {
  const onSelect = jest.fn(options.onViewChange);
  const onNavigate = jest.fn();
  const icon = (
    <span>
      <svg aria-label="Custom icon">
        <path />
      </svg>
    </span>
  );
  const result = render(
    <Calendar
      today={today}
      value={today}
      displayedDate={today}
      dayPicker={null}
      view="year"
      allFocusable={options.allFocusable}
      maxDate={options.maxDate}
      restrictedDates={options.restrictedDates}
      onViewChange={onSelect}
      onDisplayedDateChange={onNavigate}
      grid={{ onKeyDown: options.onGridKeyDown, onKeyDownCapture: options.onGridKeyDownCapture }}
      getCellProps={() => ({
        root: { onClick: options.onCellClick, onKeyDown: options.onCellKeyDown },
        button: options.renderIcon ? { children: icon } : {},
      })}
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

const YearPicker = (props: CalendarProps) => (
  <Calendar today={today} displayedDate={today} dayPicker={null} view="year" {...props} />
);

describe('Calendar year grid', () => {
  it('keeps row and year state data-only and resolves HTML props on demand', () => {
    const getCellProps = jest.fn(() => ({ root: { title: 'Custom year' } }));
    const getRowProps = jest.fn(() => ({ root: { title: 'Custom row' } }));
    const { result } = renderHook(() =>
      useCalendar({ today, displayedDate: today, dayPicker: null, view: 'year', getCellProps, getRowProps }, null),
    );
    const state = result.current;
    const { rows } = state.panels[0];
    expect(state.panels[0].view).toBe('year');
    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).not.toHaveBeenCalled();
    rows.forEach(row => {
      expect(row).not.toHaveProperty('root');
      (row.cells as CalendarCellData[]).forEach(cell => {
        expect(cell).not.toHaveProperty('root');
        expect(cell).not.toHaveProperty('content');
        expect(cell.label).toEqual(expect.any(String));
      });
    });
    const row = rows[0];
    const year = row.cells[0] as CalendarCellData;
    const cellProps = state.resolveCellProps(year);
    expect(cellProps.root).toMatchObject({ role: 'gridcell', title: 'Custom year', tabIndex: 0 });
    expect(cellProps.button).toMatchObject({ type: 'button', children: year.label, tabIndex: -1 });
    expect(state.resolveRowProps(row).root).toMatchObject({ role: 'row', title: 'Custom row' });
    expect(getCellProps).toHaveBeenCalledWith(year);
    expect(getRowProps).toHaveBeenCalledWith(row);
    expect(year).not.toHaveProperty('root');
  });

  it('marks the displayed year as the roving tab stop', () => {
    const { container } = render(<YearPicker value={new Date(2020, 0, 1)} />);
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid).not.toHaveAttribute('focusgroup');
    expect(grid.querySelector('[tabindex="0"]')).toHaveTextContent('2020');
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(grid.querySelectorAll('[role="row"]')).toHaveLength(3);
  });

  it('updates the roving tab stop without stealing focus when the displayed year changes', () => {
    const { container, getByRole, rerender } = render(<YearPicker />);
    act(() => getByRole('gridcell', { name: '2022' }).focus());

    rerender(<YearPicker displayedDate={new Date(2021, 8, 18)} />);

    expect(getByRole('gridcell', { name: '2022' })).toHaveFocus();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2021' })).toHaveAttribute('tabindex', '0');
    expect(getByRole('gridcell', { name: '2022' })).not.toHaveAttribute('tabindex', '0');
  });

  it('keeps focus and the tab stop on a year that becomes disabled', () => {
    const { container, getByRole, rerender } = render(<YearPicker />);
    act(() => getByRole('gridcell', { name: '2028' }).focus());

    rerender(<YearPicker maxDate={new Date(2027, 11, 31)} />);

    expect(getByRole('button', { name: '2028' })).toBeDisabled();
    expect(container.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2028' })).toHaveFocus();
    expect(getByRole('gridcell', { name: '2028' })).toHaveAttribute('tabindex', '0');
  });

  it('renders a range of twelve years starting at the displayed year', () => {
    const { container, getAllByRole } = render(<YearPicker />);

    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);
    expect(getAllByRole('gridcell')[0]).toHaveTextContent('2020');
    expect(getAllByRole('gridcell')[11]).toHaveTextContent('2031');
  });

  it.each(['Enter', ' '])('activates the focused year gridcell with %s', key => {
    const { cells, onSelect, onNavigate } = renderYear();
    act(() => cells[1].focus());

    expect(fireEvent.keyDown(cells[1], { key })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][1].view).toBe('month');
    expect(onNavigate.mock.calls[0][1].displayedDate.getFullYear()).toBe(2021);
  });

  it('honors grid cancellation when activating a focused year gridcell', () => {
    const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderYear({ onGridKeyDown });
    act(() => cells[1].focus());

    expect(fireEvent.keyDown(cells[1], { key: 'Enter' })).toBe(false);
    expect(onGridKeyDown).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('leaves nested year buttons to native keyboard activation', () => {
    const { cells, onSelect } = renderYear();
    const button = cells[0].querySelector('button')!;

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('moves focus from a clicked year button to its gridcell for keyboard navigation', () => {
    const { cells } = renderYear({ onViewChange: event => event.preventDefault() });
    const button = cells[2].querySelector('button')!;
    act(() => button.focus());

    fireEvent.click(button);

    expect(cells[2]).toHaveFocus();
    fireEvent.keyDown(cells[2], { key: 'ArrowRight' });
    expect(cells[3]).toHaveFocus();
  });

  it.each([3, 4] as const)('uses %s columns for the year layout', columns => {
    const { getAllByRole, getByRole } = render(<YearPicker calendarYearColumns={columns} />);
    expect(getAllByRole('row')).toHaveLength(12 / columns);
    getAllByRole('row').forEach(row => expect(row.children).toHaveLength(columns));
    expect(getByRole('grid')).not.toHaveAttribute('focusgroup');
    expect(getByRole('gridcell', { name: '2020' })).toHaveAttribute('tabindex', '0');
  });

  it('exposes factual current and selected year state without styling flags', () => {
    const { getByRole, container } = render(
      <YearPicker maxDate={new Date(2023, 11, 31)} value={new Date(2022, 0, 1)} />,
    );

    expect(getByRole('gridcell', { name: '2020' })).toHaveAttribute('data-current');
    expect(getByRole('gridcell', { name: '2020' })).not.toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: '2022' })).toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: '2022' })).not.toHaveAttribute('data-current');
    expect(getByRole('gridcell', { name: '2024' })).toHaveAttribute('data-outside-bounds');
    expect(container.querySelectorAll('[data-current]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(1);
  });

  it('customizes resolved year cells and rows while retaining focus and selection', () => {
    const pickerRef = React.createRef<HTMLDivElement>();
    const cellRef = React.createRef<HTMLElement>();
    const rowRef = React.createRef<HTMLDivElement>();
    const onViewChange = jest.fn();
    const { getByRole, unmount } = render(
      <YearPicker
        monthPicker={{ ref: pickerRef }}
        onViewChange={onViewChange}
        getCellProps={cell => {
          expect(cell).not.toHaveProperty('root');
          expect(cell).not.toHaveProperty('content');
          expect(cell.label).toEqual(expect.any(String));
          const isSelected = cell.type === 'year' && cell.year === 2020;
          return {
            root: isSelected ? { ref: cellRef } : {},
            button: isSelected ? { children: <strong>{cell.label}</strong> } : {},
          };
        }}
        getRowProps={row => {
          expect(row).not.toHaveProperty('root');
          (row.cells as CalendarCellData[]).forEach(cell => {
            expect(cell).not.toHaveProperty('root');
            expect(cell.label).toEqual(expect.any(String));
          });
          return { root: { title: `Row ${row.key}`, ref: row.key === 0 ? rowRef : undefined } };
        }}
      />,
    );
    const year = getByRole('gridcell', { name: '2020' });
    expect(pickerRef.current).toHaveAttribute('data-view', 'year');
    expect(cellRef.current).toBe(year);
    expect(year.querySelector('button strong')).toHaveTextContent('2020');
    expect(rowRef.current).toContainElement(year);
    expect(rowRef.current).toHaveAttribute('title', 'Row 0');
    act(() => {
      focusCalendarGrid(pickerRef.current);
    });
    expect(year).toHaveFocus();
    fireEvent.click(year);
    expect(onViewChange).toHaveBeenCalledTimes(1);
    expect(onViewChange.mock.calls[0][1].view).toBe('month');
    unmount();
    expect(pickerRef.current).toBeNull();
    expect(cellRef.current).toBeNull();
    expect(rowRef.current).toBeNull();
  });

  it('lets consumer getters override default year and row attributes', () => {
    const { getByRole, queryByRole, container } = render(
      <YearPicker
        maxDate={new Date(2021, 11, 31)}
        value={new Date(2021, 0, 1)}
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
    expect(getByRole('link', { name: '2022' })).toBeEnabled();
    expect(getByRole('link', { name: '2022' })).toHaveAttribute('aria-disabled', 'false');
    expect(getByRole('link', { name: '2021' })).toHaveAttribute('tabindex', '-1');
    expect(getByRole('link', { name: '2021' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('link', { name: '2021' })).toHaveAttribute('data-selected', 'custom');
    expect(queryByRole('gridcell')).toBeNull();
    expect(container.querySelectorAll('[role="presentation"]')).toHaveLength(3);
    expect(queryByRole('row')).toBeNull();
  });

  it.each([undefined, null, ''])('preserves year content override semantics for %p', children => {
    const { getByRole } = render(<YearPicker getCellProps={() => ({ button: { children } })} />);
    // An empty button has no name, so locate the stable first cell instead.
    expect(getByRole('grid').querySelector('button')?.textContent).toBe(children === undefined ? '2020' : '');
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const defaultGrid = render(<YearPicker />);
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<YearPicker grid={{ children: null }} />);
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });

  describe('keyboard navigation', () => {
    it('provides one Tab entry point', () => {
      const { getByRole, cells } = renderYear();
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
      const { cells, onSelect, onNavigate } = renderYear();
      const cell = cells[5];
      act(() => cell.focus());
      expect(fireEvent.keyDown(cell, { key })).toBe(false);
      expect(cells[targetIndex]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(cells.filter(item => item.tabIndex === 0)).toEqual([cells[targetIndex]]);
    });

    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('leaves modified arrows uncancelled with %s', modifier => {
      const { cells, onSelect, onNavigate } = renderYear();
      act(() => cells[0].focus());
      for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
        expect(fireEvent.keyDown(cells[0], { key, [modifier]: true })).toBe(true);
      }
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each(['click', 'keydown'] as const)('selects with %s independently of navigation', type => {
      const { cells, onSelect } = renderYear();
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
      const { cells, onSelect, onNavigate } = renderYear(
        target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick },
      );
      expect(fireEvent.click(cells[2])).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderYear(
        target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown },
      );
      fireEvent.keyDown(cells[2], { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('runs cell and row handlers before delegated selection', () => {
      const order: string[] = [];
      const { cells } = renderYear({
        onCellClick: () => order.push('cell'),
        onRowClick: () => order.push('row'),
        onViewChange: () => order.push('selection'),
      });
      fireEvent.click(cells[2]);
      expect(order).toEqual(['cell', 'row', 'selection']);
    });

    it.each(['ArrowLeft', 'Enter'])('honors consumer cancellation of %s', key => {
      const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderYear({ onGridKeyDown });
      act(() => cells[0].focus());
      fireEvent.keyDown(cells[0], { key });
      expect(onGridKeyDown).toHaveBeenCalledTimes(1);
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('honors grid capture cancellation', () => {
      const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderYear({ onGridKeyDownCapture });
      fireEvent.keyDown(cells[0], { key: 'Enter' });
      expect(onGridKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each([false, true])('preserves unavailable-cell semantics with allFocusable=%s', allFocusable => {
      const { cells, onSelect } = renderYear({
        allFocusable,
        maxDate: new Date(2025, 11, 31),
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
        const { cells, onSelect, onNavigate } = renderYear();
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

    // Keyboard activation belongs to the focused gridcell; nested content keeps native key handling.
    it('selects SVG-child click content', () => {
      const { cells, onSelect, onNavigate } = renderYear({ renderIcon: true });
      fireEvent.click(cells[2].querySelector('path')!);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][1]).toMatchObject({ type: 'click', view: 'month' });
      expect(onNavigate.mock.calls[0][1].displayedDate.getFullYear()).toBe(2022);
    });

    it('allows pointer selection but not keyboard selection inside nested toolbar SVG content', () => {
      const { cells, onSelect } = renderYear({ renderIcon: true });
      const path = cells[2].querySelector('path')!;
      path.closest('span')!.setAttribute('role', 'toolbar');
      fireEvent.keyDown(path, { key: 'Enter' });
      expect(onSelect).not.toHaveBeenCalled();
      fireEvent.click(path);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it.each(['click', 'keydown'] as const)('lets onViewChange cancel and stop the %s event', type => {
      const onViewChange = jest.fn<void, Parameters<NonNullable<CalendarProps['onViewChange']>>>(event => {
        event.preventDefault();
        event.stopPropagation();
      });
      const { cells, container } = renderYear({ onViewChange });
      const onBubble = jest.fn();
      container.ownerDocument.body.addEventListener(type, onBubble);
      const defaultAllowed =
        type === 'click' ? fireEvent.click(cells[2]) : fireEvent.keyDown(cells[2], { key: 'Enter' });
      container.ownerDocument.body.removeEventListener(type, onBubble);
      expect(onViewChange).toHaveBeenCalledTimes(1);
      expect(defaultAllowed).toBe(false);
      expect(onBubble).not.toHaveBeenCalled();
    });
  });
});
