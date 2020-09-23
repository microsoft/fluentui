import * as React from 'react';
import { addMonths, addYears, addDays } from '@fluentui/date-time-utilities';
import { Calendar, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);
const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
}

export class CalendarInlineDateBoundariesExample extends React.Component<{}, ICalendarInlineExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: today,
    };
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <div>
          Selected date(s):{' '}
          <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
        </div>
        {(minDate || maxDate) && (
          <div>
            Date boundary:
            <span>
              {' '}
              {minDate ? minDate.toLocaleDateString() : 'Not set'}-{maxDate ? maxDate.toLocaleDateString() : 'Not set'}
            </span>
          </div>
        )}
        {restrictedDates && (
          <div>
            Disabled date(s):
            <span>
              {' '}
              {restrictedDates.length > 0
                ? restrictedDates.map((d: Date) => d.toLocaleDateString()).join(', ')
                : 'Not set'}
            </span>
          </div>
        )}
        <Calendar
          dateRangeType={DateRangeType.Day}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={false}
          minDate={minDate}
          maxDate={maxDate}
          restrictedDates={restrictedDates}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Sunday}
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
