import * as React from 'react';
import { act, fireEvent, render as testingRender } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CalendarProvider, calendarContextDefaultValue } from '../calendarContext';
import type { CalendarContextValue } from '../calendarContext';
import { isConformant } from '../../../testing/isConformant';
import { CalendarYear } from './CalendarYear';
import { useCalendarYear } from './useCalendarYear';
import type { CalendarYearHandle, CalendarYearSelectData } from './CalendarYear.types';

const today = new Date(2020, 8, 18);

type YearOptions = {
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
  renderIcon?: boolean;
};

function renderYear(options: YearOptions = {}) {
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const grid = { onKeyDown: options.onGridKeyDown, onKeyDownCapture: options.onGridKeyDownCapture };
  const icon = (
    <span>
      <svg aria-label="Custom icon">
        <path />
      </svg>
    </span>
  );
  const getRowProps = () => ({
    root: { onClick: options.onRowClick, onKeyDown: options.onRowKeyDown },
  });
  const getCellProps = () => ({
    root: {
      onClick: options.onCellClick,
      onKeyDown: options.onCellKeyDown,
    },
    button: options.renderIcon ? { children: icon } : {},
  });
  const onPickerSelect = (event: React.SyntheticEvent | Event, data: CalendarYearSelectData) => {
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
      <CalendarYear
        navigatedYear={2020}
        onSelectYear={onPickerSelect}
        getCellProps={getCellProps}
        getRowProps={getRowProps}
        onNavigateDate={onNavigate}
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

describe('CalendarYear', () => {
  it('keeps row and year state data-only and resolves HTML props on demand', () => {
    const getCellProps = jest.fn(() => ({ root: { title: 'Custom year' } }));
    const getRowProps = jest.fn(() => ({ root: { title: 'Custom row' } }));
    const { result } = renderHook(() => useCalendarYear({ navigatedYear: 2020, getCellProps, getRowProps }, null));
    const state = result.current;
    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).not.toHaveBeenCalled();
    state.yearRows.forEach(row => {
      expect(row).not.toHaveProperty('root');
      row.cells.forEach(cell => {
        expect(cell).not.toHaveProperty('root');
        expect(cell).not.toHaveProperty('content');
        expect(cell.label).toEqual(expect.any(String));
      });
    });
    const row = state.yearRows[0];
    const year = row.cells[0];
    const cellProps = state.getYearCellProps(year);
    expect(cellProps.root).toMatchObject({
      role: 'gridcell',
      title: 'Custom year',
      tabIndex: 0,
      focusgroupstart: '',
    });
    expect(cellProps.button).toMatchObject({ type: 'button', children: year.label, tabIndex: -1 });
    expect(state.getYearRowProps(row).root).toMatchObject({
      role: 'row',
      focusgrouprow: '',
      title: 'Custom row',
    });
    expect(getCellProps).toHaveBeenCalledWith(year);
    expect(getRowProps).toHaveBeenCalledWith(row);
    expect(year).not.toHaveProperty('root');
  });

  isConformant({
    Component: CalendarYear,
    displayName: 'CalendarYear',
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('marks the navigated year as the focusgroup start target', () => {
    const { container } = render(<CalendarYear />, { value: new Date(2020, 0, 1) });
    const grid = container.querySelector('[role="grid"]')!;

    expect(grid).toHaveAttribute('focusgroup', 'grid manual');
    expect(grid.querySelector('[focusgroupstart]')).toHaveTextContent('2020');
    expect(grid.querySelectorAll('[focusgroupstart]')).toHaveLength(1);
    expect(grid.querySelectorAll('[role="row"][focusgrouprow]')).toHaveLength(3);
  });

  it('updates the focusgroup start without stealing focus when the navigated year changes', () => {
    const { container, getByRole, rerender } = render(<CalendarYear navigatedYear={2020} />);
    act(() => getByRole('gridcell', { name: '2022' }).focus());

    rerender(<CalendarYear navigatedYear={2021} />);

    expect(getByRole('gridcell', { name: '2022' })).toHaveFocus();
    expect(container.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2021' })).toHaveAttribute('focusgroupstart');
    expect(getByRole('gridcell', { name: '2022' })).not.toHaveAttribute('focusgroupstart');
  });

  it('marks an available initial year when the navigated year becomes disabled', () => {
    const picker = (minDate?: Date) => (
      <CalendarProvider value={{ ...calendarContextDefaultValue, minDate }}>
        <CalendarYear navigatedYear={2020} />
      </CalendarProvider>
    );
    const { container, getByRole, rerender } = testingRender(picker());
    act(() => getByRole('gridcell', { name: '2022' }).focus());

    rerender(picker(new Date(2023, 0, 1)));

    expect(getByRole('button', { name: '2022' })).toBeDisabled();
    expect(container.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);
    expect(getByRole('gridcell', { name: '2023' })).toHaveAttribute('focusgroupstart');
  });

  it('renders a range of twelve years', () => {
    const { container } = render(<CalendarYear />, { value: new Date(2020, 0, 1) });

    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);
  });

  it.each(['Enter', ' '])('activates the focused year gridcell with %s', key => {
    const { cells, onSelect } = renderYear();
    act(() => cells[1].focus());

    expect(fireEvent.keyDown(cells[1], { key })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][1].year).toBe(2021);
  });

  it('honors grid cancellation when activating a focused year gridcell', () => {
    const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { cells, onSelect, onNavigate } = renderYear({ onGridKeyDown });
    act(() => cells[0].focus());

    expect(fireEvent.keyDown(cells[0], { key: 'Enter' })).toBe(false);
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

  it.each([3, 4] as const)('uses %s columns for standalone year layout', columns => {
    const { getAllByRole, getByRole } = render(<CalendarYear navigatedYear={2020} />, {
      calendarYearColumns: columns,
    });
    expect(getAllByRole('row')).toHaveLength(12 / columns);
    getAllByRole('row').forEach(row => expect(row.children).toHaveLength(columns));
    expect(getByRole('grid')).toHaveAttribute('focusgroup', 'grid manual');
    expect(getByRole('gridcell', { name: '2020' })).toHaveAttribute('focusgroupstart');
  });

  it('exposes factual current and selected year state without styling flags', () => {
    const { getByRole, container } = render(<CalendarYear navigatedYear={2020} />, {
      today: new Date(2020, 8, 18),
      maxDate: new Date(2023, 11, 31),
      value: new Date(2022, 0, 1),
    });

    expect(getByRole('gridcell', { name: '2020' })).toHaveAttribute('data-current');
    expect(getByRole('gridcell', { name: '2020' })).not.toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: '2022' })).toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: '2022' })).not.toHaveAttribute('data-current');
    expect(getByRole('gridcell', { name: '2024' })).toHaveAttribute('data-outside-bounds');
    expect(container.querySelectorAll('[data-current]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(1);
  });

  it('customizes resolved year cells and rows while retaining focus and selection', () => {
    const handle = React.createRef<CalendarYearHandle>();
    const pickerRef = React.createRef<HTMLDivElement>();
    const cellRef = React.createRef<HTMLDivElement>();
    const rowRef = React.createRef<HTMLDivElement>();
    const onSelectYear = jest.fn();
    const { container, getByRole, unmount } = render(
      <CalendarYear
        ref={pickerRef}
        imperativeRef={handle}
        navigatedYear={2020}
        onSelectYear={onSelectYear}
        getCellProps={cell => {
          expect(cell).not.toHaveProperty('root');
          expect(cell).not.toHaveProperty('content');
          expect(cell.label).toEqual(expect.any(String));
          return {
            root: cell.year === 2020 ? { ref: cellRef } : {},
            button: cell.year === 2020 ? { children: <strong>{cell.label}</strong> } : {},
          };
        }}
        getRowProps={row => {
          expect(row).not.toHaveProperty('root');
          row.cells.forEach(cell => {
            expect(cell).not.toHaveProperty('root');
            expect(cell).not.toHaveProperty('content');
            expect(cell.label).toEqual(expect.any(String));
          });
          return { root: { title: `Row ${row.key}`, ref: row.key === 0 ? rowRef : undefined } };
        }}
      />,
    );
    const year = getByRole('gridcell', { name: '2020' });
    expect(pickerRef.current).toBe(container.firstElementChild);
    expect(cellRef.current).toBe(year);
    expect(year.querySelector('button strong')).toHaveTextContent('2020');
    expect(rowRef.current).toContainElement(year);
    expect(rowRef.current).toHaveAttribute('title', 'Row 0');
    act(() => handle.current?.focus());
    expect(year).toHaveFocus();
    fireEvent.click(year);
    expect(onSelectYear).toHaveBeenCalledTimes(1);
    expect(onSelectYear.mock.calls[0][1].year).toBe(2020);
    unmount();
    expect(pickerRef.current).toBeNull();
    expect(handle.current).toBeNull();
    expect(cellRef.current).toBeNull();
    expect(rowRef.current).toBeNull();
  });

  it('lets consumer getters override default year and row attributes', () => {
    const { getByRole, queryByRole, container } = render(
      <CalendarYear
        navigatedYear={2020}
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
      { minDate: new Date(2022, 0, 1), value: new Date(2022, 0, 1) },
    );
    expect(getByRole('link', { name: '2020' })).toBeEnabled();
    expect(getByRole('link', { name: '2020' })).toHaveAttribute('aria-disabled', 'false');
    expect(getByRole('link', { name: '2022' })).toHaveAttribute('tabindex', '-1');
    expect(getByRole('link', { name: '2022' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('link', { name: '2022' })).toHaveAttribute('data-selected', 'custom');
    expect(queryByRole('gridcell')).toBeNull();
    expect(container.querySelectorAll('[role="presentation"]')).toHaveLength(3);
    expect(queryByRole('row')).toBeNull();
  });

  it.each([undefined, null, ''])('preserves year content override semantics for %p', children => {
    const { getByRole } = render(<CalendarYear navigatedYear={2020} getCellProps={() => ({ button: { children } })} />);
    // An empty button has no name, so locate the stable first cell instead.
    expect(getByRole('grid').querySelector('button')?.textContent).toBe(children === undefined ? '2020' : '');
  });

  it('preserves null grid children while rendering defaults when omitted', () => {
    const defaultGrid = render(<CalendarYear />, { value: new Date(2020, 0, 1) });
    expect(defaultGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(12);

    const emptyGrid = render(<CalendarYear grid={{ children: null }} />, { value: new Date(2020, 0, 1) });
    expect(emptyGrid.container.querySelectorAll('[role="gridcell"]')).toHaveLength(0);
  });

  // TODO: Uncomment focusgroup keyboard tests when V2 grid support is published by the polyfill.
  describe.skip('focusgroup keyboard navigation (requires focusgroup V2 grid support)', () => {
    it('has no cell Tab stop when every year is unavailable', () => {
      const { cells } = renderYear({ minDate: new Date(2040, 0, 1) });
      expect(cells.every(cell => cell.matches(':disabled'))).toBe(true);
      expect(cells.filter(cell => cell.tabIndex === 0)).toHaveLength(0);
    });

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
      const { cells, onSelect, onNavigate } = renderYear({
        ...(target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick }),
      });
      expect(fireEvent.click(cells[2])).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderYear({
        ...(target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown }),
      });
      fireEvent.keyDown(cells[2], { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it('runs cell and row handlers before delegated selection', () => {
      const order: string[] = [];
      const { cells, onSelect } = renderYear({
        onCellClick: () => order.push('cell'),
        onRowClick: () => order.push('row'),
      });
      onSelect.mockImplementation(() => order.push('selection'));
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
        minDate: new Date(2021, 0, 1),
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
    it.each(['click', 'keydown'] as const)('selects SVG-child %s content', type => {
      const { cells, onSelect } = renderYear({ renderIcon: true });
      const path = cells[2].querySelector('path')!;
      if (type === 'click') {
        fireEvent.click(path);
      } else {
        fireEvent.keyDown(path, { key: 'Enter' });
      }
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][1]).toMatchObject({ type, year: 2022 });
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
    it.each(['click', 'keydown'] as const)('forwards %s with the cell button as currentTarget', type => {
      const targets: HTMLButtonElement[] = [];
      const onPickerSelect = jest.fn((event: React.SyntheticEvent<HTMLButtonElement>) => {
        targets.push(event.currentTarget);
        event.preventDefault();
        event.stopPropagation();
      });
      const { cells, container } = renderYear({ onPickerSelect });
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
