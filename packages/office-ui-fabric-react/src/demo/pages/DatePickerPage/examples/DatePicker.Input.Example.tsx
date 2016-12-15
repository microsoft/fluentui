import * as React from 'react';
import {
  Button,
  DatePicker,
  DayOfWeek
} from '../../../../index';

const DayPickerStrings = {
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

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerInputExampleState {
  firstDayOfWeek?: DayOfWeek;
  value?: Date;
}

export class DatePickerInputExample extends React.Component<any, IDatePickerInputExampleState> {
  public constructor() {
    super();

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      value: null
    };
  }

  public render() {
    let { firstDayOfWeek, value } = this.state;
    const desc = 'This field is required. One of the support input formats is year dash month dash day.';
    return (
      <div>
        <p>Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker, click the TextField again will dismiss the DatePicker and allow text input.</p>
        <DatePicker
          label='Start date'
          isRequired={ false }
          allowTextInput={ true }
          ariaLabel={ desc }
          firstDayOfWeek={ firstDayOfWeek }
          strings={ DayPickerStrings }
          value={ value }
          onSelectDate={ date => this.setState({ value: date }) }
          />
        <Button onClick={ () => this.setState({ value: null }) }>Clear</Button>
      </div>
    );
  }
}
