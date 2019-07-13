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

export interface IDatePickerFormatExampleState {
  firstDayOfWeek?: DayOfWeek;
  value?: Date | null;
}

export class DatePickerFormatExample extends React.Component<{}, IDatePickerFormatExampleState> {
  public constructor(props: {}) {
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
          Applications can customize how dates are formatted and parsed. Formatted dates can be ambiguous, so the control will avoid parsing
          the formatted strings of dates selected using the UI when text input is allowed. In this example, we are formatting and parsing
          dates as dd/MM/yy.
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
          formatDate={this._onFormatDate}
          parseDateFromString={this._onParseDateFromString}
        />
        <DefaultButton onClick={this._onClick} text="Clear" />
        <div>{(this.state.value || '').toString()}</div>
      </div>
    );
  }

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ value: date });
  };

  private _onClick = (): void => {
    this.setState({ value: null });
  };

  private _onFormatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  private _onParseDateFromString = (value: string): Date => {
    const date = this.state.value || new Date();
    const values = (value || '').trim().split('/');
    const day = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  };
}
