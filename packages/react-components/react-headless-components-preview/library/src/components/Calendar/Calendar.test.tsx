import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Calendar } from './Calendar';
import type { CalendarDayHandle } from './CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle } from './CalendarMonth/CalendarMonth.types';
import type { CalendarYearHandle } from './CalendarYear/CalendarYear.types';
import type { CalendarProps } from './Calendar.types';
import { useCalendar } from './useCalendar';
import { renderCalendar, useCalendarContextValues } from '../../calendar';
import { calendarFormatters } from './utils';

const today = new Date(2020, 8, 18);
const dayLabel = (date: Date) => calendarFormatters.dateTime({ date, format: 'monthDayYear' });

describe('Calendar rendering and public API', () => {
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
        dayPicker={{
          previousMonthButton: {
            onClick: event => event.preventDefault(),
          },
        }}
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
        dayPicker={{ nextMonthButton: { onClick: onNextMonthClick } }}
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
        dayPicker={{
          getCellProps: day =>
            day.originalDate?.getTime() === selected.getTime() ? { button: { onClick: onButtonClick } } : {},
        }}
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
          dayPicker={monthOnly ? null : { id: 'day-picker', weeksToShow: 6 }}
          monthPicker={dayOnly ? null : undefined}
          monthPickerWrapper={{ id: 'month-picker-wrapper' }}
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
    const { container, getByRole } = render(
      <Calendar today={today} calendarMonthColumns={3} dayPicker={{ weeksToShow: 6 }} />,
    );
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

  it('marks the initial focusgroup target in each grid', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} />);

    const dayGrid = container.querySelector('table[role="grid"]')!;
    expect(dayGrid).toHaveAttribute('focusgroup', 'grid rowflow');
    expect(dayGrid.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);

    const monthGrid = container.querySelector('div[role="grid"]')!;
    expect(monthGrid.querySelectorAll('[role="row"]')).toHaveLength(3);
    monthGrid.querySelectorAll('[role="row"]').forEach(row => expect(row.children).toHaveLength(4));
    expect(monthGrid).toHaveAttribute('focusgroup', 'grid manual');
    expect(monthGrid.querySelectorAll('[role="gridcell"][focusgroupstart]')).toHaveLength(1);
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

  it('updates the focusgroup start when columns change without stealing external focus', () => {
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
    expect(getByRole('gridcell', { name: 'September' })).toHaveAttribute('focusgroupstart');
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
    const { container, getByRole } = render(
      <Calendar value={today} today={today} dayPicker={{ daysToSelectInDayView: 3 }} />,
    );
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
      const contextValues = useCalendarContextValues(state);
      return renderCalendar(state, contextValues);
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

  it('preserves day focus restoration with a consumer imperativeRef and root ref', async () => {
    const dayRef = React.createRef<CalendarDayHandle>();
    const dayRootRef = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ ref: dayRootRef, imperativeRef: dayRef }}
      />,
    );

    expect(dayRef.current?.focus).toBeInstanceOf(Function);
    expect(dayRootRef.current).toContainElement(getByRole('button', { name: 'October 18, 2020' }));
    fireEvent.click(getByRole('button', { name: 'Go to today' }));

    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
  });

  it('preserves month focus restoration with a consumer imperativeRef and root ref', async () => {
    const monthRef = React.createRef<CalendarMonthHandle>();
    const monthRootRef = React.createRef<HTMLDivElement>();
    const { getByRole } = render(
      <Calendar
        value={new Date(2020, 8, 18)}
        layout="overlay"
        monthPicker={{ ref: monthRootRef, imperativeRef: monthRef }}
      />,
    );

    fireEvent.click(getByRole('button', { name: /September 2020, change month/ }));

    expect(monthRef.current?.focus).toBeInstanceOf(Function);
    expect(monthRootRef.current).toContainElement(getByRole('gridcell', { name: 'September' }));
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
  });

  it('preserves picker focus handles with consumer imperativeRef callbacks', async () => {
    let dayHandle: CalendarDayHandle | null = null;
    let monthHandle: CalendarMonthHandle | null = null;
    let yearHandle: CalendarYearHandle | null = null;
    const dayRef = (handle: CalendarDayHandle | null) => {
      dayHandle = handle;
    };
    const monthRef = (handle: CalendarMonthHandle | null) => {
      monthHandle = handle;
    };
    const yearRef = (handle: CalendarYearHandle | null) => {
      yearHandle = handle;
    };
    const { getByRole, unmount } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ imperativeRef: dayRef }}
        monthPicker={{ imperativeRef: monthRef, yearPicker: { imperativeRef: yearRef } }}
      />,
    );
    const handles = () => ({ day: dayHandle, month: monthHandle, year: yearHandle });

    expect(handles().day?.focus).toBeInstanceOf(Function);
    expect(handles().month?.focus).toBeInstanceOf(Function);
    fireEvent.click(getByRole('button', { name: 'Go to today' }));
    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020, change year' }));
    expect(handles().year?.focus).toBeInstanceOf(Function);
    await waitFor(() => expect(getByRole('gridcell', { name: '2020' })).toHaveFocus());

    fireEvent.click(getByRole('button', { name: '2020 - 2031, change year' }));
    expect(handles().year).toBeNull();
    await waitFor(() => expect(getByRole('gridcell', { name: 'September' })).toHaveFocus());
    unmount();
    expect(handles()).toEqual({ day: null, month: null, year: null });
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
        dayPicker={{ heading: { children: <input aria-label="Custom header" defaultValue="2020" /> } }}
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
        dayPicker={{
          heading: {
            children: (
              <div contentEditable suppressContentEditableWarning>
                <span>Editable year</span>
              </div>
            ),
          },
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
        dayPicker={{
          heading: { children: <div role={owner} tabIndex={0} aria-label={`Nested ${owner}`} /> },
        }}
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
        dayPicker={{ heading: { children: <button type="button">Custom action</button> } }}
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
        dayPicker={{ weeksToShow }}
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
          dayPicker={{ weeksToShow: 5 }}
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
        dayPicker={{ weeksToShow: 1 }}
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
        dayPicker={{ weeksToShow: 5 }}
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
  });
});
