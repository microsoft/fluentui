import * as React from 'react';
import {
  ICalendar,
  ICalendarProps,
  ICalendarStrings,
  ICalendarIconStrings,
  ICalendarFormatDateCallbacks,
  ICalendarStyleProps,
  ICalendarStyles
} from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarMonth } from './CalendarMonth/CalendarMonth';
import { ICalendarDay } from './CalendarDay/CalendarDay.types';
import { ICalendarMonth } from './CalendarMonth/CalendarMonth.types';
import { css, BaseComponent, KeyCodes, classNamesFunction } from '@uifabric/utilities';
import { IProcessedStyleSet } from '@uifabric/styling';

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

const leftArrow = 'Up';
const rightArrow = 'Down';
const closeIcon = 'CalculatorMultiply';
export const defaultIconStrings: ICalendarIconStrings = {
  leftNavigation: leftArrow,
  rightNavigation: rightArrow,
  closeIcon: closeIcon
};

export const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday
];

export const defaultDateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings: ICalendarStrings) =>
    strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
  formatMonthYear: (date: Date, strings: ICalendarStrings) => strings.months[date.getMonth()] + ' ' + date.getFullYear(),
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString()
};

export interface ICalendarState {
  /** The currently focused date in the day picker, but not necessarily selected */
  navigatedDayDate?: Date;

  /** The currently focused date in the month picker, but not necessarily selected */
  navigatedMonthDate?: Date;

  /** The currently selected date in the calendar */
  selectedDate?: Date;

  /** State used to show/hide month picker */
  isMonthPickerVisible?: boolean;

  /** State used to show/hide day picker */
  isDayPickerVisible?: boolean;
}

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
    showGoToToday: true,
    strings: null,
    highlightCurrentMonth: false,
    highlightSelectedMonth: false,
    navigationIcons: defaultIconStrings,
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateTimeFormatter: defaultDateTimeFormatterCallbacks,
    showSixWeeksByDefault: false,
    workWeekDays: defaultWorkWeekDays,
    showCloseButton: false,
    allFocusable: false
  };

  private _dayPicker = React.createRef<ICalendarDay>();
  private _monthPicker = React.createRef<ICalendarMonth>();

  private _focusOnUpdate: boolean;

  constructor(props: ICalendarProps) {
    super(props);
    const currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : props.today || new Date();

    this.state = {
      selectedDate: currentDate,
      navigatedDayDate: currentDate,
      navigatedMonthDate: currentDate,

      /** When showMonthPickerAsOverlay is active it overrides isMonthPickerVisible/isDayPickerVisible props
       (These props permanently set the visibility of their respective calendars). */
      isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
      isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible
    };

    this._focusOnUpdate = false;
  }

  public componentWillReceiveProps(nextProps: ICalendarProps): void {
    const { value, today = new Date() } = nextProps;

    this.setState({
      selectedDate: value || today,
      navigatedDayDate: value || today,
      navigatedMonthDate: value || today
    });
  }

  public componentDidUpdate(): void {
    if (this._focusOnUpdate) {
      this.focus();
      this._focusOnUpdate = false;
    }
  }

  public render(): JSX.Element {
    const rootClass = 'ms-DatePicker';
    const {
      firstDayOfWeek,
      dateRangeType,
      strings,
      showMonthPickerAsOverlay,
      showGoToToday,
      highlightCurrentMonth,
      highlightSelectedMonth,
      navigationIcons,
      minDate,
      maxDate,
      restrictedDates,
      className,
      showCloseButton,
      allFocusable,
      styles,
      showWeekNumbers,
      theme
    } = this.props;
    const { selectedDate, navigatedDayDate, navigatedMonthDate, isMonthPickerVisible, isDayPickerVisible } = this.state;
    const onHeaderSelect = showMonthPickerAsOverlay ? this._onHeaderSelect : undefined;
    const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
    const overlayedWithButton = showMonthPickerAsOverlay && showGoToToday;

    const classes = getClassNames(styles, {
      theme: theme!,
      className,
      isMonthPickerVisible: isMonthPickerVisible,
      isDayPickerVisible: isDayPickerVisible,
      monthPickerOnly: monthPickerOnly,
      showMonthPickerAsOverlay: showMonthPickerAsOverlay,
      overlayedWithButton: overlayedWithButton,
      showGoToToday: showGoToToday,
      showWeekNumbers: showWeekNumbers
    });

    return (
      <div className={css(rootClass, classes.root, className, 'ms-slideDownIn10')} onKeyDown={this._onDatePickerPopupKeyDown}>
        {isDayPickerVisible && (
          <CalendarDay
            selectedDate={selectedDate!}
            navigatedDate={navigatedDayDate!}
            today={this.props.today}
            onSelectDate={this._onSelectDate}
            onNavigateDate={this._onNavigateDayDate}
            onDismiss={this.props.onDismiss}
            firstDayOfWeek={firstDayOfWeek!}
            dateRangeType={dateRangeType!}
            strings={strings!}
            onHeaderSelect={onHeaderSelect}
            navigationIcons={navigationIcons!}
            showWeekNumbers={this.props.showWeekNumbers}
            firstWeekOfYear={this.props.firstWeekOfYear!}
            dateTimeFormatter={this.props.dateTimeFormatter!}
            showSixWeeksByDefault={this.props.showSixWeeksByDefault}
            minDate={minDate}
            maxDate={maxDate}
            restrictedDates={restrictedDates}
            workWeekDays={this.props.workWeekDays}
            componentRef={this._dayPicker}
            showCloseButton={showCloseButton}
            allFocusable={allFocusable}
          />
        )}
        {isDayPickerVisible && isMonthPickerVisible && <div className={classes.divider} />}
        {isMonthPickerVisible ? (
          <div className={classes.monthPickerWrapper}>
            <CalendarMonth
              navigatedDate={navigatedMonthDate!}
              selectedDate={navigatedDayDate!}
              strings={strings!}
              onNavigateDate={this._onNavigateMonthDate}
              today={this.props.today}
              highlightCurrentMonth={highlightCurrentMonth!}
              highlightSelectedMonth={highlightSelectedMonth!}
              onHeaderSelect={this._onHeaderSelect}
              navigationIcons={navigationIcons!}
              dateTimeFormatter={this.props.dateTimeFormatter!}
              minDate={minDate}
              maxDate={maxDate}
              componentRef={this._monthPicker}
            />
            {this._renderGoToTodayButton(classes)}
          </div>
        ) : (
          this._renderGoToTodayButton(classes)
        )}
      </div>
    );
  }

  public focus(): void {
    if (this.state.isDayPickerVisible && this._dayPicker.current) {
      this._dayPicker.current.focus();
    } else if (this.state.isMonthPickerVisible && this._monthPicker.current) {
      this._monthPicker.current.focus();
    }
  }

  private _renderGoToTodayButton = (classes: IProcessedStyleSet<ICalendarStyles>) => {
    const { showGoToToday, strings } = this.props;
    return (
      showGoToToday && (
        <button
          className={css('js-goToday', classes.goTodayButton)}
          onClick={this._onGotoToday}
          onKeyDown={this._onButtonKeyDown(this._onGotoToday)}
          type="button"
        >
          {strings!.goToToday}
        </button>
      )
    );
  };

  private _navigateDayPickerDay = (date: Date): void => {
    this.setState({
      navigatedDayDate: date,
      navigatedMonthDate: date
    });
  };

  private _navigateMonthPickerDay = (date: Date): void => {
    this.setState({
      navigatedMonthDate: date
    });
  };

  private _onNavigateDayDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    this._navigateDayPickerDay(date);
    this._focusOnUpdate = focusOnNavigatedDay;
  };

  private _onNavigateMonthDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    if (!focusOnNavigatedDay) {
      this._navigateMonthPickerDay(date);
      this._focusOnUpdate = focusOnNavigatedDay;
      return;
    }

    const monthPickerOnly = !this.props.showMonthPickerAsOverlay && !this.props.isDayPickerVisible;

    if (monthPickerOnly) {
      this._onSelectDate(date);
    }

    this._navigateDayPickerDay(date);
  };

  private _onSelectDate = (date: Date, selectedDateRangeArray?: Date[]): void => {
    const { onSelectDate } = this.props;

    this.setState({
      selectedDate: date,
      navigatedDayDate: date,
      navigatedMonthDate: date
    });

    if (onSelectDate) {
      onSelectDate(date, selectedDateRangeArray);
    }
  };

  private _onHeaderSelect = (): void => {
    const { showMonthPickerAsOverlay } = this.props;
    this.setState({
      isDayPickerVisible: !(showMonthPickerAsOverlay && this.state.isDayPickerVisible),
      isMonthPickerVisible: !(showMonthPickerAsOverlay && this.state.isMonthPickerVisible)
    });

    this._focusOnUpdate = true;
  };

  private _onGotoToday = (): void => {
    const { today } = this.props;
    this._navigateDayPickerDay(today!);
  };

  private _onButtonKeyDown = (callback: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
    return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (ev.which) {
        case KeyCodes.enter:
        case KeyCodes.space:
          callback();
          break;
      }
    };
  };

  private _onDatePickerPopupKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
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
  };

  private _handleEscKey = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };
}
