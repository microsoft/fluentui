import * as React from 'react';
import {
  DatePicker,
  DayOfWeek
} from '../../../../index';

const DayPickerStrings = {
  goToToday: 'Go to today',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerRequiredExample extends React.Component<any, IDatePickerRequiredExampleState> {
  public constructor() {
    super();

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render() {
    let { firstDayOfWeek } = this.state;

    return (
      <div>
        <p>Validation will happen when Date Picker loses focus.</p>
        <DatePicker label='Date required' isRequired={ true } firstDayOfWeek={ firstDayOfWeek } strings={ DayPickerStrings } placeholder='Select a date...' />
      </div>
    );
  }
}
