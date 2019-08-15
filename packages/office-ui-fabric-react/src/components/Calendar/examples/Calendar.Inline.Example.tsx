import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { addDays, getDateRangeArray } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { Calendar, DayOfWeek, DateRangeType } from 'office-ui-fabric-react/lib/Calendar';

const DayPickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close'
};

export interface ICalendarInlineExampleState {
  selectedDate?: Date | null;
  selectedDateRange?: Date[] | null;
}

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible?: boolean;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  showGoToToday: boolean;
  showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  showSixWeeksByDefault?: boolean;
  workWeekDays?: DayOfWeek[];
  firstDayOfWeek?: DayOfWeek;
}

export class CalendarInlineExample extends React.Component<ICalendarInlineExampleProps, ICalendarInlineExampleState> {
  public constructor(props: ICalendarInlineExampleProps) {
    super(props);

    this.state = {
      selectedDate: null,
      selectedDateRange: null
    };

    this._onDismiss = this._onDismiss.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);
    this._goNext = this._goNext.bind(this);
    this._goPrevious = this._goPrevious.bind(this);
  }

  public render(): JSX.Element {
    const divStyle: React.CSSProperties = {
      height: 'auto'
    };

    const buttonStyle: React.CSSProperties = {
      margin: '17px 10px 0 0'
    };

    let dateRangeString: string | null = null;
    if (this.state.selectedDateRange) {
      const rangeStart = this.state.selectedDateRange[0];
      const rangeEnd = this.state.selectedDateRange[this.state.selectedDateRange.length - 1];
      dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
    }

    return (
      <div style={divStyle}>
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
              {this.props.restrictedDates.length > 0 ? this.props.restrictedDates.map(d => d.toLocaleDateString()).join(', ') : 'Not set'}
            </span>
          </div>
        )}
        <Calendar
          onSelectDate={this._onSelectDate}
          onDismiss={this._onDismiss}
          isMonthPickerVisible={this.props.isMonthPickerVisible}
          dateRangeType={this.props.dateRangeType}
          autoNavigateOnSelection={this.props.autoNavigateOnSelection}
          showGoToToday={this.props.showGoToToday}
          value={this.state.selectedDate!}
          firstDayOfWeek={this.props.firstDayOfWeek ? this.props.firstDayOfWeek : DayOfWeek.Sunday}
          strings={DayPickerStrings}
          highlightCurrentMonth={this.props.highlightCurrentMonth}
          highlightSelectedMonth={this.props.highlightSelectedMonth}
          isDayPickerVisible={this.props.isDayPickerVisible}
          showMonthPickerAsOverlay={this.props.showMonthPickerAsOverlay}
          showWeekNumbers={this.props.showWeekNumbers}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          restrictedDates={this.props.restrictedDates}
          showSixWeeksByDefault={this.props.showSixWeeksByDefault}
          workWeekDays={this.props.workWeekDays}
        />
        {this.props.showNavigateButtons && (
          <div>
            <DefaultButton style={buttonStyle} onClick={this._goPrevious} text="Previous" />
            <DefaultButton style={buttonStyle} onClick={this._goNext} text="Next" />
          </div>
        )}
      </div>
    );
  }

  private _onDismiss(): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      return prevState;
    });
  }

  private _goPrevious(): void {
    this.setState((prevState: ICalendarInlineExampleState) => {
      const selectedDate = prevState.selectedDate || new Date();
      const dateRangeArray = getDateRangeArray(selectedDate, this.props.dateRangeType, DayOfWeek.Sunday);

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
      const dateRangeArray = getDateRangeArray(selectedDate, this.props.dateRangeType, DayOfWeek.Sunday);
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
