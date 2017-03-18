import * as React from 'react';
import {
  Calendar,
  DayOfWeek
} from 'office-ui-fabric-react/lib/Calendar';
import { DateRangeType } from 'office-ui-fabric-react/lib/Calendar';

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
  selectedDateRange: Date[];
}

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible: boolean;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
}

export class CalendarInlineExample extends React.Component<ICalendarInlineExampleProps, ICalendarInlineExampleState> {
  public constructor() {
    super();

    this.state = {
      selectedDate: null,
      selectedDateRange: null
    };

    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render() {
    let divStyle: React.CSSProperties = {
      height: '300px',
      width: '400px'
    };

    let dateRangeString: string = null;
    if (this.state.selectedDateRange != null) {
      let rangeStart = this.state.selectedDateRange[0];
      let rangeEnd = this.state.selectedDateRange[this.state.selectedDateRange.length - 1];
      dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
    }

    return (
      <div style={ divStyle }>
        { <div>
          Selected date(s): <span>{ this.state.selectedDate == null ? 'Not set' : this.state.selectedDate.toLocaleString() }</span>
        </div> }
        <div>
          Selected dates:
          <span> { dateRangeString == null ? 'Not set' : dateRangeString }</span>
        </div>
        <Calendar
          onSelectDate={ this._onSelectDate }
          onDismiss={ this._onDismiss }
          isMonthPickerVisible={ this.props.isMonthPickerVisible }
          dateRangeType={ this.props.dateRangeType }
          autoNavigateOnSelection={ this.props.autoNavigateOnSelection }
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

  private _onSelectDate(date: Date, dateRangeArray: Date[]) {
    this.setState((prevState: ICalendarInlineExampleState) => {
      prevState.selectedDate = date;
      prevState.selectedDateRange = dateRangeArray;
      return prevState;
    });
  }
}
