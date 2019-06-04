import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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
  closeButtonAriaLabel: 'Close'
};

export interface IDatePickerBasicExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerBasicExample extends React.Component<{}, IDatePickerBasicExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render(): JSX.Element {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
        <DatePicker firstDayOfWeek={firstDayOfWeek} strings={DayPickerStrings} placeholder="Select a date..." ariaLabel="Select a date" />
        <Dropdown
          label="Select the first day of the week"
          options={[
            {
              text: 'Sunday',
              key: DayOfWeek.Sunday
            },
            {
              text: 'Monday',
              key: DayOfWeek.Monday
            },
            {
              text: 'Tuesday',
              key: DayOfWeek.Tuesday
            },
            {
              text: 'Wednesday',
              key: DayOfWeek.Wednesday
            },
            {
              text: 'Thursday',
              key: DayOfWeek.Thursday
            },
            {
              text: 'Friday',
              key: DayOfWeek.Friday
            },
            {
              text: 'Saturday',
              key: DayOfWeek.Saturday
            }
          ]}
          selectedKey={firstDayOfWeek}
          onChange={this._onDropdownChange}
        />
      </div>
    );
  }

  private _onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({
      firstDayOfWeek: option.key as number
    });
  };
}
