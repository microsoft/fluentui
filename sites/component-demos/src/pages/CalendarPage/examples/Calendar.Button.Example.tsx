import * as React from 'react';
import {
  Button,
  Calendar,
  Callout,
  DayOfWeek,
  DirectionalHint
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

export interface ICalendarButtonExampleState {
  showCalendar: boolean;
  selectedDate: Date;
}

export class CalendarButtonExample extends React.Component<any, ICalendarButtonExampleState> {
  private _calendarButtonElement: HTMLElement;

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
    return (
      <div>
        <div ref={ (calendarBtn) => this._calendarButtonElement = calendarBtn }>
          <Button onClick={ this._onClick } >
            { this.state.selectedDate == null ? 'Click for Calendar' : this.state.selectedDate.toLocaleDateString() }
          </Button>
        </div>
        { this.state.showCalendar && (
          <Callout
            isBeakVisible={ false }
            className='ms-DatePicker-callout'
            gapSpace={ 0 }
            doNotLayer={ false }
            targetElement={ this._calendarButtonElement }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            onDismiss={ this._onDismiss }
            setInitialFocus={ false }
            >
            <Calendar
              onSelectDate={ this._onSelectDate }
              onDismiss={ this._onDismiss }
              isMonthPickerVisible={ true }
              value={ this.state.selectedDate }
              firstDayOfWeek={ DayOfWeek.Sunday }
              strings={ DayPickerStrings }
              >
            </Calendar>
          </Callout>
        )
        }
      </div>
    );
  }

  private _onClick(event: any) {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = !prevState.showCalendar;
      return prevState;
    });
  }

  private _onDismiss() {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = false;
      return prevState;
    });
  }

  private _onSelectDate(date: Date) {
    this.setState((prevState: ICalendarButtonExampleState) => {
      prevState.showCalendar = false;
      prevState.selectedDate = date;
      return prevState;
    });
  }
}
