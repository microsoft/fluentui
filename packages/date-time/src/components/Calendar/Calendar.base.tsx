import * as React from 'react';
import {
  ICalendar,
  ICalendarProps,
  ICalendarIconStrings,
  ICalendarFormatDateCallbacks,
  ICalendarStyleProps,
  ICalendarStyles,
} from './Calendar.types';
import {
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  addMonths,
  addYears,
  formatMonthDayYear,
  formatMonthYear,
  formatDay,
  formatYear,
} from '@fluentui/date-time-utilities';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarMonth } from './CalendarMonth/CalendarMonth';
import { ICalendarDay } from './CalendarDay/CalendarDay.types';
import { ICalendarMonth } from './CalendarMonth/CalendarMonth.types';
import {
  css,
  KeyCodes,
  classNamesFunction,
  focusAsync,
  format,
  initializeComponentRef,
  FocusRects,
  getPropsWithDefaults,
} from '@uifabric/utilities';
import { IProcessedStyleSet } from '@uifabric/styling';
import { DayPickerStrings } from './defaults';
import { useControllableValue } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

const leftArrow = 'Up';
const rightArrow = 'Down';
const closeIcon = 'CalculatorMultiply';
export const defaultIconStrings: ICalendarIconStrings = {
  leftNavigation: leftArrow,
  rightNavigation: rightArrow,
  closeIcon: closeIcon,
};

export const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
];

export const defaultDateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear,
  formatMonthYear,
  formatDay,
  formatYear,
};

const DEFAULT_PROPS: Partial<ICalendarProps> = {
  isMonthPickerVisible: true,
  isDayPickerVisible: true,
  showMonthPickerAsOverlay: false,
  today: new Date(),
  firstDayOfWeek: DayOfWeek.Sunday,
  dateRangeType: DateRangeType.Day,
  showGoToToday: true,
  strings: DayPickerStrings,
  highlightCurrentMonth: false,
  highlightSelectedMonth: false,
  navigationIcons: defaultIconStrings,
  showWeekNumbers: false,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateTimeFormatter: defaultDateTimeFormatterCallbacks,
  showSixWeeksByDefault: false,
  workWeekDays: defaultWorkWeekDays,
  showCloseButton: false,
  allFocusable: false,
};

export interface ICalendarState {
  /** State used to show/hide month picker */
  isMonthPickerVisible?: boolean;

  /** State used to show/hide day picker */
  isDayPickerVisible?: boolean;
}

function useDateState({ value, today = new Date(), onSelectDate }: ICalendarProps) {
  /** The currently focused date in the day picker, but not necessarily selected */
  const [navigatedDay = today, setNavigatedDay] = useControllableValue(value, today);

  /** The currently focused date in the month picker, but not necessarily selected */
  const [navigatedMonth = today, setNavigatedMonth] = useControllableValue(value, today);

  /** The currently selected date in the calendar */
  const [selectedDate = today, setSelectedDate] = useControllableValue(value, today);

  const navigateMonth = (date: Date) => {
    setNavigatedMonth(date);
  };

  const navigateDay = (date: Date) => {
    setNavigatedMonth(date);
    setNavigatedDay(date);
  };

  const onDateSelected = (date: Date, selectedDateRangeArray?: Date[]) => {
    setNavigatedMonth(date);
    setNavigatedDay(date);
    setSelectedDate(date);
    onSelectDate?.(date, selectedDateRangeArray);
  };

  return [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] as const;
}

export const CalendarBase = React.forwardRef(
  (propsWithoutDefaults: ICalendarProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] = useDateState(
      props,
    );
    return (
      <CalendarBaseClass
        {...props}
        hoisted={{
          forwardedRef,
          selectedDate,
          navigatedDay,
          navigatedMonth,
          onDateSelected,
          navigateDay,
          navigateMonth,
        }}
      />
    );
  },
);
CalendarBase.displayName = 'CalendarBase';

interface ICalendarBaseClassProps extends ICalendarProps {
  hoisted: {
    forwardedRef: React.Ref<HTMLDivElement>;
    selectedDate: Date;
    navigatedDay: Date;
    navigatedMonth: Date;
    onDateSelected(date: Date, selectedDateRangeArray?: Date[]): void;
    navigateDay(date: Date): void;
    navigateMonth(date: Date): void;
  };
}

class CalendarBaseClass extends React.Component<ICalendarBaseClassProps, ICalendarState> implements ICalendar {
  private _dayPicker = React.createRef<ICalendarDay>();
  private _monthPicker = React.createRef<ICalendarMonth>();

  private _focusOnUpdate: boolean;

  constructor(props: ICalendarBaseClassProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      /** When showMonthPickerAsOverlay is active it overrides isMonthPickerVisible/isDayPickerVisible props
       (These props permanently set the visibility of their respective calendars). */
      isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
      isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible,
    };

    this._focusOnUpdate = false;
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
      theme,
      calendarDayProps,
      calendarMonthProps,
      dateTimeFormatter,
      today = new Date(),
      hoisted: { selectedDate, navigatedDay, navigatedMonth, onDateSelected },
    } = this.props;
    const { isMonthPickerVisible, isDayPickerVisible } = this.state;
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
      showWeekNumbers: showWeekNumbers,
    });

    let todayDateString: string = '';
    let selectedDateString: string = '';
    if (dateTimeFormatter && strings!.todayDateFormatString) {
      todayDateString = format(strings!.todayDateFormatString, dateTimeFormatter.formatMonthDayYear(today, strings!));
    }
    if (dateTimeFormatter && strings!.selectedDateFormatString) {
      selectedDateString = format(
        strings!.selectedDateFormatString,
        dateTimeFormatter.formatMonthDayYear(selectedDate, strings!),
      );
    }
    const selectionAndTodayString = selectedDateString + ', ' + todayDateString;

    return (
      <div
        ref={this.props.hoisted.forwardedRef}
        aria-label={selectionAndTodayString}
        className={css(rootClass, classes.root, className, 'ms-slideDownIn10')}
        onKeyDown={this._onDatePickerPopupKeyDown}
      >
        <div className={classes.liveRegion} aria-live="polite" aria-atomic="true">
          <span>{selectedDateString}</span>
        </div>
        {isDayPickerVisible && (
          <CalendarDay
            selectedDate={selectedDate!}
            navigatedDate={navigatedDay!}
            today={this.props.today}
            onSelectDate={onDateSelected}
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
            {...calendarDayProps} // at end of list so consumer's custom functions take precedence
          />
        )}
        {isDayPickerVisible && isMonthPickerVisible && <div className={classes.divider} />}
        {isMonthPickerVisible ? (
          <div className={classes.monthPickerWrapper}>
            <CalendarMonth
              navigatedDate={navigatedMonth}
              selectedDate={navigatedDay}
              strings={strings!}
              onNavigateDate={this._onNavigateMonthDate}
              today={this.props.today}
              highlightCurrentMonth={highlightCurrentMonth!}
              highlightSelectedMonth={highlightSelectedMonth!}
              onHeaderSelect={onHeaderSelect}
              navigationIcons={navigationIcons!}
              dateTimeFormatter={this.props.dateTimeFormatter!}
              minDate={minDate}
              maxDate={maxDate}
              componentRef={this._monthPicker}
              {...calendarMonthProps} // at end of list so consumer's custom functions take precedence
            />
            {this._renderGoToTodayButton(classes)}
          </div>
        ) : (
          this._renderGoToTodayButton(classes)
        )}
        <FocusRects />
      </div>
    );
  }

  public focus(): void {
    if (this.state.isDayPickerVisible && this._dayPicker.current) {
      focusAsync(this._dayPicker.current);
    } else if (this.state.isMonthPickerVisible && this._monthPicker.current) {
      focusAsync(this._monthPicker.current);
    }
  }

  private _renderGoToTodayButton = (classes: IProcessedStyleSet<ICalendarStyles>) => {
    const {
      showGoToToday,
      strings,
      today,
      hoisted: { navigatedDay, navigatedMonth },
    } = this.props;
    let goTodayEnabled = showGoToToday;

    if (goTodayEnabled && today) {
      goTodayEnabled =
        navigatedDay.getFullYear() !== today.getFullYear() ||
        navigatedDay.getMonth() !== today.getMonth() ||
        navigatedMonth.getFullYear() !== today.getFullYear() ||
        navigatedMonth.getMonth() !== today.getMonth();
    }

    return (
      showGoToToday && (
        <button
          className={css('js-goToday', classes.goTodayButton)}
          onClick={this._onGotoToday}
          onKeyDown={this._onButtonKeyDown(this._onGotoToday)}
          type="button"
          disabled={!goTodayEnabled}
        >
          {strings!.goToToday}
        </button>
      )
    );
  };

  private _onNavigateDayDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    this.props.hoisted.navigateDay(date);
    this._focusOnUpdate = focusOnNavigatedDay;
  };

  private _onNavigateMonthDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    this._focusOnUpdate = focusOnNavigatedDay;

    if (!focusOnNavigatedDay) {
      this.props.hoisted.navigateMonth(date);
      return;
    }

    const monthPickerOnly = !this.props.showMonthPickerAsOverlay && !this.props.isDayPickerVisible;

    if (monthPickerOnly) {
      this.props.hoisted.onDateSelected(date);
    }

    this.props.hoisted.navigateDay(date);
  };

  private _onHeaderSelect = (): void => {
    const { showMonthPickerAsOverlay } = this.props;
    this.setState({
      isDayPickerVisible: !(showMonthPickerAsOverlay && this.state.isDayPickerVisible),
      isMonthPickerVisible: !(showMonthPickerAsOverlay && this.state.isMonthPickerVisible),
    });

    this._focusOnUpdate = true;
  };

  private _onGotoToday = (): void => {
    const { today } = this.props;
    this.props.hoisted.navigateDay(today!);
    this.focus();
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

      case KeyCodes.pageUp:
        if (ev.ctrlKey) {
          // go to next year
          this.props.hoisted.navigateDay(addYears(this.props.hoisted.navigatedDay, 1));
        } else {
          // go to next month
          this.props.hoisted.navigateDay(addMonths(this.props.hoisted.navigatedDay, 1));
        }
        ev.preventDefault();
        break;
      case KeyCodes.pageDown:
        if (ev.ctrlKey) {
          // go to previous year
          this.props.hoisted.navigateDay(addYears(this.props.hoisted.navigatedDay, -1));
        } else {
          // go to previous month
          this.props.hoisted.navigateDay(addMonths(this.props.hoisted.navigatedDay, -1));
        }
        ev.preventDefault();
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
