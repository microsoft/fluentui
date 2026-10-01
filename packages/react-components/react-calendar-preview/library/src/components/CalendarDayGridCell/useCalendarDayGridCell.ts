'use client';

import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, Space } from '@fluentui/keyboard-keys';
import {
  getIntrinsicElementProps,
  getRTLSafeKey,
  mergeCallbacks,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { compareDatePart, findAvailableDate, stringifyDataAttribute } from '../../utils';
import { createDate } from '../../utils/dateMath';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarDayContext_unstable } from '../../contexts/calendarDayContext';
import type { AvailableDateOptions } from '../../utils';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import type { DayCorners } from '../../hooks/useWeekCorners';
import type { DayInfo } from '../../hooks/useWeeks';
import type { CalendarDayGridCellProps, CalendarDayGridCellState } from './CalendarDayGridCell.types';

const NO_CORNERS: DayCorners = { topLeft: false, topRight: false, bottomLeft: false, bottomRight: false };

/**
 * Applied imperatively to every cell in the hovered or pressed range, because an arbitrary blob of
 * days cannot be expressed with a `:hover` rule.
 */
const RANGE_HOVERED_ATTRIBUTE = 'data-range-hovered';
const RANGE_PRESSED_ATTRIBUTE = 'data-range-pressed';

const applyCorners = (element: HTMLElement, corners: DayCorners): void => {
  element.toggleAttribute('data-corner-top-left', corners.topLeft);
  element.toggleAttribute('data-corner-top-right', corners.topRight);
  element.toggleAttribute('data-corner-bottom-left', corners.bottomLeft);
  element.toggleAttribute('data-corner-bottom-right', corners.bottomRight);
};

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
 * Create the state required to render CalendarDayGridCell.
 */
export const useCalendarDayGridCell_unstable = (
  props: CalendarDayGridCellProps,
  ref: React.Ref<HTMLTableCellElement>,
): CalendarDayGridCellState => {
  const { ariaHidden, day, dayIndex, weekIndex, ...rest } = props;

  const activeDescendantId = useCalendarDayContext_unstable(ctx => ctx.activeDescendantId);
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const calculateRoundedCorners = useCalendarDayContext_unstable(ctx => ctx.calculateRoundedCorners);
  const dateRangeType = useCalendarContext_unstable(ctx => ctx.dateRangeType);
  const daysToSelectInDayView = useCalendarDayContext_unstable(ctx => ctx.daysToSelectInDayView);
  const focusTargetDate = useCalendarDayContext_unstable(ctx => ctx.focusTargetDate);
  const getDayCellProps = useCalendarDayContext_unstable(ctx => ctx.getDayCellProps);
  const formatters = useCalendarContext_unstable(ctx => ctx.formatters);
  const getDayInfosInRangeOfDay = useCalendarDayContext_unstable(ctx => ctx.getDayInfosInRangeOfDay);
  const getRefsFromDayInfos = useCalendarDayContext_unstable(ctx => ctx.getRefsFromDayInfos);
  const lightenDaysOutsideNavigatedMonth = useCalendarDayContext_unstable(ctx => ctx.lightenDaysOutsideNavigatedMonth);
  const maxDate = useCalendarContext_unstable(ctx => ctx.maxDate);
  const minDate = useCalendarContext_unstable(ctx => ctx.minDate);
  const navigatedDayRef = useCalendarDayContext_unstable(ctx => ctx.navigatedDayRef);
  const onNavigateDate = useCalendarDayContext_unstable(ctx => ctx.onNavigateDate);
  const restrictedDates = useCalendarContext_unstable(ctx => ctx.restrictedDates);
  const weekCorners = useCalendarDayContext_unstable(ctx => ctx.weekCorners);
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);
  const originalDate = day.originalDate;
  const cellProps = { ...(!ariaHidden && originalDate ? getDayCellProps?.(originalDate) : undefined), ...rest };

  const corners = weekCorners?.[weekIndex + '_' + dayIndex];
  const isFocusTargetDate =
    focusTargetDate && originalDate ? compareDatePart(focusTargetDate, originalDate) === 0 : false;

  const { dir } = useFluent_unstable();

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

    const findDayInCurrentView = (dateToFind: Date): DayInfo | undefined =>
      weeks
        ?.slice(1, weeks.length - 1)
        .flat()
        .find(dayToCompare => {
          const dayDate = dayToCompare.originalDate;
          return dayDate !== null && compareDatePart(dayDate, dateToFind) === 0;
        });
    const focusDay = (dayToFocus: DayInfo): boolean => {
      const dayRef = getRefsFromDayInfos([dayToFocus])[0];
      if (!dayRef) {
        return false;
      }

      dayRef.focus();
      ev.preventDefault();
      return true;
    };

    const directTargetDay = findDayInCurrentView(targetDate);
    if (allFocusable && directTargetDay && focusDay(directTargetDay)) {
      return;
    }

    const findAvailableDateOptions: AvailableDateOptions = {
      initialDate: date,
      targetDate,
      direction,
      restrictedDates,
      minDate,
      maxDate,
    };

    /*
     * target date is restricted, search in whatever direction until finding the next possible date,
     * stopping at boundaries
     */
    let nextDate = findAvailableDate(findAvailableDateOptions);

    if (!nextDate) {
      // if no dates available in initial direction, try going backwards
      findAvailableDateOptions.direction = direction === 1 ? -1 : 1;
      nextDate = findAvailableDate(findAvailableDateOptions);
    }

    /*
     * If the next date is still inside the current view, focus it without navigating the displayed month.
     */
    const nextDay = nextDate ? findDayInCurrentView(nextDate) : undefined;
    if (nextDay && focusDay(nextDay)) {
      return;
    }

    // else, fire navigation on the date to change the view to show it
    if (nextDate) {
      onNavigateDate(ev, { event: ev, type: 'keydown', date: nextDate, focusOnNavigatedDay: true });
      ev.preventDefault();
    }
  };

  const onMouseOverDay = () => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null, index: number) => {
      if (dayRef) {
        dayRef.toggleAttribute(RANGE_HOVERED_ATTRIBUTE, true);
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === 'day' &&
          daysToSelectInDayView &&
          Math.abs(daysToSelectInDayView) > 1
        ) {
          applyCorners(dayRef, calculateRoundedCorners(false, false, index > 0, index < dayRefs.length - 1));
        }
      }
    });
  };

  const onMouseDownDay = () => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null) => {
      if (dayRef) {
        dayRef.toggleAttribute(RANGE_PRESSED_ATTRIBUTE, true);
      }
    });
  };

  const onMouseUpDay = () => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null) => {
      if (dayRef) {
        dayRef.toggleAttribute(RANGE_PRESSED_ATTRIBUTE, false);
      }
    });
  };

  const onMouseOutDay = () => {
    const dayInfos = getDayInfosInRangeOfDay(day);
    const dayRefs = getRefsFromDayInfos(dayInfos);

    dayRefs.forEach((dayRef: HTMLElement | null, index: number) => {
      if (dayRef) {
        dayRef.toggleAttribute(RANGE_HOVERED_ATTRIBUTE, false);
        dayRef.toggleAttribute(RANGE_PRESSED_ATTRIBUTE, false);
        if (
          !dayInfos[index].isSelected &&
          dateRangeType === 'day' &&
          daysToSelectInDayView &&
          Math.abs(daysToSelectInDayView) > 1
        ) {
          applyCorners(dayRef, NO_CORNERS);
        }
      }
    });
  };

  const onDayKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (!originalDate) {
      return;
    }

    if ((ev.key === Enter || ev.key === Space) && day.isInBounds) {
      ev.preventDefault();
      /*
       * `day.onSelected` is the grid's own handler, so keyboard activation resolves the same date range and
       * navigation as a click does.
       */
      day.onSelected(ev);
    } else {
      navigateMonthEdge(ev, originalDate);
    }
  };

  const formattedDate = originalDate ? formatters.dateTime({ date: originalDate, format: 'dayMonthYear' }) : day.date;
  let ariaLabel = formattedDate;

  if (day.isMarked && originalDate) {
    ariaLabel = formatters.dayMarkedLabel({ date: originalDate, formattedDate });
  }

  const isFocusable = !ariaHidden && !!originalDate && (allFocusable || (day.isInBounds ? true : undefined));

  const setCellRef = (element: HTMLTableCellElement) => {
    day.setRef(element);
    if (isFocusTargetDate) {
      navigatedDayRef.current = element;
    }
  };

  /*
   * The grid publishes `navigatedDayRef` so it can focus the navigated cell; assigning it from this
   * ref callback runs at commit, not during render.
   */
  const cellRef = useMergedRefs(setCellRef, cellProps.ref, ref);
  const root = slot.always<ExtractSlotProps<Slot<'td'>>>(
    getIntrinsicElementProps('td', {
      ...cellProps,
      ref: cellRef,
      onClick: (ev: React.MouseEvent<HTMLTableCellElement>) => {
        if (!ariaHidden) {
          ev.currentTarget.focus();
        }
        cellProps.onClick?.(ev);
        if (!ev.isDefaultPrevented() && day.isInBounds && !ariaHidden) {
          day.onSelected(ev);
        }
      },
      onKeyDown: (ev: React.KeyboardEvent<HTMLTableCellElement>) => {
        cellProps.onKeyDown?.(ev);
        if (!ev.isDefaultPrevented() && !ariaHidden) {
          onDayKeyDown(ev);
        }
      },
      onMouseDown: !ariaHidden ? mergeCallbacks(cellProps.onMouseDown, onMouseDownDay) : undefined,
      onMouseOut: !ariaHidden ? mergeCallbacks(cellProps.onMouseOut, onMouseOutDay) : undefined,
      onMouseOver: !ariaHidden ? mergeCallbacks(cellProps.onMouseOver, onMouseOverDay) : undefined,
      onMouseUp: !ariaHidden ? mergeCallbacks(cellProps.onMouseUp, onMouseUpDay) : undefined,
    }),
    {
      defaultProps: {
        'aria-current': day.isToday ? 'date' : undefined,
        'aria-disabled': !ariaHidden && !day.isInBounds,
        'aria-selected': day.isInBounds ? day.isSelected : undefined,
        role: 'gridcell',
        tabIndex: isFocusable ? 0 : undefined,
      },
      elementType: 'td',
    },
  );

  Object.assign(root, {
    'data-marked': stringifyDataAttribute(day.isMarked),
    'data-outside-bounds': stringifyDataAttribute(!day.isInBounds),
    'data-outside-month': stringifyDataAttribute(!day.isInMonth),
    'data-selected': stringifyDataAttribute(day.isSelected),
    'data-today': stringifyDataAttribute(day.isToday),
    'data-corner-top-left': stringifyDataAttribute(!!corners?.topLeft),
    'data-corner-top-right': stringifyDataAttribute(!!corners?.topRight),
    'data-corner-bottom-left': stringifyDataAttribute(!!corners?.bottomLeft),
    'data-corner-bottom-right': stringifyDataAttribute(!!corners?.bottomRight),
  } satisfies Record<string, '' | undefined>);

  return {
    day,
    lightenDaysOutsideNavigatedMonth,
    components: {
      root: 'td',
      button: 'button',
      dayLabel: 'span',
      marker: 'div',
    },
    root,
    button: slot.always(cellProps.button, {
      defaultProps: {
        'aria-label': ariaLabel,
        disabled: !ariaHidden && !day.isInBounds,
        id: isFocusTargetDate ? activeDescendantId : undefined,
        tabIndex: -1,
        type: 'button',
      },
      elementType: 'button',
    }),
    dayLabel: slot.always(cellProps.dayLabel, {
      defaultProps: {
        children: originalDate ? formatters.dateTime({ date: originalDate, format: 'day' }) : day.date,
      },
      elementType: 'span',
    }),
    marker: slot.optional(cellProps.marker, {
      defaultProps: { 'aria-hidden': true },
      renderByDefault: day.isMarked,
      elementType: 'div',
    }),
  };
};
