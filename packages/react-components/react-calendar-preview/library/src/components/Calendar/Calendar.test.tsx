import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';
import { calendarFormatters } from '../../utils';
import type { CalendarDayHandle } from '../CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle } from '../CalendarMonth/CalendarMonth.types';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
  });

  it('should render without crashing when value is undefined', () => {
    expect(() => render(<Calendar value={undefined} onChange={jest.fn()} />)).not.toThrow();
  });

  it('should render correctly when value is undefined', () => {
    const { container } = render(<Calendar value={undefined} onChange={jest.fn()} />);
    expect(container.querySelector('[role="grid"]')).not.toBeNull();
  });

  it('supports an explicitly empty controlled selection', () => {
    const { container } = render(<Calendar value={null} today={new Date(2020, 8, 18)} onChange={jest.fn()} />);

    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('');
    expect(container.querySelector('td[aria-selected="true"]')).toBeNull();
  });

  it('uses defaultValue only for an uncontrolled initial selection', () => {
    const { container } = render(
      <Calendar defaultValue={new Date(2020, 8, 18)} defaultDisplayedDate={new Date(2020, 8, 18)} />,
    );

    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Selected date September 18, 2020');
  });

  it('controls the displayed date independently from the selected value', () => {
    const { container } = render(
      <Calendar defaultValue={new Date(2020, 8, 18)} displayedDate={new Date(2021, 0, 5)} layout="sideBySide" />,
    );

    expect(container.textContent).toContain('January 2021');
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Selected date September 18, 2020');
  });

  it('reports displayed-date navigation without mutating a controlled date', () => {
    const onDisplayedDateChange = jest.fn();
    const displayedDate = new Date(2020, 8, 18);
    const { container } = render(
      <Calendar displayedDate={displayedDate} onDisplayedDateChange={onDisplayedDateChange} layout="sideBySide" />,
    );

    fireEvent.keyDown(container.firstElementChild!, { key: 'PageUp' });

    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 9, 18));
    expect(container.textContent).toContain('September 2020');
  });

  it('navigates to an externally updated value when displayedDate is uncontrolled', () => {
    const onDisplayedDateChange = jest.fn();
    const { container, rerender } = render(
      <Calendar value={new Date(2020, 8, 18)} onDisplayedDateChange={onDisplayedDateChange} />,
    );

    rerender(<Calendar value={new Date(2021, 0, 5)} onDisplayedDateChange={onDisplayedDateChange} />);

    expect(container.querySelector('table[role="grid"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('January 2021, Selected date January 5, 2021'),
    );
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
  });

  it('preserves a controlled displayedDate when value changes', () => {
    const displayedDate = new Date(2020, 8, 18);
    const { container, rerender } = render(<Calendar value={null} displayedDate={displayedDate} />);

    rerender(<Calendar value={new Date(2021, 0, 5)} displayedDate={displayedDate} />);

    expect(container.querySelector('table[role="grid"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('September 2020, Selected date January 5, 2021'),
    );
  });

  it('allows navigation to a month whose anchor date is restricted', () => {
    const { getByTitle, getByRole, container } = render(
      <Calendar defaultValue={new Date(2020, 8, 18)} restrictedDates={[new Date(2020, 9, 18)]} layout="sideBySide" />,
    );

    fireEvent.click(getByTitle('Next month October'));
    expect(container.querySelector('table[role="grid"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('October 2020'),
    );

    fireEvent.click(getByRole('gridcell', { name: 'September' }));
    fireEvent.click(getByRole('gridcell', { name: 'October' }));
    expect(container.querySelector('table[role="grid"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('October 2020'),
    );
  });

  it('reports one navigation callback for one day selection', () => {
    const onSelectDate = jest.fn();
    const onDisplayedDateChange = jest.fn();
    const { getByRole } = render(
      <Calendar
        value={null}
        defaultDisplayedDate={new Date(2020, 8, 18)}
        onSelectDate={onSelectDate}
        onDisplayedDateChange={onDisplayedDateChange}
      />,
    );

    fireEvent.click(getByRole('button', { name: 'September 15, 2020' }));

    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 8, 15));
  });

  it('supports an uncontrolled overlay view and reports view changes', () => {
    const onViewChange = jest.fn();
    const { getByRole, container } = render(
      <Calendar
        defaultDisplayedDate={new Date(2020, 8, 18)}
        defaultView="month"
        layout="overlay"
        onViewChange={onViewChange}
      />,
    );

    expect(container.querySelector('table[role="grid"]')).toBeNull();
    fireEvent.click(getByRole('gridcell', { name: 'September' }));

    expect(onViewChange.mock.calls[0][1].view).toBe('day');
    expect(container.querySelector('table[role="grid"]')).not.toBeNull();
  });

  it('updates the visible picker when a controlled overlay view changes', () => {
    const { container, rerender } = render(<Calendar value={new Date(2020, 8, 18)} layout="overlay" view="day" />);
    expect(container.querySelector('table[role="grid"]')).not.toBeNull();

    rerender(<Calendar value={new Date(2020, 8, 18)} layout="overlay" view="month" />);

    expect(container.querySelector('table[role="grid"]')).toBeNull();
    expect(container.querySelector('[role="grid"]')).not.toBeNull();
  });

  it('selects a bounded month without switching to the day picker', () => {
    const onSelectDate = jest.fn();
    const onDisplayedDateChange = jest.fn();
    const onViewChange = jest.fn();
    const { getByRole, container } = render(
      <Calendar
        dayPicker={null}
        defaultValue={null}
        defaultDisplayedDate={new Date(2020, 8, 18)}
        dateRangeType="month"
        minDate={new Date(2020, 9, 10)}
        maxDate={new Date(2020, 9, 31)}
        restrictedDates={[new Date(2020, 9, 18)]}
        onSelectDate={onSelectDate}
        onDisplayedDateChange={onDisplayedDateChange}
        onViewChange={onViewChange}
      />,
    );

    fireEvent.click(getByRole('gridcell', { name: 'October' }));

    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect(onSelectDate.mock.calls[0][1].date).toEqual(new Date(2020, 9, 10));
    expect(onSelectDate.mock.calls[0][1].selectedDateRange).toHaveLength(21);
    expect(onSelectDate.mock.calls[0][1].selectedDateRange).not.toContainEqual(new Date(2020, 9, 18));
    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onViewChange).not.toHaveBeenCalled();
    expect(container.querySelector('table[role="grid"]')).toBeNull();
  });

  it('renders a day-only calendar without a month-toggle action', () => {
    const { queryByRole, container } = render(<Calendar monthPicker={null} layout="overlay" />);

    expect(container.querySelector('table[role="grid"]')).not.toBeNull();
    expect(container.querySelector('.fui-CalendarMonth')).toBeNull();
    expect(queryByRole('button', { name: /change month/ })).toBeNull();
  });

  it.each([2000, 2045])('opens the displayed year in month-only mode with a selection in %s', async selectedYear => {
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        dayPicker={null}
        value={new Date(selectedYear, 8, 15)}
        displayedDate={new Date(2040, 8, 15)}
        onSelectDate={onSelectDate}
      />,
    );

    fireEvent.click(getByRole('button', { name: '2040, change year' }));

    expect(getByRole('grid')).toHaveAttribute('aria-label', '2040 - 2051');
    await waitFor(() => expect(getByRole('gridcell', { name: '2040' })).toHaveFocus());
    expect(onSelectDate).not.toHaveBeenCalled();
  });

  it('preserves built-in focus restoration with consumer picker refs', async () => {
    const dayRef = React.createRef<CalendarDayHandle>();
    const monthRef = React.createRef<CalendarMonthHandle>();
    const { getByRole } = render(
      <Calendar
        today={new Date(2020, 8, 18)}
        defaultDisplayedDate={new Date(2020, 9, 18)}
        dayPicker={{ ref: dayRef }}
        monthPicker={{ ref: monthRef }}
      />,
    );

    expect(dayRef.current?.focus).toBeInstanceOf(Function);
    expect(monthRef.current?.focus).toBeInstanceOf(Function);
    fireEvent.click(getByRole('button', { name: 'Go to today' }));

    await waitFor(() => expect(getByRole('button', { name: 'September 18, 2020' }).closest('td')).toHaveFocus());
  });

  it('provides shared configuration to the day picker through context', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} showWeekNumbers />);

    expect(container.querySelector('th[scope="row"]')).not.toBeNull();
  });

  it('lets the dayPicker slot override what Calendar computes', () => {
    const { container } = render(
      <Calendar value={new Date(2020, 8, 18)} dayPicker={{ navigatedDate: new Date(2021, 0, 18) }} />,
    );

    expect(container.textContent).toContain('January 2021');
  });

  it('renders the go-to-today button by default', () => {
    const { queryByRole } = render(<Calendar value={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} />);

    expect(queryByRole('button', { name: 'Go to today' })).not.toBeNull();
  });

  it('does not render the go-to-today button when its slot is null', () => {
    const { queryByRole } = render(<Calendar value={new Date(2020, 8, 18)} goToTodayButton={null} />);

    expect(queryByRole('button', { name: 'Go to today' })).toBeNull();
  });

  it('calls a consumer onKeyDown and still dismisses on Escape', () => {
    const onKeyDown = jest.fn();
    const onDismiss = jest.fn();
    const { container } = render(
      <Calendar value={new Date(2020, 8, 18)} onKeyDown={onKeyDown} onDismiss={onDismiss} />,
    );

    fireEvent.keyDown(container.firstElementChild!, { key: 'Escape' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('advances one month on PageUp keyboard navigation', () => {
    const onDisplayedDateChange = jest.fn();
    const value = new Date(2020, 8, 18);
    const { container } = render(
      <Calendar
        value={value}
        today={value}
        displayedDate={value}
        onDisplayedDateChange={onDisplayedDateChange}
        onChange={jest.fn()}
      />,
    );

    fireEvent.keyDown(container.firstElementChild!, { key: 'PageUp' });

    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(new Date(2020, 9, 18));
  });

  it('clamps PageUp navigation to the maximum date', () => {
    const value = new Date(2020, 8, 18);
    const { container } = render(
      <Calendar value={value} today={value} maxDate={new Date(2020, 9, 10)} onChange={jest.fn()} />,
    );

    fireEvent.keyDown(container.firstElementChild!, { key: 'PageUp' });

    expect(container.textContent).toContain('October 2020');
    expect(container.querySelector('button[aria-label="October 10, 2020"]')?.closest('td')).toHaveAttribute(
      'tabindex',
      '0',
    );
  });

  it('leaves day-grid paging keys to Calendar instead of Tabster', () => {
    const { container } = render(<Calendar defaultValue={new Date(2020, 8, 18)} />);
    const attributes = JSON.parse(container.querySelector('table[role="grid"]')!.getAttribute('data-tabster')!);

    expect(attributes.focusable.ignoreKeydown).toEqual({ PageUp: true, PageDown: true });
  });

  it.each([
    { key: 'PageUp', ctrlKey: false, targetDate: new Date(2020, 9, 18) },
    { key: 'PageDown', ctrlKey: false, targetDate: new Date(2020, 7, 18) },
    { key: 'PageUp', ctrlKey: true, targetDate: new Date(2021, 8, 18) },
    { key: 'PageDown', ctrlKey: true, targetDate: new Date(2019, 8, 18) },
  ])('restores day focus after $key with ctrlKey=$ctrlKey', async ({ key, ctrlKey, targetDate }) => {
    const onDisplayedDateChange = jest.fn();
    const onSelectDate = jest.fn();
    const { getByRole } = render(
      <Calendar
        defaultValue={new Date(2020, 8, 18)}
        onDisplayedDateChange={onDisplayedDateChange}
        onSelectDate={onSelectDate}
      />,
    );
    const day = getByRole('button', { name: 'September 18, 2020' }).closest('td')!;
    day.focus();

    fireEvent.keyDown(day, { key, ctrlKey });

    expect(onDisplayedDateChange).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange.mock.calls[0][1].displayedDate).toEqual(targetDate);
    expect(onSelectDate).not.toHaveBeenCalled();
    const targetLabel = calendarFormatters.dateTime({ date: targetDate, format: 'dayMonthYear' });
    await waitFor(() => expect(getByRole('button', { name: targetLabel }).closest('td')).toHaveFocus());
  });

  it('allows a consumer to cancel paging from a day cell', () => {
    const onDisplayedDateChange = jest.fn();
    const onKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { getByRole } = render(
      <Calendar
        defaultValue={new Date(2020, 8, 18)}
        onKeyDown={onKeyDown}
        onDisplayedDateChange={onDisplayedDateChange}
      />,
    );
    const day = getByRole('button', { name: 'September 18, 2020' }).closest('td')!;
    day.focus();

    fireEvent.keyDown(day, { key: 'PageUp' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onDisplayedDateChange).not.toHaveBeenCalled();
    expect(day).toHaveFocus();
  });

  it('clamps go-to-today navigation to the allowed date range', () => {
    const { getByRole, container } = render(
      <Calendar defaultValue={new Date(2020, 7, 18)} today={new Date(2020, 9, 18)} maxDate={new Date(2020, 8, 10)} />,
    );

    fireEvent.click(getByRole('button', { name: 'Go to today' }));

    expect(container.textContent).toContain('September 2020');
    expect(container.querySelector('button[aria-label="September 10, 2020"]')?.closest('td')).toHaveAttribute(
      'tabindex',
      '0',
    );
  });

  it('moves the highlighted month with navigation rather than with the selected value', () => {
    const { getByTitle, getByRole } = render(
      <Calendar defaultValue={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} highlightSelectedMonth />,
    );

    expect(getByRole('gridcell', { name: 'September' })).toHaveAttribute('data-selected');

    fireEvent.click(getByTitle('Next month October'));

    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: 'September' })).not.toHaveAttribute('data-selected');
  });

  it('opens the year picker on the navigated year rather than the selected year', () => {
    const { getByTitle, getByRole } = render(
      <Calendar defaultValue={new Date(2020, 11, 18)} today={new Date(2020, 11, 18)} />,
    );

    fireEvent.click(getByTitle('Next month January'));
    fireEvent.click(getByRole('button', { name: '2021, change year' }));

    expect(getByRole('gridcell', { name: '2021' })).toHaveAttribute('data-selected');
  });

  it('uses localized strings for the selected date, today, and go-to-today button', () => {
    type FormatDateTime = typeof calendarFormatters.dateTime;
    const dateTime: FormatDateTime = ({ date, format }) => `Localized ${calendarFormatters.dateTime({ date, format })}`;

    const { getByRole, container } = render(
      <Calendar
        defaultValue={new Date(2020, 8, 18)}
        today={new Date(2020, 9, 20)}
        formatters={{
          dateTime,
          selectedDateLabel: data => `Chosen: ${data.formattedDate}`,
          todayDateLabel: data => `Current: ${data.formattedDate}`,
        }}
        goToTodayButton={{ children: 'Jump to current date' }}
      />,
    );

    expect(getByRole('button', { name: 'Jump to current date' })).toBeTruthy();
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Chosen: Localized September 18, 2020');
    expect(container.querySelector('table[role="grid"]')).toHaveAttribute(
      'aria-label',
      'Localized September 2020, Chosen: Localized September 18, 2020, Current: Localized October 20, 2020',
    );
  });
});
