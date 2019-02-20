// @codepen
import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
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
  closeButtonAriaLabel: 'Close date picker'
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

  public render() {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
        <DatePicker firstDayOfWeek={firstDayOfWeek} strings={DayPickerStrings} placeholder="Select a date..." ariaLabel="Select a date" />
        <Dropdown
          label="Select the first day of the week"
          options={[
            {
              text: 'Sunday',
              key: DayOfWeek[DayOfWeek.Sunday]
            },
            {
              text: 'Monday',
              key: DayOfWeek[DayOfWeek.Monday]
            },
            {
              text: 'Tuesday',
              key: DayOfWeek[DayOfWeek.Tuesday]
            },
            {
              text: 'Wednesday',
              key: DayOfWeek[DayOfWeek.Wednesday]
            },
            {
              text: 'Thursday',
              key: DayOfWeek[DayOfWeek.Thursday]
            },
            {
              text: 'Friday',
              key: DayOfWeek[DayOfWeek.Friday]
            },
            {
              text: 'Saturday',
              key: DayOfWeek[DayOfWeek.Saturday]
            }
          ]}
          selectedKey={DayOfWeek[firstDayOfWeek!]}
          onChange={this._onDropdownChange}
        />
      </div>
    );
  }

  private _onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({
      firstDayOfWeek: (DayOfWeek as any)[option.key]
    });
  };
}
