import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react';
import { addDays, getDateRangeArray } from '@fluentui/date-time-utilities';
import { Calendar, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

const dateRangeType = DateRangeType.Month;

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
  selectedDateRange?: Date[];
}

export class CalendarInlineMonthSelectionExample extends React.Component<{}, ICalendarInlineExampleState> {
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
          dateRangeType={dateRangeType}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
        />
        <div>
          <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
          <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
        </div>
      </div>
    );
  }

  private _goPrevious = (): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      const selectedDate = prevState.selectedDate || new Date();
      const dateRangeArray = getDateRangeArray(selectedDate, dateRangeType, DayOfWeek.Sunday);

      const subtractFrom = new Date(dateRangeArray[0].getFullYear(), dateRangeArray[0].getMonth(), 1);
      const daysToSubtract = 1;

      const newSelectedDate = addDays(subtractFrom, -daysToSubtract);

      return {
        selectedDate: newSelectedDate,
      };
    });
  };

  private _goNext = (): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      const selectedDate = prevState.selectedDate || new Date();
      const dateRangeArray = getDateRangeArray(selectedDate, dateRangeType, DayOfWeek.Sunday);
      const newSelectedDate = addDays(dateRangeArray.pop()!, 1);

      return {
        selectedDate: newSelectedDate,
      };
    });
  };

  private _onSelectDate = (date: Date, dateRangeArray: Date[]): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        selectedDate: date,
        selectedDateRange: dateRangeArray,
      };
    });
  };
}
