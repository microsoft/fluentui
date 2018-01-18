import * as React from 'react';
import {
  autobind,
  BaseComponent,
  classNamesFunction,
  customizable,
  KeyCodes
} from '../../Utilities';
import { CalendarDay } from './CalendarDay';
import { CalendarMonth } from './CalendarMonth';
import { compareDates, getDateRangeArray } from '../../utilities/dateMath/DateMath';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import {
  ICalendar,
  ICalendarFormatDateCallbacks,
  ICalendarIconStrings,
  ICalendarProps,
  ICalendarStrings,
  ICalendarStyleProps,
  ICalendarStyles
} from './Calendar.types';
import { ICalendarDay } from './CalendarDay.types';
import { ICalendarMonth } from './CalendarMonth.types';

const leftArrow: string = 'Up';
const rightArrow: string = 'Down';
let iconStrings: ICalendarIconStrings = {
  leftNavigation: leftArrow,
  rightNavigation: rightArrow
};

let dateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings: ICalendarStrings) => (strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()),
  formatMonthYear: (date: Date, strings: ICalendarStrings) => (strings.months[date.getMonth()] + ' ' + date.getFullYear()),
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString()
};

export interface ICalendarState {
  /** The currently focused date in the calendar, but not necessarily selected */
  navigatedDate?: Date;

  /** The currently selected date in the calendar */
  selectedDate?: Date;

  /** State used to show/hide month picker */
  isMonthPickerVisible?: boolean;

  /** State used to show/hide day picker */
  isDayPickerVisible?: boolean;
}

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

@customizable('Calendar', ['theme'])
export class CalendarBase extends BaseComponent<ICalendarProps, ICalendarState> implements ICalendar {
  public static defaultProps: ICalendarProps = {
    onSelectDate: undefined,
    onDismiss: undefined,
    isMonthPickerVisible: true,
    isDayPickerVisible: true,
    showMonthPickerAsOverlay: false,
    value: undefined,
    today: new Date(),
    firstDayOfWeek: DayOfWeek.Sunday,
    dateRangeType: DateRangeType.Day,
    autoNavigateOnSelection: false,
    showGoToToday: true,
    strings: null,
    highlightCurrentMonth: false,
    navigationIcons: iconStrings,
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateTimeFormatter: dateTimeFormatterCallbacks,
    showSixWeeksByDefault: false,
  };

  private _calendar: ICalendar;
  private _dayPicker: ICalendarDay;
  private _monthPicker: ICalendarMonth;
  private _focusOnUpdate: boolean;

  constructor(props: ICalendarProps) {
    super(props);
    let currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : (props.today || new Date());

    this.state = {
      selectedDate: currentDate,
      navigatedDate: currentDate,

      /** When showMonthPickerAsOverlay is active it overrides isMonthPickerVisible/isDayPickerVisible props (These props permanently set the visibility of their respective calendars). */
      isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
      isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible
    };

    this._focusOnUpdate = false;
  }

  public componentWillReceiveProps(nextProps: ICalendarProps) {
    let { autoNavigateOnSelection, value, today = new Date() } = nextProps;

    // Make sure auto-navigation is supported for programmatic changes to selected date, i.e.,
    // if selected date is updated via props, we may need to modify the navigated date
    let overrideNavigatedDate = (autoNavigateOnSelection && !compareDates(value!, this.props.value!));
    if (overrideNavigatedDate) {
      this.setState({
        navigatedDate: value
      });
    }

    this.setState({
      selectedDate: value || today
    });
  }

  public componentDidUpdate() {
    if (this._focusOnUpdate) {
      // if the day picker is shown, focus on it
      if (this._dayPicker && this.state.isDayPickerVisible) {
        this._dayPicker.focus();
      } else if (this._monthPicker && this.state.isMonthPickerVisible) {
        this._monthPicker.focus();
      }
      this._focusOnUpdate = false;
    }
  }

  public render() {
    let {
      firstDayOfWeek,
      dateRangeType,
      strings,
      showMonthPickerAsOverlay,
      autoNavigateOnSelection,
      showGoToToday,
      highlightCurrentMonth,
      navigationIcons,
      minDate,
      maxDate,
      getStyles,
      getDayStyles,
      getMonthStyles,
      theme,
      className } = this.props;
    let { selectedDate, navigatedDate, isMonthPickerVisible, isDayPickerVisible } = this.state;
    let onHeaderSelect = showMonthPickerAsOverlay ? this._onHeaderSelect : undefined;
    let monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        isMonthPickerVisible: isMonthPickerVisible!,
        isDayPickerVisible: isDayPickerVisible!,
        showMonthPickerAsOverlay: showMonthPickerAsOverlay!,
        showGoToToday: showGoToToday!
      });

    return (
      <div className={ classNames.root } ref={ this._resolveRef('_calendar') } role='application'>
        <div className={ classNames.picker }>
          <div className={ classNames.holder } onKeyDown={ this._onDatePickerPopupKeyDown }>
            <div className={ classNames.frame }>
              <div className={ classNames.wrap }>
                { isDayPickerVisible && <CalendarDay
                  selectedDate={ selectedDate! }
                  navigatedDate={ navigatedDate! }
                  today={ this.props.today }
                  onSelectDate={ this._onSelectDate }
                  onNavigateDate={ this._onNavigateDate }
                  onDismiss={ this.props.onDismiss }
                  firstDayOfWeek={ firstDayOfWeek! }
                  dateRangeType={ dateRangeType! }
                  autoNavigateOnSelection={ autoNavigateOnSelection! }
                  strings={ strings! }
                  onHeaderSelect={ onHeaderSelect }
                  navigationIcons={ navigationIcons! }
                  showWeekNumbers={ this.props.showWeekNumbers }
                  firstWeekOfYear={ this.props.firstWeekOfYear! }
                  dateTimeFormatter={ this.props.dateTimeFormatter! }
                  showSixWeeksByDefault={ this.props.showSixWeeksByDefault }
                  monthPickerVisible={ isMonthPickerVisible }
                  minDate={ minDate }
                  maxDate={ maxDate }
                  getStyles={ getDayStyles }
                  componentRef={ this._resolveRef('_dayPicker') }
                />
                }

                { isMonthPickerVisible && <CalendarMonth
                  navigatedDate={ navigatedDate! }
                  strings={ strings! }
                  onNavigateDate={ this._onNavigateDate }
                  today={ this.props.today }
                  highlightCurrentMonth={ highlightCurrentMonth! }
                  onHeaderSelect={ onHeaderSelect }
                  navigationIcons={ navigationIcons! }
                  dateTimeFormatter={ this.props.dateTimeFormatter! }
                  dayPickerVisible={ isDayPickerVisible }
                  minDate={ minDate }
                  maxDate={ maxDate }
                  getStyles={ getMonthStyles }
                  componentRef={ this._resolveRef('_monthPicker') }
                /> }

                { showGoToToday &&
                  <span
                    role='button'
                    className={ classNames.goToday }
                    onClick={ this._onGotoToday }
                    onKeyDown={ this._onGotoTodayKeyDown }
                    tabIndex={ 0 }
                  >
                    { strings!.goToToday }
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public focus() {
    if (this._dayPicker) {
      this._dayPicker.focus();
    }
  }

  @autobind
  private _navigateDay(date: Date) {
    this.setState({
      navigatedDate: date
    });
  }

  @autobind
  private _onNavigateDate(date: Date, focusOnNavigatedDay: boolean) {

    if (this.props.isDayPickerVisible || (!this.props.isDayPickerVisible && !focusOnNavigatedDay)) {
      this._navigateDay(date);
      this._focusOnUpdate = focusOnNavigatedDay;
    } else {
      // if only the month picker is shown, select the chosen month
      this._onSelectDate(date);
    }
  }

  @autobind
  private _onSelectDate(date: Date, selectedDateRangeArray?: Date[]) {
    let { onSelectDate } = this.props;

    this.setState({
      selectedDate: date
    });

    if (onSelectDate) {
      onSelectDate(date, selectedDateRangeArray);
    }
  }

  @autobind
  private _onHeaderSelect(focus: boolean) {
    this.setState({
      isDayPickerVisible: !this.state.isDayPickerVisible,
      isMonthPickerVisible: !this.state.isMonthPickerVisible
    });

    if (focus) {
      this._focusOnUpdate = true;
    }
  }

  @autobind
  private _onGotoToday() {

    let { dateRangeType, firstDayOfWeek, today } = this.props;

    let dates = getDateRangeArray(today!, dateRangeType!, firstDayOfWeek!);

    this._onSelectDate(today!, dates);

  }

  @autobind
  private _onGotoTodayKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      ev.preventDefault();
      this._onGotoToday();
    } else if (ev.which === KeyCodes.tab && !ev.shiftKey) {
      if (this.props.onDismiss) {
        ev.stopPropagation();
        ev.preventDefault();
        this.props.onDismiss();
      }
    }
  }

  @autobind
  private _onDatePickerPopupKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        break;

      case KeyCodes.backspace:
        ev.preventDefault();
        break;

      case KeyCodes.escape:
        this._handleEscKey(ev);
        break;

      default:
        break;
    }
  }

  @autobind
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>) {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }
}
