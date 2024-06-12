import * as React from 'react';
import { Backspace, Enter, Escape, PageDown, PageUp, Space } from '@fluentui/keyboard-keys';
import { useControllableState } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  addMonths,
  addYears,
  DateRangeType,
  DayOfWeek,
  DEFAULT_CALENDAR_STRINGS,
  DEFAULT_DATE_FORMATTING,
  FirstWeekOfYear,
  focusAsync,
} from '../../utils';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { defaultNavigationIcons } from './calendarNavigationIcons';
import { useCalendarStyles_unstable } from './useCalendarStyles.styles';
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

function useDateState(props: CalendarProps) {
  const { value, today: todayProp, onSelectDate } = props;

  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);

  /** The currently selected date in the calendar */
  const [selectedDate, setSelectedDate] = useControllableState({
    state: value,
    defaultState: value ? undefined : today,
    initialState: today,
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
  const showMonthPickerAsOverlayState = useShowMonthPickerAsOverlay({
    isDayPickerVisible: isDayPickerVisibleProp,
    showMonthPickerAsOverlay,
  });

  const [isMonthPickerVisible, setIsMonthPickerVisible] = React.useState(() =>
    showMonthPickerAsOverlayState ? false : isMonthPickerVisibleProp ?? false,
  );
  /** State used to show/hide day picker */
  const [isDayPickerVisible, setIsDayPickerVisible] = React.useState(() =>
    showMonthPickerAsOverlayState ? true : isDayPickerVisibleProp ?? true,
  );

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
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const focus = React.useCallback(() => {
    if (isDayPickerVisible && dayPicker.current) {
      focusAsync(dayPicker.current, win);
    } else if (isMonthPickerVisible && monthPicker.current) {
      focusAsync(monthPicker.current, win);
    }
  }, [isDayPickerVisible, isMonthPickerVisible, win]);

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

/**
 * @internal
 */
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
      onDismiss,
      onSelectDate,
      restrictedDates,
      showCloseButton = false,
      showGoToToday = true,
      showMonthPickerAsOverlay: showMonthPickerAsOverlayProp = false,
      showSixWeeksByDefault = false,
      showWeekNumbers = false,
      strings = DEFAULT_CALENDAR_STRINGS,
      today: todayProp,
      value,
      workWeekDays = defaultWorkWeekDays,
    } = props;

    const today = React.useMemo(() => {
      return todayProp ?? new Date();
    }, [todayProp]);

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
            className={classes.goTodayButton}
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

    const showMonthPickerAsOverlay = useShowMonthPickerAsOverlay({
      isDayPickerVisible: isDayPickerVisibleProp,
      showMonthPickerAsOverlay: showMonthPickerAsOverlayProp,
    });

    const onHeaderSelect = showMonthPickerAsOverlay
      ? (): void => {
          toggleDayMonthPickerVisibility();

          focusOnNextUpdate();
        }
      : undefined;

    const onGotoToday = (): void => {
      navigateDay(today!);
      if (showMonthPickerAsOverlay && isMonthPickerVisible) {
        toggleDayMonthPickerVisibility();
      }
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
          ev.stopPropagation();
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
      const dateStringFormatter = monthPickerOnly
        ? dateTimeFormatter.formatMonthYear
        : dateTimeFormatter.formatMonthDayYear;
      selectedDateString = strings!.selectedDateFormatString.replace(
        '{0}',
        dateStringFormatter(selectedDate, strings!),
      );
    }
    const selectionAndTodayString = selectedDateString + ', ' + todayDateString;

    return (
      <div
        id={id}
        ref={forwardedRef}
        role="group"
        aria-label={selectionAndTodayString}
        className={classes.root}
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
            showWeekNumbers={showWeekNumbers}
            firstWeekOfYear={firstWeekOfYear!}
            dateTimeFormatter={dateTimeFormatter!}
            showSixWeeksByDefault={showSixWeeksByDefault}
            minDate={minDate}
            maxDate={maxDate}
            navigationIcons={defaultNavigationIcons}
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
              dateTimeFormatter={dateTimeFormatter!}
              minDate={minDate}
              maxDate={maxDate}
              componentRef={monthPicker}
              navigationIcons={defaultNavigationIcons}
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

const useShowMonthPickerAsOverlay = ({ isDayPickerVisible, showMonthPickerAsOverlay }: CalendarProps) => {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  return showMonthPickerAsOverlay || (isDayPickerVisible && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY);
};
