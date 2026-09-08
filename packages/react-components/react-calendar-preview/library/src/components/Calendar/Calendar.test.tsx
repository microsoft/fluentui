import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';
import { calendarFormatters } from '../../utils';

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
