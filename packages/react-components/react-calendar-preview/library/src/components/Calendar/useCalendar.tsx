'use client';

import * as React from 'react';
import { Backspace, Enter, Escape, PageDown, PageUp, Space } from '@fluentui/keyboard-keys';
import { getIntrinsicElementProps, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Button } from '@fluentui/react-button';

import {
  addMonths,
  addYears,
  focusAsync,
  formatDateTime as defaultFormatDateTime,
  formatLabel as defaultFormatLabel,
} from '../../utils';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import type { DayOfWeek } from '../../utils';
import type {
  CalendarDayHandle,
  CalendarDayDismissData,
  CalendarDayNavigateData,
  CalendarDaySelectData,
} from '../CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle, CalendarMonthNavigateData } from '../CalendarMonth/CalendarMonth.types';
import type { CalendarBaseProps, CalendarBaseState, CalendarProps, CalendarState } from './Calendar.types';

const MIN_SIZE_FORCE_OVERLAY = 440;

const defaultWorkWeekDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

function useDateState({ onSelectDate, today, value }: Pick<CalendarProps, 'onSelectDate' | 'value'> & { today: Date }) {
  /**
   * The currently selected date in the calendar
   */
  const [selectedDate, setSelectedDate] = useControllableState({
    state: value,
    defaultState: value ? undefined : today,
    initialState: today,
  });

  /**
   * The currently focused date in the day picker, but not necessarily selected.
   */
  const [navigatedDay = today, setNavigatedDay] = React.useState(value);

  /**
   * The currently focused date in the month picker, but not necessarily selected.
   */
  const [navigatedMonth = today, setNavigatedMonth] = React.useState(value);

  /**
   * The previously selected controlled value, used to update the displayed date.
   */
  const [lastSelectedDate = today, setLastSelectedDate] = React.useState(value);
  if (value && lastSelectedDate.valueOf() !== value.valueOf()) {
    setNavigatedDay(value);
    setNavigatedMonth(value);
    setLastSelectedDate(value);
  }

  const navigateMonth = useEventCallback((date: Date) => {
    setNavigatedMonth(date);
  });

  const navigateDay = useEventCallback((date: Date) => {
    setNavigatedMonth(date);
    setNavigatedDay(date);
  });

  // Stable identity: this is published on the calendar context, which would otherwise change every render.
  const onDateSelected = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarDaySelectData) => {
    const { date, selectedDateRangeArray } = data;
    setNavigatedMonth(date);
    setNavigatedDay(date);
    setSelectedDate(date);
    onSelectDate?.(ev, { ...data, date, selectedDateRangeArray });
  });

  return [selectedDate, navigatedDay, navigatedMonth, onDateSelected, navigateDay, navigateMonth] as const;
}

function useShowMonthPickerAsOverlay({
  isDayPickerVisible,
  showMonthPickerAsOverlay,
}: Pick<CalendarProps, 'isDayPickerVisible' | 'showMonthPickerAsOverlay'>) {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  return !!(showMonthPickerAsOverlay || (isDayPickerVisible && win && win.innerWidth <= MIN_SIZE_FORCE_OVERLAY));
}

function useVisibilityState({
  isDayPickerVisible: isDayPickerVisibleProp,
  isMonthPickerVisible: isMonthPickerVisibleProp,
  showMonthPickerAsOverlay,
}: Pick<CalendarProps, 'isDayPickerVisible' | 'isMonthPickerVisible' | 'showMonthPickerAsOverlay'>) {
  const showMonthPickerAsOverlayState = useShowMonthPickerAsOverlay({
    isDayPickerVisible: isDayPickerVisibleProp,
    showMonthPickerAsOverlay,
  });

  const [isMonthPickerVisible, setIsMonthPickerVisible] = React.useState(() =>
    showMonthPickerAsOverlayState ? false : isMonthPickerVisibleProp ?? false,
  );
  const [isDayPickerVisible, setIsDayPickerVisible] = React.useState(() =>
    showMonthPickerAsOverlayState ? true : isDayPickerVisibleProp ?? true,
  );

  const toggleDayMonthPickerVisibility = () => {
    setIsMonthPickerVisible(!isMonthPickerVisible);
    setIsDayPickerVisible(!isDayPickerVisible);
  };

  return [isMonthPickerVisible, isDayPickerVisible, toggleDayMonthPickerVisibility] as const;
}

/**
 * Create the state required to render Calendar.
 */
export const useCalendarBase_unstable = (
  props: CalendarBaseProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarBaseState => {
  const {
    allFocusable = false,
    dateRangeType = 'day',
    divider,
    firstDayOfWeek = 'sunday',
    firstWeekOfYear = 'firstDay',
    formatDateTime = defaultFormatDateTime,
    formatLabel = defaultFormatLabel,
    goToTodayButton,
    highlightCurrentMonth = false,
    highlightSelectedMonth = false,
    isDayPickerVisible: isDayPickerVisibleProp = true,
    isMonthPickerVisible: isMonthPickerVisibleProp = true,
    liveRegion,
    maxDate,
    minDate,
    monthPickerWrapper,
    onDismiss,
    onSelectDate,
    restrictedDates,
    showMonthPickerAsOverlay: showMonthPickerAsOverlayProp = false,
    showWeekNumbers = false,
    today: todayProp,
    value,
    workWeekDays = defaultWorkWeekDays,
  } = props;

  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);

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

  const dayPickerRef = React.useRef<CalendarDayHandle>(null);
  const monthPickerRef = React.useRef<CalendarMonthHandle>(null);
  const focusOnUpdate = React.useRef(false);
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  const focus = useEventCallback(() => {
    if (isDayPickerVisible && dayPickerRef.current) {
      focusAsync(dayPickerRef.current, win);
    } else if (isMonthPickerVisible && monthPickerRef.current) {
      focusAsync(monthPickerRef.current, win);
    }
  });

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  const focusOnNextUpdate = () => {
    focusOnUpdate.current = true;
  };

  const showMonthPickerAsOverlay = useShowMonthPickerAsOverlay({
    isDayPickerVisible: isDayPickerVisibleProp,
    showMonthPickerAsOverlay: showMonthPickerAsOverlayProp,
  });

  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

  const onNavigateDayDate = useEventCallback(
    (_ev: React.SyntheticEvent | Event, data: CalendarDayNavigateData): void => {
      const { date, focusOnNavigatedDay } = data;
      navigateDay(date);
      if (focusOnNavigatedDay) {
        focusOnNextUpdate();
      }
    },
  );

  const onNavigateMonthDate = useEventCallback(
    (ev: React.SyntheticEvent | Event, data: CalendarMonthNavigateData): void => {
      const { date, focusOnNavigatedDay } = data;
      if (focusOnNavigatedDay) {
        focusOnNextUpdate();
      }

      if (!focusOnNavigatedDay) {
        navigateMonth(date);
        return;
      }

      if (monthPickerOnly) {
        onDateSelected(ev, { ...data, date, selectedDateRangeArray: [date] });
      }

      navigateDay(date);
    },
  );

  const onHeaderSelect = useEventCallback((_ev: React.SyntheticEvent | Event, _data): void => {
    toggleDayMonthPickerVisibility();
    focusOnNextUpdate();
  });

  const onDayDismiss = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarDayDismissData): void => {
    onDismiss?.(ev, data);
  });

  const onGotoToday = useEventCallback((): void => {
    navigateDay(today);
    if (showMonthPickerAsOverlay && isMonthPickerVisible) {
      toggleDayMonthPickerVisibility();
    }
    focusOnNextUpdate();
  });

  const onRootKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLDivElement>): void => {
    props.onKeyDown?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    switch (ev.key) {
      case Enter:
      case Backspace:
        ev.preventDefault();
        break;

      case Escape:
        ev.stopPropagation();
        onDismiss?.(ev, { event: ev, type: 'keydown' });
        break;

      case PageUp:
        navigateDay(ev.ctrlKey ? addYears(navigatedDay, 1) : addMonths(navigatedDay, 1));
        ev.preventDefault();
        break;

      case PageDown:
        navigateDay(ev.ctrlKey ? addYears(navigatedDay, -1) : addMonths(navigatedDay, -1));
        ev.preventDefault();
        break;

      default:
        break;
    }
  });

  const formattedToday = formatDateTime(today, 'monthDayYear');
  const todayDateString = formatLabel('todayDate', { date: today, formattedDate: formattedToday });
  const selectedDateFormat = monthPickerOnly ? 'monthYear' : 'monthDayYear';
  const selectedDateString = selectedDate
    ? formatLabel('selectedDate', {
        date: selectedDate,
        formattedDate: formatDateTime(selectedDate, selectedDateFormat),
      })
    : '';

  const goToTodayEnabled =
    navigatedDay.getFullYear() !== today.getFullYear() ||
    navigatedDay.getMonth() !== today.getMonth() ||
    navigatedMonth.getFullYear() !== today.getFullYear() ||
    navigatedMonth.getMonth() !== today.getMonth();

  return {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatDateTime,
    formatLabel,
    highlightCurrent: highlightCurrentMonth,
    highlightSelected: highlightSelectedMonth,
    maxDate,
    minDate,
    restrictedDates,
    setValue: onDateSelected,
    showWeekNumbers,
    today,
    value: selectedDate,
    workWeekDays,
    dayPickerRef,
    isDayPickerVisible,
    isMonthPickerVisible,
    monthPickerOnly,
    monthPickerRef,
    showMonthPickerAsOverlay,
    components: {
      root: 'div',
      liveRegion: 'div',
      divider: 'div',
      monthPickerWrapper: 'div',
      goToTodayButton: 'button',
      dayPicker: 'div',
      monthPicker: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ref, ...props, onKeyDown: onRootKeyDown }), {
      elementType: 'div',
    }),
    liveRegion: slot.always(liveRegion, {
      defaultProps: {
        'aria-atomic': true,
        'aria-live': 'polite',
        children: selectedDateString,
      },
      elementType: 'div',
    }),
    divider: slot.always(divider, {
      elementType: 'div',
    }),
    monthPickerWrapper: slot.always(monthPickerWrapper, {
      elementType: 'div',
    }),
    goToTodayButton: slot.optional(goToTodayButton, {
      renderByDefault: true,
      defaultProps: {
        children: 'Go to today',
        disabled: !goToTodayEnabled,
        onClick: onGotoToday,
        onKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => {
          if (ev.key === Enter || ev.key === Space) {
            onGotoToday();
          }
        },
        type: 'button',
      },
      elementType: 'button',
    }),
    dayPicker: slot.always(props.dayPicker, {
      defaultProps: {
        grid: {
          'aria-label': `${formatDateTime(navigatedDay, 'monthYear')}, ${selectedDateString}, ${todayDateString}`,
        },
        navigatedDate: navigatedDay,
        onDismiss: onDismiss ? onDayDismiss : undefined,
        onHeaderSelect: showMonthPickerAsOverlay ? onHeaderSelect : undefined,
        onNavigateDate: onNavigateDayDate,
      },
      elementType: 'div',
    }),
    monthPicker: slot.always(props.monthPicker, {
      defaultProps: {
        navigatedDate: navigatedMonth,
        // Matches the day picker: the month/year highlight follows navigation, not the committed value.
        selectedDate: navigatedDay,
        onHeaderSelect: showMonthPickerAsOverlay ? onHeaderSelect : undefined,
        onNavigateDate: onNavigateMonthDate,
      },
      elementType: 'div',
    }),
  };
};

/**
 * Create the state required to render Calendar.
 * Resolves the day and month picker slots, which the base hook leaves to the caller so the
 * headless layer can render its own picker components from the same computed props.
 */
export const useCalendar_unstable = (props: CalendarProps, ref: React.Ref<HTMLDivElement>): CalendarState => {
  const { dayPicker, monthPicker, goToTodayButton, ...baseProps } = props;
  const state = useCalendarBase_unstable(baseProps, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      dayPicker: CalendarDay,
      monthPicker: CalendarMonth,
      goToTodayButton: Button,
    },
    goToTodayButton: slot.optional(goToTodayButton, {
      renderByDefault: !!state.goToTodayButton,
      defaultProps: state.goToTodayButton,
      elementType: Button,
    }),
    dayPicker: slot.always(dayPicker, {
      defaultProps: { ...state.dayPicker, ref: state.dayPickerRef },
      elementType: CalendarDay,
    }),
    monthPicker: slot.always(monthPicker, {
      defaultProps: { ...state.monthPicker, ref: state.monthPickerRef },
      elementType: CalendarMonth,
    }),
  };
};
