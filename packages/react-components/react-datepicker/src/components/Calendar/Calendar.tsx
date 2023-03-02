import * as React from 'react';
import { Backspace, Enter, Escape, PageDown, PageUp, Space } from '@fluentui/keyboard-keys';
import { useControllableState } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import {
  addMonths,
  addYears,
  DateRangeType,
  DayOfWeek,
  DEFAULT_CALENDAR_STRINGS,
  DEFAULT_DATE_FORMATTING,
  FirstWeekOfYear,
  focusAsync,
  getWindow,
} from '../../utils';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { defaultCalendarNavigationIcons } from './defaults';
import { useCalendarStyles_unstable } from './useCalendarStyles';
import type { ICalendarDay } from '../CalendarDay/CalendarDay.types';
import type { ICalendarMonth } from '../CalendarMonth/CalendarMonth.types';
import type { CalendarProps } from './Calendar.types';

const MIN_SIZE_FORCE_OVERLAY = 440;

const defaultWorkWeekDays: DayOfWeek[] = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
];

function useDateState({ value, today = new Date(), onSelectDate }: CalendarProps) {
  /** The currently selected date in the calendar */
  const [selectedDate, setSelectedDate] = useControllableState({
    defaultState: today,
    initialState: today,
    state: value,
  });

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

function useVisibilityState({
  isDayPickerVisible: isDayPickerVisibleProp,
  isMonthPickerVisible: isMonthPickerVisibleProp,
  showMonthPickerAsOverlay,
}: CalendarProps) {
  /** State used to show/hide month picker */
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useControllableState({
    defaultState: false,
    initialState: true,
    state: getShowMonthPickerAsOverlay({ isDayPickerVisible: isDayPickerVisibleProp, showMonthPickerAsOverlay })
      ? undefined
      : isMonthPickerVisibleProp,
  });
  /** State used to show/hide day picker */
  const [isDayPickerVisible, setIsDayPickerVisible] = useControllableState({
    defaultState: true,
    initialState: true,
    state: getShowMonthPickerAsOverlay({ isDayPickerVisible: isDayPickerVisibleProp, showMonthPickerAsOverlay })
      ? undefined
      : isDayPickerVisibleProp,
  });

  const toggleDayMonthPickerVisibility = () => {
    setIsMonthPickerVisible(!isMonthPickerVisible);
    setIsDayPickerVisible(!isDayPickerVisible);
  };

  return [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] as const;
}

function useFocusLogic({ componentRef }: CalendarProps, isDayPickerVisible: boolean, isMonthPickerVisible: boolean) {
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

export const Calendar: React.FunctionComponent<CalendarProps> = React.forwardRef<HTMLDivElement, CalendarProps>(
  (props, forwardedRef) => {
    const {
      allFocusable = false,
      calendarDayProps,
      calendarMonthProps,
      className,
      componentRef,
      dateRangeType = DateRangeType.Day,
      dateTimeFormatter = DEFAULT_DATE_FORMATTING,
      firstDayOfWeek = DayOfWeek.Sunday,
      firstWeekOfYear = FirstWeekOfYear.FirstDay,
      highlightCurrentMonth = false,
      highlightSelectedMonth = false,
      id,
      isDayPickerVisible: isDayPickerVisibleProp = true,
      isMonthPickerVisible: isMonthPickerVisibleProp = true,
      maxDate,
      minDate,
      navigationIcons = defaultCalendarNavigationIcons,
      onDismiss,
      onSelectDate,
      restrictedDates,
      showCloseButton = false,
      showGoToToday = true,
      showMonthPickerAsOverlay: showMonthPickerAsOverlayProp = false,
      showSixWeeksByDefault = false,
      showWeekNumbers = false,
      strings = DEFAULT_CALENDAR_STRINGS,
      today = new Date(),
      value,
      workWeekDays = defaultWorkWeekDays,
    } = props;

    const [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] = useDateState({
      onSelectDate,
      value,
      today,
    });
    const [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] = useVisibilityState({
      isDayPickerVisible: isDayPickerVisibleProp,
      isMonthPickerVisible: isMonthPickerVisibleProp,
      showMonthPickerAsOverlay: showMonthPickerAsOverlayProp,
    });
    const [dayPicker, monthPicker, focusOnNextUpdate] = useFocusLogic(
      { componentRef },
      isDayPickerVisible,
      isMonthPickerVisible,
    );

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
            className={mergeClasses('js-goToday', classes.goTodayButton)}
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

    const onHeaderSelect = getShowMonthPickerAsOverlay({
      isDayPickerVisible: isDayPickerVisibleProp,
      showMonthPickerAsOverlay: showMonthPickerAsOverlayProp,
    })
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
        switch (ev.key) {
          case Enter:
          case Space:
            callback();
            break;
        }
      };
    };

    const onDatePickerPopupKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      switch (ev.key) {
        case Enter:
          ev.preventDefault();
          break;

        case Backspace:
          ev.preventDefault();
          break;

        case Escape:
          onDismiss?.();
          break;

        case PageUp:
          if (ev.ctrlKey) {
            // go to next year
            navigateDay(addYears(navigatedDay, 1));
          } else {
            // go to next month
            navigateDay(addMonths(navigatedDay, 1));
          }
          ev.preventDefault();
          break;
        case PageDown:
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
    const showMonthPickerAsOverlay = getShowMonthPickerAsOverlay(props);

    const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

    const classes = useCalendarStyles_unstable({
      className,
      isDayPickerVisible,
      isMonthPickerVisible,
      showWeekNumbers,
    });

    let todayDateString: string = '';
    let selectedDateString: string = '';
    if (dateTimeFormatter && strings!.todayDateFormatString) {
      todayDateString = strings!.todayDateFormatString.replace(
        '{0}',
        dateTimeFormatter.formatMonthDayYear(today, strings!),
      );
    }
    if (dateTimeFormatter && strings!.selectedDateFormatString) {
      selectedDateString = strings!.selectedDateFormatString.replace(
        '{0}',
        dateTimeFormatter.formatMonthDayYear(selectedDate, strings!),
      );
    }
    const selectionAndTodayString = selectedDateString + ', ' + todayDateString;

    return (
      <div
        id={id}
        ref={forwardedRef}
        role="group"
        aria-label={selectionAndTodayString}
        className={mergeClasses(classes.root, className, 'ms-slideDownIn10')}
        onKeyDown={onDatePickerPopupKeyDown}
      >
        <div className={classes.liveRegion} aria-live="polite" aria-atomic="true">
          <span>{selectedDateString}</span>
        </div>
        {isDayPickerVisible && (
          <CalendarDay
            selectedDate={selectedDate!}
            navigatedDate={navigatedDay!}
            today={today}
            onSelectDate={onDateSelected}
            // eslint-disable-next-line react/jsx-no-bind
            onNavigateDate={onNavigateDayDate}
            onDismiss={onDismiss}
            firstDayOfWeek={firstDayOfWeek!}
            dateRangeType={dateRangeType!}
            strings={strings!}
            // eslint-disable-next-line react/jsx-no-bind
            onHeaderSelect={onHeaderSelect}
            navigationIcons={navigationIcons!}
            showWeekNumbers={showWeekNumbers}
            firstWeekOfYear={firstWeekOfYear!}
            dateTimeFormatter={dateTimeFormatter!}
            showSixWeeksByDefault={showSixWeeksByDefault}
            minDate={minDate}
            maxDate={maxDate}
            restrictedDates={restrictedDates}
            workWeekDays={workWeekDays}
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
              today={today}
              highlightCurrentMonth={highlightCurrentMonth!}
              highlightSelectedMonth={highlightSelectedMonth!}
              // eslint-disable-next-line react/jsx-no-bind
              onHeaderSelect={onHeaderSelect}
              navigationIcons={navigationIcons!}
              dateTimeFormatter={dateTimeFormatter!}
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
      </div>
    );
  },
);
Calendar.displayName = 'Calendar';

function getShowMonthPickerAsOverlay({ isDayPickerVisible, showMonthPickerAsOverlay }: CalendarProps) {
  const win = getWindow();
  return showMonthPickerAsOverlay || (isDayPickerVisible && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY);
}
