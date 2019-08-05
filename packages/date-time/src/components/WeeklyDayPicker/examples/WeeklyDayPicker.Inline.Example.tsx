import * as React from 'react';
import { WeeklyDayPicker, DateRangeType, DayOfWeek, addDays } from '@uifabric/date-time';

import * as styles from './WeeklyDayPicker.Example.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

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

export interface IWeeklyDayPickerInlineExampleState {
  selectedDate?: Date;
}

export interface IWeeklyDayPickerInlineExampleProps {
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

export class WeeklyDayPickerInlineExample extends React.Component<IWeeklyDayPickerInlineExampleProps, IWeeklyDayPickerInlineExampleState> {
  public constructor(props: IWeeklyDayPickerInlineExampleProps) {
    super(props);

    this.state = {
      selectedDate: new Date()
    };

    this._onSelectDate = this._onSelectDate.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        {
          <div>
            Selected date(s): <span>{!this.state.selectedDate ? 'Not set' : this.state.selectedDate.toLocaleString()}</span>
          </div>
        }
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
        <WeeklyDayPicker
          onSelectDate={this._onSelectDate}
          firstDayOfWeek={this.props.firstDayOfWeek ? this.props.firstDayOfWeek : DayOfWeek.Sunday}
          strings={DayPickerStrings}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          restrictedDates={this.props.restrictedDates}
          initialDate={this.state.selectedDate}
        />
        {this.props.showNavigateButtons && (
          <div>
            <DefaultButton className={styles.button} onClick={this._goPrevious} text="Previous" />
            <DefaultButton className={styles.button} onClick={this._goNext} text="Next" />
          </div>
        )}
      </div>
    );
  }

  private _onSelectDate(date: Date): void {
    this.setState((prevState: IWeeklyDayPickerInlineExampleState) => {
      return {
        selectedDate: date
      };
    });
  }

  private _goPrevious = () => {
    if (this.state && this.state.selectedDate) {
      this._onSelectDate(addDays(this.state.selectedDate, -1));
    }
  };

  private _goNext = () => {
    if (this.state && this.state.selectedDate) {
      this._onSelectDate(addDays(this.state.selectedDate, 1));
    }
  };
}
