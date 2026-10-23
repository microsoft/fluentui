import * as React from 'react';
import { act, fireEvent, render as testingRender, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CalendarProvider, calendarContextDefaultValue } from '../calendarContext';
import type { CalendarContextValue } from '../calendarContext';
import { isConformant } from '../../../testing/isConformant';
import { CalendarMonth } from './CalendarMonth';
import { useCalendarMonth } from './useCalendarMonth';
import type { CalendarYearHandle } from '../CalendarYear';
import type { CalendarMonthHandle, CalendarMonthCellData, CalendarMonthSelectData } from './CalendarMonth.types';

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
  onPickerSelect?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
};

function renderMonth(options: MonthOptions = {}) {
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const grid = { onKeyDown: options.onGridKeyDown, onKeyDownCapture: options.onGridKeyDownCapture };
  const getRowProps = () => ({
    root: { onClick: options.onRowClick, onKeyDown: options.onRowKeyDown },
  });
  const getCellProps = () => ({
    root: {
      onClick: options.onCellClick,
      onKeyDown: options.onCellKeyDown,
    },
  });
  const onPickerSelect = (event: React.SyntheticEvent | Event, data: CalendarMonthSelectData) => {
    onSelect(event, data);
    if (data.type !== undefined) {
      options.onPickerSelect?.(data.event);
    }
  };
  const result = testingRender(
    <CalendarProvider
      value={{
        ...calendarContextDefaultValue,
        today,
        value: today,
        allFocusable: options.allFocusable ?? false,
        minDate: options.minDate,
        restrictedDates: options.restrictedDates,
        setValue: onSelect,
      }}
    >
      <CalendarMonth
        navigatedDate={today}
        onSelectDate={onPickerSelect}
        onNavigateDate={onNavigate}
        getCellProps={getCellProps}
        getRowProps={getRowProps}
        grid={grid}
      />
    </CalendarProvider>,
  );
  return {
    ...result,
    cells: result.getAllByRole('gridcell'),
    onSelect,
    onNavigate,
  };
}

const render = (element: React.ReactElement, contextValue: Partial<CalendarContextValue> = {}) =>
  testingRender(element, {
    wrapper: ({ children }) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, ...contextValue }}>{children}</CalendarProvider>
    ),
  });

describe('CalendarMonth', () => {
  it('renders a noninteractive heading without button attributes when the year picker is hidden', () => {
    const { container } = render(<CalendarMonth navigatedDate={today} yearPickerHidden />);
    const heading = container.querySelector('[data-fui-calendar-picker="month"] > div > div')!;

    expect(heading.tagName).toBe('DIV');
    expect(heading).not.toHaveAttribute('onClick');
    expect(heading).not.toHaveAttribute('onKeyDown');
    expect(heading).not.toHaveAttribute('type');
    expect(heading).not.toHaveAttribute('aria-label');
  });

  it('keeps row and month state data-only and resolves HTML props on demand', () => {
    const getCellProps = jest.fn(() => ({ root: { title: 'Custom month' } }));
    const getRowProps = jest.fn(() => ({ root: { title: 'Custom row' } }));
    const { result } = renderHook(() =>
      useCalendarMonth({ navigatedDate: new Date(2020, 8, 18), getCellProps, getRowProps }, null),
    );
    const state = result.current;
    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).not.toHaveBeenCalled();
    state.monthRows.forEach(row => {
      expect(row).not.toHaveProperty('root');
      row.cells.forEach(cell => {
        expect(cell).not.toHaveProperty('root');
        expect(cell.label).toEqual(expect.any(String));
      });
    });
    const row = state.monthRows[2];
    const month = row.cells[0];
    const cellProps = state.getMonthCellProps(month);
    expect(cellProps.root).toMatchObject({
      role: 'gridcell',
      'aria-label': 'September',
      title: 'Custom month',
      tabIndex: 0,
      focusgroupstart: '',
    });
    expect(cellProps.button).toMatchObject({ type: 'button', children: month.label, tabIndex: -1 });
    expect(state.getMonthRowProps(row).root).toMatchObject({
      role: 'row',
      focusgrouprow: '',
      title: 'Custom row',
    });
    expect(getCellProps).toHaveBeenCalledWith(month);
    expect(getRowProps).toHaveBeenCalledWith(row);
    expect(month).not.toHaveProperty('root');
  });

  isConformant({
    Component: CalendarMonth,
    displayName: 'CalendarMonth',
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('marks the navigated month as the focusgroup start target', () => {
    const { container } = render(<CalendarMonth navigatedDate={new Date(2020, 8, 18)} />);
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid).toHaveAttribute('focusgroup', 'grid manual');
    expect(grid.querySelector('[focusgroupstart]')).toHaveAttribute('aria-label', 'September');
    expect(grid.querySelectorAll('[focusgroupstart]')).toHaveLength(1);
    expect(grid.querySelectorAll('[role="row"][focusgrouprow]')).toHaveLength(3);
    expect(grid.childNodes).toHaveLength(3);
  });

  it.each([3, 4] as const)('renders %s month columns and preserves selection and imperative focus', columns => {
    const onSelectDate = jest.fn();
    const getRowProps = jest.fn(() => ({ root: {} }));
    const imperativeRef = React.createRef<CalendarMonthHandle>();
    const { getByRole, getAllByRole } = render(
      <CalendarMonth
        navigatedDate={today}
        imperativeRef={imperativeRef}
        onSelectDate={onSelectDate}
        getRowProps={getRowProps}
      />,
      { calendarMonthColumns: columns },
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(12 / columns);
    rows.forEach(row => expect(row.children).toHaveLength(columns));
    expect(getRowProps.mock.calls).toHaveLength(12 / columns);

    act(() => imperativeRef.current?.focus());
    expect(getByRole('gridcell', { name: 'September' })).toHaveFocus();
    fireEvent.click(getByRole('gridcell', { name: 'May' }));
    expect(onSelectDate.mock.calls[0][1].date).toEqual(new Date(2020, 4, 18));

    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    const yearRows = getAllByRole('row');
    expect(yearRows).toHaveLength(3);
    yearRows.forEach(row => expect(row.children).toHaveLength(4));
  });

  it('updates the focusgroup start without stealing focus when the navigated month changes', () => {
    const { container, getByRole, rerender } = render(<CalendarMonth navigatedDate={new Date(2020, 8, 18)} />);
    act(() => getByRole('gridcell', { name: 'October' }).focus());

    rerender(<CalendarMonth navigatedDate={new Date(2020, 10, 18)} />);

    expect(getByRole('gridcell', { name: 'October' })).toHaveFocus();
    expect(container.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'November' })).toHaveAttribute('focusgroupstart');
    expect(getByRole('gridcell', { name: 'October' })).not.toHaveAttribute('focusgroupstart');
  });

  it('marks an available initial month when the navigated month becomes disabled', () => {
    const picker = (minDate?: Date) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, minDate }}>
        <CalendarMonth navigatedDate={new Date(2020, 8, 18)} />
      </CalendarProvider>
    );
    const { container, getByRole, rerender } = testingRender(picker());
    act(() => getByRole('gridcell', { name: 'October' }).focus());

    rerender(picker(new Date(2020, 10, 1)));

    expect(getByRole('gridcell', { name: 'October' }).querySelector('button')).toBeDisabled();
    expect(container.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'November' })).toHaveAttribute('focusgroupstart');
  });

  it('swaps in the headless year picker from its header', () => {
    const selectedDate = new Date(2020, 8, 18);
    const { container } = render(<CalendarMonth navigatedDate={selectedDate} />, { value: selectedDate });

    fireEvent.click(container.querySelector('button')!);

    expect(container.textContent).toContain('2020 - 2031');
  });

  it.each([2020, 2021])('exposes factual current and selected month state in %s without styling flags', year => {
    const { getByRole, container } = render(<CalendarMonth navigatedDate={new Date(year, 8, 18)} />, {
      today,
      value: new Date(2020, 2, 18),
    });

    expect(getByRole('gridcell', { name: 'September' }).hasAttribute('data-current')).toBe(year === 2020);
    expect(getByRole('gridcell', { name: 'March' }).hasAttribute('data-selected')).toBe(year === 2020);
    expect(container.querySelectorAll('[data-current]')).toHaveLength(year === 2020 ? 1 : 0);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(year === 2020 ? 1 : 0);
  });

  it('customizes resolved cells and rows without changing the grid structure or focus handle', () => {
    const handle = React.createRef<CalendarMonthHandle>();
    const pickerRef = React.createRef<HTMLDivElement>();
    const cellRef = React.createRef<HTMLDivElement>();
    const rowRef = React.createRef<HTMLDivElement>();
    const getCellProps = jest.fn((cell: CalendarMonthCellData) => {
      expect(cell).not.toHaveProperty('root');
      expect(cell.label).toEqual(expect.any(String));
      return {
        root: cell.index === 8 ? { ref: cellRef, title: 'Custom month' } : {},
        button: cell.index === 8 ? { children: <strong>{cell.label}</strong> } : {},
      };
    });
    const { container, getByRole, unmount } = render(
      <CalendarMonth
        ref={pickerRef}
        imperativeRef={handle}
        navigatedDate={new Date(2020, 8, 18)}
        getCellProps={getCellProps}
        getRowProps={row => {
          expect(row).not.toHaveProperty('root');
          row.cells.forEach(cell => {
            expect(cell).not.toHaveProperty('root');
            expect(cell.label).toEqual(expect.any(String));
          });
          return { root: { title: `Row ${row.key}`, ref: row.key === 2 ? rowRef : undefined } };
        }}
      />,
    );
    const september = getByRole('gridcell', { name: 'September' });
    expect(pickerRef.current).toBe(container.firstElementChild);
    expect(getCellProps).toHaveBeenCalledTimes(12);
    expect(cellRef.current).toBe(september);
    expect(september.querySelector('button strong')).toHaveTextContent('Sep');
    expect(september).toHaveAttribute('title', 'Custom month');
    expect(rowRef.current).toContainElement(september);
    expect(rowRef.current).toHaveAttribute('title', 'Row 2');
    expect(container.querySelectorAll('[role="row"]')).toHaveLength(3);
    act(() => handle.current?.focus());
    expect(september).toHaveFocus();
    unmount();
    expect(pickerRef.current).toBeNull();
    expect(handle.current).toBeNull();
    expect(cellRef.current).toBeNull();
    expect(rowRef.current).toBeNull();
  });

  it('lets consumer getters override default month and row attributes', () => {
    const { getByRole, queryByRole, container } = render(
      <CalendarMonth
        navigatedDate={new Date(2020, 8, 18)}
        getCellProps={() => ({
          root: {
            role: 'link',
            tabIndex: -1,
            'aria-disabled': false,
            'aria-selected': false,
            'data-selected': 'custom',
          },
          button: { disabled: false },
        })}
        getRowProps={() => ({ root: { role: 'presentation' } })}
      />,
      { minDate: new Date(2020, 8, 1), value: new Date(2020, 8, 18) },
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
    const { getByRole } = render(
      <CalendarMonth navigatedDate={new Date(2020, 8, 18)} getCellProps={() => ({ button: { children } })} />,
    );
    expect(getByRole('gridcell', { name: 'September' }).textContent).toBe(children === undefined ? 'Sep' : '');
  });

  it('preserves year focus restoration with a consumer imperativeRef and root ref', async () => {
    const yearRef = React.createRef<CalendarYearHandle>();
    const yearRootRef = React.createRef<HTMLDivElement>();
    const selectedDate = new Date(2020, 8, 18);
    const { getByRole, unmount } = render(
      <CalendarMonth navigatedDate={selectedDate} yearPicker={{ ref: yearRootRef, imperativeRef: yearRef }} />,
      { value: selectedDate },
    );

    fireEvent.click(getByRole('button', { name: '2020, change year' }));

    expect(yearRef.current?.focus).toBeInstanceOf(Function);
    expect(yearRootRef.current).toContainElement(getByRole('gridcell', { name: '2020' }));
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());
    unmount();
    expect(yearRef.current).toBeNull();
    expect(yearRootRef.current).toBeNull();
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const navigatedDate = new Date(2020, 8, 18);
    const defaultGrid = render(<CalendarMonth navigatedDate={navigatedDate} />);
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<CalendarMonth navigatedDate={navigatedDate} grid={{ children: null }} />);
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

  // TODO: Uncomment focusgroup keyboard tests when V2 grid support is published by the polyfill.
  describe.skip('focusgroup keyboard navigation (requires focusgroup V2 grid support)', () => {
    it('has no cell Tab stop when every month is unavailable', () => {
      const { cells } = renderMonth({ minDate: new Date(2021, 0, 1) });
      expect(cells.every(cell => cell.matches(':disabled'))).toBe(true);
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
      const { cells, onSelect, onNavigate } = renderMonth({
        ...(target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick }),
      });
      expect(fireEvent.click(cells[2])).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderMonth({
        ...(target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown }),
      });
      fireEvent.keyDown(cells[2], { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it('runs cell and row handlers before delegated selection', () => {
      const order: string[] = [];
      const { cells, onSelect } = renderMonth({
        onCellClick: () => order.push('cell'),
        onRowClick: () => order.push('row'),
      });
      onSelect.mockImplementation(() => order.push('selection'));
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
      expect(unavailable.hasAttribute('disabled')).toBe(!allFocusable);
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
    it.each(['click', 'keydown'] as const)('forwards %s with the cell button as currentTarget', type => {
      const targets: HTMLButtonElement[] = [];
      const onPickerSelect = jest.fn((event: React.SyntheticEvent<HTMLButtonElement>) => {
        targets.push(event.currentTarget);
        event.preventDefault();
        event.stopPropagation();
      });
      const { cells, container } = renderMonth({ onPickerSelect });
      const onBubble = jest.fn();
      container.ownerDocument.body.addEventListener(type, onBubble);
      const defaultAllowed =
        type === 'click' ? fireEvent.click(cells[2]) : fireEvent.keyDown(cells[2], { key: 'Enter' });
      container.ownerDocument.body.removeEventListener(type, onBubble);
      expect(onPickerSelect).toHaveBeenCalledTimes(1);
      expect(targets).toEqual([cells[2]]);
      expect(defaultAllowed).toBe(false);
      expect(onBubble).not.toHaveBeenCalled();
    });
  });
});
