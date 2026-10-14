'use client';

import * as React from 'react';
import { Enter, Escape, PageDown, PageUp } from '@fluentui/keyboard-keys';
import {
  getIntrinsicElementProps,
  isHTMLElement,
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
} from '../../utils';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { getCalendarNavigationDate } from '../../utils/calendarKeyboard';
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
    initialState: resolveDate(today),
  });
  const selectedDate =
    selectedDateState && compareDatePart(selectedDateState, resolveDate(selectedDateState)) !== 0
      ? null
      : selectedDateState;

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
    if (resolvedDate) {
      setNavigatedDate(resolvedDate);
      onDisplayedDateChange?.(ev, {
        event: ev as React.SyntheticEvent<HTMLElement>,
        type: ev.type === 'keydown' ? 'keydown' : 'click',
        displayedDate: resolvedDate,
      });
    }
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

function useResponsiveOverlay(layout: CalendarProps['layout']) {
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  const [isNarrow, setIsNarrow] = React.useState(false);

  React.useEffect(() => {
    if (!win?.matchMedia || layout === 'sideBySide' || layout === 'overlay') {
      return;
    }

    const mediaQuery = win.matchMedia(`(max-width: ${MIN_SIZE_FORCE_OVERLAY}px)`);
    const onChange = () => setIsNarrow(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [layout, win]);

  return isNarrow;
}

function useVisibilityState({
  dayPicker,
  defaultView,
  layout,
  monthPicker,
  onViewChange,
  view: viewProp,
}: Pick<CalendarProps, 'dayPicker' | 'defaultView' | 'layout' | 'monthPicker' | 'onViewChange' | 'view'>) {
  const responsiveOverlay = useResponsiveOverlay(layout);
  const [view = 'day', setView] = useControllableState({
    state: viewProp,
    defaultState: viewProp === undefined ? defaultView : undefined,
    initialState: 'day' as const,
  });
  const hasDayPicker = dayPicker !== null;
  const hasMonthPicker = monthPicker !== null;
  const isOverlay =
    hasDayPicker && hasMonthPicker && (layout === 'overlay' || (layout !== 'sideBySide' && responsiveOverlay));
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
 * Create the state required to render Calendar.
 */
export const useCalendarBase_unstable = (
  props: CalendarBaseProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarBaseState => {
  const {
    allFocusable = false,
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
    highlightCurrentMonth = false,
    highlightSelectedMonth = false,
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

  const onNavigateDayDate = useEventCallback(
    (ev: React.SyntheticEvent | Event, data: CalendarDayNavigateData): void => {
      const { date, focusOnNavigatedDay } = data;
      navigate(date, ev);
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

      navigate(date, ev);
    },
  );

  const onHeaderSelect = useEventCallback((ev: React.SyntheticEvent | Event, _data): void => {
    toggleDayMonthPickerVisibility(ev);
    focusOnNextUpdate();
  });

  const onDayDismiss = useEventCallback((ev: React.SyntheticEvent | Event, data: CalendarDayDismissData): void => {
    onDismiss?.(ev, data);
  });

  const onGotoToday = useEventCallback((ev: React.SyntheticEvent): void => {
    const resolvedToday = resolveDate(today);
    if (!goToTodayEnabled) {
      return;
    }

    navigate(resolvedToday, ev);
    if (isOverlay && isMonthPickerVisible) {
      toggleDayMonthPickerVisibility(ev);
    }
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
          isHTMLElement(ev.target) &&
          ev.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')
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

    const target = ev.target;
    if (target.closest('.fui-CalendarDay')) {
      focusedPicker.current = 'day';
    } else if (target.closest('.fui-CalendarMonth')) {
      focusedPicker.current = 'month';
    } else {
      focusedPicker.current = undefined;
    }
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
      onDismiss: onDismiss ? onDayDismiss : undefined,
      onHeaderSelect: isOverlay ? onHeaderSelect : undefined,
      onNavigateDate: onNavigateDayDate,
    },
    elementType: 'div',
  });
  const resolvedToday = resolveDate(today);
  const goToTodayEnabled =
    navigatedDate.getFullYear() !== resolvedToday.getFullYear() ||
    navigatedDate.getMonth() !== resolvedToday.getMonth() ||
    (dayPicker?.weeksToShow !== undefined &&
      dayPicker.weeksToShow <= 5 &&
      compareDatePart(dayPicker.navigatedDate ?? navigatedDate, resolvedToday) !== 0);

  return {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatters,
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
    monthPickerRef,
    isOverlay,
    components: {
      root: 'div',
      liveRegion: 'div',
      divider: 'div',
      monthPickerWrapper: 'div',
      goToTodayButton: 'button',
      dayPicker: 'div',
      monthPicker: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps(
        'div',
        {
          ref: mergedRootRef,
          ...props,
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
    goToTodayButton: slot.optional(goToTodayButton, {
      renderByDefault: true,
      defaultProps: {
        children: 'Go to today',
        'aria-disabled': !goToTodayEnabled,
        disabled: !goToTodayEnabled && !allFocusable,
        onClick: onGotoToday,
        onKeyDown: (ev: React.KeyboardEvent<HTMLButtonElement>) => {
          if (ev.key === Enter) {
            ev.preventDefault();
            onGotoToday(ev);
          }
        },
        type: 'button',
      },
      elementType: 'button',
    }),
    dayPicker,
    monthPicker: slot.optional(props.monthPicker, {
      renderByDefault: true,
      defaultProps: {
        navigatedDate,
        selectedDate: isMonthOnly ? selectedDate : navigatedDate,
        onSelectDate: isMonthOnly ? onDateSelected : undefined,
        onHeaderSelect: isOverlay ? onHeaderSelect : undefined,
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
  const { dayPicker, monthPicker, goToTodayButton } = props;
  const state = useCalendarBase_unstable(props, ref);
  const resolvedDayPicker = slot.optional(dayPicker, {
    renderByDefault: true,
    defaultProps: state.dayPicker,
    elementType: CalendarDay,
  });
  const resolvedMonthPicker = slot.optional(monthPicker, {
    renderByDefault: true,
    defaultProps: state.monthPicker,
    elementType: CalendarMonth,
  });
  const mergedDayPickerRef = useMergedRefs(state.dayPickerRef, resolvedDayPicker?.ref);
  const mergedMonthPickerRef = useMergedRefs(state.monthPickerRef, resolvedMonthPicker?.ref);

  if (resolvedDayPicker) {
    resolvedDayPicker.ref = mergedDayPickerRef;
  }
  if (resolvedMonthPicker) {
    resolvedMonthPicker.ref = mergedMonthPickerRef;
  }

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      dayPicker: CalendarDay,
      monthPicker: CalendarMonth,
      goToTodayButton: 'button',
    },
    goToTodayButton: slot.optional(goToTodayButton, {
      renderByDefault: !!state.goToTodayButton,
      defaultProps: state.goToTodayButton,
      elementType: 'button',
    }),
    dayPicker: resolvedDayPicker,
    monthPicker: resolvedMonthPicker,
  };
};
