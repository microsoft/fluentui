import * as React from 'react';
import { flushSync } from 'react-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { renderCalendar } from '../../calendar';
import { Calendar } from './Calendar';
import { useCalendar } from './useCalendar';
import { calendarFormatters, focusCalendarGrid } from './utils';
import type {
  CalendarCellData,
  CalendarCellProps,
  CalendarProps,
  CalendarRenderFunction,
  CalendarRowData,
  CalendarRowProps,
  CalendarWeekdayCellData,
  CalendarWeekdayCellProps,
} from './Calendar.types';

type Overrides<T> = { [K in keyof T]?: Partial<NonNullable<T[K]>> };
type CellGetter = (cell: CalendarCellData) => Overrides<CalendarCellProps> | undefined;
type RowGetter = (row: CalendarRowData) => Overrides<Omit<CalendarRowProps, 'children'>> | undefined;
type WeekdayCellGetter = (weekday: CalendarWeekdayCellData) => Overrides<CalendarWeekdayCellProps> | undefined;

/**
 * Applies defined overrides over built-in element props. Override handlers run first, and `preventDefault` skips the
 * built-in handler.
 */
const merge = <T extends object>(defaults: T, overrides: object | undefined): T => {
  const result = { ...defaults } as Record<string, unknown>;
  for (const [key, value] of Object.entries(overrides ?? {})) {
    const builtIn = result[key];
    if (value === undefined) {
      continue;
    }
    result[key] =
      key.startsWith('on') && typeof value === 'function' && typeof builtIn === 'function'
        ? (event: React.SyntheticEvent) => {
            value(event);
            if (!event.isDefaultPrevented()) {
              builtIn(event);
            }
          }
        : value;
  }
  return result as T;
};

/** Adapts per-cell prop overrides to `renderCell`. */
const withCellProps =
  (getProps: CellGetter): CalendarRenderFunction<CalendarCellProps, CalendarCellData> =>
  (props, cell, defaultRender) => {
    const overrides = getProps(cell);
    return defaultRender({
      root: merge(props.root, overrides?.root),
      button: merge(props.button, overrides?.button),
      label: props.label && merge(props.label, overrides?.label),
      marker: props.marker && merge(props.marker, overrides?.marker),
    });
  };

/** Adapts per-row prop overrides to `renderRow`. */
const withRowProps =
  (getProps: RowGetter): CalendarRenderFunction<CalendarRowProps, CalendarRowData> =>
  (props, row, defaultRender) => {
    const overrides = getProps(row);
    return defaultRender({
      ...props,
      root: merge(props.root, overrides?.root),
      weekNumber: props.weekNumber && merge(props.weekNumber, overrides?.weekNumber),
    });
  };

/** Adapts per-weekday prop overrides to `renderWeekdayCell`. */
const withWeekdayCellProps =
  (getProps: WeekdayCellGetter): CalendarRenderFunction<CalendarWeekdayCellProps, CalendarWeekdayCellData> =>
  (props, weekday, defaultRender) =>
    defaultRender({ root: merge(props.root, getProps(weekday)?.root) });

const today = new Date(2020, 8, 18);
const dayLabel = (date: Date) => calendarFormatters.dateTime({ date, format: 'monthDayYear' });

describe('Calendar rendering and public API', () => {
  it.each([
    [undefined, 'September 2020, change month'],
    ['month', 'September 2020, change month'],
    ['year', 'September 2020, change year'],
  ] as const)('names a day heading that opens %s after the view it opens', (dayHeadingView, name) => {
    const { getByRole } = render(<Calendar today={today} layout="overlay" dayHeadingView={dayHeadingView} />);
    expect(getByRole('button', { name })).toBeInTheDocument();
  });

  it('keeps a consumer day heading formatter for a heading that opens the year grid', () => {
    const { getByRole } = render(
      <Calendar
        today={today}
        dayHeadingView="year"
        formatters={{ dayPickerHeaderLabel: data => `${data.formattedDate}, pick` }}
      />,
    );
    expect(getByRole('button', { name: 'September 2020, pick' })).toBeInTheDocument();
  });

  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: ['consistent-callback-args'],
  });

  it('renders the day grid and the month picker', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('starts with no selected date while still identifying today', () => {
    const { getByRole } = render(<Calendar today={today} />);
    const todayCell = getByRole('button', { name: dayLabel(today) }).closest('[role="gridcell"]')!;

    expect(todayCell).toHaveAttribute('aria-current', 'date');
    expect(todayCell).not.toHaveAttribute('aria-selected', 'true');
  });

  it('warns once when a controlled value is outside the configured bounds', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const value = new Date(2020, 8, 18);
    const props = { value, minDate: new Date(2020, 8, 19), today };
    const { rerender, getByRole } = render(<Calendar {...props} />);

    expect(getByRole('button', { name: dayLabel(value) }).closest('[role="gridcell"]')).not.toHaveAttribute(
      'aria-selected',
      'true',
    );
    rerender(<Calendar {...props} />);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      'Calendar: value is outside minDate/maxDate and is rendered as an empty selection.',
    );

    warn.mockRestore();
  });

  it('lets a consumer cancel navigation-button actions', () => {
    const onDisplayedDateChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        today={today}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        onDisplayedDateChange={onDisplayedDateChange}
        previousButton={{ onClick: event => event.preventDefault() }}
      />,
    );

    fireEvent.click(getByRole('button', { name: 'Previous month September' }));

    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it('composes consumer handlers with month navigation and Go to today', () => {
    const onDisplayedDateChange = jest.fn();
    const onNextMonthClick = jest.fn();
    const onGoToTodayClick = jest.fn();
    const { getByRole } = render(
      <Calendar
        today={today}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        onDisplayedDateChange={onDisplayedDateChange}
        nextButton={{ onClick: onNextMonthClick }}
        goToTodayButton={{ onClick: onGoToTodayClick }}
      />,
    );

    fireEvent.click(getByRole('button', { name: 'Next month November' }));
    expect(onNextMonthClick).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ displayedDate: new Date(2020, 10, 18) }),
    );

    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    expect(onGoToTodayClick).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ displayedDate: today }),
    );
  });

  it('keeps day-button consumer handlers and delegated selection', () => {
    const onSelectDate = jest.fn();
    const onButtonClick = jest.fn();
    const selected = new Date(2020, 8, 19);
    const { getByRole } = render(
      <Calendar
        today={today}
        defaultDisplayedDate={today}
        onSelectDate={onSelectDate}
        renderCell={withCellProps(cell =>
          cell.type === 'day' && cell.originalDate?.getTime() === selected.getTime()
            ? { button: { onClick: onButtonClick } }
            : {},
        )}
      />,
    );

    fireEvent.click(getByRole('button', { name: dayLabel(selected) }));

    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onSelectDate).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ date: selected }));
  });

  it.each([
    { layout: 'sideBySide', view: 'day', dayOnly: false, monthOnly: false },
    { layout: 'sideBySide', view: 'day', dayOnly: true, monthOnly: false },
    { layout: 'sideBySide', view: 'day', dayOnly: false, monthOnly: true },
    { layout: 'overlay', view: 'day', dayOnly: false, monthOnly: false },
    { layout: 'overlay', view: 'month', dayOnly: false, monthOnly: false },
    { layout: 'overlay', view: 'day', dayOnly: true, monthOnly: false },
    { layout: 'overlay', view: 'month', dayOnly: false, monthOnly: true },
  ] as const)(
    'renders Go to today once as the last root child ($layout, $view, dayOnly=$dayOnly, monthOnly=$monthOnly)',
    ({ layout, view, dayOnly, monthOnly }) => {
      const { getByRole, container } = render(
        <Calendar
          today={today}
          layout={layout}
          view={view}
          dayPicker={monthOnly ? null : { id: 'day-picker' }}
          weeksToShow={6}
          monthPicker={dayOnly ? null : { id: 'month-picker-wrapper' }}
          data-testid="calendar"
        />,
      );
      const button = getByRole('button', { name: 'Go to today' });
      const monthVisible = !dayOnly && (layout === 'sideBySide' || view === 'month');
      expect(container.querySelector('[data-testid="calendar"]')?.lastElementChild).toBe(button);
      expect(button.previousElementSibling).toBe(
        container.querySelector(monthVisible ? '#month-picker-wrapper' : '#day-picker'),
      );
      expect(button.closest('#month-picker-wrapper')).toBeNull();
    },
  );

  it('supports a six-week day grid and a three-column month grid together', () => {
    const { container, getByRole } = render(<Calendar today={today} calendarMonthColumns={3} weeksToShow={6} />);
    expect(container.querySelectorAll('table thead > tr')).toHaveLength(1);
    expect(container.querySelectorAll('table tbody > tr')).toHaveLength(6);
    const rows = container.querySelectorAll('div[role="grid"] [role="row"]');
    expect(rows).toHaveLength(4);
    rows.forEach(row => expect(row.children).toHaveLength(3));
    expect(getByRole('button', { name: 'Go to today' })).toBeDisabled();
  });

  it('can hide Go to today without hiding either picker', () => {
    const { queryByRole, getAllByRole } = render(<Calendar goToTodayButton={null} />);
    expect(queryByRole('button', { name: 'Go to today' })).toBeNull();
    expect(getAllByRole('grid')).toHaveLength(2);
  });

  it('marks the initial roving tab stop in each grid', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const dayGrid = container.querySelector('table[role="grid"]')!;
    expect(dayGrid).not.toHaveAttribute('focusgroup');
    expect(dayGrid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);

    const monthGrid = container.querySelector('div[role="grid"]')!;
    expect(monthGrid.querySelectorAll('[role="row"]')).toHaveLength(3);
    monthGrid.querySelectorAll('[role="row"]').forEach(row => expect(row.children).toHaveLength(4));
    expect(monthGrid).not.toHaveAttribute('focusgroup');
    expect(monthGrid.querySelectorAll('[role="gridcell"][tabindex="0"]')).toHaveLength(1);
  });

  it.each([
    [3, 3],
    [3, 4],
    [4, 3],
    [4, 4],
  ] as const)('configures month columns=%s and year columns=%s independently', (monthColumns, yearColumns) => {
    const { getAllByRole, getByRole } = render(
      <Calendar
        today={today}
        value={today}
        dayPicker={null}
        calendarMonthColumns={monthColumns}
        calendarYearColumns={yearColumns}
      />,
    );
    expect(getAllByRole('row')).toHaveLength(12 / monthColumns);
    getAllByRole('row').forEach(row => expect(row.children).toHaveLength(monthColumns));
    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    expect(getAllByRole('row')).toHaveLength(12 / yearColumns);
    getAllByRole('row').forEach(row => expect(row.children).toHaveLength(yearColumns));
  });

  it('updates the roving tab stop when columns change without stealing external focus', () => {
    const calendar = (columns: 3 | 4) => (
      <>
        <Calendar today={today} value={today} dayPicker={null} calendarMonthColumns={columns} />
        <button>Outside</button>
      </>
    );
    const { getByRole, getAllByRole, rerender } = render(calendar(3));
    act(() => getByRole('gridcell', { name: 'December' }).focus());
    act(() => getByRole('button', { name: 'Outside' }).focus());

    rerender(calendar(4));

    expect(getAllByRole('row')).toHaveLength(3);
    expect(getByRole('gridcell', { name: 'September' })).toHaveAttribute('tabindex', '0');
    expect(getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it('emits no Griffel styles of its own', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    // Griffel atomic classes are the actual CSS payload. The headless layer must carry none.
    container.querySelectorAll('[class]').forEach(el => {
      expect(el.className).not.toMatch(/___/);
    });
  });

  it('emits no styled class names at all', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const leaked = new Set<string>();
    container.querySelectorAll('[class]').forEach(el => {
      el.className
        .split(/\s+/)
        .filter(name => name.startsWith('fui-'))
        .forEach(name => leaked.add(name));
    });

    expect([...leaked]).toEqual([]);
  });

  it('preserves range interaction state without imposing corner geometry', () => {
    const { container, getByRole } = render(<Calendar value={today} today={today} daysToSelectInDayView={3} />);
    const cornerAttributes = () =>
      Array.from(container.querySelectorAll('td')).flatMap(cell =>
        cell.getAttributeNames().filter(name => name.startsWith('data-corner-')),
      );
    expect(cornerAttributes()).toEqual([]);
    expect(container.querySelectorAll('td[data-selected]')).toHaveLength(3);

    const button = getByRole('button', { name: 'September 21, 2020' });
    fireEvent.mouseOver(button);
    fireEvent.mouseDown(button);
    expect(container.querySelectorAll('td[data-range-hovered]')).toHaveLength(3);
    expect(container.querySelectorAll('td[data-range-pressed]')).toHaveLength(3);
    expect(cornerAttributes()).toEqual([]);

    fireEvent.mouseOut(button);
    expect(container.querySelectorAll('td[data-range-hovered], td[data-range-pressed]')).toHaveLength(0);
    expect(cornerAttributes()).toEqual([]);
  });

  it('exposes day state through data attributes', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} />);

    expect(container.querySelector('td[data-selected]')).not.toBeNull();
    expect(container.querySelector('td[data-today]')).not.toBeNull();
    expect(container.querySelector('td[data-outside-month]')).not.toBeNull();
  });

  it('renders the pickers through slots, so they can be customized', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} showWeekNumbers />);

    expect(container.querySelector('th[scope="row"]')).not.toBeNull();
    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(2);
  });

  it('supports custom Calendar composition through the public hooks and renderer', () => {
    const CustomCalendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
      const state = useCalendar(props, ref);
      return renderCalendar(state);
    });
    const { getAllByRole } = render(<CustomCalendar value={new Date(2020, 8, 18)} showWeekNumbers />);

    expect(getAllByRole('grid')).toHaveLength(2);
    expect(getAllByRole('rowheader').length).toBeGreaterThan(0);
  });

  it.each(['dayPicker', 'monthPicker'] as const)('preserves a null %s slot', picker => {
    const props: CalendarProps = picker === 'dayPicker' ? { dayPicker: null } : { monthPicker: null };
    const Probe = () => {
      const state = useCalendar(props, null);
      return <div data-testid="picker-state" data-slot-undefined={state[picker] === undefined} />;
    };
    const { getByTestId } = render(<Probe />);

    expect(getByTestId('picker-state')).toHaveAttribute('data-slot-undefined', 'true');
  });

  it('selects months without rendering or switching to a day picker', () => {
    const onSelectDate = jest.fn();
    const onViewChange = jest.fn();
    const { container, getByRole, getAllByRole } = render(
      <Calendar
        dayPicker={null}
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 18)}
        dateRangeType="month"
        layout="overlay"
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
      />,
    );

    fireEvent.click(getByRole('gridcell', { name: 'October' }));

    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][1].date).toEqual(new Date(2020, 9, 18));
    expect(onViewChange).not.toHaveBeenCalled();
    expect(container.querySelector('table[role="grid"]')).toBeNull();
    expect(getAllByRole('grid')).toHaveLength(1);
    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders only the day grid when the month picker is null', () => {
    const { getAllByRole, queryByRole } = render(
      <Calendar monthPicker={null} value={new Date(2020, 8, 18)} layout="overlay" />,
    );

    expect(getAllByRole('grid')).toHaveLength(1);
    expect(queryByRole('gridcell', { name: 'September' })).toBeNull();
    expect(queryByRole('button', { name: /change month/ })).toBeNull();
  });

  it('preserves day focus restoration with a consumer panel ref', async () => {
    const dayRootRef = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ ref: dayRootRef }}
      />,
    );

    expect(dayRootRef.current).toContainElement(getByRole('button', { name: 'October 18, 2020' }));
    fireEvent.click(getByRole('button', { name: 'Go to today' }));

    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
  });

  it('preserves month focus restoration with a consumer panel ref', async () => {
    const monthRootRef = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <Calendar value={new Date(2020, 8, 18)} layout="overlay" monthPicker={{ ref: monthRootRef }} />,
    );

    fireEvent.click(getByRole('button', { name: /September 2020, change month/ }));

    expect(monthRootRef.current).toContainElement(getByRole('gridcell', { name: 'September' }));
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
  });

  it('restores focus across Go to today and the year grid', async () => {
    const { getByRole } = render(
      <Calendar today={new Date(2020, 8, 18)} defaultDisplayedDate={new Date(2020, 9, 18)} />,
    );

    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020 - 2031, change year' }));
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
  });

  it('defaults to side-by-side and restores focus when a layout change hides the focused month picker', async () => {
    const { getByRole, queryByRole, rerender } = render(<Calendar value={new Date(2020, 8, 18)} />);

    expect(getByRole('button', { name: 'September 18, 2020' })).toBeInTheDocument();
    act(() => getByRole('gridcell', { name: 'March' }).focus());
    rerender(<Calendar value={new Date(2020, 8, 18)} layout="overlay" />);

    expect(queryByRole('gridcell', { name: 'March' })).toBeNull();
    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
  });
});

describe('Calendar interaction sequences', () => {
  it.each([
    { key: 'PageUp', shiftKey: false, targetDate: new Date(2020, 7, 25) },
    { key: 'PageDown', shiftKey: false, targetDate: new Date(2020, 9, 25) },
    { key: 'PageUp', shiftKey: true, targetDate: new Date(2019, 8, 25) },
    { key: 'PageDown', shiftKey: true, targetDate: new Date(2021, 8, 25) },
  ])('pages from the focused date with $key and shiftKey=$shiftKey', async ({ key, shiftKey, targetDate }) => {
    const onDisplayedDateChange = jest.fn();
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        onDisplayedDateChange={onDisplayedDateChange}
        onSelectDate={onSelectDate}
      />,
    );
    const focusedDay = getByRole('button', { name: 'September 25, 2020' }).closest('td')!;
    act(() => focusedDay.focus());
    expect(focusedDay).toHaveFocus();

    fireEvent.keyDown(focusedDay, { key, shiftKey });

    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(targetDate);
    expect(onSelectDate).not.toHaveBeenCalled();
    await waitFor(() => expect(getByRole('button', { name: dayLabel(targetDate) }).closest('td')).toHaveFocus());
  });

  it.each([
    { anchorDate: new Date(2021, 0, 18), focusedDate: new Date(2021, 0, 31), shiftKey: false },
    { anchorDate: new Date(2020, 1, 18), focusedDate: new Date(2020, 1, 29), shiftKey: true },
  ])('clamps a focused month-end or leap day when paging', async ({ anchorDate, focusedDate, shiftKey }) => {
    const onDisplayedDateChange = jest.fn();
    const targetDate = new Date(2021, 1, 28);
    const { getByRole } = render(
      <Calendar defaultValue={anchorDate} today={today} onDisplayedDateChange={onDisplayedDateChange} />,
    );
    const focusedDay = getByRole('button', { name: dayLabel(focusedDate) }).closest('td')!;
    act(() => focusedDay.focus());

    fireEvent.keyDown(focusedDay, { key: 'PageDown', shiftKey });

    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(targetDate);
    await waitFor(() => expect(getByRole('button', { name: dayLabel(targetDate) }).closest('td')).toHaveFocus());
  });

  it('preserves controlled navigation and consumer cancellation after moving focus', () => {
    const onDisplayedDateChange = jest.fn();
    const onKeyDown = jest.fn((event: React.KeyboardEvent) => {
      if (event.key === 'PageDown') {
        event.preventDefault();
      }
    });
    const { getByRole, rerender } = render(
      <Calendar value={today} displayedDate={today} onDisplayedDateChange={onDisplayedDateChange} />,
    );
    const focusedDay = getByRole('button', { name: 'September 25, 2020' }).closest('td')!;
    act(() => focusedDay.focus());
    fireEvent.keyDown(focusedDay, { key: 'PageDown' });
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 9, 25));
    expect(getByRole('button', { name: 'September 25, 2020' })).toBeTruthy();

    onDisplayedDateChange.mockClear();
    rerender(
      <Calendar
        value={today}
        displayedDate={today}
        onKeyDown={onKeyDown}
        onDisplayedDateChange={onDisplayedDateChange}
      />,
    );
    fireEvent.keyDown(focusedDay, { key: 'PageDown' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(focusedDay).toHaveFocus();
  });

  it.each([false, true])('only owns Escape when onDismiss is provided: %s', ownsDismissal => {
    const onDismiss = jest.fn();
    const onParentKeyDown = jest.fn();
    const { getByRole } = render(
      <div onKeyDown={onParentKeyDown}>
        <Calendar defaultValue={today} today={today} onDismiss={ownsDismissal ? onDismiss : undefined} />
      </div>,
    );
    fireEvent.keyDown(getByRole('button', { name: dayLabel(today) }).closest('td')!, { key: 'Escape' });
    expect(onDismiss).toHaveBeenCalledTimes(ownsDismissal ? 1 : 0);
    expect(onParentKeyDown).toHaveBeenCalledTimes(ownsDismissal ? 0 : 1);
  });

  it.each(['Backspace', 'Enter', 'PageUp', 'PageDown'])('preserves %s in editable header content', key => {
    const onDisplayedDateChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        onDisplayedDateChange={onDisplayedDateChange}
        monthPicker={null}
        heading={{ children: <input aria-label="Custom header" defaultValue="2020" /> }}
      />,
    );
    const input = getByRole('textbox', { name: 'Custom header' });
    input.focus();
    expect(fireEvent.keyDown(input, { key })).toBe(true);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it('preserves paging keys in nested contenteditable content', () => {
    const onDisplayedDateChange = jest.fn();
    const { getByText } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        onDisplayedDateChange={onDisplayedDateChange}
        monthPicker={null}
        heading={{
          children: (
            <div contentEditable suppressContentEditableWarning>
              <span>Editable year</span>
            </div>
          ),
        }}
      />,
    );
    expect(fireEvent.keyDown(getByText('Editable year'), { key: 'PageDown' })).toBe(true);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it.each(['grid', 'toolbar'])('preserves paging keys owned by a nested %s', owner => {
    const onDisplayedDateChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        onDisplayedDateChange={onDisplayedDateChange}
        monthPicker={null}
        heading={{ children: <div role={owner} tabIndex={0} aria-label={`Nested ${owner}`} /> }}
      />,
    );
    const nestedWidget = getByRole(owner, { name: `Nested ${owner}` });
    nestedWidget.focus();

    expect(fireEvent.keyDown(nestedWidget, { key: 'PageDown' })).toBe(true);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(nestedWidget).toHaveFocus();
  });

  it('does not cancel native Enter activation for custom header buttons', () => {
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        layout="sideBySide"
        monthPicker={null}
        heading={{ children: <button type="button">Custom action</button> }}
      />,
    );
    expect(fireEvent.keyDown(getByRole('button', { name: 'Custom action' }), { key: 'Enter' })).toBe(true);
  });

  it('keeps an unavailable go-to-today action focusable but inactive with allFocusable', () => {
    const onDisplayedDateChange = jest.fn();
    const onViewChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={today}
        today={today}
        allFocusable
        onDisplayedDateChange={onDisplayedDateChange}
        onViewChange={onViewChange}
      />,
    );
    const button = getByRole('button', { name: 'Go to today' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(onViewChange).not.toHaveBeenCalled();
    expect(button).toHaveFocus();
  });

  it.each([1, 2, 3, 4])('navigates to today within the same month in a %s-week day grid', async weeksToShow => {
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 1)}
        today={today}
        monthPicker={null}
        weeksToShow={weeksToShow}
        onSelectDate={onSelectDate}
      />,
    );
    const button = getByRole('button', { name: 'Go to today' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'false');
    fireEvent.click(button);
    await waitFor(() => expect(getByRole('button', { name: dayLabel(today) }).closest('td')).toHaveFocus());
    expect(button).toBeDisabled();
    expect(onSelectDate).not.toHaveBeenCalled();
  });

  it.each(['sunday', 'monday'] as const)(
    'reveals and focuses today in a five-week grid when the month needs six rows starting on %s',
    async firstDayOfWeek => {
      const monthEnd = new Date(2020, 7, 31);
      const onDisplayedDateChange = jest.fn();
      const onSelectDate = jest.fn();
      const { getAllByRole, getByRole, queryByRole } = render(
        <Calendar
          defaultValue={null}
          defaultDisplayedDate={new Date(2020, 7, 1)}
          today={monthEnd}
          firstDayOfWeek={firstDayOfWeek}
          monthPicker={null}
          weeksToShow={5}
          onDisplayedDateChange={onDisplayedDateChange}
          onSelectDate={onSelectDate}
        />,
      );
      expect(queryByRole('button', { name: dayLabel(monthEnd) })).toBeNull();
      expect(getAllByRole('row')).toHaveLength(6);
      const button = getByRole('button', { name: 'Go to today' });
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'false');

      fireEvent.click(button);

      expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
      expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(monthEnd);
      await waitFor(() => expect(getByRole('button', { name: dayLabel(monthEnd) }).closest('td')).toHaveFocus());
      expect(getAllByRole('row')).toHaveLength(6);
      expect(button).toBeDisabled();
      expect(onSelectDate).not.toHaveBeenCalled();
    },
  );

  it('clamps go-to-today within a shortened grid to the maximum date', async () => {
    const maxDate = new Date(2020, 8, 10);
    const { getByRole } = render(
      <Calendar
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 1)}
        today={today}
        maxDate={maxDate}
        monthPicker={null}
        weeksToShow={1}
      />,
    );
    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: dayLabel(maxDate) }).closest('td')).toHaveFocus());
    expect(getByRole('button', { name: 'Go to today' })).toBeDisabled();
  });

  it('reveals the maximum date when go-to-today is clamped into the sixth month row', async () => {
    const maxDate = new Date(2020, 7, 31);
    const { getByRole, queryByRole } = render(
      <Calendar
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 7, 1)}
        today={today}
        maxDate={maxDate}
        monthPicker={null}
        weeksToShow={5}
      />,
    );
    expect(queryByRole('button', { name: dayLabel(maxDate) })).toBeNull();
    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: dayLabel(maxDate) }).closest('td')).toHaveFocus());
    expect(getByRole('button', { name: 'Go to today' })).toBeDisabled();
  });

  describe('focus ownership', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
      act(() => jest.runOnlyPendingTimers());
      jest.useRealTimers();
    });

    it.each([
      { key: 'PageUp', focusTarget: 'day' },
      { key: 'PageDown', focusTarget: 'day' },
      { key: 'PageUp', focusTarget: 'navigation' },
      { key: 'PageDown', focusTarget: 'navigation' },
    ])(
      'cancels queued $key focus from $focusTarget when focus leaves Calendar before the next frame',
      ({ key, focusTarget }) => {
        const { getByRole, getByTitle } = render(
          <>
            <Calendar defaultValue={today} today={today} />
            <button type="button">Outside action</button>
          </>,
        );
        const target =
          focusTarget === 'day'
            ? getByRole('button', { name: dayLabel(today) }).closest('td')!
            : getByTitle('Next month October');
        act(() => target.focus());
        fireEvent.keyDown(target, { key });
        const outside = getByRole('button', { name: 'Outside action' });
        outside.focus();
        expect(outside).toHaveFocus();

        act(() => jest.advanceTimersToNextFrame());

        expect(outside).toHaveFocus();
      },
    );

    it('does not reclaim focus moved outside by a navigation callback before focus is queued', () => {
      const outsideRef = React.createRef<HTMLButtonElement>();
      const { getByRole } = render(
        <>
          <Calendar defaultValue={today} today={today} onDisplayedDateChange={() => outsideRef.current?.focus()} />
          <button ref={outsideRef} type="button">
            Outside action
          </button>
        </>,
      );
      const day = getByRole('button', { name: dayLabel(today) }).closest('td')!;
      act(() => day.focus());
      fireEvent.keyDown(day, { key: 'PageDown' });
      expect(outsideRef.current).toHaveFocus();

      act(() => jest.advanceTimersToNextFrame());

      expect(outsideRef.current).toHaveFocus();
    });

    it.each(['day', 'month'] as const)('does not reclaim outside focus when controlled view hides %s', view => {
      const onBlurCapture = jest.fn();
      const { getByRole, rerender } = render(
        <>
          <Calendar defaultValue={today} today={today} layout="overlay" view={view} onBlurCapture={onBlurCapture} />
          <button type="button">Outside action</button>
        </>,
      );
      const pickerCell =
        view === 'day'
          ? getByRole('button', { name: dayLabel(today) }).closest('td')!
          : getByRole('gridcell', { name: 'September' });
      act(() => pickerCell.focus());
      const outside = getByRole('button', { name: 'Outside action' });
      outside.focus();
      expect(onBlurCapture).toHaveBeenCalledTimes(1);
      rerender(
        <>
          <Calendar
            defaultValue={today}
            today={today}
            layout="overlay"
            view={view === 'day' ? 'month' : 'day'}
            onBlurCapture={onBlurCapture}
          />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => jest.advanceTimersToNextFrame());
      expect(outside).toHaveFocus();
    });

    it('does not reclaim outside focus when a layout change hides the previously focused month picker', () => {
      const { getByRole, queryByRole, rerender } = render(
        <>
          <Calendar defaultValue={today} today={today} layout="sideBySide" />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => getByRole('gridcell', { name: 'September' }).focus());
      const outside = getByRole('button', { name: 'Outside action' });
      outside.focus();
      rerender(
        <>
          <Calendar defaultValue={today} today={today} layout="overlay" />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => jest.advanceTimersToNextFrame());
      expect(queryByRole('gridcell', { name: 'September' })).toBeNull();
      expect(outside).toHaveFocus();
    });

    it.each(['sideBySide', 'overlay'] as const)(
      'moves focus to the year grid when a controlled view replaces the focused month grid in %s',
      layout => {
        const { getByRole, rerender } = render(<Calendar today={today} layout={layout} view="month" />);
        act(() => getByRole('gridcell', { name: 'September' }).focus());

        rerender(<Calendar today={today} layout={layout} view="year" />);

        expect(getByRole('gridcell', { name: '2020' })).toHaveFocus();
      },
    );

    it('keeps focus on the month heading when a controlled view swaps the month and year grids', () => {
      const { getByRole, rerender } = render(<Calendar today={today} view="month" />);
      act(() => getByRole('button', { name: '2020, change year' }).focus());

      rerender(<Calendar today={today} view="year" />);

      expect(getByRole('button', { name: '2020 - 2031, change year' })).toHaveFocus();
    });

    it('does not reclaim outside focus when a controlled view replaces the month grid', () => {
      const { getByRole, rerender } = render(
        <>
          <Calendar today={today} view="month" />
          <button type="button">Outside action</button>
        </>,
      );
      act(() => getByRole('gridcell', { name: 'September' }).focus());
      const outside = getByRole('button', { name: 'Outside action' });
      outside.focus();

      rerender(
        <>
          <Calendar today={today} view="year" />
          <button type="button">Outside action</button>
        </>,
      );

      expect(outside).toHaveFocus();
    });
  });
});

describe('Calendar day grid', () => {
  // Day-grid behavior, ported from the former standalone CalendarDay suite. Calendar renders only the day panel here.

  type DayOptions = Pick<CalendarProps, 'weeksToShow' | 'dateRangeType'> & {
    getCellProps?: CellGetter;
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

  /** Renders a day-only Calendar with a controlled displayed date, so navigation requests are only reported. */
  function renderDay(options: DayOptions = {}) {
    const onSelect = jest.fn();
    const onNavigate = jest.fn();
    const element = ({
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
      <Calendar
        today={today}
        value={today}
        displayedDate={today}
        monthPicker={null}
        onSelectDate={onSelect}
        onDisplayedDateChange={onNavigate}
        grid={{ onKeyDown: onGridKeyDown, onKeyDownCapture: onGridKeyDownCapture }}
        renderCell={withCellProps(cell => ({
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
          ...getCellProps?.(cell),
        }))}
        renderRow={withRowProps(() => ({ root: { onClick: onRowClick, onKeyDown: onRowKeyDown } }))}
        {...props}
      />
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

  const isToday = (cell: CalendarCellData) => cell.type === 'day' && cell.originalDate?.getTime() === today.getTime();

  describe('Calendar day grid', () => {
    it('keeps repeated-element state data-only and resolves built-in HTML props on demand', () => {
      const renderCell = jest.fn();
      const renderRow = jest.fn();
      const renderWeekdayCell = jest.fn();
      const { result } = renderHook(() =>
        useCalendar({ today, displayedDate: today, monthPicker: null, renderCell, renderRow, renderWeekdayCell }, null),
      );
      const state = result.current;
      const [weekdayRow, week] = state.panels[0].rows;
      if (weekdayRow.type !== 'weekday' || week.type !== 'week') {
        throw new Error('Expected the weekday header followed by weeks');
      }
      const day = week.cells[0];
      const weekday = weekdayRow.cells[0];

      expect(renderCell).not.toHaveBeenCalled();
      expect(renderRow).not.toHaveBeenCalled();
      expect(renderWeekdayCell).not.toHaveBeenCalled();
      expect(state).toMatchObject({ renderCell, renderRow, renderWeekdayCell });
      for (const row of state.panels[0].rows) {
        expect(row).not.toHaveProperty('root');
        (row.cells as Array<CalendarCellData | CalendarWeekdayCellData>).forEach(cell => {
          expect(cell).not.toHaveProperty('root');
          expect(cell).not.toHaveProperty('button');
          expect(cell).not.toHaveProperty('marker');
          expect(cell.label).toEqual(expect.any(String));
        });
      }
      const dayProps = state.resolveCellProps(day);
      expect(dayProps.root).toMatchObject({ role: 'gridcell' });
      expect(dayProps.button).toMatchObject({ type: 'button', tabIndex: -1 });
      expect(dayProps.label?.children).toBe(day.label);
      expect(state.resolveRowProps(week).root).toEqual({ role: 'row' });
      expect(state.resolveRowProps(weekdayRow).root).toEqual({ role: 'row' });
      expect(state.resolveWeekdayCellProps(weekday).root).toMatchObject({
        role: 'columnheader',
        children: weekday.label,
        title: weekday.accessibleLabel,
      });
      expect(day).not.toHaveProperty('root');
    });

    it('passes built-in props, data and the default renderer to the render functions', () => {
      const renderCell = jest.fn<
        React.ReactNode,
        Parameters<CalendarRenderFunction<CalendarCellProps, CalendarCellData>>
      >((props, _cell, defaultRender) => defaultRender(props));
      const renderRow = jest.fn<React.ReactNode, Parameters<CalendarRenderFunction<CalendarRowProps, CalendarRowData>>>(
        (props, _row, defaultRender) => defaultRender(props),
      );
      const { container } = render(
        <Calendar today={today} monthPicker={null} renderCell={renderCell} renderRow={renderRow} />,
      );
      expect(renderCell).toHaveBeenCalledTimes(container.querySelectorAll('td').length);
      expect(renderRow).toHaveBeenCalledTimes(container.querySelectorAll('tr').length);
      const [props, cell] = renderCell.mock.calls[0];
      expect(cell).toMatchObject({ type: 'day' });
      expect(props.root).toMatchObject({ role: 'gridcell' });
      expect(container.querySelectorAll('thead tr')).toHaveLength(1);
    });

    it.each([
      ['gridHeader', 'thead', 'tbody'],
      ['gridBody', 'tbody', 'thead'],
    ] as const)('omits only the day grid section whose %s slot is null', (slotName, removed, kept) => {
      const { container } = render(<Calendar today={today} monthPicker={null} {...{ [slotName]: null }} />);
      const grid = container.querySelector('table')!;
      expect(grid.querySelector(removed)).toBeNull();
      expect(grid.querySelector(kept)).not.toBeNull();
      expect(grid.querySelectorAll(':scope > tr')).toHaveLength(0);
      expect(grid.querySelectorAll('[role="columnheader"]')).toHaveLength(kept === 'thead' ? 7 : 0);
      expect(grid.querySelectorAll('[role="gridcell"]').length).toBe(kept === 'tbody' ? 35 : 0);
    });

    it('lets render functions replace the markup of repeated elements', () => {
      const { container } = render(
        <Calendar
          today={today}
          monthPicker={null}
          renderCell={({ root }, cell) => (
            <td {...(root as React.ComponentProps<'td'>)} data-testid={`cell-${cell.key}`}>
              {cell.label}
            </td>
          )}
        />,
      );
      expect(container.querySelector('[data-testid="cell-2020-8-18"]')).toHaveAttribute('role', 'gridcell');
      expect(container.querySelector('[data-testid="cell-2020-8-18"] button')).toBeNull();
    });

    it('renders its day grid through the grid slot', () => {
      const { container } = render(<Calendar today={today} monthPicker={null} grid={{ id: 'custom-grid' }} />);

      expect(container.querySelector('table[role="grid"]')!.id).toBe('custom-grid');
    });

    it('customizes day cells and their content without replacing the grid behavior', () => {
      const cellRef = React.createRef<HTMLElement>();
      const { getByRole } = render(
        <Calendar
          today={today}
          monthPicker={null}
          renderCell={withCellProps(cell =>
            cell.type === 'day' && cell.originalDate?.getDate() === 15
              ? {
                  root: { ref: cellRef, title: 'Appointment' },
                  label: { children: <strong>{cell.label}</strong> },
                }
              : {},
          )}
        />,
      );
      const button = getByRole('button', { name: 'September 15, 2020' });

      expect(cellRef.current).toBe(button.closest('td'));
      expect(cellRef.current).toHaveAttribute('title', 'Appointment');
      expect(cellRef.current).toHaveAttribute('role', 'gridcell');
      expect(button.querySelector('strong')).toHaveTextContent('15');
    });

    it('renders no navigation icons, since icons are a styled concern', () => {
      const { container } = render(<Calendar today={today} monthPicker={null} />);

      expect(container.querySelector('svg')).toBeNull();
    });

    it('passes only semantic data to cell, row and weekday getters, including nested items', () => {
      const checkCell = (cell: CalendarCellData) => {
        expect(cell.label).toEqual(expect.any(String));
        expect(cell.isNavigated).toEqual(expect.any(Boolean));
        for (const key of ['root', 'props', 'button', 'marker']) {
          expect(cell).not.toHaveProperty(key);
        }
      };
      const checkWeekday = (weekday: CalendarWeekdayCellData) => {
        expect(weekday.label).toEqual(expect.any(String));
        expect(weekday.accessibleLabel).toEqual(expect.any(String));
        expect(weekday).not.toHaveProperty('root');
      };
      const getCellProps = jest.fn((cell: CalendarCellData) => {
        checkCell(cell);
        return { root: { title: cell.label } };
      });
      const getRowProps = jest.fn((row: CalendarRowData) => {
        expect(row).not.toHaveProperty('root');
        if (row.type === 'weekday') {
          row.cells.forEach(checkWeekday);
        } else {
          (row.cells as CalendarCellData[]).forEach(checkCell);
        }
        return {};
      });
      const getWeekdayCellProps = jest.fn((weekday: CalendarWeekdayCellData) => {
        checkWeekday(weekday);
        return {};
      });
      const { container } = render(
        <Calendar
          today={today}
          monthPicker={null}
          renderCell={withCellProps(getCellProps)}
          renderRow={withRowProps(getRowProps)}
          renderWeekdayCell={withWeekdayCellProps(getWeekdayCellProps)}
        />,
      );

      expect(getCellProps).toHaveBeenCalledTimes(container.querySelectorAll('td').length);
      expect(getRowProps).toHaveBeenCalledTimes(container.querySelectorAll('tr').length);
      expect(getWeekdayCellProps).toHaveBeenCalledTimes(7);
      expect(container.querySelector('td')).toHaveAttribute('title', '30');
    });

    it('composes element refs without replacing the panel focus target', () => {
      const pickerRef = React.createRef<HTMLDivElement>();
      const rootRef = React.createRef<HTMLElement>();
      const buttonRef = React.createRef<HTMLButtonElement>();
      const labelRef = React.createRef<HTMLSpanElement>();
      const markerRef = React.createRef<HTMLSpanElement>();
      const { getByRole, unmount } = render(
        <Calendar
          today={today}
          monthPicker={null}
          dayPicker={{ ref: pickerRef }}
          getMarkedDays={() => [today]}
          renderCell={withCellProps(cell =>
            isToday(cell)
              ? {
                  root: { ref: rootRef },
                  button: { ref: buttonRef },
                  label: { ref: labelRef },
                  marker: { ref: markerRef, children: 'Appointment' },
                }
              : {},
          )}
        />,
      );
      const button = getByRole('button', { name: 'September 18, 2020, marked' });
      expect(pickerRef.current).toHaveAttribute('data-view', 'day');
      expect(rootRef.current).toBe(button.closest('td'));
      expect(buttonRef.current).toBe(button);
      expect(labelRef.current).toHaveTextContent('18');
      expect(markerRef.current).toHaveTextContent('Appointment');
      act(() => {
        focusCalendarGrid(pickerRef.current);
      });
      expect(rootRef.current).toHaveFocus();

      unmount();
      expect(pickerRef.current).toBeNull();
      expect(rootRef.current).toBeNull();
      expect(buttonRef.current).toBeNull();
      expect(labelRef.current).toBeNull();
      expect(markerRef.current).toBeNull();
    });

    it('customizes rows, week numbers and weekday headers through resolved data', () => {
      const rowRef = React.createRef<HTMLTableRowElement>();
      const headerRef = React.createRef<HTMLTableCellElement>();
      const getCellProps = jest.fn(() => ({}));
      const getRowProps = jest.fn((row: CalendarRowData) => ({
        root: {
          title: row.type === 'week' ? 'Week' : 'Weekdays',
          ref: row.type === 'week' && row.key === 0 ? rowRef : undefined,
        },
        weekNumber: { className: 'custom-week-number' },
      }));
      const { container, getByRole } = render(
        <Calendar
          today={today}
          monthPicker={null}
          showWeekNumbers
          renderCell={withCellProps(getCellProps)}
          renderRow={withRowProps(getRowProps)}
          renderWeekdayCell={withWeekdayCellProps(cell => ({
            root: cell.dayOfWeek === 'monday' ? { ref: headerRef, children: 'Monday', scope: 'row' } : {},
          }))}
        />,
      );

      expect(getCellProps).toHaveBeenCalledTimes(container.querySelectorAll('td').length);
      expect(getRowProps).toHaveBeenCalledTimes(container.querySelectorAll('tr').length);
      expect(rowRef.current).toHaveAttribute('title', 'Week');
      expect(container.querySelector('tr[title="Weekdays"]')).not.toBeNull();
      // Five week numbers and the weekday header's spacer.
      expect(container.querySelectorAll('th.custom-week-number')).toHaveLength(6);
      expect(headerRef.current).toBe(getByRole('columnheader', { name: 'Monday' }));
      expect(headerRef.current).toHaveAttribute('scope', 'row');
      expect(headerRef.current).toHaveTextContent('Monday');
    });

    it.each([undefined, null, '', false, 0])('preserves a button children override of %p', children => {
      const { getByRole } = render(
        <Calendar
          today={today}
          monthPicker={null}
          getMarkedDays={() => [today]}
          renderCell={withCellProps(cell =>
            isToday(cell)
              ? { button: { children }, label: { children: 'Custom day' }, marker: { children: 'Marker' } }
              : { marker: { children: 'Must not create a marker' } },
          )}
        />,
      );
      const button = getByRole('button', { name: 'September 18, 2020, marked' });

      expect(button.textContent).toBe(children === undefined ? 'Custom dayMarker' : children === 0 ? '0' : '');
      expect(button.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(children === undefined ? 1 : 0);
      expect(getByRole('button', { name: 'September 19, 2020' }).querySelector('[aria-hidden="true"]')).toBeNull();
    });

    it('lets defined consumer props override default cell and button attributes', () => {
      const { getByRole } = render(
        <Calendar
          today={today}
          value={today}
          minDate={today}
          monthPicker={null}
          renderCell={withCellProps(() => ({
            root: {
              role: 'link',
              tabIndex: -1,
              'aria-disabled': false,
              'aria-selected': false,
              'data-selected': 'custom',
              'data-outside-bounds': undefined,
            } as React.HTMLAttributes<HTMLElement>,
            button: { type: 'submit', disabled: false, tabIndex: 0 },
          }))}
        />,
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
      const { container } = render(<Calendar today={today} monthPicker={null} />);

      expect(container.querySelector('table')).not.toHaveAttribute('focusgroup');
      expect(container.querySelector('td[tabindex="0"] button')).toHaveAttribute('aria-label', 'September 18, 2020');
      expect(container.querySelector('table[aria-activedescendant]')).toBeNull();
    });

    it('keeps the noninteractive heading out of the tab order', () => {
      const { container } = render(<Calendar today={today} monthPicker={null} />);
      const heading = container.querySelector('[data-view="day"] > div > div')!;

      expect(heading.tagName).toBe('DIV');
      expect(heading).not.toHaveAttribute('tabindex');
      expect(heading).not.toHaveAttribute('aria-label');
      expect(heading).not.toHaveAttribute('type');
    });

    it('prevents nested day buttons from taking focus away from the gridcell', () => {
      const { getByRole } = render(<Calendar today={today} monthPicker={null} />);
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });

      getByRole('button', { name: 'September 18, 2020' }).dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it('focuses the next-month control when no visible date is available', () => {
      const nextMonthRef = React.createRef<HTMLButtonElement>();
      const { container, getByTitle } = render(
        <Calendar
          today={today}
          monthPicker={null}
          weeksToShow={1}
          restrictedDates={Array.from({ length: 7 }, (_, index) => new Date(2020, 8, 13 + index))}
          nextButton={{ ref: nextMonthRef }}
        />,
      );
      expect(container.querySelectorAll('td[tabindex="0"]')).toHaveLength(0);
      act(() => {
        focusCalendarGrid(container.firstElementChild);
      });
      expect(getByTitle('Next month October')).toHaveFocus();
      expect(nextMonthRef.current).toBe(getByTitle('Next month October'));
    });

    it('updates the roving tab stop without stealing focus when the displayed date changes', () => {
      const { container, rerender } = render(<Calendar today={today} displayedDate={today} monthPicker={null} />);
      const remembered = container.querySelector<HTMLElement>('td:has(button[aria-label="September 19, 2020"])')!;
      act(() => remembered.focus());

      rerender(<Calendar today={today} displayedDate={new Date(2020, 8, 20)} monthPicker={null} />);

      expect(remembered).toHaveFocus();
      expect(container.querySelectorAll('td[tabindex="0"]')).toHaveLength(1);
      expect(container.querySelector('td[tabindex="0"] button')).toHaveAttribute('aria-label', 'September 20, 2020');
      expect(remembered).toHaveAttribute('tabindex', '-1');
    });

    // Hidden filler rows are only needed by a styled slide animation; the headless layer has no CSS to hide them.
    it('renders week rows without motion wrappers or animation transition rows', () => {
      const { container } = render(<Calendar today={today} monthPicker={null} />);

      Array.from(container.querySelector('tbody')!.children).forEach(child => expect(child.tagName).toBe('TR'));
      expect(container.querySelectorAll('tr[aria-hidden="true"]')).toHaveLength(0);
      expect(container.querySelectorAll('thead > tr')).toHaveLength(1);
      expect(container.querySelectorAll('tbody > tr')).toHaveLength(5);
    });

    it('preserves null grid children while rendering defaults when omitted', () => {
      const empty = render(<Calendar today={today} monthPicker={null} grid={{ children: null }} />);
      expect(empty.container.querySelector('table')!.children).toHaveLength(0);
    });

    it('renders custom grid children without resolving cells or rows', () => {
      const getCellProps = jest.fn(() => ({}));
      const getRowProps = jest.fn(() => ({}));
      const getWeekdayCellProps = jest.fn(() => ({}));
      const { container, getByText } = render(
        <Calendar
          today={today}
          monthPicker={null}
          renderCell={withCellProps(getCellProps)}
          renderRow={withRowProps(getRowProps)}
          renderWeekdayCell={withWeekdayCellProps(getWeekdayCellProps)}
          grid={{
            id: 'custom-grid',
            children: (
              <tbody>
                <tr>
                  <td>Custom row</td>
                </tr>
              </tbody>
            ),
          }}
        />,
      );

      expect(container.querySelector('table#custom-grid')).toContainElement(getByText('Custom row'));
      expect(getCellProps).not.toHaveBeenCalled();
      expect(getRowProps).not.toHaveBeenCalled();
      expect(getWeekdayCellProps).not.toHaveBeenCalled();
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
        expect(onNavigate.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 7, 29));
      });

      it('pages from the focused day', () => {
        const { getByRole, onNavigate } = renderDay();
        const cell = getByRole('button', { name: 'September 18, 2020' }).closest<HTMLElement>('[role="gridcell"]')!;
        act(() => cell.focus());

        expect(fireEvent.keyDown(cell, { key: 'PageUp' })).toBe(false);
        expect(onNavigate).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ displayedDate: new Date(2020, 7, 18), type: 'keydown' }),
        );
      });

      it('clears range hover attributes when paging to another month', async () => {
        const { getByRole } = render(<Calendar today={today} monthPicker={null} />);
        const button = getByRole('button', { name: 'September 18, 2020' });
        const grid = getByRole('grid');
        fireEvent.mouseOver(button);
        expect(grid.querySelectorAll('[data-range-hovered]').length).toBeGreaterThan(0);

        const cell = button.closest<HTMLElement>('[role="gridcell"]')!;
        act(() => cell.focus());
        fireEvent.keyDown(cell, { key: 'PageDown' });

        await waitFor(() =>
          expect(grid.querySelectorAll('[data-range-hovered], [data-range-pressed]')).toHaveLength(0),
        );
      });

      it('does not navigate beyond a minimum date', () => {
        const { cells, onNavigate } = renderDay({ minDate: new Date(2020, 7, 30) });
        fireEvent.keyDown(cells[0], { key: 'ArrowLeft' });
        expect(onNavigate).not.toHaveBeenCalled();
      });

      it.each([
        ['ArrowDown', 'September 19, 2020', [new Date(2020, 8, 26), new Date(2020, 9, 3)], new Date(2020, 9, 10)],
        ['ArrowUp', 'September 12, 2020', [new Date(2020, 8, 5)], new Date(2020, 7, 29)],
      ] as const)(
        'keeps the weekday when %s passes restricted days in the column',
        (key, label, restricted, expected) => {
          const { getByRole, onNavigate } = renderDay({ restrictedDates: [...restricted] });
          const cell = getByRole('button', { name: label }).closest<HTMLElement>('[role="gridcell"]')!;
          act(() => cell.focus());
          expect(fireEvent.keyDown(cell, { key })).toBe(false);
          expect(onNavigate).toHaveBeenCalledTimes(1);
          expect(onNavigate.mock.calls[0][1].displayedDate).toEqual(expected);
        },
      );

      it('does not move vertically past a minimum date', () => {
        const { getByRole, onNavigate } = renderDay({
          minDate: new Date(2020, 8, 1),
          restrictedDates: [new Date(2020, 8, 5)],
        });
        const cell = getByRole('button', { name: 'September 12, 2020' }).closest<HTMLElement>('[role="gridcell"]')!;
        act(() => cell.focus());
        expect(fireEvent.keyDown(cell, { key: 'ArrowUp' })).toBe(false);
        expect(cell).toHaveFocus();
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
        const { cells, onSelect, onNavigate } = renderDay({ getCellProps: () => ({ root: { onKeyDown } }) });
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
        const { cells, rerenderPicker } = renderDay({ getCellProps: () => ({ root: { onKeyDown } }) });
        fireEvent.keyDown(cells[14], { key: 'ArrowRight' });
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onAfterRerender).not.toHaveBeenCalled();
      });

      it.each(['input', 'contenteditable'])('clears range hover and press state when leaving %s content', owner => {
        const { getByRole } = render(
          <Calendar
            today={today}
            value={today}
            dateRangeType="week"
            monthPicker={null}
            renderCell={withCellProps(cell => ({
              label: {
                children: (
                  <>
                    {cell.label}
                    {owner === 'input' ? <input aria-label="Editor" /> : <span contentEditable />}
                  </>
                ),
              },
            }))}
          />,
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

    describe('keyboard navigation', () => {
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
        const { cells, onSelect, onNavigate } = renderDay(
          target === 'cell' ? { onCellClick: onClick } : { onRowClick: onClick },
        );
        expect(fireEvent.click(cells[2])).toBe(false);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onSelect).not.toHaveBeenCalled();
        expect(onNavigate).not.toHaveBeenCalled();
      });

      it.each(['cell', 'row'] as const)('honors keyboard cancellation from the %s prop getter', target => {
        const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>) => event.preventDefault());
        const { cells, onSelect, onNavigate } = renderDay(
          target === 'cell' ? { onCellKeyDown: onKeyDown } : { onRowKeyDown: onKeyDown },
        );
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
});

describe('Calendar month grid', () => {
  // Month-grid behavior, ported from the former standalone CalendarMonth suite. Calendar renders only the month panel
  // here (`dayPicker={null}`), so activating a month selects it.

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
        renderCell={withCellProps(() => ({ root: { onClick: options.onCellClick, onKeyDown: options.onCellKeyDown } }))}
        renderRow={withRowProps(() => ({ root: { onClick: options.onRowClick, onKeyDown: options.onRowKeyDown } }))}
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

    it('keeps row and month state data-only and resolves built-in HTML props on demand', () => {
      const { result } = renderHook(() => useCalendar({ today, displayedDate: today, dayPicker: null }, null));
      const state = result.current;
      const { rows } = state.panels[0];
      expect(state.panels[0].view).toBe('month');
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
        tabIndex: 0,
      });
      expect(cellProps.button).toMatchObject({ type: 'button', children: month.label, tabIndex: -1 });
      expect(state.resolveRowProps(row).root).toEqual({ role: 'row' });
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
          renderRow={withRowProps(getRowProps)}
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
          renderCell={withCellProps(getCellProps)}
          renderRow={withRowProps(row => {
            expect(row).not.toHaveProperty('root');
            (row.cells as CalendarCellData[]).forEach(cell => {
              expect(cell).not.toHaveProperty('root');
              expect(cell.label).toEqual(expect.any(String));
            });
            return { root: { title: `Row ${row.key}`, ref: row.key === 2 ? rowRef : undefined } };
          })}
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
          renderCell={withCellProps(() => ({
            root: {
              role: 'link',
              tabIndex: -1,
              'aria-disabled': false,
              'aria-selected': false,
              'data-selected': 'custom',
            } as React.HTMLAttributes<HTMLElement>,
            button: { disabled: false },
          }))}
          renderRow={withRowProps(() => ({ root: { role: 'presentation' } }))}
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
      const { getByRole } = render(<MonthPicker renderCell={withCellProps(() => ({ button: { children } }))} />);
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
});

describe('Calendar year grid', () => {
  // Year-grid behavior, ported from the former standalone CalendarYear suite. Calendar renders only the month panel in
  // its year view. Selecting a year reports `onViewChange` (back to the month grid) and, when the year differs,
  // `onDisplayedDateChange`. The year range starts at the displayed year.

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
        renderCell={withCellProps(() => ({
          root: { onClick: options.onCellClick, onKeyDown: options.onCellKeyDown },
          button: options.renderIcon ? { children: icon } : {},
        }))}
        renderRow={withRowProps(() => ({ root: { onClick: options.onRowClick, onKeyDown: options.onRowKeyDown } }))}
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
    it('keeps row and year state data-only and resolves built-in HTML props on demand', () => {
      const { result } = renderHook(() =>
        useCalendar({ today, displayedDate: today, dayPicker: null, view: 'year' }, null),
      );
      const state = result.current;
      const { rows } = state.panels[0];
      expect(state.panels[0].view).toBe('year');
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
      expect(cellProps.root).toMatchObject({ role: 'gridcell', tabIndex: 0 });
      expect(cellProps.button).toMatchObject({ type: 'button', children: year.label, tabIndex: -1 });
      expect(state.resolveRowProps(row).root).toEqual({ role: 'row' });
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
          renderCell={withCellProps(cell => {
            expect(cell).not.toHaveProperty('root');
            expect(cell).not.toHaveProperty('content');
            expect(cell.label).toEqual(expect.any(String));
            const isSelected = cell.type === 'year' && cell.year === 2020;
            return {
              root: isSelected ? { ref: cellRef } : {},
              button: isSelected ? { children: <strong>{cell.label}</strong> } : {},
            };
          })}
          renderRow={withRowProps(row => {
            expect(row).not.toHaveProperty('root');
            (row.cells as CalendarCellData[]).forEach(cell => {
              expect(cell).not.toHaveProperty('root');
              expect(cell.label).toEqual(expect.any(String));
            });
            return { root: { title: `Row ${row.key}`, ref: row.key === 0 ? rowRef : undefined } };
          })}
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
          renderCell={withCellProps(() => ({
            root: {
              role: 'link',
              tabIndex: -1,
              'aria-disabled': false,
              'aria-selected': false,
              'data-selected': 'custom',
            } as React.HTMLAttributes<HTMLElement>,
            button: { disabled: false },
          }))}
          renderRow={withRowProps(() => ({ root: { role: 'presentation' } }))}
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
      const { getByRole } = render(<YearPicker renderCell={withCellProps(() => ({ button: { children } }))} />);
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
});
