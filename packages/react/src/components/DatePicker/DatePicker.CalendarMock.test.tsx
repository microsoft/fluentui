import * as React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../Calendar', () => {
  const actual = jest.requireActual('../Calendar');
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Calendar: (props: ICalendarProps) => (
      <div
        data-testid="Calendar"
        data-is-month-picker-visible={props.isMonthPickerVisible}
        data-show-month-picker-as-overlay={props.showMonthPickerAsOverlay}
        data-value={props.value}
        data-today={props.today}
        data-first-day-of-week={props.firstDayOfWeek}
        data-highlight-current-month={props.highlightCurrentMonth}
        data-show-week-numbers={props.showWeekNumbers}
        data-first-week-of-year={props.firstWeekOfYear}
        data-show-go-to-today={props.showGoToToday}
        data-date-time-formatter={props.dateTimeFormatter ? 'provided' : 'default'}
      >
        Calendar Mock
      </div>
    ),
  };
});

import { DatePickerBase } from './DatePicker.base';
import { ICalendarProps, FirstWeekOfYear } from '../Calendar';

describe('DatePickerBase - custom calendar properties (mocked file)', () => {
  it('renders Calendar with provided props and custom formatter', () => {
    const value = new Date(2017, 10, 1);
    const today = new Date(2017, 9, 31);
    const dateTimeFormatter = {
      formatMonthDayYear: () => 'm/d/y',
      formatMonthYear: () => 'm/y',
      formatDay: () => 'd',
      formatMonth: () => 'm',
      formatYear: () => 'y',
    };

    const { container, getByTestId } = render(
      <DatePickerBase
        isMonthPickerVisible={false}
        showMonthPickerAsOverlay
        value={value}
        today={today}
        firstDayOfWeek={2}
        highlightCurrentMonth
        showWeekNumbers
        firstWeekOfYear={FirstWeekOfYear.FirstFullWeek}
        showGoToToday={false}
        dateTimeFormatter={dateTimeFormatter}
      />,
    );

    const input = container.querySelectorAll('div')[5];

    act(() => {
      userEvent.click(input!);
    });

    const calendar = getByTestId('Calendar');

    expect(calendar).toBeInTheDocument();
    expect(calendar).toHaveAttribute('data-is-month-picker-visible', 'false');
    expect(calendar).toHaveAttribute('data-show-month-picker-as-overlay', 'true');
    expect(calendar).toHaveAttribute('data-value', value.toString());
    expect(calendar).toHaveAttribute('data-today', today.toString());
    expect(calendar).toHaveAttribute('data-first-day-of-week', '2');
    expect(calendar).toHaveAttribute('data-highlight-current-month', 'true');
    expect(calendar).toHaveAttribute('data-show-week-numbers', 'true');
    expect(calendar).toHaveAttribute('data-first-week-of-year', FirstWeekOfYear.FirstFullWeek.toString());
    expect(calendar).toHaveAttribute('data-show-go-to-today', 'false');
    expect(calendar).toHaveAttribute('data-date-time-formatter', 'provided');
  });
});
