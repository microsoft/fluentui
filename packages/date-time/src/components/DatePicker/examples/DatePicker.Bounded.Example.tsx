import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { addMonths, addYears } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import './DatePicker.Examples.scss';

const today: Date = new Date(Date.now());
const minDate: Date = addMonths(today, -1);
const maxDate: Date = addYears(today, 1);
const description = `When date boundaries are set (via minDate and maxDate props) the DatePicker will not allow
out-of-bounds dates to be picked or entered. In this example, the allowed dates are
${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`;

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.',

  isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`
};

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerBoundedExample extends React.Component<{}, IDatePickerRequiredExampleState> {
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
        <p>{description}</p>
        <DatePicker
          isRequired={false}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          minDate={minDate}
          maxDate={maxDate}
          allowTextInput={true}
        />
      </div>
    );
  }
}
