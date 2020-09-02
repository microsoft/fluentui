import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { Calendar, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

const initialDaysToSelectInDayView = 4;

export interface ICalendarInlineExampleState {
  selectedDate?: Date;
  selectedDateRange?: Date[];
  daysToSelectInDayView?: number;
}

export class CalendarInlineMultidayDayViewExample extends React.Component<{}, ICalendarInlineExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: new Date(),
      selectedDateRange: undefined,
      daysToSelectInDayView: initialDaysToSelectInDayView,
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
          dateRangeType={DateRangeType.Day}
          highlightCurrentMonth={false}
          highlightSelectedMonth={true}
          showGoToToday={true}
          onSelectDate={this._onSelectDate}
          value={this.state.selectedDate}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
          calendarDayProps={{
            daysToSelectInDayView: this.state.daysToSelectInDayView,
          }}
        />
        <div>
          <Dropdown
            className={styles.dropdown}
            selectedKey={this.state.daysToSelectInDayView && this.state.daysToSelectInDayView}
            label="Choose days to select"
            options={[
              { key: 1, text: '1' },
              { key: 2, text: '2' },
              { key: 3, text: '3' },
              { key: 4, text: '4' },
              { key: 5, text: '5' },
              { key: 6, text: '6' },
            ]}
            onChange={this._onDaysToSelectInDayViewDropdownChange}
          />
        </div>
      </div>
    );
  }

  private _onDaysToSelectInDayViewDropdownChange = (
    ev: React.FormEvent<HTMLElement>,
    option: IDropdownOption | undefined,
  ): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        ...prevState,
        daysToSelectInDayView: option && (option.key as number),
      };
    });
  };

  private _onSelectDate = (date: Date, dateRangeArray: Date[]): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        ...prevState,
        selectedDate: date,
        selectedDateRange: dateRangeArray,
      };
    });
  };
}
