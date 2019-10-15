import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from '@uifabric/date-time';
import './DatePicker.Examples.scss';

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',

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

  public render(): JSX.Element {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
        <p>Validation will happen when Date Picker loses focus.</p>
        <DatePicker
          label="Date required (with label)"
          isRequired={true}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
        />
        <DatePicker
          isRequired={true}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Date required with no label..."
          ariaLabel="Select a date"
        />
      </div>
    );
  }
}
