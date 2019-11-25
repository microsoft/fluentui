import * as React from 'react';
import { DefaultButton, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { addDays, getDateRangeArray } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { Calendar, ICalendarProps, DateRangeType, DayOfWeek, defaultDayPickerStrings } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

export interface ICalendarInlineExampleState {
  selectedDate?: Date | null;
  selectedDateRange?: Date[] | null;
  daysToSelectInDayView?: number;
}

export interface ICalendarInlineExampleProps extends ICalendarProps {
  showNavigateButtons?: boolean;
  showDaysToSelectInDayViewDropdown?: boolean;
}

export class CalendarInlineExample extends React.Component<ICalendarInlineExampleProps, ICalendarInlineExampleState> {
  public constructor(props: ICalendarInlineExampleProps) {
    super(props);

    this.state = {
      selectedDate: null,
      selectedDateRange: null,
      daysToSelectInDayView: props.calendarDayProps ? props.calendarDayProps.daysToSelectInDayView : 1
    };

    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
    this._goNext = this._goNext.bind(this);
    this._goPrevious = this._goPrevious.bind(this);
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
        {
          <div>
            Selected date(s): <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
          </div>
        }
        <div>
          Selected dates:
          <span> {!dateRangeString ? 'Not set' : dateRangeString}</span>
        </div>
        {(this.props.minDate || this.props.maxDate) && (
          <div>
            Date boundary:
            <span>
              {' '}
              {this.props.minDate ? this.props.minDate.toLocaleDateString() : 'Not set'}-
              {this.props.maxDate ? this.props.maxDate.toLocaleDateString() : 'Not set'}
            </span>
          </div>
        )}
        {this.props.restrictedDates && (
          <div>
            Disabled date(s):
            <span>
              {' '}
              {this.props.restrictedDates.length > 0
                ? this.props.restrictedDates.map((d: Date) => d.toLocaleDateString()).join(', ')
                : 'Not set'}
            </span>
          </div>
        )}
        <Calendar
          {...this.props}
          onSelectDate={this._onSelectDate}
          onDismiss={this._onDismiss}
          value={this.state.selectedDate!}
          firstDayOfWeek={this.props.firstDayOfWeek ? this.props.firstDayOfWeek : DayOfWeek.Sunday}
          strings={defaultDayPickerStrings}
          calendarDayProps={{
            ...this.props.calendarDayProps,
            daysToSelectInDayView: this.state.daysToSelectInDayView
          }}
        />
        {this.props.showNavigateButtons && (
          <div>
            <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
            <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
          </div>
        )}
        {this.props.showDaysToSelectInDayViewDropdown && (
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
                { key: 6, text: '6' }
              ]}
              onChange={this._onDaysToSelectInDayViewDropdownChange}
            />
          </div>
        )}
      </div>
    );
  }

  private _onDaysToSelectInDayViewDropdownChange = (ev: React.FormEvent<HTMLElement>, option: IDropdownOption | undefined): void => {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        ...prevState,
        daysToSelectInDayView: option && (option.key as number)
      };
    });
  };

  private _onDismiss(): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return prevState;
    });
  }

  private _goPrevious(): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      const selectedDate = prevState.selectedDate || new Date();
      const dateRangeArray = getDateRangeArray(selectedDate, this.props.dateRangeType!, DayOfWeek.Sunday);

      let subtractFrom = dateRangeArray[0];
      let daysToSubtract = dateRangeArray.length;

      if (this.props.dateRangeType === DateRangeType.Month) {
        subtractFrom = new Date(subtractFrom.getFullYear(), subtractFrom.getMonth(), 1);
        daysToSubtract = 1;
      }

      const newSelectedDate = addDays(subtractFrom, -daysToSubtract);

      return {
        selectedDate: newSelectedDate
      };
    });
  }

  private _goNext(): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      const selectedDate = prevState.selectedDate || new Date();
      const dateRangeArray = getDateRangeArray(selectedDate, this.props.dateRangeType!, DayOfWeek.Sunday);
      const newSelectedDate = addDays(dateRangeArray.pop()!, 1);

      return {
        selectedDate: newSelectedDate
      };
    });
  }

  private _onSelectDate(date: Date, dateRangeArray: Date[]): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return {
        selectedDate: date,
        selectedDateRange: dateRangeArray
      };
    });
  }
}
