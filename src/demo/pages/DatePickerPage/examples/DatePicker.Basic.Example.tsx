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
  locale?: string[];
}

export class DatePickerBasicExample extends React.Component<any, IDatePickerBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render() {
    let { firstDayOfWeek, locale } = this.state;

    return (
      <div>
        <DatePicker firstDayOfWeek={ firstDayOfWeek } strings={ DayPickerStrings } locales={ locale } placeholder='Select a date...' />
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
          onChanged={ this._onStartOfWeekDropdownChanged.bind(this) }
          />
        <Dropdown
          label='Select the locale'
          options={ [
            {
              text: 'English',
              key: 'en-us'
            },
            {
              text: 'Spanish',
              key: 'es-es'
            },
            {
              text: 'German',
              key: 'de-de'
            },
            {
              text: 'Arabic',
              key: 'ar'
            },
            {
              text: 'Chinese',
              key: 'zh'
            },
            {
              text: 'Russian',
              key: 'ru-ru'
            },
            {
              text: 'Telugu',
              key: 'te'
            }
          ] }
          selectedKey={ DayOfWeek[firstDayOfWeek] }
          onChanged={ this._onLocaleDropdownChanged.bind(this) }
          />
      </div>
    );
  }

  private _onStartOfWeekDropdownChanged(option: IDropdownOption) {
    this.setState({
      firstDayOfWeek: DayOfWeek[option.key]
    });
  }

  private _onLocaleDropdownChanged(option: IDropdownOption) {
    this.setState({
      locale: [option.key.toString()]
    });
  }
}
