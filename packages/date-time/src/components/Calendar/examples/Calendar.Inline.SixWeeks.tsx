import * as React from 'react';
import { Calendar, DayOfWeek, defaultDayPickerStrings, DateRangeType } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
}

export class CalendarInlineSixWeeksExample extends React.Component<{}, ICalendarInlineExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: new Date(),
    };
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <div>
          Selected date(s):{' '}
          <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
        </div>
        <Calendar
          showSixWeeksByDefault={true}
          dateRangeType={DateRangeType.Day}
          showGoToToday={true}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
        />
      </div>
    );
  }

  private _onSelectDate = (date: Date): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        selectedDate: date,
      };
    });
  };
}
