'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, PageDown, PageUp, Space } from '@fluentui/keyboard-keys';
import { ArrowDownRegular, ArrowUpRegular, DismissRegular } from '@fluentui/react-icons';
import { motionTokens } from '@fluentui/react-motion';
import { Fade } from '@fluentui/react-motion-components-preview';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  getIntrinsicElementProps,
  getRTLSafeKey,
  mergeCallbacks,
  slot,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  DAYS_IN_WEEK,
  addDays,
  addMonths,
  compareDatePart,
  findAvailableDate,
  getBoundedDateRange,
  getDateRange,
  getDayGrid,
  getDayIndex,
  getMonthEnd,
  getMonthStart,
  getWeekNumber,
  isRestrictedDate,
  stringifyDataAttribute,
} from '../../utils';
import { createDate } from '../../utils/dateMath';
import { getDateRangeTypeToUse } from '../../utils/dateGrid/workWeek';
import { getCalendarGridCell, isCalendarGridArrow, setCalendarNavigationDate } from '../../utils/calendarKeyboard';
import {
  getCalendarEventType,
  getCalendarNavigationButtonProps,
  onCalendarEnterKeyDown,
} from '../../utils/calendarHeader';
import { DirectionalSlideIn, DirectionalSlideOut } from '../../utils/calendarMotions';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarGridTabStop } from '../../hooks/useCalendarGridTabStop';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';
import { useWeekCorners } from '../../hooks/useWeekCorners';
import type { DayCorners } from '../../hooks/useWeekCorners';
import type { DayGridOptions } from '../../utils';
import type {
  CalendarDayBaseProps,
  CalendarDayBaseState,
  CalendarDayCell,
  CalendarDayHandle,
  CalendarDayProps,
  CalendarDayState,
  CalendarDayWeek,
  CalendarDayWeekdayRow,
} from './CalendarDay.types';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

const noop = () => undefined;

const NO_CORNERS: DayCorners = { topLeft: false, topRight: false, bottomLeft: false, bottomRight: false };

/**
 * Applied imperatively to every cell in the hovered or pressed range, because an arbitrary blob of
 * days cannot be expressed with a `:hover` rule.
 */
const RANGE_HOVERED_ATTRIBUTE = 'data-range-hovered';
const RANGE_PRESSED_ATTRIBUTE = 'data-range-pressed';

const CORNER_ATTRIBUTES = [
  ['topLeft', 'data-corner-top-left'],
  ['topRight', 'data-corner-top-right'],
  ['bottomLeft', 'data-corner-bottom-left'],
  ['bottomRight', 'data-corner-bottom-right'],
] as const;

const applyCorners = (element: HTMLElement, corners: DayCorners): void =>
  CORNER_ATTRIBUTES.forEach(([corner, attribute]) => element.toggleAttribute(attribute, corners[corner]));

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T | null): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as React.RefObject<T | null>).current = value;
  }
};

/**
 * Finds the next representable civil date at `initialOffset` days and beyond, skipping dates that do not exist in
 * the local timezone.
 */
const getDirectionalTargetDate = (date: Date, initialOffset: number, direction: 1 | -1): Date | undefined => {
  for (let offset = initialOffset; ; offset += direction) {
    const civilDate = new Date(0);
    civilDate.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate() + offset);
    if (!Number.isFinite(civilDate.getTime())) {
      return undefined;
    }

    const expectedYear = civilDate.getUTCFullYear();
    const expectedMonth = civilDate.getUTCMonth();
    const expectedDay = civilDate.getUTCDate();
    const candidate = createDate(expectedYear, expectedMonth, expectedDay);
    if (!Number.isFinite(candidate.getTime())) {
      return undefined;
    }

    if (
      candidate.getFullYear() === expectedYear &&
      candidate.getMonth() === expectedMonth &&
      candidate.getDate() === expectedDay &&
      compareDatePart(candidate, date) * direction > 0
    ) {
      return candidate;
    }
  }
};

/**
 * Create the base state required to render an unstyled CalendarDay.
 * The grid owns selection, range hover, arrow navigation and its roving tab stop, so the base state is complete
 * without a focus runtime.
 */
export const useCalendarDayBase_unstable = (
  props: CalendarDayBaseProps,
  ref: React.Ref<CalendarDayHandle>,
): CalendarDayBaseState => {
  // The context value only changes when Calendar re-renders the pickers anyway, so it is read as a whole.
  const {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatters,
    maxDate,
    minDate,
    restrictedDates,
    setValue,
    showWeekNumbers,
    today: contextToday,
    value,
    workWeekDays,
  } = useCalendarContext_unstable(ctx => ctx);
  const { dir } = useFluent_unstable();

  const {
    body,
    closeButton,
    daysToSelectInDayView,
    getDayCellProps,
    getMarkedDays,
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
    weeksToShow,
  } = props;

  const today = React.useMemo(() => contextToday ?? new Date(), [contextToday]);
  const navigatedDate = props.navigatedDate ?? today;
  const selectedDate = value === undefined ? today : value;
  const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

  const [dayElements] = React.useState(() => new Map<string, HTMLTableCellElement>());
  const activeDescendantId = useId();

  const onSelectDay = (ev: React.SyntheticEvent<HTMLElement>, date: Date): void => {
    if (isRestrictedDate(date, restrictedDatesOptions)) {
      return;
    }

    let dateRange = getDateRange(date, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView);
    dateRange = getBoundedDateRange(dateRange, minDate, maxDate);
    dateRange = dateRange.filter((d: Date) => !isRestrictedDate(d, restrictedDatesOptions));

    const type = getCalendarEventType(ev);
    setValue?.(ev, { event: ev, type, date, selectedDateRange: dateRange });
    onNavigateDate(ev, { event: ev, type, date, focusOnNavigatedDay: true });
  };

  const gridOptions: DayGridOptions = {
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

  /*
   * The grid includes one transition week before and after the visible weeks. Marked days are requested only for
   * the visible range.
   */
  const dayGrid = getDayGrid(gridOptions);
  const visibleDates = dayGrid
    .slice(1, -1)
    .flatMap(week => week.map(day => day.originalDate))
    .filter((date): date is Date => date !== null);
  const markedDays =
    visibleDates.length > 0 ? getMarkedDays?.(visibleDates[0], visibleDates[visibleDates.length - 1]) || [] : [];
  for (const week of dayGrid) {
    for (const day of week) {
      const dayDate = day.originalDate;
      day.isMarked ||= !!dayDate && markedDays.some(markedDay => compareDatePart(dayDate, markedDay) === 0);
    }
  }

  let focusTargetDate: Date | undefined = navigatedDate;
  if (!allFocusable && isRestrictedDate(navigatedDate, restrictedDatesOptions)) {
    const isInNavigatedMonth = (date: Date) =>
      compareDatePart(date, getMonthStart(navigatedDate)) >= 0 &&
      compareDatePart(date, getMonthEnd(navigatedDate)) <= 0;
    const isAvailable = (date: Date) => !isRestrictedDate(date, restrictedDatesOptions);
    const sameMonthDates = visibleDates.filter(isInNavigatedMonth);
    const currentIndex = sameMonthDates.findIndex(date => compareDatePart(date, navigatedDate) === 0);
    const searchDirection = (direction: 1 | -1) => {
      for (let index = currentIndex + direction; index >= 0 && index < sameMonthDates.length; index += direction) {
        if (isAvailable(sameMonthDates[index])) {
          return sameMonthDates[index];
        }
      }
      return undefined;
    };
    const remainingVisibleDates = visibleDates.filter(date => !isInNavigatedMonth(date));

    focusTargetDate =
      searchDirection(1) ??
      searchDirection(-1) ??
      remainingVisibleDates.find(date => compareDatePart(date, navigatedDate) > 0 && isAvailable(date)) ??
      remainingVisibleDates
        .slice()
        .reverse()
        .find(date => compareDatePart(date, navigatedDate) < 0 && isAvailable(date)) ??
      findAvailableDate({
        ...restrictedDatesOptions,
        initialDate: addDays(getMonthEnd(navigatedDate), 1),
        targetDate: navigatedDate,
        direction: 1,
      }) ??
      findAvailableDate({
        ...restrictedDatesOptions,
        initialDate: addDays(getMonthStart(navigatedDate), -1),
        targetDate: navigatedDate,
        direction: -1,
      });
  }

  const [getWeekCorners, calculateRoundedCorners] = useWeekCorners(gridOptions);
  const weekCorners = getWeekCorners(dayGrid);

  const focusTarget = focusTargetDate;
  const focusTargetKey = focusTarget
    ? dayGrid
        .slice(1, -1)
        .flat()
        .find(day => day.originalDate && compareDatePart(day.originalDate, focusTarget) === 0)?.key
    : undefined;
  const visibleDays: CalendarDayCell[] = [];
  const weeks: CalendarDayWeek[] = dayGrid.map((week, gridIndex) => {
    const transition = gridIndex === 0 ? 'first' : gridIndex === dayGrid.length - 1 ? 'last' : undefined;
    const weekIndex = gridIndex - 1;

    const days = week.map((day, dayIndex): CalendarDayCell => {
      const date = day.originalDate;
      const isVisible = !transition && !!date;
      const isFocusTarget = isVisible && day.key === focusTargetKey;
      const isFocusable = isVisible && (allFocusable || day.isInBounds);
      const customProps = isVisible ? getDayCellProps?.(date) : undefined;
      const corners = transition ? undefined : weekCorners[weekIndex + '_' + dayIndex];
      const formattedDate = date ? formatters.dateTime({ date, format: 'dayMonthYear' }) : day.date;

      const cell: CalendarDayCell = {
        ...day,
        props: {
          role: 'gridcell',
          'aria-current': day.isToday ? 'date' : undefined,
          'aria-disabled': !transition && !day.isInBounds,
          'aria-selected': day.isInBounds ? day.isSelected : undefined,
          tabIndex: isFocusTarget ? 0 : isFocusable ? -1 : undefined,
          ...customProps,
          ref: transition
            ? undefined
            : (element: HTMLTableCellElement | null) => {
                if (element) {
                  dayElements.set(day.key, element);
                } else {
                  dayElements.delete(day.key);
                }
                assignRef(customProps?.ref, element);
              },
          'data-marked': stringifyDataAttribute(day.isMarked),
          'data-outside-bounds': stringifyDataAttribute(!day.isInBounds),
          'data-outside-month': stringifyDataAttribute(!day.isInMonth),
          'data-selected': stringifyDataAttribute(day.isSelected),
          'data-today': stringifyDataAttribute(day.isToday),
          ...Object.fromEntries(
            CORNER_ATTRIBUTES.map(([corner, attribute]) => [attribute, stringifyDataAttribute(!!corners?.[corner])]),
          ),
        },
        button: {
          'aria-label': day.isMarked && date ? formatters.dayMarkedLabel({ date, formattedDate }) : formattedDate,
          disabled: !transition && !day.isInBounds,
          id: isFocusTarget ? activeDescendantId : undefined,
          tabIndex: -1,
          type: 'button',
        },
        label: {
          children: date ? formatters.dateTime({ date, format: 'day' }) : day.date,
        },
        marker: day.isMarked ? { 'aria-hidden': true } : undefined,
      };
      if (!transition) {
        visibleDays.push(cell);
      }
      return cell;
    });

    const lastDate = week
      .slice()
      .reverse()
      .find(day => day.originalDate)?.originalDate;
    const weekNumber =
      showWeekNumbers && lastDate ? getWeekNumber(lastDate, firstDayOfWeek, firstWeekOfYear) : undefined;
    const weekNumberLabel = weekNumber !== undefined ? formatters.weekNumberLabel({ weekNumber }) : '';

    return {
      key: transition === 'first' ? -1 : transition === 'last' ? -2 : weekIndex,
      transition,
      props: {
        'aria-hidden': transition ? true : undefined,
        role: transition ? 'presentation' : undefined,
      },
      weekNumber:
        weekNumber !== undefined
          ? { 'aria-label': weekNumberLabel, children: <span>{weekNumber}</span>, scope: 'row', title: weekNumberLabel }
          : undefined,
      days,
    };
  });

  // Weekday labels follow the configured first day of the week.
  const weekdayDates = Array.from({ length: DAYS_IN_WEEK }, (_, index) => new Date(2020, 0, 5 + index));
  const shortDays = weekdayDates.map(date => formatters.dateTime({ date, format: 'shortWeekday' }));
  const dayNames = weekdayDates.map(date => formatters.dateTime({ date, format: 'weekday' }));
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  const firstOfMonthIndex = dayGrid[1].findIndex(day => day.originalDate?.getDate() === 1);
  const firstOfMonthDate = dayGrid[1][firstOfMonthIndex]?.originalDate;
  if (weeksToShow === 1 && firstOfMonthDate) {
    // if we only show one week, replace the header with short month name
    const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeekIndex) % DAYS_IN_WEEK;
    shortDays[firstOfMonthIndexOffset] = formatters.dateTime({ date: firstOfMonthDate, format: 'shortMonth' });
    dayNames[firstOfMonthIndexOffset] = formatters.dateTime({ date: firstOfMonthDate, format: 'month' });
  }
  const weekdayRow: CalendarDayWeekdayRow = {
    props: {},
    weekNumberSpacer: showWeekNumbers ? { role: 'presentation' } : undefined,
    cells: shortDays.map((_, index) => {
      const i = (index + firstDayOfWeekIndex) % DAYS_IN_WEEK;
      return {
        key: shortDays[i] + ' ' + index,
        props: { 'aria-label': dayNames[i], children: shortDays[i], scope: 'col', title: dayNames[i] },
      };
    }),
  };

  const getFocusTarget = () => (focusTargetKey ? dayElements.get(focusTargetKey) : undefined);
  const [gridRef, onGridFocus] = useCalendarGridTabStop<HTMLTableElement>(allFocusable, getFocusTarget);

  React.useImperativeHandle(ref, () => ({
    focus(options?: FocusOptions) {
      getFocusTarget()?.focus(options);
    },
  }));

  const findDay = (cell: HTMLElement) => visibleDays.find(day => dayElements.get(day.key) === cell);

  /**
   * Because we want arbitrary blobs of days to be selectable — to support highlighting every day in
   * the month for month view — a CSS `:hover` rule isn't enough. Mouse callbacks set attributes on
   * every relevant cell instead, so the grid resolves a day to its peers.
   */
  const getDaysInRange = (day: CalendarDayCell): CalendarDayCell[] => {
    if (!day.originalDate) {
      return [];
    }
    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRange = getDateRange(
      day.originalDate,
      getDateRangeTypeToUse(dateRangeType, workWeekDays, firstDayOfWeek),
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
    );
    return visibleDays.filter(visibleDay => {
      const date = visibleDay.originalDate;
      return date !== null && dateRange.some(rangeDate => compareDatePart(rangeDate, date) === 0);
    });
  };

  const isMultiDaySelection = dateRangeType === 'day' && !!daysToSelectInDayView && Math.abs(daysToSelectInDayView) > 1;
  const updateRange = (day: CalendarDayCell, hovered: boolean | undefined, pressed?: boolean) => {
    const daysInRange = getDaysInRange(day);
    daysInRange.forEach((dayInRange, index) => {
      const element = dayElements.get(dayInRange.key);
      if (!element) {
        return;
      }
      if (hovered !== undefined) {
        element.toggleAttribute(RANGE_HOVERED_ATTRIBUTE, hovered);
        if (!dayInRange.isSelected && isMultiDaySelection) {
          applyCorners(
            element,
            hovered ? calculateRoundedCorners(false, false, index > 0, index < daysInRange.length - 1) : NO_CORNERS,
          );
        }
      }
      if (pressed !== undefined) {
        element.toggleAttribute(RANGE_PRESSED_ATTRIBUTE, pressed);
      }
    });
  };

  const navigateMonthEdge = (ev: React.KeyboardEvent<HTMLElement>, date: Date): void => {
    let targetDate: Date | undefined = undefined;
    let direction: 1 | -1 = 1; // by default search forward

    if (ev.key === ArrowUp) {
      direction = -1;
      targetDate = getDirectionalTargetDate(date, -7, direction);
    } else if (ev.key === ArrowDown) {
      targetDate = getDirectionalTargetDate(date, 7, direction);
    } else if (ev.key === getRTLSafeKey(ArrowLeft, dir)) {
      direction = -1;
      targetDate = getDirectionalTargetDate(date, -1, direction);
    } else if (ev.key === getRTLSafeKey(ArrowRight, dir)) {
      targetDate = getDirectionalTargetDate(date, 1, direction);
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
      return;
    }

    const focusDayInView = (dateToFocus: Date | undefined): boolean => {
      const day =
        dateToFocus && visibleDays.find(d => d.originalDate && compareDatePart(d.originalDate, dateToFocus) === 0);
      const element = day && dayElements.get(day.key);
      if (!element) {
        return false;
      }
      element.focus();
      ev.preventDefault();
      return true;
    };

    if (allFocusable && focusDayInView(targetDate)) {
      return;
    }

    // target date is restricted, search in whatever direction until finding the next possible date, stopping at boundaries
    const findAvailableDateOptions = { initialDate: date, targetDate, direction, ...restrictedDatesOptions };
    const nextDate =
      findAvailableDate(findAvailableDateOptions) ??
      // if no dates available in initial direction, try going backwards
      findAvailableDate({ ...findAvailableDateOptions, direction: direction === 1 ? -1 : 1 });

    // If the next date is still inside the current view, focus it without navigating the displayed month.
    if (nextDate && !focusDayInView(nextDate)) {
      // else, fire navigation on the date to change the view to show it
      onNavigateDate(ev, { event: ev, type: 'keydown', date: nextDate, focusOnNavigatedDay: true });
      ev.preventDefault();
    }
  };

  const getEventDay = (ev: React.SyntheticEvent<HTMLElement>): [HTMLElement, CalendarDayCell] | undefined => {
    const cell = getCalendarGridCell(ev);
    const day = cell && findDay(cell);
    return cell && day?.originalDate ? [cell, day] : undefined;
  };

  // Ignore pointer moves between a cell and its own content.
  const onMouseOverOrOut = (hovered: boolean) => (ev: React.MouseEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (eventDay && !(ev.relatedTarget && eventDay[0].contains(ev.relatedTarget as Node))) {
      updateRange(eventDay[1], hovered, hovered ? undefined : false);
    }
  };

  const monthAndYear = formatters.dateTime({ date: navigatedDate, format: 'monthYear' });
  const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
  const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

  const navigateMonth = (ev: ButtonEvent, offset: number) =>
    onNavigateDate(ev, {
      event: ev,
      type: getCalendarEventType(ev),
      date: addMonths(navigatedDate, offset),
      focusOnNavigatedDay: false,
    });
  const onSelectHeader = (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    onHeaderSelect?.(ev, { event: ev, type: getCalendarEventType(ev) });
  const onClose = (ev: ButtonEvent) => onDismiss?.(ev, { event: ev, type: getCalendarEventType(ev) });

  const gridSlot = slot.always(grid, {
    defaultProps: {
      role: 'grid',
      'aria-activedescendant': activeDescendantId,
      'aria-label': monthAndYear,
      'aria-multiselectable': dateRangeType !== 'day' || Math.abs(daysToSelectInDayView ?? 1) > 1,
    },
    elementType: 'table',
  });
  gridSlot.ref = useMergedRefs(gridSlot.ref, gridRef);
  gridSlot.onFocus = mergeCallbacks(gridSlot.onFocus, onGridFocus);
  gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, (ev: React.KeyboardEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (!eventDay || ev.isDefaultPrevented()) {
      return;
    }
    const [, day] = eventDay;
    const date = day.originalDate!;
    if (ev.key === PageUp || ev.key === PageDown) {
      // Calendar pages from the focused day rather than the navigated date.
      setCalendarNavigationDate(ev.nativeEvent, date);
    } else if ((ev.key === Enter || ev.key === Space) && day.isInBounds) {
      onSelectDay(ev, date);
      ev.preventDefault();
    } else if (isCalendarGridArrow(ev)) {
      navigateMonthEdge(ev, date);
    }
  });
  gridSlot.onClick = mergeCallbacks(gridSlot.onClick, (ev: React.MouseEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (eventDay && !ev.isDefaultPrevented()) {
      eventDay[0].focus();
      if (!ev.isDefaultPrevented() && eventDay[1].isInBounds) {
        onSelectDay(ev, eventDay[1].originalDate!);
      }
    }
  });
  gridSlot.onMouseOver = mergeCallbacks(gridSlot.onMouseOver, onMouseOverOrOut(true));
  gridSlot.onMouseOut = mergeCallbacks(gridSlot.onMouseOut, onMouseOverOrOut(false));
  gridSlot.onMouseDown = mergeCallbacks(gridSlot.onMouseDown, (ev: React.MouseEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (eventDay) {
      updateRange(eventDay[1], undefined, true);
    }
  });
  gridSlot.onMouseUp = mergeCallbacks(gridSlot.onMouseUp, (ev: React.MouseEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (eventDay) {
      updateRange(eventDay[1], undefined, false);
    }
  });

  return {
    focusTargetDate,
    headerIsClickable: !!onHeaderSelect,
    lightenDaysOutsideNavigatedMonth,
    monthAndYear,
    navigatedDate,
    nextMonthInBounds,
    prevMonthInBounds,
    renderDay: props.renderDay,
    showWeekNumbers,
    weekdayRow,
    weeks,
    components: {
      root: 'div',
      header: 'div',
      heading: onHeaderSelect ? 'button' : 'div',
      navigation: 'div',
      previousMonthButton: 'button',
      nextMonthButton: 'button',
      closeButton: 'button',
      grid: 'table',
      body: 'tbody',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...props, 'data-fui-calendar-picker': 'day' }), {
      elementType: 'div',
    }),
    header: slot.always(header, { elementType: 'div' }),
    heading: slot.always(heading, {
      defaultProps: {
        'aria-label': onHeaderSelect
          ? formatters.yearPickerHeaderLabel({ date: navigatedDate, formattedDate: monthAndYear })
          : undefined,
        onClick: onHeaderSelect ? onSelectHeader : undefined,
        onKeyDown: onHeaderSelect ? onCalendarEnterKeyDown(onSelectHeader) : undefined,
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
      defaultProps: getCalendarNavigationButtonProps(
        prevMonthInBounds,
        allFocusable,
        formatters.previousMonthLabel({
          date: addMonths(navigatedDate, -1),
          formattedDate: formatters.dateTime({ date: addMonths(navigatedDate, -1), format: 'month' }),
        }),
        ev => navigateMonth(ev, -1),
      ),
      elementType: 'button',
    }),
    nextMonthButton: slot.always(nextMonthButton, {
      defaultProps: getCalendarNavigationButtonProps(
        nextMonthInBounds,
        allFocusable,
        formatters.nextMonthLabel({
          date: addMonths(navigatedDate, 1),
          formattedDate: formatters.dateTime({ date: addMonths(navigatedDate, 1), format: 'month' }),
        }),
        ev => navigateMonth(ev, 1),
      ),
      elementType: 'button',
    }),
    closeButton: slot.optional(closeButton, {
      defaultProps: {
        onClick: onDismiss ? onClose : undefined,
        onKeyDown: onDismiss ? onCalendarEnterKeyDown(onClose) : undefined,
        title: 'Close',
        type: 'button',
      },
      elementType: 'button',
    }),
    grid: gridSlot,
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
  // The grid owns its keys; the Tabster group only keeps an enclosing Tabster mover from handling them.
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'grid-linear',
    ignoreDefaultKeydown: {
      [ArrowDown]: true,
      [ArrowLeft]: true,
      [ArrowRight]: true,
      [ArrowUp]: true,
      PageUp: true,
      PageDown: true,
    },
  });
  const firstTransitionDate = state.weeks[0].days.find(day => day.originalDate)?.originalDate;
  const animateBackwards = useAnimateBackwards(firstTransitionDate ?? undefined, compareDatePart);

  /*
   * Single navigation epoch for all rows in the grid. Derived from the first day's key, which changes when the user
   * navigates to a different range but stays stable across intra-range interactions (e.g. day selection).
   */
  const replayKey = state.weeks[0].days[0].key;

  /* eslint-disable react-hooks/immutability */
  Object.assign(state.grid, arrowNavigationAttributes);
  if (state.previousMonthButton.children === undefined) {
    state.previousMonthButton.children = <ArrowUpRegular />;
  }
  if (state.nextMonthButton.children === undefined) {
    state.nextMonthButton.children = <ArrowDownRegular />;
  }
  if (state.closeButton && state.closeButton.children === undefined) {
    state.closeButton.children = <DismissRegular />;
  }
  // The filler rows slide out towards the edge they sit on; the visible weeks slide in.
  state.wrapWeek = (row, week) =>
    week.transition ? (
      <DirectionalSlideOut
        animationDirection="vertical"
        animateBackwards={animateBackwards}
        replayKey={replayKey}
        edge={week.transition}
      >
        {row}
      </DirectionalSlideOut>
    ) : (
      <DirectionalSlideIn
        animationDirection="vertical"
        animateBackwards={animateBackwards ?? false}
        replayKey={replayKey}
      >
        {row}
      </DirectionalSlideIn>
    );
  // Weekday labels are stable across navigation, so the fade plays once on mount.
  state.wrapWeekdayCell = cell => <Fade.In duration={motionTokens.durationGentle}>{cell}</Fade.In>;
  /* eslint-enable react-hooks/immutability */

  return state;
};
