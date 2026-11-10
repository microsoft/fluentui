'use client';

import * as React from 'react';
import { Escape, PageDown, PageUp } from '@fluentui/keyboard-keys';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useAnimationFrame,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import {
  addMonths,
  addYears,
  compareDatePart,
  calendarFormatters as defaultCalendarFormatters,
  isRestrictedDate,
} from './utils';
import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarMonth } from './CalendarMonth/CalendarMonth';
import { getCalendarNavigationDate } from './utils/calendarNavigation';
import { isCalendarKeyboardEditable, isCalendarKeyboardEventFromNestedWidget } from './hooks/useCalendarGrid';
import type { DayOfWeek } from './utils';
import type {
  CalendarDayHandle,
  CalendarDayNavigateData,
  CalendarDaySelectData,
} from './CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle, CalendarMonthNavigateData } from './CalendarMonth/CalendarMonth.types';
import type { CalendarProps, CalendarState } from './Calendar.types';

const defaultWorkWeekDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

function useDateState({
  defaultDisplayedDate,
  defaultValue,
  displayedDate,
  maxDate,
  minDate,
  onDisplayedDateChange,
  onSelectDate,
  restrictedDates,
  today,
  value,
}: Pick<
  CalendarProps,
  | 'defaultDisplayedDate'
  | 'defaultValue'
  | 'displayedDate'
  | 'maxDate'
  | 'minDate'
  | 'onDisplayedDateChange'
  | 'onSelectDate'
  | 'restrictedDates'
  | 'value'
> & {
  today: Date;
}) {
  const resolveDate = (date: Date): Date => {
    let resolvedDate = date;

    if (minDate && compareDatePart(resolvedDate, minDate) < 0) {
      resolvedDate = minDate;
    } else if (maxDate && compareDatePart(resolvedDate, maxDate) > 0) {
      resolvedDate = maxDate;
    }

    return resolvedDate;
  };

  const [selectedDateState, setSelectedDate] = useControllableState({
    state: value,
    defaultState: defaultValue && resolveDate(defaultValue),
    initialState: null,
  });
  const selectedDate =
    selectedDateState && compareDatePart(selectedDateState, resolveDate(selectedDateState)) !== 0
      ? null
      : selectedDateState;
  const warnedOutOfRange = React.useRef(false);
  const isControlledValueOutOfRange = !!value && compareDatePart(value, resolveDate(value)) !== 0;
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && isControlledValueOutOfRange && !warnedOutOfRange.current) {
      warnedOutOfRange.current = true;
      // eslint-disable-next-line no-console
      console.warn('Calendar: value is outside minDate/maxDate and is rendered as an empty selection.');
    }
  }, [isControlledValueOutOfRange]);

  const initialDisplayedDate = resolveDate(defaultDisplayedDate ?? selectedDate ?? today);
  const [navigatedDateState = initialDisplayedDate, setNavigatedDate] = useControllableState({
    state: displayedDate,
    initialState: initialDisplayedDate,
  });
  const navigatedDate = resolveDate(navigatedDateState);

  const valueTimestamp = value?.getTime();
  const [previousValueTimestamp, setPreviousValueTimestamp] = React.useState(valueTimestamp);
  if (!Object.is(previousValueTimestamp, valueTimestamp)) {
    setPreviousValueTimestamp(valueTimestamp);
    if (value && displayedDate === undefined) {
      setNavigatedDate(resolveDate(value));
    }
  }

  const navigate = useEventCallback((date: Date, ev: React.SyntheticEvent | Event) => {
    const resolvedDate = resolveDate(date);
    setNavigatedDate(resolvedDate);
    onDisplayedDateChange?.(ev, {
      event: ev as React.SyntheticEvent<HTMLElement>,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      displayedDate: resolvedDate,
    });
  });

  // Stable identity: this is published on the calendar context, which would otherwise change every render.
  const onDateSelected = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarDaySelectData) => {
    const { date } = data;
    if (isRestrictedDate(date, { minDate, maxDate, restrictedDates })) {
      return;
    }

    const selectedDateRange = data.selectedDateRange.filter(
      rangeDate => !isRestrictedDate(rangeDate, { minDate, maxDate, restrictedDates }),
    );

    setSelectedDate(date);
    onSelectDate?.(ev, { ...data, date, selectedDateRange });
  });

  return [selectedDate, navigatedDate, onDateSelected, navigate, resolveDate] as const;
}

function useVisibilityState({
  dayPicker,
  defaultView,
  layout = 'sideBySide',
  monthPicker,
  onViewChange,
  view: viewProp,
}: Pick<CalendarProps, 'dayPicker' | 'defaultView' | 'layout' | 'monthPicker' | 'onViewChange' | 'view'>) {
  const [view = 'day', setView] = useControllableState({
    state: viewProp,
    defaultState: viewProp === undefined ? defaultView : undefined,
    initialState: 'day' as const,
  });
  const hasDayPicker = dayPicker !== null;
  const hasMonthPicker = monthPicker !== null;
  const isOverlay = hasDayPicker && hasMonthPicker && layout === 'overlay';
  const isDayPickerVisible = hasDayPicker && (!isOverlay || view === 'day');
  const isMonthPickerVisible = hasMonthPicker && (!isOverlay || view === 'month');

  const toggleDayMonthPickerVisibility = (ev: React.SyntheticEvent | Event) => {
    const nextView = view === 'day' ? 'month' : 'day';
    setView(nextView);
    onViewChange?.(ev, {
      event: ev as React.SyntheticEvent<HTMLElement>,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      view: nextView,
    });
  };

  return [isMonthPickerVisible, isDayPickerVisible, isOverlay, toggleDayMonthPickerVisibility] as const;
}

/**
 * Creates Calendar state and resolves its headless picker slots.
 * @param props - Props from this instance of Calendar.
 * @param ref - Reference to Calendar's root element.
 */
export const useCalendar = (props: CalendarProps, ref: React.Ref<HTMLDivElement>): CalendarState => {
  const {
    allFocusable = false,
    calendarMonthColumns = 4,
    calendarYearColumns = 4,
    dateRangeType = 'day',
    defaultDisplayedDate,
    defaultValue,
    defaultView,
    divider,
    displayedDate,
    firstDayOfWeek = 'sunday',
    firstWeekOfYear = 'firstDay',
    formatters: formatterOverrides,
    goToTodayButton,
    liveRegion,
    layout,
    maxDate,
    minDate,
    monthPickerWrapper,
    onDismiss,
    onDisplayedDateChange,
    onSelectDate,
    onViewChange,
    restrictedDates,
    showWeekNumbers = false,
    today: todayProp,
    value,
    view,
    workWeekDays = defaultWorkWeekDays,
  } = props;

  const formatters = React.useMemo(
    () => (formatterOverrides ? { ...defaultCalendarFormatters, ...formatterOverrides } : defaultCalendarFormatters),
    [formatterOverrides],
  );

  const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);

  const [selectedDate, navigatedDate, onDateSelected, navigate, resolveDate] = useDateState({
    defaultDisplayedDate,
    defaultValue,
    displayedDate,
    maxDate,
    minDate,
    onDisplayedDateChange,
    onSelectDate,
    restrictedDates,
    value,
    today,
  });

  const [isMonthPickerVisible, isDayPickerVisible, isOverlay, toggleDayMonthPickerVisibility] = useVisibilityState({
    dayPicker: props.dayPicker,
    defaultView,
    layout,
    monthPicker: props.monthPicker,
    onViewChange,
    view,
  });

  const dayPickerRef = React.useRef<CalendarDayHandle>(null);
  const monthPickerRef = React.useRef<CalendarMonthHandle>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRefs(ref, rootRef);
  const focusedPicker = React.useRef<'day' | 'month' | undefined>(undefined);
  const isFocusWithin = React.useRef(false);
  const focusOnUpdate = React.useRef(false);
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();
  const { targetDocument } = useFluent();

  const cancelFocus = () => {
    focusedPicker.current = undefined;
    isFocusWithin.current = false;
    focusOnUpdate.current = false;
    cancelAnimationFrame();
  };

  const onDocumentFocus = useEventCallback((ev: FocusEvent) => {
    const root = rootRef.current;
    if (root && !ev.composedPath().includes(root)) {
      cancelFocus();
    }
  });

  // Removing a focused cell may not emit blur, so also observe the next focus target.
  React.useEffect(() => {
    targetDocument?.addEventListener('focusin', onDocumentFocus, true);
    return () => targetDocument?.removeEventListener('focusin', onDocumentFocus, true);
  }, [onDocumentFocus, targetDocument]);

  const focus = useEventCallback(() => {
    requestAnimationFrame(() => {
      if (targetDocument?.activeElement !== targetDocument?.body && !isFocusWithin.current) {
        return;
      }

      if (isDayPickerVisible && dayPickerRef.current) {
        dayPickerRef.current.focus();
      } else if (isMonthPickerVisible && monthPickerRef.current) {
        monthPickerRef.current.focus();
      }
    });
  });

  React.useEffect(() => {
    if (focusOnUpdate.current) {
      focus();
      focusOnUpdate.current = false;
    }
  });

  React.useEffect(() => {
    if (
      (focusedPicker.current === 'day' && !isDayPickerVisible) ||
      (focusedPicker.current === 'month' && !isMonthPickerVisible)
    ) {
      focus();
    }
  }, [focus, isDayPickerVisible, isMonthPickerVisible]);

  const focusOnNextUpdate = () => {
    focusOnUpdate.current = true;
  };

  const onNavigateDate = useEventCallback(
    (ev: React.SyntheticEvent | Event, data: CalendarDayNavigateData | CalendarMonthNavigateData): void => {
      if (data.focusOnNavigatedDay) {
        focusOnNextUpdate();
      }
      navigate(data.date, ev);
    },
  );

  const onHeaderSelect = useEventCallback((ev: React.SyntheticEvent | Event, _data): void => {
    toggleDayMonthPickerVisibility(ev);
    focusOnNextUpdate();
  });

  const onRootKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLDivElement>): void => {
    props.onKeyDown?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    switch (ev.key) {
      case Escape:
        if (onDismiss) {
          ev.stopPropagation();
          onDismiss(ev, { event: ev, type: 'keydown' });
        }
        break;

      case PageUp:
      case PageDown: {
        if (
          isCalendarKeyboardEditable(ev.target) ||
          isCalendarKeyboardEventFromNestedWidget(ev.target, ev.currentTarget)
        ) {
          break;
        }
        const date = getCalendarNavigationDate(ev.nativeEvent) ?? navigatedDate;
        const direction = ev.key === PageUp ? -1 : 1;
        navigate(ev.shiftKey ? addYears(date, direction) : addMonths(date, direction), ev);
        focusOnNextUpdate();
        ev.preventDefault();
        break;
      }

      default:
        break;
    }
  });

  const onRootFocusCapture = useEventCallback((ev: React.FocusEvent<HTMLDivElement>): void => {
    isFocusWithin.current = true;
    props.onFocusCapture?.(ev);

    const picker = ev.target.closest('[data-fui-calendar-picker]');
    const pickerType =
      picker && ev.currentTarget.contains(picker) ? picker.getAttribute('data-fui-calendar-picker') : undefined;
    focusedPicker.current = pickerType === 'day' || pickerType === 'month' ? pickerType : undefined;
  });

  const onRootBlurCapture = useEventCallback((ev: React.FocusEvent<HTMLDivElement>): void => {
    props.onBlurCapture?.(ev);
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      cancelFocus();
    }
  });

  const formattedToday = formatters.dateTime({ date: today, format: 'monthDayYear' });
  const todayDateString = formatters.todayDateLabel({ date: today, formattedDate: formattedToday });
  const selectedDateString = selectedDate
    ? formatters.selectedDateLabel({
        date: selectedDate,
        formattedDate: formatters.dateTime({ date: selectedDate, format: 'monthDayYear' }),
      })
    : '';
  const isMonthOnly = props.dayPicker === null;

  const dayPicker = slot.optional(props.dayPicker, {
    renderByDefault: true,
    defaultProps: {
      grid: {
        'aria-label': `${formatters.dateTime({
          date: navigatedDate,
          format: 'monthYear',
        })}, ${selectedDateString}, ${todayDateString}`,
      },
      navigatedDate,
      onDismiss,
      onHeaderSelect: isOverlay ? onHeaderSelect : undefined,
      onNavigateDate,
    },
    elementType: CalendarDay,
  });
  const monthPicker = slot.optional(props.monthPicker, {
    renderByDefault: true,
    defaultProps: {
      navigatedDate,
      selectedDate: isMonthOnly ? selectedDate : navigatedDate,
      onSelectDate: isMonthOnly ? onDateSelected : undefined,
      onHeaderSelect: isOverlay ? onHeaderSelect : undefined,
      onNavigateDate,
    },
    elementType: CalendarMonth,
  });
  const mergedDayPickerRef = useMergedRefs(dayPickerRef, dayPicker?.imperativeRef);
  const mergedMonthPickerRef = useMergedRefs(monthPickerRef, monthPicker?.imperativeRef);
  if (dayPicker) {
    dayPicker.imperativeRef = mergedDayPickerRef;
  }
  if (monthPicker) {
    monthPicker.imperativeRef = mergedMonthPickerRef;
  }
  const resolvedToday = resolveDate(today);
  const goToTodayEnabled =
    navigatedDate.getFullYear() !== resolvedToday.getFullYear() ||
    navigatedDate.getMonth() !== resolvedToday.getMonth() ||
    (dayPicker?.weeksToShow !== undefined &&
      dayPicker.weeksToShow <= 5 &&
      compareDatePart(dayPicker.navigatedDate ?? navigatedDate, resolvedToday) !== 0);
  const onGotoToday = useEventCallback((ev: React.MouseEvent<HTMLButtonElement>): void => {
    if (ev.isDefaultPrevented() || !goToTodayEnabled) {
      return;
    }

    navigate(resolvedToday, ev);
    if (isOverlay && isMonthPickerVisible) {
      toggleDayMonthPickerVisibility(ev);
    }
    focusOnNextUpdate();
  });
  const goToTodaySlot = slot.optional(goToTodayButton, {
    renderByDefault: true,
    defaultProps: {
      children: formatters.goToTodayLabel(),
      'aria-disabled': !goToTodayEnabled,
      disabled: !goToTodayEnabled && !allFocusable,
      type: 'button',
    },
    elementType: 'button',
  });
  if (goToTodaySlot) {
    goToTodaySlot.onClick = mergeCallbacks(goToTodaySlot.onClick, onGotoToday);
  }

  return {
    allFocusable,
    calendarMonthColumns,
    calendarYearColumns,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatters,
    maxDate,
    minDate,
    restrictedDates,
    setValue: onDateSelected,
    showWeekNumbers,
    today,
    value: selectedDate,
    workWeekDays,
    isDayPickerVisible,
    isMonthPickerVisible,
    components: {
      root: 'div',
      liveRegion: 'div',
      divider: 'div',
      monthPickerWrapper: 'div',
      goToTodayButton: 'button',
      dayPicker: CalendarDay,
      monthPicker: CalendarMonth,
    },
    root: slot.always(
      getIntrinsicElementProps(
        'div',
        {
          ref: mergedRootRef,
          ...props,
          'data-fui-calendar-root': '',
          onBlurCapture: onRootBlurCapture,
          onFocusCapture: onRootFocusCapture,
          onKeyDown: onRootKeyDown,
        },
        ['defaultValue'],
      ),
      {
        elementType: 'div',
      },
    ),
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
    goToTodayButton: goToTodaySlot,
    dayPicker,
    monthPicker,
  };
};
