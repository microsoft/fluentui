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

export interface ICalendarInlineExampleState {
  selectedDate: Date;
}

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible: boolean;
}

export class CalendarInlineExample extends React.Component<ICalendarInlineExampleProps, ICalendarInlineExampleState> {
  public constructor() {
    super();

    this.state = {
      selectedDate: null
    };

    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render() {
    let divStyle: React.CSSProperties = {
      height: '300px',
      width: '400px'
    };

    return (
      <div style={ divStyle }>
        <div>
          Selected date: <span>{ this.state.selectedDate == null ? "Not set" : this.state.selectedDate.toLocaleString() }</span>
        </div>
        <Calendar
          onSelectDate={ this._onSelectDate }
          onDismiss={ this._onDismiss }
          isMonthPickerVisible={ this.props.isMonthPickerVisible }
          value={ this.state.selectedDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          strings={ DayPickerStrings }
          >
        </Calendar>
      </div>
    );
  }

  private _onDismiss() {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return prevState;
    });
  }

  private _onSelectDate(date: Date) {
    this.setState((prevState: ICalendarInlineExampleState) => {
      prevState.selectedDate = date;
      return prevState;
    });
  }
}
