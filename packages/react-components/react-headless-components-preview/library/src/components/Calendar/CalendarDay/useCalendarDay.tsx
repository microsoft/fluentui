'use client';

import * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, PageDown, PageUp, Space } from '@fluentui/keyboard-keys';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { getIntrinsicElementProps, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import {
  DAYS_IN_WEEK,
  addDays,
  addMonths,
  addYears,
  compareDatePart,
  findAvailableDate,
  getDateRange,
  getDayGrid,
  getDayFromIndex,
  getDayIndex,
  getMonthEnd,
  getMonthStart,
  getWeekNumber,
  isRestrictedDate,
} from '../utils';
import { addCivilDays, createDate, matchesCivilDate } from '../utils/dateMath';
import { getAvailableDates } from '../utils/dateGrid/dateAvailability';
import { mergeProps } from '../../../utils/mergeProps';
import { getDateRangeTypeToUse } from '../utils/dateGrid/workWeek';
import { getCalendarGridCell } from '../hooks/useCalendarGrid';
import {
  getCalendarEventType,
  onCalendarEnterKeyDown,
  resolveCalendarNavigationButton,
  setCalendarNavigationDate,
} from '../utils/calendarNavigation';
import { useCalendarContext } from '../calendarContext';
import type { DayGridOptions } from '../utils';
import type {
  CalendarDayProps,
  CalendarDayState,
  CalendarDayCellData,
  CalendarDayWeekdayCellData,
} from './CalendarDay.types';
import { toDataAttributeValue } from '../../../utils';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
type CalendarDayGridSlotProps = React.ComponentProps<'table'> & {
  focusgroup?: string;
  'data-fui-calendar-grid'?: string;
};

const noop = () => undefined;

/**
 * Applied imperatively to every cell in the hovered or pressed range, because an arbitrary blob of
 * days cannot be expressed with a `:hover` rule.
 */
const RANGE_HOVERED_ATTRIBUTE = 'data-range-hovered';
const RANGE_PRESSED_ATTRIBUTE = 'data-range-pressed';

/**
 * Finds the next representable civil date at `initialOffset` days and beyond, skipping dates that do not exist in
 * the local timezone.
 */
const getDirectionalTargetDate = (date: Date, initialOffset: number, direction: 1 | -1): Date | undefined => {
  const origin = { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
  for (let offset = initialOffset; ; offset += direction) {
    const civilDate = addCivilDays(origin, offset);
    if (!Number.isFinite(civilDate.year)) {
      return undefined;
    }

    const candidate = createDate(civilDate.year, civilDate.month, civilDate.day);
    if (!Number.isFinite(candidate.getTime())) {
      return undefined;
    }

    if (matchesCivilDate(candidate, civilDate) && compareDatePart(candidate, date) * direction > 0) {
      return candidate;
    }
  }
};

/**
 * Create the state required to render CalendarDay.
 * Calendar owns selection, range hover, directional navigation and roving focus.
 */
export const useCalendarDay = (props: CalendarDayProps, ref: React.Ref<HTMLDivElement>): CalendarDayState => {
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
  } = useCalendarContext();
  const { dir } = useFluent_unstable();

  const {
    body,
    closeButton,
    daysToSelectInDayView,
    getCellProps,
    getMarkedDays,
    getRowProps,
    getWeekdayCellProps,
    grid,
    header,
    heading,
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
  const selectedDate = value ?? null;
  const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

  const [dayElements] = React.useState(() => new Map<string, HTMLTableCellElement>());
  const dayElementRefs = React.useRef(new Map<string, React.RefCallback<HTMLTableCellElement>>());
  const nextMonthRef = React.useRef<HTMLButtonElement>(null);
  const previousMonthRef = React.useRef<HTMLButtonElement>(null);
  const navigatedDateTimestamp = navigatedDate.getTime();

  React.useEffect(() => {
    dayElements.forEach(element => {
      element.removeAttribute(RANGE_HOVERED_ATTRIBUTE);
      element.removeAttribute(RANGE_PRESSED_ATTRIBUTE);
    });
    dayElementRefs.current.forEach((_callback, key) => {
      if (!dayElements.has(key)) {
        dayElementRefs.current.delete(key);
      }
    });
  }, [dayElements, navigatedDateTimestamp]);

  const onSelectDay = (ev: React.SyntheticEvent<HTMLElement>, date: Date): void => {
    if (isRestrictedDate(date, restrictedDatesOptions)) {
      return;
    }

    const dateRange = getAvailableDates(
      getDateRange(date, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView),
      restrictedDatesOptions,
    );

    const type = getCalendarEventType(ev);
    setValue?.(ev, { event: ev, type, date, selectedDateRange: dateRange });
    onNavigateDate(ev, { event: ev, type, date, focusOnNavigatedDay: true });
  };

  const gridOptions: DayGridOptions = {
    daysToSelectInDayView,
    dateRangeType,
    firstDayOfWeek,
    maxDate,
    minDate,
    navigatedDate,
    restrictedDates,
    selectedDate,
    today,
    weeksToShow,
    workWeekDays,
  };

  const dayGrid = getDayGrid(gridOptions);
  const visibleDates = dayGrid
    .flatMap(week => week.map(day => day.originalDate))
    .filter((date): date is Date => date !== null);
  const markedDays =
    visibleDates.length > 0 ? getMarkedDays?.(visibleDates[0], visibleDates[visibleDates.length - 1]) || [] : [];
  const markedDayKeys = new Set(markedDays.map(date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`));
  for (const week of dayGrid) {
    for (const day of week) {
      const dayDate = day.originalDate;
      day.isMarked ||=
        !!dayDate && markedDayKeys.has(`${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}`);
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

  const focusTarget = focusTargetDate;
  const focusTargetKey = focusTarget
    ? dayGrid.flat().find(day => day.originalDate && compareDatePart(day.originalDate, focusTarget) === 0)?.key
    : undefined;
  const weeks: CalendarDayState['weeks'] = dayGrid.map((week, weekIndex) => {
    const days = week.map(
      (day): CalendarDayCellData => ({
        ...day,
        label: day.originalDate ? formatters.dateTime({ date: day.originalDate, format: 'day' }) : day.date,
        isNavigated: !!day.originalDate && day.key === focusTargetKey,
      }),
    );
    const lastDate = week
      .slice()
      .reverse()
      .find(day => day.originalDate)?.originalDate;
    const weekNumber =
      showWeekNumbers && lastDate ? getWeekNumber(lastDate, firstDayOfWeek, firstWeekOfYear) : undefined;
    return { type: 'week', key: weekIndex, days, weekNumber };
  });
  const visibleDays = weeks.flatMap(week => week.days);
  const getDayElementRef = (key: string): React.RefCallback<HTMLTableCellElement> => {
    let callback = dayElementRefs.current.get(key);
    if (!callback) {
      callback = element => {
        if (element) {
          dayElements.set(key, element);
        } else {
          dayElements.delete(key);
        }
      };
      dayElementRefs.current.set(key, callback);
    }
    return callback;
  };
  const getDayCellProps: CalendarDayState['getDayCellProps'] = day => {
    const date = day.originalDate;
    const formattedDate = date ? formatters.dateTime({ date, format: 'monthDayYear' }) : day.date;
    const overrides = getCellProps?.(day);
    const rootProps = {
      role: 'gridcell' as const,
      'aria-current': day.isToday ? ('date' as const) : undefined,
      'aria-disabled': !day.isInBounds,
      'aria-selected': day.isInBounds ? day.isSelected : undefined,
      tabIndex: date && (allFocusable || day.isInBounds) ? 0 : undefined,
      focusgroupstart: day.key === focusTargetKey ? '' : undefined,
      ref: getDayElementRef(day.key),
      'data-day-key': day.key,
      'data-marked': toDataAttributeValue(day.isMarked),
      'data-outside-bounds': toDataAttributeValue(!day.isInBounds),
      'data-outside-month': toDataAttributeValue(!day.isInMonth),
      'data-selected': toDataAttributeValue(day.isSelected),
      'data-today': toDataAttributeValue(day.isToday),
    };
    return {
      root: mergeProps<HTMLTableCellElement, React.ComponentProps<'td'> & { focusgroupstart?: string }>(
        rootProps,
        overrides?.root,
      ),
      button: mergeProps(
        {
          'aria-label': day.isMarked && date ? formatters.dayMarkedLabel({ date, formattedDate }) : formattedDate,
          disabled: !day.isInBounds,
          onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault(),
          tabIndex: -1,
          type: 'button',
        },
        overrides?.button,
      ),
      label: mergeProps({ children: day.label }, overrides?.label),
      marker: day.isMarked ? mergeProps({ 'aria-hidden': true }, overrides?.marker) : undefined,
    };
  };
  const getDayRowProps: CalendarDayState['getDayRowProps'] = row => {
    const overrides = getRowProps?.(row);
    const weekNumber = row.type === 'week' ? row.weekNumber : undefined;
    const weekNumberLabel = weekNumber !== undefined ? formatters.weekNumberLabel({ weekNumber }) : '';
    return {
      root: mergeProps({ role: 'row', focusgrouprow: row.type === 'week' ? '' : undefined }, overrides?.root),
      weekNumber:
        row.type === 'weekday'
          ? showWeekNumbers
            ? mergeProps({ role: 'presentation' }, overrides?.weekNumber)
            : undefined
          : weekNumber !== undefined
          ? mergeProps(
              {
                'aria-label': weekNumberLabel,
                children: <span>{weekNumber}</span>,
                scope: 'row',
                title: weekNumberLabel,
              },
              overrides?.weekNumber,
            )
          : undefined,
    };
  };

  // Weekday labels follow the configured first day of the week.
  const weekdayDates = Array.from({ length: DAYS_IN_WEEK }, (_, index) => new Date(2020, 0, 5 + index));
  const shortDays = weekdayDates.map(date => formatters.dateTime({ date, format: 'shortWeekday' }));
  const dayNames = weekdayDates.map(date => formatters.dateTime({ date, format: 'weekday' }));
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  const firstOfMonthIndex = dayGrid[0].findIndex(day => day.originalDate?.getDate() === 1);
  const firstOfMonthDate = dayGrid[0][firstOfMonthIndex]?.originalDate;
  if (weeksToShow === 1 && firstOfMonthDate) {
    // if we only show one week, replace the header with short month name
    const firstOfMonthIndexOffset = (firstOfMonthIndex + firstDayOfWeekIndex) % DAYS_IN_WEEK;
    shortDays[firstOfMonthIndexOffset] = formatters.dateTime({ date: firstOfMonthDate, format: 'shortMonth' });
    dayNames[firstOfMonthIndexOffset] = formatters.dateTime({ date: firstOfMonthDate, format: 'month' });
  }
  const weekdayRow: CalendarDayState['weekdayRow'] = {
    type: 'weekday',
    cells: shortDays.map((_, index): CalendarDayWeekdayCellData => {
      const i = (index + firstDayOfWeekIndex) % DAYS_IN_WEEK;
      return {
        key: shortDays[i] + ' ' + index,
        dayOfWeek: getDayFromIndex(i),
        label: shortDays[i],
        accessibleLabel: dayNames[i],
      };
    }),
  };
  const resolveWeekdayCellProps: CalendarDayState['getWeekdayCellProps'] = weekday => ({
    root: mergeProps(
      {
        role: 'columnheader',
        'aria-label': weekday.accessibleLabel,
        children: weekday.label,
        scope: 'col',
        title: weekday.accessibleLabel,
      },
      getWeekdayCellProps?.(weekday).root,
    ),
  });

  const getFocusTarget = () => (focusTargetKey ? dayElements.get(focusTargetKey) : undefined);

  React.useImperativeHandle(props.imperativeRef, () => ({
    focus(options?: FocusOptions) {
      const target =
        getFocusTarget() ??
        [nextMonthRef.current, previousMonthRef.current].find(
          button => button && !button.disabled && button.getAttribute('aria-disabled') !== 'true',
        );
      target?.focus(options);
    },
  }));

  const findDay = (cell: HTMLElement) => visibleDays.find(day => dayElements.get(day.key) === cell);

  /**
   * Because we want arbitrary blobs of days to be selectable — to support highlighting every day in
   * the month for month view — a CSS `:hover` rule isn't enough. Mouse callbacks set attributes on
   * every relevant cell instead, so the grid resolves a day to its peers.
   */
  const getDaysInRange = (day: CalendarDayCellData): CalendarDayCellData[] => {
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

  const updateRange = (day: CalendarDayCellData, hovered: boolean | undefined, pressed?: boolean) => {
    const daysInRange = getDaysInRange(day);
    daysInRange.forEach(dayInRange => {
      const element = dayElements.get(dayInRange.key);
      if (!element) {
        return;
      }
      if (hovered !== undefined) {
        element.toggleAttribute(RANGE_HOVERED_ATTRIBUTE, hovered);
      }
      if (pressed !== undefined) {
        element.toggleAttribute(RANGE_PRESSED_ATTRIBUTE, pressed);
      }
    });
  };

  const navigateOutsideVisibleDays = (ev: React.KeyboardEvent<HTMLElement>, date: Date): void => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey) {
      return;
    }

    let targetDate: Date | undefined;
    let direction: 1 | -1 = 1; // by default search forward

    if (ev.key === ArrowUp) {
      direction = -1;
      targetDate = getDirectionalTargetDate(date, -7, direction);
    } else if (ev.key === ArrowDown) {
      targetDate = getDirectionalTargetDate(date, 7, direction);
    } else if (ev.key === ArrowLeft || ev.key === ArrowRight) {
      const isForward = (ev.key === ArrowRight) !== (dir === 'rtl');
      direction = isForward ? 1 : -1;
      targetDate = getDirectionalTargetDate(date, direction, direction);
    } else {
      return;
    }

    if (
      !targetDate ||
      visibleDays.some(day => day.originalDate && compareDatePart(day.originalDate, targetDate!) === 0)
    ) {
      return;
    }

    const nextDate = findAvailableDate({
      initialDate: date,
      targetDate,
      direction,
      ...restrictedDatesOptions,
      restrictedDates: allFocusable ? undefined : restrictedDates,
    });

    if (nextDate) {
      ev.preventDefault();
      onNavigateDate(ev, { event: ev, type: 'keydown', date: nextDate, focusOnNavigatedDay: true });
    }
  };

  const getEventDay = (ev: React.SyntheticEvent<HTMLElement>): [HTMLElement, CalendarDayCellData] | undefined => {
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
      focusgroup: 'grid rowflow',
      'aria-label': monthAndYear,
      'aria-multiselectable': dateRangeType !== 'day' || Math.abs(daysToSelectInDayView ?? 1) > 1,
    },
    elementType: 'table',
  }) as CalendarDayGridSlotProps;
  gridSlot['data-fui-calendar-grid'] = '';
  gridSlot.onKeyDown = mergeCallbacks(gridSlot.onKeyDown, (ev: React.KeyboardEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (!eventDay || ev.isDefaultPrevented()) {
      return;
    }
    const [, day] = eventDay;
    const date = day.originalDate!;
    if (ev.key === PageUp || ev.key === PageDown) {
      if (ev.currentTarget.closest('[data-fui-calendar-root]')) {
        // Calendar pages from the focused day rather than the navigated date.
        setCalendarNavigationDate(ev.nativeEvent, date);
      } else {
        const direction = ev.key === PageUp ? -1 : 1;
        onNavigateDate(ev, {
          event: ev,
          type: 'keydown',
          date: ev.shiftKey ? addYears(date, direction) : addMonths(date, direction),
          focusOnNavigatedDay: true,
        });
        ev.preventDefault();
      }
    } else if ((ev.key === Enter || ev.key === Space) && day.isInBounds) {
      onSelectDay(ev, date);
      ev.preventDefault();
    } else if (ev.key === ArrowLeft || ev.key === ArrowRight || ev.key === ArrowUp || ev.key === ArrowDown) {
      navigateOutsideVisibleDays(ev, date);
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
      ev.preventDefault();
      updateRange(eventDay[1], undefined, true);
    }
  });
  gridSlot.onMouseUp = mergeCallbacks(gridSlot.onMouseUp, (ev: React.MouseEvent<HTMLElement>) => {
    const eventDay = getEventDay(ev);
    if (eventDay) {
      updateRange(eventDay[1], undefined, false);
    }
  });
  const previousMonthSlot = resolveCalendarNavigationButton(
    previousMonthButton,
    prevMonthInBounds,
    allFocusable,
    formatters.previousMonthLabel({
      date: addMonths(navigatedDate, -1),
      formattedDate: formatters.dateTime({ date: addMonths(navigatedDate, -1), format: 'month' }),
    }),
    ev => navigateMonth(ev, -1),
  );
  previousMonthSlot.ref = useMergedRefs(previousMonthSlot.ref, previousMonthRef);
  const nextMonthSlot = resolveCalendarNavigationButton(
    nextMonthButton,
    nextMonthInBounds,
    allFocusable,
    formatters.nextMonthLabel({
      date: addMonths(navigatedDate, 1),
      formattedDate: formatters.dateTime({ date: addMonths(navigatedDate, 1), format: 'month' }),
    }),
    ev => navigateMonth(ev, 1),
  );
  nextMonthSlot.ref = useMergedRefs(nextMonthSlot.ref, nextMonthRef);
  const headingSlot = slot.always(heading, {
    defaultProps: {
      'aria-label': onHeaderSelect
        ? formatters.dayPickerHeaderLabel({ date: navigatedDate, formattedDate: monthAndYear })
        : undefined,
      tabIndex: onHeaderSelect ? 0 : undefined,
      type: onHeaderSelect ? 'button' : undefined,
      children: (
        <span aria-live="polite" aria-atomic="true">
          {monthAndYear}
        </span>
      ),
    },
    elementType: onHeaderSelect ? 'button' : 'div',
  });
  if (onHeaderSelect) {
    headingSlot.onClick = mergeCallbacks(
      headingSlot.onClick as React.MouseEventHandler<HTMLElement> | undefined,
      ev => {
        if (!ev.isDefaultPrevented()) {
          onSelectHeader(ev);
        }
      },
    );
    headingSlot.onKeyDown = mergeCallbacks(
      headingSlot.onKeyDown as React.KeyboardEventHandler<HTMLElement> | undefined,
      ev => {
        if (!ev.isDefaultPrevented()) {
          onCalendarEnterKeyDown(onSelectHeader)(ev);
        }
      },
    );
  }
  const closeButtonSlot = slot.optional(closeButton, {
    defaultProps: {
      'aria-label': formatters.closeLabel(),
      title: formatters.closeLabel(),
      type: 'button',
    },
    elementType: 'button',
  });
  if (closeButtonSlot && onDismiss) {
    closeButtonSlot.onClick = mergeCallbacks(closeButtonSlot.onClick, ev => {
      if (!ev.isDefaultPrevented()) {
        onClose(ev);
      }
    });
    closeButtonSlot.onKeyDown = mergeCallbacks(closeButtonSlot.onKeyDown, ev => {
      if (!ev.isDefaultPrevented()) {
        onCalendarEnterKeyDown(onClose)(ev);
      }
    });
  }

  return {
    weekdayRow,
    weeks,
    getDayCellProps,
    getDayRowProps,
    getWeekdayCellProps: resolveWeekdayCellProps,
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
    root: slot.always(getIntrinsicElementProps('div', { ...props, ref, 'data-fui-calendar-picker': 'day' }), {
      elementType: 'div',
    }),
    header: slot.always(header, { elementType: 'div' }),
    heading: headingSlot,
    navigation: slot.always(navigation, { elementType: 'div' }),
    previousMonthButton: previousMonthSlot,
    nextMonthButton: nextMonthSlot,
    closeButton: closeButtonSlot,
    grid: gridSlot,
    body: slot.always(body, { elementType: 'tbody' }),
  };
};
