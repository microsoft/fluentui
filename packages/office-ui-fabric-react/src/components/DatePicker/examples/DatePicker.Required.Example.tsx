import * as React from 'react';
import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings
} from 'office-ui-fabric-react/lib/DatePicker';
import { ICalendarProps, ICalendarStrings } from 'office-ui-fabric-react/lib/Calendar';

const DayPickerStrings: ICalendarStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
};

const DatePickerStrings: IDatePickerStrings = {

  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerRequiredExample extends React.Component<{}, IDatePickerRequiredExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render() {
<<<<<<< HEAD
    let { firstDayOfWeek } = this.state;
    let calendarProps: ICalendarProps = {
      strings: DayPickerStrings,
      firstDayOfWeek: firstDayOfWeek
    };
=======
    const { firstDayOfWeek } = this.state;
>>>>>>> master

    return (
      <div>
        <p>Validation will happen when Date Picker loses focus.</p>
        <DatePicker label='Date required' isRequired={ true } calendarProps={ calendarProps } strings={ DatePickerStrings } placeholder='Select a date...' />
      </div>
    );
  }
}
