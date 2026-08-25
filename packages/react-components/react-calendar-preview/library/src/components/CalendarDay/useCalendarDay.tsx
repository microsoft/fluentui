'use client';

import * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular, DismissRegular } from '@fluentui/react-icons';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useId } from '@fluentui/react-utilities';
import {
  addMonths,
  compareDatePart,
  getBoundedDateRange,
  getDateRangeArray,
  getMonthEnd,
  getMonthStart,
  isRestrictedDate,
} from '../../utils';
import { getDateRangeTypeToUse } from '../../utils/dateGrid/getDateRangeTypeToUse';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { CalendarDayGridRow } from '../CalendarDayGridRow/CalendarDayGridRow';
import { CalendarDayGridHeaderRow } from '../CalendarDayGridHeaderRow/CalendarDayGridHeaderRow';
import { useWeekCorners } from '../../hooks/useWeekCorners';
import { useWeeks } from '../../hooks/useWeeks';
import type { DayInfo } from '../../hooks/useWeeks';
import type {
  CalendarDayBaseProps,
  CalendarDayBaseState,
  CalendarDayHandle,
  CalendarDayProps,
  CalendarDayState,
} from './CalendarDay.types';

const noop = () => undefined;

const onButtonKeyDown =
  (
    callback?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void,
  ): ((ev: React.KeyboardEvent<HTMLButtonElement>) => void) =>
  ev => {
    if (ev.key === Enter) {
      callback?.(ev);
    }
  };

function useDayRefs() {
  const daysRef = React.useRef<Record<string, HTMLElement>>({});

  const getSetRefCallback = (dayKey: string) => (element: HTMLElement | null) => {
    if (element === null) {
      delete daysRef.current[dayKey];
    } else {
      daysRef.current[dayKey] = element;
    }
  };

  return [daysRef, getSetRefCallback] as const;
}

/**
 * Create the base state required to render an unstyled CalendarDay.
 * Free of Tabster so the headless layer can supply its own roving focus; the styled
 * `useCalendarDay_unstable` adds arrow key navigation on top.
 */
export const useCalendarDayBase_unstable = (
  props: CalendarDayBaseProps,
  ref: React.Ref<CalendarDayHandle>,
): CalendarDayBaseState => {
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const dateRangeType = useCalendarContext_unstable(ctx => ctx.dateRangeType);
  const firstDayOfWeek = useCalendarContext_unstable(ctx => ctx.firstDayOfWeek);
  const firstWeekOfYear = useCalendarContext_unstable(ctx => ctx.firstWeekOfYear);
  const formatDateTime = useCalendarContext_unstable(ctx => ctx.formatDateTime);
  const formatLabel = useCalendarContext_unstable(ctx => ctx.formatLabel);
  const maxDate = useCalendarContext_unstable(ctx => ctx.maxDate);
  const minDate = useCalendarContext_unstable(ctx => ctx.minDate);
  const restrictedDates = useCalendarContext_unstable(ctx => ctx.restrictedDates);
  const setValue = useCalendarContext_unstable(ctx => ctx.setValue);
  const contextToday = useCalendarContext_unstable(ctx => ctx.today);
  const value = useCalendarContext_unstable(ctx => ctx.value);
  const workWeekDays = useCalendarContext_unstable(ctx => ctx.workWeekDays);

  const {
    body,
    closeButton,
    daysToSelectInDayView,
    grid,
    header,
    heading,
    lightenDaysOutsideNavigatedMonth = true,
    navigation,
    nextMonthButton,
    onDismiss,
    onHeaderSelect,
    onNavigateDate = noop,
    previousMonthButton,
  } = props;

  const today = React.useMemo(() => contextToday ?? new Date(), [contextToday]);
  const navigatedDate = props.navigatedDate ?? today;
  const selectedDate = value ?? today;
  const weeksToShow = props.weeksToShow;

  const navigatedDayRef = React.useRef<HTMLTableCellElement | null>(null);

  const activeDescendantId = useId();

  React.useImperativeHandle(
    ref,
    () => ({
      focus() {
        navigatedDayRef.current?.focus?.();
      },
    }),
    [],
  );

  const onSelectDate = (
    ev: React.MouseEvent<HTMLTableCellElement> | React.KeyboardEvent<HTMLElement>,
    date: Date,
  ): void => {
    const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

    let dateRange = getDateRangeArray(date, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView);
    dateRange = getBoundedDateRange(dateRange, minDate, maxDate);
    dateRange = dateRange.filter((d: Date) => !isRestrictedDate(d, restrictedDatesOptions));

    const type = ev.type === 'keydown' ? 'keydown' : 'click';
    setValue?.(ev, { event: ev, type, date, selectedDateRangeArray: dateRange });
    onNavigateDate(ev, { event: ev, type, date, focusOnNavigatedDay: true });
  };

  const [daysRef, getSetRefCallback] = useDayRefs();

  const gridOptions = {
    ...props,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    maxDate,
    minDate,
    navigatedDate,
    restrictedDates,
    selectedDate,
    today,
    weeksToShow,
    workWeekDays,
  };

  const weeks = useWeeks(gridOptions, onSelectDate, getSetRefCallback);

  const [getWeekCorners, calculateRoundedCorners] = useWeekCorners(gridOptions);

  /**
   * Because we want arbitrary blobs of days to be selectable — to support highlighting every day in
   * the month for month view — a CSS `:hover` rule isn't enough. Mouse callbacks set class names on
   * every relevant child ref instead, so the grid has to be able to resolve a day to its peers.
   */
  const getDayInfosInRangeOfDay = (dayToCompare: DayInfo): DayInfo[] => {
    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = getDateRangeTypeToUse(dateRangeType, workWeekDays, firstDayOfWeek);

    // gets all the dates for the given date range type that are in the same date range as the given day
    const dateRange = getDateRangeArray(
      dayToCompare.originalDate,
      dateRangeHoverType,
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
    ).map((date: Date) => date.getTime());

    // gets all the day refs for the given dates
    return weeks.reduce((accumulatedValue: DayInfo[], currentWeek: DayInfo[]) => {
      return accumulatedValue.concat(
        currentWeek.filter((weekDay: DayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1),
      );
    }, []);
  };

  const getRefsFromDayInfos = (dayInfosInRange: DayInfo[]): (HTMLElement | null)[] =>
    dayInfosInRange.map((dayInfo: DayInfo) => daysRef.current[dayInfo.key]);

  const monthAndYear = formatDateTime(navigatedDate, 'monthYear');
  const headerIsClickable = !!onHeaderSelect;

  /*
   * aria-disabled rather than disabled, so focus is not lost when a prev/next button becomes
   * disabled right after being clicked.
   */
  const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
  const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

  const onSelectPrevMonth = (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
    onNavigateDate(ev, {
      event: ev,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      date: addMonths(navigatedDate, -1),
      focusOnNavigatedDay: false,
    });
  const onSelectNextMonth = (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
    onNavigateDate(ev, {
      event: ev,
      type: ev.type === 'keydown' ? 'keydown' : 'click',
      date: addMonths(navigatedDate, 1),
      focusOnNavigatedDay: false,
    });
  const onSelectHeader = (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    onHeaderSelect?.(ev, { event: ev, type: ev.type === 'keydown' ? 'keydown' : 'click' });
  const onClose = (ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
    onDismiss?.(ev, { event: ev, type: ev.type === 'keydown' ? 'keydown' : 'click' });

  const titleElementType = onHeaderSelect ? 'button' : 'div';

  return {
    activeDescendantId,
    calculateRoundedCorners,
    daysToSelectInDayView,
    getDayInfosInRangeOfDay,
    getRefsFromDayInfos,
    headerIsClickable,
    lightenDaysOutsideNavigatedMonth,
    monthAndYear,
    navigatedDate,
    navigatedDayRef,
    nextMonthInBounds,
    onNavigateDate,
    prevMonthInBounds,
    weekCorners: getWeekCorners(weeks),
    weeks,
    weeksToShow,
    components: {
      root: 'div',
      header: 'div',
      heading: titleElementType,
      navigation: 'div',
      previousMonthButton: 'button',
      nextMonthButton: 'button',
      closeButton: 'button',
      grid: 'table',
      body: 'tbody',
    },
    root: slot.always(getIntrinsicElementProps('div', props), { elementType: 'div' }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        'aria-label': onHeaderSelect
          ? formatLabel('yearPickerHeader', { date: navigatedDate, formattedDate: monthAndYear })
          : undefined,
        onClick: onHeaderSelect ? onSelectHeader : undefined,
        onKeyDown: onHeaderSelect ? onButtonKeyDown(onSelectHeader) : undefined,
        // Prevent focus when the header has no action.
        tabIndex: onHeaderSelect ? 0 : -1,
        type: onHeaderSelect ? 'button' : undefined,
        children: (
          <span aria-live="polite" aria-atomic="true">
            {monthAndYear}
          </span>
        ),
      },
      elementType: onHeaderSelect ? 'button' : 'div',
    }),
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousMonthButton: slot.always(previousMonthButton, {
      defaultProps: {
        'aria-disabled': !prevMonthInBounds,
        onClick: prevMonthInBounds ? onSelectPrevMonth : undefined,
        onKeyDown: prevMonthInBounds ? onButtonKeyDown(onSelectPrevMonth) : undefined,
        tabIndex: prevMonthInBounds ? undefined : allFocusable ? 0 : -1,
        title: formatLabel('previousMonth', {
          date: addMonths(navigatedDate, -1),
          formattedDate: formatDateTime(addMonths(navigatedDate, -1), 'month'),
        }),
        type: 'button',
      },
      elementType: 'button',
    }),
    nextMonthButton: slot.always(nextMonthButton, {
      defaultProps: {
        'aria-disabled': !nextMonthInBounds,
        onClick: nextMonthInBounds ? onSelectNextMonth : undefined,
        onKeyDown: nextMonthInBounds ? onButtonKeyDown(onSelectNextMonth) : undefined,
        tabIndex: nextMonthInBounds ? undefined : allFocusable ? 0 : -1,
        title: formatLabel('nextMonth', {
          date: addMonths(navigatedDate, 1),
          formattedDate: formatDateTime(addMonths(navigatedDate, 1), 'month'),
        }),
        type: 'button',
      },
      elementType: 'button',
    }),
    closeButton: slot.optional(closeButton, {
      defaultProps: {
        onClick: onDismiss ? onClose : undefined,
        onKeyDown: onDismiss ? onButtonKeyDown(onClose) : undefined,
        title: 'Close',
        type: 'button',
      },
      elementType: 'button',
    }),
    grid: slot.always(grid, {
      defaultProps: {
        role: 'grid',
        'aria-activedescendant': activeDescendantId,
        'aria-label': monthAndYear,
        'aria-multiselectable': false,
      },
      elementType: 'table',
    }),
    body: slot.always(body, { elementType: 'tbody' }),
  };
};

/**
 * Create the state required to render CalendarDay.
 */
export const useCalendarDay_unstable = (
  props: CalendarDayProps,
  ref: React.Ref<CalendarDayHandle>,
): CalendarDayState => {
  const state = useCalendarDayBase_unstable(props, ref);
  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid-linear' });

  const { weeks } = state;

  return {
    ...state,
    body: slot.always(props.body, {
      defaultProps: {
        ...state.body,
        children: (
          <>
            <CalendarDayGridHeaderRow />
            <CalendarDayGridRow week={weeks[0]} weekIndex={-1} transition="first" />
            {weeks.slice(1, weeks.length - 1).map((week: DayInfo[], weekIndex: number) => (
              <CalendarDayGridRow key={weekIndex} week={week} weekIndex={weekIndex} />
            ))}
            <CalendarDayGridRow week={weeks[weeks.length - 1]} weekIndex={-2} transition="last" />
          </>
        ),
      },
      elementType: 'tbody',
    }),
    grid: slot.always(props.grid, {
      defaultProps: {
        ...state.grid,
        ...arrowNavigationAttributes,
      },
      elementType: 'table',
    }),
    previousMonthButton: slot.always(props.previousMonthButton, {
      defaultProps: {
        ...state.previousMonthButton,
        children: <ArrowUpRegular />,
      },
      elementType: 'button',
    }),
    nextMonthButton: slot.always(props.nextMonthButton, {
      defaultProps: {
        ...state.nextMonthButton,
        children: <ArrowDownRegular />,
      },
      elementType: 'button',
    }),
    closeButton: slot.optional(props.closeButton, {
      defaultProps: {
        ...state.closeButton,
        children: <DismissRegular />,
      },
      renderByDefault: !!state.closeButton,
      elementType: 'button',
    }),
  };
};
