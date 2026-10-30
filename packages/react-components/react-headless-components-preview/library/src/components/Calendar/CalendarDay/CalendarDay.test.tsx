import * as React from 'react';
import { flushSync } from 'react-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../../testing/isConformant';
import { CalendarProvider, calendarContextDefaultValue } from '../calendarContext';
import { CalendarDay } from './CalendarDay';
import { useCalendarDay } from './useCalendarDay';
import type {
  CalendarDayHandle,
  CalendarDayProps,
  CalendarDayCellData,
  CalendarDayRowData,
  CalendarDayWeekdayCellData,
} from './CalendarDay.types';

const today = new Date(2020, 8, 18);

type DayOptions = Pick<CalendarDayProps, 'weeksToShow' | 'getCellProps'> & {
  allFocusable?: boolean;
  minDate?: Date;
  restrictedDates?: Date[];
  onGridKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onGridKeyDownCapture?: React.KeyboardEventHandler<HTMLElement>;
  onCellClick?: React.MouseEventHandler<HTMLElement>;
  onCellKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onRowClick?: React.MouseEventHandler<HTMLElement>;
  onRowKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  renderIcon?: boolean;
};

function renderDay(options: DayOptions = {}) {
  const onSelect = jest.fn();
  const onNavigate = jest.fn();
  const element = ({
    allFocusable = false,
    minDate,
    restrictedDates,
    onGridKeyDown,
    onGridKeyDownCapture,
    onCellClick,
    onCellKeyDown,
    onRowClick,
    onRowKeyDown,
    renderIcon,
    getCellProps,
    ...props
  }: DayOptions) => (
    <CalendarProvider
      value={{
        ...calendarContextDefaultValue,
        today,
        value: today,
        allFocusable,
        minDate,
        restrictedDates,
        setValue: onSelect,
      }}
    >
      <CalendarDay
        navigatedDate={today}
        onNavigateDate={onNavigate}
        grid={{ onKeyDown: onGridKeyDown, onKeyDownCapture: onGridKeyDownCapture }}
        getCellProps={day => ({
          root: { onClick: onCellClick, onKeyDown: onCellKeyDown },
          ...(renderIcon
            ? {
                button: {
                  children: (
                    <span>
                      <svg aria-label="Custom icon">
                        <path />
                      </svg>
                    </span>
                  ),
                },
              }
            : {}),
          ...getCellProps?.(day),
        })}
        getRowProps={() => ({ root: { onClick: onRowClick, onKeyDown: onRowKeyDown } })}
        {...props}
      />
    </CalendarProvider>
  );
  const result = render(element(options));
  return {
    ...result,
    cells: result.getAllByRole('gridcell'),
    onSelect,
    onNavigate,
    rerenderPicker: (nextOptions: DayOptions) => result.rerender(element(nextOptions)),
  };
}

describe('CalendarDay', () => {
  it('keeps repeated-element state data-only and resolves HTML props on demand', () => {
    const getCellProps = jest.fn(() => ({ root: { title: 'Custom day' } }));
    const getRowProps = jest.fn(() => ({ root: { title: 'Custom row' } }));
    const getWeekdayCellProps = jest.fn(() => ({ root: { title: 'Custom weekday' } }));
    const { result } = renderHook(() =>
      useCalendarDay({ navigatedDate: today, getCellProps, getRowProps, getWeekdayCellProps }, null),
    );
    const state = result.current;
    const week = state.weeks[0];
    const day = week.days[0];
    const weekday = state.weekdayRow.cells[0];

    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).not.toHaveBeenCalled();
    expect(getWeekdayCellProps).not.toHaveBeenCalled();
    for (const row of [state.weekdayRow, ...state.weeks]) {
      expect(row).not.toHaveProperty('root');
      const cells = row.type === 'week' ? row.days : row.cells;
      cells.forEach(cell => {
        expect(cell).not.toHaveProperty('root');
        expect(cell).not.toHaveProperty('button');
        expect(cell).not.toHaveProperty('marker');
        expect(cell.label).toEqual(expect.any(String));
      });
    }
    const dayProps = state.getDayCellProps(day);
    expect(dayProps.root).toMatchObject({ role: 'gridcell', title: 'Custom day' });
    expect(dayProps.button).toMatchObject({ type: 'button', tabIndex: -1 });
    expect(dayProps.label.children).toBe(day.label);
    expect(state.getDayRowProps(week).root).toMatchObject({ role: 'row', title: 'Custom row' });
    expect(state.getDayRowProps(state.weekdayRow).root).toMatchObject({ role: 'row', title: 'Custom row' });
    expect(state.getWeekdayCellProps(weekday).root).toMatchObject({
      role: 'columnheader',
      children: weekday.label,
      title: 'Custom weekday',
    });
    expect(getCellProps).toHaveBeenCalledWith(day);
    expect(getRowProps).toHaveBeenCalledWith(week);
    expect(getWeekdayCellProps).toHaveBeenCalledWith(weekday);
    expect(day).not.toHaveProperty('root');
  });

  isConformant({
    Component: CalendarDay,
    displayName: 'CalendarDay',
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('renders its day grid through the grid slot', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} grid={{ id: 'custom-grid' }} />);

    const grid = container.querySelector('table[role="grid"]')!;
    expect(grid.id).toBe('custom-grid');
  });

  it('customizes day cells and their content without replacing the grid behavior', () => {
    const cellRef = React.createRef<HTMLTableCellElement>();
    const { getByRole } = render(
      <CalendarDay
        navigatedDate={new Date(2020, 8, 18)}
        getCellProps={day =>
          day.originalDate?.getDate() === 15
            ? {
                root: { ref: cellRef, title: 'Appointment' },
                label: { children: <strong>{day.label}</strong> },
              }
            : {}
        }
      />,
    );
    const button = getByRole('button', { name: 'September 15, 2020' });

    expect(cellRef.current).toBe(button.closest('td'));
    expect(cellRef.current).toHaveAttribute('title', 'Appointment');
    expect(cellRef.current).toHaveAttribute('role', 'gridcell');
    expect(button.querySelector('strong')).toHaveTextContent('15');
  });

  it('renders no navigation icons, since icons are a styled concern', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('svg')).toBeNull();
  });

  it('passes only semantic data to cell, row and weekday getters, including nested items', () => {
    const checkDay = (day: CalendarDayCellData) => {
      expect(day.label).toEqual(expect.any(String));
      expect(day.isNavigated).toEqual(expect.any(Boolean));
      for (const key of ['root', 'props', 'button', 'marker']) {
        expect(day).not.toHaveProperty(key);
      }
    };
    const checkWeekday = (weekday: CalendarDayWeekdayCellData) => {
      expect(weekday.label).toEqual(expect.any(String));
      expect(weekday.accessibleLabel).toEqual(expect.any(String));
      expect(weekday).not.toHaveProperty('root');
    };
    const getCellProps = jest.fn((day: CalendarDayCellData) => {
      checkDay(day);
      return { root: { title: day.label } };
    });
    const getRowProps = jest.fn((row: CalendarDayRowData) => {
      expect(row).not.toHaveProperty('root');
      if (row.type === 'week') {
        row.days.forEach(checkDay);
      } else {
        row.cells.forEach(checkWeekday);
      }
      return {};
    });
    const getWeekdayCellProps = jest.fn((weekday: CalendarDayWeekdayCellData) => {
      checkWeekday(weekday);
      return {};
    });
    const { container } = render(
      <CalendarDay
        navigatedDate={today}
        getCellProps={getCellProps}
        getRowProps={getRowProps}
        getWeekdayCellProps={getWeekdayCellProps}
      />,
    );

    expect(getCellProps).toHaveBeenCalledTimes(container.querySelectorAll('td').length);
    expect(getRowProps).toHaveBeenCalledTimes(container.querySelectorAll('tr').length);
    expect(getWeekdayCellProps).toHaveBeenCalledTimes(7);
    expect(container.querySelector('td')).toHaveAttribute('title', '30');
  });

  it('composes element refs without replacing the imperative focus target', () => {
    const handle = React.createRef<CalendarDayHandle>();
    const pickerRef = React.createRef<HTMLDivElement>();
    const rootRef = React.createRef<HTMLTableCellElement>();
    const buttonRef = React.createRef<HTMLButtonElement>();
    const labelRef = React.createRef<HTMLSpanElement>();
    const markerRef = React.createRef<HTMLSpanElement>();
    const { container, getByRole, unmount } = render(
      <CalendarDay
        ref={pickerRef}
        imperativeRef={handle}
        navigatedDate={today}
        getMarkedDays={() => [today]}
        getCellProps={day =>
          day.originalDate?.getTime() === today.getTime()
            ? {
                root: { ref: rootRef },
                button: { ref: buttonRef },
                label: { ref: labelRef },
                marker: { ref: markerRef, children: 'Appointment' },
              }
            : {}
        }
      />,
    );
    const button = getByRole('button', { name: 'September 18, 2020, marked' });
    expect(pickerRef.current).toBe(container.firstElementChild);
    expect(rootRef.current).toBe(button.closest('td'));
    expect(buttonRef.current).toBe(button);
    expect(labelRef.current).toHaveTextContent('18');
    expect(markerRef.current).toHaveTextContent('Appointment');
    act(() => handle.current?.focus());
    expect(rootRef.current).toHaveFocus();

    unmount();
    expect(pickerRef.current).toBeNull();
    expect(handle.current).toBeNull();
    expect(rootRef.current).toBeNull();
    expect(buttonRef.current).toBeNull();
    expect(labelRef.current).toBeNull();
    expect(markerRef.current).toBeNull();
  });

  it('customizes rows, week numbers and weekday headers through resolved data', () => {
    const rowRef = React.createRef<HTMLTableRowElement>();
    const headerRef = React.createRef<HTMLTableCellElement>();
    const getCellProps = jest.fn(() => ({}));
    const getRowProps = jest.fn(
      (row: Parameters<NonNullable<React.ComponentProps<typeof CalendarDay>['getRowProps']>>[0]) => ({
        root: {
          title: row.type === 'week' ? 'Week' : 'Weekdays',
          ref: row.type === 'week' && row.key === 0 ? rowRef : undefined,
        },
        weekNumber: { className: 'custom-week-number' },
      }),
    );
    const { container, getByRole } = render(
      <CalendarProvider value={{ ...calendarContextDefaultValue, showWeekNumbers: true }}>
        <CalendarDay
          navigatedDate={today}
          getCellProps={getCellProps}
          getRowProps={getRowProps}
          getWeekdayCellProps={cell => ({
            root: cell.dayOfWeek === 'monday' ? { ref: headerRef, children: 'Monday', scope: 'row' } : {},
          })}
        />
      </CalendarProvider>,
    );

    expect(getCellProps).toHaveBeenCalledTimes(container.querySelectorAll('td').length);
    expect(getRowProps).toHaveBeenCalledTimes(container.querySelectorAll('tr').length);
    expect(rowRef.current).toHaveAttribute('title', 'Week');
    expect(container.querySelector('tr[title="Weekdays"]')).not.toBeNull();
    expect(container.querySelectorAll('th.custom-week-number')).toHaveLength(6);
    expect(headerRef.current).toBe(getByRole('columnheader', { name: 'Monday' }));
    expect(headerRef.current).toHaveAttribute('scope', 'row');
    expect(headerRef.current).toHaveTextContent('Monday');
  });

  it.each([undefined, null, '', false, 0])('preserves a button children override of %p', children => {
    const { getByRole } = render(
      <CalendarDay
        navigatedDate={today}
        getMarkedDays={() => [today]}
        getCellProps={day =>
          day.originalDate?.getTime() === today.getTime()
            ? { button: { children }, label: { children: 'Custom day' }, marker: { children: 'Marker' } }
            : { marker: { children: 'Must not create a marker' } }
        }
      />,
    );
    const button = getByRole('button', { name: 'September 18, 2020, marked' });

    expect(button.textContent).toBe(children === undefined ? 'Custom dayMarker' : children === 0 ? '0' : '');
    expect(button.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(children === undefined ? 1 : 0);
    expect(getByRole('button', { name: 'September 19, 2020' }).querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('lets defined consumer props override default cell and button attributes', () => {
    const { getByRole } = render(
      <CalendarProvider value={{ ...calendarContextDefaultValue, today, value: today, minDate: today }}>
        <CalendarDay
          navigatedDate={today}
          getCellProps={() => ({
            root: {
              role: 'link',
              tabIndex: -1,
              'aria-disabled': false,
              'aria-selected': false,
              'data-selected': 'custom',
              'data-outside-bounds': undefined,
            },
            button: { type: 'submit', disabled: false, tabIndex: 0 },
          })}
        />
      </CalendarProvider>,
    );
    const unavailable = getByRole('button', { name: 'September 17, 2020' });
    expect(unavailable).toBeEnabled();
    expect(unavailable).toHaveAttribute('type', 'submit');
    expect(unavailable).toHaveAttribute('tabindex', '0');
    expect(unavailable.closest('td')).toHaveAttribute('role', 'link');
    expect(unavailable.closest('td')).toHaveAttribute('aria-disabled', 'false');
    expect(unavailable.closest('td')).toHaveAttribute('data-outside-bounds');
    const selected = getByRole('button', { name: 'September 18, 2020' }).closest('td');
    expect(selected).toHaveAttribute('tabindex', '-1');
    expect(selected).toHaveAttribute('aria-selected', 'false');
    expect(selected).toHaveAttribute('data-selected', 'custom');
  });

  it('marks the navigated day as the initial entry point', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelector('table')).toHaveAttribute('focusgroup', 'grid rowflow');
    expect(container.querySelector('td[focusgroupstart] button')).toHaveAttribute('aria-label', 'September 18, 2020');
    expect(container.querySelector('td[focusgroupstart]')).toHaveAttribute('tabindex', '0');
    expect(container.querySelector('table[aria-activedescendant]')).toBeNull();
  });

  it('keeps the noninteractive heading out of the tab order', () => {
    const { container } = render(<CalendarDay navigatedDate={today} />);
    const heading = container.querySelector('[data-fui-calendar-picker="day"] > div > div')!;

    expect(heading.tagName).toBe('DIV');
    expect(heading).not.toHaveAttribute('tabindex');
    expect(heading).not.toHaveAttribute('aria-label');
    expect(heading).not.toHaveAttribute('onClick');
    expect(heading).not.toHaveAttribute('onKeyDown');
    expect(heading).not.toHaveAttribute('type');
  });

  it('prevents nested day buttons from taking focus away from the gridcell', () => {
    const { getByRole } = render(<CalendarDay navigatedDate={today} />);
    const button = getByRole('button', { name: 'September 18, 2020' });
    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });

    button.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('focuses the next-month control when no visible date is available', () => {
    const imperativeRef = React.createRef<CalendarDayHandle>();
    const nextMonthRef = React.createRef<HTMLButtonElement>();
    const { container, getByTitle } = render(
      <CalendarProvider
        value={{
          ...calendarContextDefaultValue,
          today,
          restrictedDates: Array.from({ length: 7 }, (_, index) => new Date(2020, 8, 13 + index)),
        }}
      >
        <CalendarDay
          navigatedDate={today}
          weeksToShow={1}
          imperativeRef={imperativeRef}
          nextMonthButton={{ ref: nextMonthRef }}
        />
      </CalendarProvider>,
    );
    expect(container.querySelectorAll('td[tabindex="0"]')).toHaveLength(0);
    act(() => imperativeRef.current?.focus());
    expect(getByTitle('Next month October')).toHaveFocus();
    expect(nextMonthRef.current).toBe(getByTitle('Next month October'));
  });

  it('updates the focusgroup start without stealing focus when the navigated date changes', () => {
    const { container, rerender } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);
    const remembered = container.querySelector<HTMLElement>('td:has(button[aria-label="September 19, 2020"])')!;
    act(() => remembered.focus());

    rerender(<CalendarDay navigatedDate={new Date(2020, 8, 20)} />);

    expect(remembered).toHaveFocus();
    expect(container.querySelectorAll('td[focusgroupstart]')).toHaveLength(1);
    expect(container.querySelector('td[focusgroupstart] button')).toHaveAttribute('aria-label', 'September 20, 2020');
    expect(remembered).toHaveAttribute('tabindex', '0');
  });

  it('renders its rows without motion wrappers', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    Array.from(container.querySelector('tbody')!.children).forEach(child => {
      expect(child.tagName).toBe('TR');
    });
  });

  // Those rows are hidden filler that only the styled slide animation needs. Rendering them here
  // would show two bogus weeks, since the headless layer has no CSS to hide them.
  it('omits the animation transition rows', () => {
    const { container } = render(<CalendarDay navigatedDate={new Date(2020, 8, 18)} />);

    expect(container.querySelectorAll('tr[aria-hidden="true"]')).toHaveLength(0);
    expect(container.querySelectorAll('thead > tr')).toHaveLength(1);
    expect(container.querySelectorAll('tbody > tr')).toHaveLength(5);
  });

  it('preserves null body children while rendering defaults when omitted', () => {
    const navigatedDate = new Date(2020, 8, 18);
    const defaultBody = render(<CalendarDay navigatedDate={navigatedDate} body={{ id: 'day-body' }} />);
    const body = defaultBody.container.querySelector('tbody#day-body')!;
    expect(body.children.length).toBeGreaterThan(0);
    expect(body.parentElement).toBe(defaultBody.container.querySelector('table'));
    expect(defaultBody.container.querySelectorAll('table > tr')).toHaveLength(0);

    const emptyBody = render(<CalendarDay navigatedDate={navigatedDate} body={{ children: null }} />);
    expect(emptyBody.container.querySelector('tbody')!.children).toHaveLength(0);
  });

  it('preserves the body slot while rendering the independent weekday header', () => {
    const getCellProps = jest.fn(() => ({}));
    const getRowProps = jest.fn(() => ({}));
    const getWeekdayCellProps = jest.fn(() => ({}));
    const { container, getByText } = render(
      <CalendarDay
        navigatedDate={today}
        getCellProps={getCellProps}
        getRowProps={getRowProps}
        getWeekdayCellProps={getWeekdayCellProps}
        body={{
          id: 'custom-body',
          children: (
            <tr>
              <td>Custom row</td>
            </tr>
          ),
        }}
      />,
    );

    expect(container.querySelector('tbody#custom-body')).toContainElement(getByText('Custom row'));
    expect(getCellProps).not.toHaveBeenCalled();
    expect(getRowProps).toHaveBeenCalledTimes(1);
    expect(getWeekdayCellProps).toHaveBeenCalledTimes(7);
  });

  describe('day-grid domain behavior', () => {
    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])(
      'passes modified boundary arrows through with %s',
      modifier => {
        const { cells, onNavigate } = renderDay();
        expect(fireEvent.keyDown(cells[0], { key: 'ArrowLeft', [modifier]: true })).toBe(true);
        expect(onNavigate).not.toHaveBeenCalled();
      },
    );

    it('requests controlled navigation beyond the visible day grid', () => {
      const { cells, onNavigate } = renderDay();
      act(() => cells[0].focus());
      expect(fireEvent.keyDown(cells[0], { key: 'ArrowLeft' })).toBe(false);
      expect(cells[0]).toHaveFocus();
      expect(onNavigate).toHaveBeenCalledTimes(1);
      expect(onNavigate.mock.calls[0][1].date).toEqual(new Date(2020, 7, 29));
    });

    it('pages from the focused day when rendered without the Calendar root', () => {
      const { getByRole, onNavigate } = renderDay();
      const cell = getByRole('button', { name: 'September 18, 2020' }).closest('[role="gridcell"]')!;

      expect(fireEvent.keyDown(cell, { key: 'PageUp' })).toBe(false);
      expect(onNavigate).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          date: new Date(2020, 7, 18),
          focusOnNavigatedDay: true,
          type: 'keydown',
        }),
      );
    });

    it('clears range hover attributes when paging to another month', async () => {
      const Picker = () => {
        const [navigatedDate, setNavigatedDate] = React.useState(today);
        return (
          <CalendarProvider value={{ ...calendarContextDefaultValue, today }}>
            <CalendarDay navigatedDate={navigatedDate} onNavigateDate={(_event, data) => setNavigatedDate(data.date)} />
          </CalendarProvider>
        );
      };
      const { getByRole } = render(<Picker />);
      const button = getByRole('button', { name: 'September 18, 2020' });
      const grid = getByRole('grid');
      fireEvent.mouseOver(button);
      expect(grid.querySelectorAll('[data-range-hovered]').length).toBeGreaterThan(0);

      fireEvent.keyDown(button.closest('[role="gridcell"]')!, { key: 'PageDown' });

      await waitFor(() => expect(grid.querySelectorAll('[data-range-hovered], [data-range-pressed]')).toHaveLength(0));
    });

    it('does not navigate beyond a minimum date', () => {
      const { cells, onNavigate } = renderDay({ minDate: new Date(2020, 7, 30) });
      fireEvent.keyDown(cells[0], { key: 'ArrowLeft' });
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('keeps a restricted navigated date enrolled in an allFocusable single-week grid', () => {
      const { getByRole, onSelect, onNavigate } = renderDay({
        allFocusable: true,
        weeksToShow: 1,
        restrictedDates: Array.from({ length: 7 }, (_, index) => new Date(2020, 8, 13 + index)),
      });
      const cell = getByRole('button', { name: 'September 18, 2020' }).closest('td')!;
      expect(cell).toHaveAttribute('tabindex', '0');
      fireEvent.keyDown(cell, { key: 'Enter' });
      fireEvent.click(cell);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('preserves the focus destination of a cancelled cell click', () => {
      const { cells, container, onSelect, onNavigate } = renderDay({
        getCellProps: () => ({
          root: {
            onClick: event => {
              event.preventDefault();
              editor.focus();
            },
          },
        }),
      });
      const editor = container.ownerDocument.createElement('input');
      container.appendChild(editor);
      expect(fireEvent.click(cells[2].querySelector('button')!)).toBe(false);
      expect(editor).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it.each(['Enter', ' ', 'ArrowLeft'])('honors cell cancellation of %p before selection or paging', key => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderDay({
        getCellProps: () => ({ root: { onKeyDown } }),
      });
      fireEvent.keyDown(cells[0], { key });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });

    it('does not redispatch a key after a synchronous consumer rerender', () => {
      const onAfterRerender = jest.fn();
      const onKeyDown = jest.fn(() => {
        flushSync(() => rerenderPicker({ getCellProps: () => ({ root: { onKeyDown: onAfterRerender } }) }));
      });
      const { cells, rerenderPicker } = renderDay({
        getCellProps: () => ({ root: { onKeyDown } }),
      });
      fireEvent.keyDown(cells[14], { key: 'ArrowRight' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onAfterRerender).not.toHaveBeenCalled();
    });

    it.each(['input', 'contenteditable'])('clears range hover and press state when leaving %s content', owner => {
      const { getByRole } = render(
        <CalendarProvider value={{ ...calendarContextDefaultValue, today, value: today, dateRangeType: 'week' }}>
          <CalendarDay
            navigatedDate={today}
            getCellProps={day => ({
              label: {
                children: (
                  <>
                    {day.label}
                    {owner === 'input' ? <input aria-label="Editor" /> : <span contentEditable />}
                  </>
                ),
              },
            })}
          />
        </CalendarProvider>,
      );
      const button = getByRole('button', { name: 'September 18, 2020' });
      const editor = button.querySelector<HTMLElement>('input, [contenteditable]')!;
      const grid = getByRole('grid');
      fireEvent.mouseOver(button);
      fireEvent.mouseDown(button);
      expect(grid.querySelectorAll('[data-range-hovered]')).toHaveLength(7);
      expect(grid.querySelectorAll('[data-range-pressed]')).toHaveLength(7);
      fireEvent.mouseOut(button, { relatedTarget: editor });
      fireEvent.mouseOver(editor, { relatedTarget: button });
      expect(grid.querySelectorAll('[data-range-hovered]')).toHaveLength(7);
      fireEvent.mouseOut(editor, { relatedTarget: grid });
      expect(grid.querySelectorAll('[data-range-hovered], [data-range-pressed]')).toHaveLength(0);
    });
  });

  // TODO: Uncomment focusgroup keyboard tests when V2 grid support is published by the polyfill.
  describe.skip('focusgroup keyboard navigation (requires focusgroup V2 grid support)', () => {
    it('provides a single Tab entry point', () => {
      const { getByRole, cells } = renderDay();
      const grid = getByRole('grid');
      expect(grid).not.toHaveAttribute('data-tabster');
      expect(cells.filter(cell => cell.tabIndex === 0)).toHaveLength(1);
      expect(grid.querySelectorAll('td button:not([tabindex="-1"])')).toHaveLength(0);
    });
    it.each([
      ['ArrowLeft', 13],
      ['ArrowRight', 15],
      ['ArrowUp', 7],
      ['ArrowDown', 21],
      ['Home', 14],
      ['End', 20],
    ] as const)('moves focus with %s without selecting', (key, targetIndex) => {
      const { cells, onSelect, onNavigate } = renderDay();
      const cell = cells[14];
      act(() => cell.focus());
      expect(fireEvent.keyDown(cell, { key })).toBe(false);
      expect(cells[targetIndex]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
      expect(cells.filter(item => item.tabIndex === 0)).toEqual([cells[targetIndex]]);
    });
    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('leaves modified arrows uncancelled with %s', modifier => {
      const { cells, onSelect, onNavigate } = renderDay();
      act(() => cells[0].focus());
      for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
        expect(fireEvent.keyDown(cells[0], { key, [modifier]: true })).toBe(true);
      }
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it.each(['click', 'keydown'] as const)('selects with %s independently of navigation', type => {
      const { cells, onSelect } = renderDay();
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
      const { cells, onSelect, onNavigate } = renderDay({
        ...(target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick }),
      });
      expect(fireEvent.click(cells[2])).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
      const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderDay({
        ...(target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown }),
      });
      fireEvent.keyDown(cells[2], { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it('runs cell and row handlers before delegated selection', () => {
      const order: string[] = [];
      const { cells, onSelect } = renderDay({
        onCellClick: () => order.push('cell'),
        onRowClick: () => order.push('row'),
      });
      onSelect.mockImplementation(() => order.push('selection'));
      fireEvent.click(cells[2]);
      expect(order).toEqual(['cell', 'row', 'selection']);
    });
    it.each(['ArrowLeft', 'Enter'])('honors consumer cancellation of %s', key => {
      const onGridKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderDay({ onGridKeyDown });
      act(() => cells[0].focus());
      fireEvent.keyDown(cells[0], { key });
      expect(onGridKeyDown).toHaveBeenCalledTimes(1);
      expect(cells[0]).toHaveFocus();
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it('honors grid capture cancellation', () => {
      const onGridKeyDownCapture = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
      const { cells, onSelect, onNavigate } = renderDay({ onGridKeyDownCapture });
      fireEvent.keyDown(cells[0], { key: 'Enter' });
      expect(onGridKeyDownCapture).toHaveBeenCalledTimes(1);
      expect(onSelect).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    });
    it.each([false, true])('preserves unavailable-cell semantics with allFocusable=%s', allFocusable => {
      const { cells, onSelect } = renderDay({
        allFocusable,
        minDate: new Date(2020, 8, 1),
        restrictedDates: [today],
      });
      const unavailable = cells.find(cell => cell.getAttribute('aria-disabled') === 'true')!;
      expect(unavailable).toBeDefined();
      expect(unavailable.querySelector('button')).toBeDisabled();
      expect(unavailable.hasAttribute('tabindex')).toBe(allFocusable);
      fireEvent.keyDown(unavailable, { key: 'Enter' });
      fireEvent.click(unavailable);
      expect(onSelect).not.toHaveBeenCalled();
    });
    it.each(['input', 'textarea', 'select', 'contenteditable', 'grid', 'toolbar'])(
      'preserves input ownership inside nested %s content',
      owner => {
        const { cells, onSelect, onNavigate } = renderDay();
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
      const { cells, onSelect } = renderDay({ renderIcon: true });
      const path = cells[2].querySelector('path')!;
      if (type === 'click') {
        fireEvent.click(path);
      } else {
        fireEvent.keyDown(path, { key: 'Enter' });
      }
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][1]).toMatchObject({ type, date: new Date(2020, 8, 1) });
    });
    it('allows pointer selection but not keyboard selection inside nested toolbar SVG content', () => {
      const { cells, onSelect } = renderDay({ renderIcon: true });
      const path = cells[2].querySelector('path')!;
      path.closest('span')!.setAttribute('role', 'toolbar');
      fireEvent.keyDown(path, { key: 'Enter' });
      expect(onSelect).not.toHaveBeenCalled();
      fireEvent.click(path);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });
});
