import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import './DatePicker.Examples.scss';

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

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerInputExampleState {
  firstDayOfWeek?: DayOfWeek;
  value?: Date | null;
}

export class DatePickerInputExample extends React.Component<{}, IDatePickerInputExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      value: null
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek, value } = this.state;
    const desc = 'This field is required. One of the support input formats is year dash month dash day.';
    return (
      <div className="docs-DatePickerExample">
        <p>
          Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker, click the TextField
          again will dismiss the DatePicker and allow text input.
        </p>
        <DatePicker
          label="Start date"
          isRequired={false}
          allowTextInput={true}
          ariaLabel={desc}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          value={value!}
          onSelectDate={this._onSelectDate}
        />
        <DefaultButton onClick={this._onClick} text="Clear" />
      </div>
    );
  }

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ value: date });
  };

  private _onClick = (): void => {
    this.setState({ value: null });
  };
}
