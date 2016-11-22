import * as React from 'react';
import {
  Button,
  Calendar,
  DayOfWeek
} from '../../../../index';

const DayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today'
};

export interface ICalendarNoMonthExampleState {
  showCalendar: boolean;
  selectedDate: Date;
}

export class CalendarNoMonthExample extends React.Component<any, ICalendarNoMonthExampleState> {
  public constructor() {
    super();

    this.state = {
      showCalendar: false,
      selectedDate: null
    };

    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render() {
    let popupDivStyle: React.CSSProperties = {
      height: '300px'
    };

    return (
      <div>
        <Button onClick={ this._onClick }>
          { this.state.selectedDate == null ? 'Click for Calendar' : this.state.selectedDate.toLocaleDateString() }
        </Button>
        { this.state.showCalendar && (
          <div style={ popupDivStyle }>
            <Calendar
              onSelectDate={ this._onSelectDate }
              onDismiss={ this._onDismiss }
              isMonthPickerVisible={ false }
              value={ this.state.selectedDate }
              firstDayOfWeek={ DayOfWeek.Sunday }
              strings={ DayPickerStrings }
              >
            </Calendar>
          </div>
        )
        }
      </div>
    );
  }

  private _onClick(event: any) {
    this.setState((prevState: ICalendarNoMonthExampleState) => {
      prevState.showCalendar = !prevState.showCalendar;
      return prevState;
    });
  }

  private _onDismiss() {
    this.setState((prevState: ICalendarNoMonthExampleState) => {
      prevState.showCalendar = false;
      return prevState;
    });
  }

  private _onSelectDate(date: Date) {
    this.setState((prevState: ICalendarNoMonthExampleState) => {
      prevState.showCalendar = false;
      prevState.selectedDate = date;
      return prevState;
    });
  }
}
