import * as React from 'react';
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IDropdownOption
} from '../../../../index';

const DayPickerStrings = {
  goToToday: 'Go to today'
};

export interface IDatePickerBasicExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DatePickerBasicExample extends React.Component<any, IDatePickerBasicExampleState> {
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
        <DatePicker firstDayOfWeek={ firstDayOfWeek } strings={ DayPickerStrings } placeholder='Select a date...' />
        <Dropdown
          label='Select the first day of the week'
          options={ [
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
          ] }
          selectedKey={ DayOfWeek[firstDayOfWeek] }
          onChanged={ this._onDropdownChanged.bind(this) }
          />
      </div>
    );
  }

  private _onDropdownChanged(option: IDropdownOption) {
    this.setState({
      firstDayOfWeek: DayOfWeek[option.key]
    });
  }
}
