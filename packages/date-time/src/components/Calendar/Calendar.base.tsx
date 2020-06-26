import * as React from 'react';
import {
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

function useVisibilityState(props: ICalendarProps) {
  /** State used to show/hide month picker */
  const [isMonthPickerVisible = true, setIsMonthPickerVisible] = useControllableValue(
    props.showMonthPickerAsOverlay ? undefined : props.isMonthPickerVisible,
    false,
  );
  /** State used to show/hide day picker */
  const [isDayPickerVisible = true, setIsDayPickerVisible] = useControllableValue(
    props.showMonthPickerAsOverlay ? undefined : props.isDayPickerVisible,
    true,
  );

  const toggleDayMonthPickerVisibility = () => {
    setIsMonthPickerVisible(!isMonthPickerVisible);
    setIsDayPickerVisible(!isDayPickerVisible);
  };

  return [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] as const;
}

function useFocusLogic({ componentRef }: ICalendarProps, isDayPickerVisible: boolean, isMonthPickerVisible: boolean) {
  const dayPicker = React.useRef<ICalendarDay>(null);
  const monthPicker = React.useRef<ICalendarMonth>(null);
  const focusOnUpdate = React.useRef(false);

  const focus = () => {
    if (isDayPickerVisible && dayPicker.current) {
      focusAsync(dayPicker.current);
    } else if (isMonthPickerVisible && monthPicker.current) {
      focusAsync(monthPicker.current);
    }
  };

  React.useImperativeHandle(componentRef, () => ({ focus }), [focus]);

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  const focusOnNextUpdate = () => {
    focusOnUpdate.current = true;
  };

  return [dayPicker, monthPicker, focusOnNextUpdate] as const;
}

export const CalendarBase = React.forwardRef(
  (propsWithoutDefaults: ICalendarProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] = useDateState(
      props,
    );
    const [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] = useVisibilityState(props);
    const [dayPicker, monthPicker, focusOnNextUpdate] = useFocusLogic(props, isDayPickerVisible, isMonthPickerVisible);

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
          isMonthPickerVisible,
          isDayPickerVisible,
          toggleDayMonthPickerVisibility,
          dayPicker,
          monthPicker,
          focusOnNextUpdate,
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
    isMonthPickerVisible: boolean;
    isDayPickerVisible: boolean;
    dayPicker: React.RefObject<ICalendarDay>;
    monthPicker: React.RefObject<ICalendarMonth>;
    focusOnNextUpdate(): void;
    toggleDayMonthPickerVisibility(): void;
    onDateSelected(date: Date, selectedDateRangeArray?: Date[]): void;
    navigateDay(date: Date): void;
    navigateMonth(date: Date): void;
  };
}

class CalendarBaseClass extends React.Component<ICalendarBaseClassProps, {}> {
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
      hoisted: { selectedDate, navigatedDay, navigatedMonth, onDateSelected, isMonthPickerVisible, isDayPickerVisible },
    } = this.props;
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
            componentRef={this.props.hoisted.dayPicker}
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
              componentRef={this.props.hoisted.monthPicker}
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
    if (focusOnNavigatedDay) {
      this.props.hoisted.focusOnNextUpdate();
    }
  };

  private _onNavigateMonthDate = (date: Date, focusOnNavigatedDay: boolean): void => {
    if (focusOnNavigatedDay) {
      this.props.hoisted.focusOnNextUpdate();
    }

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
    this.props.hoisted.toggleDayMonthPickerVisibility();

    this.props.hoisted.focusOnNextUpdate();
  };

  private _onGotoToday = (): void => {
    const { today } = this.props;
    this.props.hoisted.navigateDay(today!);
    this.props.hoisted.focusOnNextUpdate();
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
