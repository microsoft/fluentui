import * as React from 'react';
import {
  DayOfWeek,
  FirstWeekOfYear,
  DateRangeType,
  addMonths,
  addYears,
  DEFAULT_CALENDAR_STRINGS,
  DEFAULT_DATE_FORMATTING,
} from '@fluentui/date-time-utilities';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarMonth } from './CalendarMonth/CalendarMonth';
import {
  css,
  KeyCodes,
  classNamesFunction,
  focusAsync,
  format,
  FocusRects,
  getPropsWithDefaults,
  getWindow,
} from '@fluentui/utilities';
import { useControllableValue } from '@fluentui/react-hooks';
import { defaultCalendarNavigationIcons } from './defaults';
import type { ICalendarProps, ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import type { ICalendarDay } from './CalendarDay/CalendarDay.types';
import type { ICalendarMonth } from './CalendarMonth/CalendarMonth.types';

const MIN_SIZE_FORCE_OVERLAY = 440;

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
];

const DEFAULT_PROPS: Partial<ICalendarProps> = {
  isMonthPickerVisible: true,
  isDayPickerVisible: true,
  showMonthPickerAsOverlay: false,
  today: new Date(),
  firstDayOfWeek: DayOfWeek.Sunday,
  dateRangeType: DateRangeType.Day,
  showGoToToday: true,
  strings: DEFAULT_CALENDAR_STRINGS,
  highlightCurrentMonth: false,
  highlightSelectedMonth: false,
  navigationIcons: defaultCalendarNavigationIcons,
  showWeekNumbers: false,
  firstWeekOfYear: FirstWeekOfYear.FirstDay,
  dateTimeFormatter: DEFAULT_DATE_FORMATTING,
  showSixWeeksByDefault: false,
  workWeekDays: defaultWorkWeekDays,
  showCloseButton: false,
  allFocusable: false,
};

function useDateState({ value, today = new Date(), onSelectDate }: ICalendarProps) {
  /** The currently selected date in the calendar */
  const [selectedDate = today, setSelectedDate] = useControllableValue(value, today);

  /** The currently focused date in the day picker, but not necessarily selected */
  const [navigatedDay = today, setNavigatedDay] = React.useState(value);

  /** The currently focused date in the month picker, but not necessarily selected */
  const [navigatedMonth = today, setNavigatedMonth] = React.useState(value);

  /** If using a controlled value, when that value changes, navigate to that date */
  const [lastSelectedDate = today, setLastSelectedDate] = React.useState(value);
  if (value && lastSelectedDate.valueOf() !== value.valueOf()) {
    setNavigatedDay(value);
    setNavigatedMonth(value);
    setLastSelectedDate(value);
  }

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
    getShowMonthPickerAsOverlay(props) ? undefined : props.isMonthPickerVisible,
    false,
  );
  /** State used to show/hide day picker */
  const [isDayPickerVisible = true, setIsDayPickerVisible] = useControllableValue(
    getShowMonthPickerAsOverlay(props) ? undefined : props.isDayPickerVisible,
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

  const focus = React.useCallback(() => {
    if (isDayPickerVisible && dayPicker.current) {
      focusAsync(dayPicker.current);
    } else if (isMonthPickerVisible && monthPicker.current) {
      focusAsync(monthPicker.current);
    }
  }, [isDayPickerVisible, isMonthPickerVisible]);

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

export const CalendarBase: React.FunctionComponent<ICalendarProps> = React.forwardRef<HTMLDivElement, ICalendarProps>(
  (propsWithoutDefaults, forwardedRef) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] = useDateState(
      props,
    );
    const [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] = useVisibilityState(props);
    const [dayPicker, monthPicker, focusOnNextUpdate] = useFocusLogic(props, isDayPickerVisible, isMonthPickerVisible);

    const renderGoToTodayButton = () => {
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
            onClick={onGotoToday}
            onKeyDown={onButtonKeyDown(onGotoToday)}
            type="button"
            disabled={!goTodayEnabled}
          >
            {strings!.goToToday}
          </button>
        )
      );
    };

    const onNavigateDayDate = (date: Date, focusOnNavigatedDay: boolean): void => {
      navigateDay(date);
      if (focusOnNavigatedDay) {
        focusOnNextUpdate();
      }
    };

    const onNavigateMonthDate = (date: Date, focusOnNavigatedDay: boolean): void => {
      if (focusOnNavigatedDay) {
        focusOnNextUpdate();
      }

      if (!focusOnNavigatedDay) {
        navigateMonth(date);
        return;
      }

      if (monthPickerOnly) {
        onDateSelected(date);
      }

      navigateDay(date);
    };

    const onHeaderSelect = getShowMonthPickerAsOverlay(props)
      ? (): void => {
          toggleDayMonthPickerVisibility();

          focusOnNextUpdate();
        }
      : undefined;

    const onGotoToday = (): void => {
      navigateDay(today!);
      focusOnNextUpdate();
    };

    const onButtonKeyDown = (callback: () => void): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) => {
      return (ev: React.KeyboardEvent<HTMLButtonElement>) => {
        // eslint-disable-next-line deprecation/deprecation
        switch (ev.which) {
          case KeyCodes.enter:
          case KeyCodes.space:
            callback();
            break;
        }
      };
    };

    const onDatePickerPopupKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      // eslint-disable-next-line deprecation/deprecation
      switch (ev.which) {
        case KeyCodes.enter:
          ev.preventDefault();
          break;

        case KeyCodes.backspace:
          ev.preventDefault();
          break;

        case KeyCodes.escape:
          props.onDismiss?.();
          break;

        case KeyCodes.pageUp:
          if (ev.ctrlKey) {
            // go to next year
            navigateDay(addYears(navigatedDay, 1));
          } else {
            // go to next month
            navigateDay(addMonths(navigatedDay, 1));
          }
          ev.preventDefault();
          break;
        case KeyCodes.pageDown:
          if (ev.ctrlKey) {
            // go to previous year
            navigateDay(addYears(navigatedDay, -1));
          } else {
            // go to previous month
            navigateDay(addMonths(navigatedDay, -1));
          }
          ev.preventDefault();
          break;
        default:
          break;
      }
    };
    const rootClass = 'ms-DatePicker';
    const {
      firstDayOfWeek,
      dateRangeType,
      strings,
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
    } = props;

    const showMonthPickerAsOverlay = getShowMonthPickerAsOverlay(props);

    const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
    const overlaidWithButton = showMonthPickerAsOverlay && showGoToToday;

    const classes = getClassNames(styles, {
      theme: theme!,
      className,
      isMonthPickerVisible: isMonthPickerVisible,
      isDayPickerVisible: isDayPickerVisible,
      monthPickerOnly: monthPickerOnly,
      showMonthPickerAsOverlay: showMonthPickerAsOverlay,
      overlaidWithButton: overlaidWithButton,
      overlayedWithButton: overlaidWithButton,
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
        ref={forwardedRef}
        role="group"
        aria-label={selectionAndTodayString}
        className={css(rootClass, classes.root, className, 'ms-slideDownIn10')}
        onKeyDown={onDatePickerPopupKeyDown}
      >
        <div className={classes.liveRegion} aria-live="polite" aria-atomic="true">
          <span>{selectedDateString}</span>
        </div>
        {isDayPickerVisible && (
          <CalendarDay
            selectedDate={selectedDate!}
            navigatedDate={navigatedDay!}
            today={props.today}
            onSelectDate={onDateSelected}
            // eslint-disable-next-line react/jsx-no-bind
            onNavigateDate={onNavigateDayDate}
            onDismiss={props.onDismiss}
            firstDayOfWeek={firstDayOfWeek!}
            dateRangeType={dateRangeType!}
            strings={strings!}
            // eslint-disable-next-line react/jsx-no-bind
            onHeaderSelect={onHeaderSelect}
            navigationIcons={navigationIcons!}
            showWeekNumbers={props.showWeekNumbers}
            firstWeekOfYear={props.firstWeekOfYear!}
            dateTimeFormatter={props.dateTimeFormatter!}
            showSixWeeksByDefault={props.showSixWeeksByDefault}
            minDate={minDate}
            maxDate={maxDate}
            restrictedDates={restrictedDates}
            workWeekDays={props.workWeekDays}
            componentRef={dayPicker}
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
              // eslint-disable-next-line react/jsx-no-bind
              onNavigateDate={onNavigateMonthDate}
              today={props.today}
              highlightCurrentMonth={highlightCurrentMonth!}
              highlightSelectedMonth={highlightSelectedMonth!}
              // eslint-disable-next-line react/jsx-no-bind
              onHeaderSelect={onHeaderSelect}
              navigationIcons={navigationIcons!}
              dateTimeFormatter={props.dateTimeFormatter!}
              minDate={minDate}
              maxDate={maxDate}
              componentRef={monthPicker}
              {...calendarMonthProps} // at end of list so consumer's custom functions take precedence
            />
            {renderGoToTodayButton()}
          </div>
        ) : (
          renderGoToTodayButton()
        )}
        <FocusRects />
      </div>
    );
  },
);
CalendarBase.displayName = 'CalendarBase';

function getShowMonthPickerAsOverlay({ showMonthPickerAsOverlay, isDayPickerVisible }: ICalendarProps) {
  const win = getWindow();
  return showMonthPickerAsOverlay || (isDayPickerVisible && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY);
}
