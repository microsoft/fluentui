import * as React from 'react';
import {
  Button,
  DatePicker,
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

export interface IDatePickerButtonExampleState {
  showDatePicker: boolean;
  selectedDate: Date;
}

export class DatePickerButtonExample extends React.Component<any, IDatePickerButtonExampleState> {
  public constructor() {
    super();

    this.state = {
      showDatePicker: false,
      selectedDate: null
    };

    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render() {
    return (
      <div>
        <Button onClick={ this._onClick }>
          { this.state.selectedDate == null ? 'Click for DatePicker' : this.state.selectedDate.toLocaleDateString() }
        </Button>
        <DatePicker firstDayOfWeek={ DayOfWeek.Sunday } strings={ DayPickerStrings } hideTextField={ true } showDatePicker={ this.state.showDatePicker } onDismiss={ this._onDismiss } onSelectDate={ this._onSelectDate } />
      </div>
    );
  }

  private _onClick(event: any) {
    this.setState((prevState: IDatePickerButtonExampleState) => {
      prevState.showDatePicker = !prevState.showDatePicker;
      return prevState;
    });
  }

  private _onDismiss() {
    this.setState((prevState: IDatePickerButtonExampleState) => {
      prevState.showDatePicker = false;
      return prevState;
    });
  }

  private _onSelectDate(date: Date) {
    this.setState((prevState: IDatePickerButtonExampleState) => {
      prevState.showDatePicker = false;
      prevState.selectedDate = date;
      return prevState;
    });
  }
}
