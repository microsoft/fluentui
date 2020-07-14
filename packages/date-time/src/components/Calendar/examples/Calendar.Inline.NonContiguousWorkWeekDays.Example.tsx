import * as React from 'react';
import { Calendar, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
  selectedDateRange?: Date[];
}

export class CalendarInlineNonContiguousWorkWeekDaysExample extends React.Component<{}, ICalendarInlineExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      selectedDateRange: undefined,
    };
  }

  public render(): JSX.Element {
    let dateRangeString: string | null = null;
    if (this.state.selectedDateRange) {
      const rangeStart = this.state.selectedDateRange[0];
      const rangeEnd = this.state.selectedDateRange[this.state.selectedDateRange.length - 1];
      dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
    }

    return (
      <div className={styles.wrapper}>
        <div>
          Selected date(s):{' '}
          <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
        </div>
        <div>
          Selected dates:
          <span> {!dateRangeString ? 'Not set' : dateRangeString}</span>
        </div>
        <Calendar
          dateRangeType={DateRangeType.WorkWeek}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          workWeekDays={[DayOfWeek.Tuesday, DayOfWeek.Saturday, DayOfWeek.Wednesday, DayOfWeek.Friday]}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Monday}
          strings={defaultDayPickerStrings}
        />
      </div>
    );
  }

  private _onSelectDate = (date: Date, dateRangeArray: Date[]): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        selectedDate: date,
        selectedDateRange: dateRangeArray,
      };
    });
  };
}
