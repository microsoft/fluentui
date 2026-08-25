import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';
import { formatDateTime as defaultFormatDateTime, formatLabel as defaultFormatLabel } from '../../utils';
import type { CalendarDateLabelData, FormatCalendarLabel, FormatDateTime } from '../../utils';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
  });

  it('should render without crashing when value is undefined', () => {
    expect(() => render(<Calendar value={undefined} />)).not.toThrow();
  });

  it('should render correctly when value is undefined', () => {
    const { container } = render(<Calendar value={undefined} />);
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

  it('does not render the pickers that are hidden', () => {
    const { container } = render(<Calendar value={new Date(2020, 8, 18)} isMonthPickerVisible={false} />);

    expect(container.querySelectorAll('[role="grid"]')).toHaveLength(1);
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

  it('moves the highlighted month with navigation rather than with the selected value', () => {
    const { getByTitle, getByRole } = render(
      <Calendar value={new Date(2020, 8, 18)} today={new Date(2020, 8, 18)} highlightSelectedMonth />,
    );

    expect(getByRole('gridcell', { name: 'September' })).toHaveAttribute('data-selected');

    fireEvent.click(getByTitle('Next month October'));

    expect(getByRole('gridcell', { name: 'October' })).toHaveAttribute('data-selected');
    expect(getByRole('gridcell', { name: 'September' })).not.toHaveAttribute('data-selected');
  });

  it('opens the year picker on the navigated year rather than the selected year', () => {
    const { getByTitle, getByRole } = render(
      <Calendar value={new Date(2020, 11, 18)} today={new Date(2020, 11, 18)} />,
    );

    fireEvent.click(getByTitle('Next month January'));
    fireEvent.click(getByRole('button', { name: '2021, change year' }));

    expect(getByRole('gridcell', { name: '2021' })).toHaveAttribute('data-selected');
  });

  it('uses localized strings for the selected date, today, and go-to-today button', () => {
    const formatDateTime: FormatDateTime = (date, format) => `Localized ${defaultFormatDateTime(date, format)}`;
    const formatLabel = ((label: string, data: CalendarDateLabelData) => {
      if (label === 'selectedDate') {
        return `Chosen: ${data.formattedDate}`;
      }
      if (label === 'todayDate') {
        return `Current: ${data.formattedDate}`;
      }
      return defaultFormatLabel(label as 'selectedDate', data);
    }) as FormatCalendarLabel;
    const { getByRole, container } = render(
      <Calendar
        value={new Date(2020, 8, 18)}
        today={new Date(2020, 9, 20)}
        formatDateTime={formatDateTime}
        formatLabel={formatLabel}
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

  it('uses the month-year selected date format in month-picker-only mode', () => {
    const formatDateTime = jest.fn(defaultFormatDateTime);
    const formatLabel = ((label: string, data: CalendarDateLabelData) =>
      label === 'selectedDate'
        ? `Chosen month: ${data.formattedDate}`
        : defaultFormatLabel(label as 'todayDate', data)) as FormatCalendarLabel;
    const { container } = render(
      <Calendar
        value={new Date(2020, 8, 18)}
        formatDateTime={formatDateTime}
        formatLabel={formatLabel}
        isDayPickerVisible={false}
      />,
    );

    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('Chosen month: September 2020');
    expect(formatDateTime).toHaveBeenCalledWith(new Date(2020, 8, 18), 'monthYear');
  });
});
