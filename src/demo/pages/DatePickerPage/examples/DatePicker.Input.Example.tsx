import * as React from 'react';
import {
  DatePicker,
  DayOfWeek
} from '../../../../index';

const DayPickerStrings = {
  goToToday: 'Go to today',

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerInputExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerInputExample extends React.Component<any, IDatePickerInputExampleState> {
  public constructor() {
    super();

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render() {
    let { firstDayOfWeek } = this.state;
    const desc = 'This field is required. One of the support input formats is year dash month dash day.';
    return (
      <div>
        <p>Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker, click the TextField again will dismiss the DatePicker and allow text input.</p>
        <DatePicker label='Start date' isRequired={ true } allowTextInput={ true } ariaLabel={ desc } firstDayOfWeek={ firstDayOfWeek } strings={ DayPickerStrings } value={ new Date() } />
      </div>
    );
  }
}
