'use client';

import type * as React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter } from '@fluentui/keyboard-keys';
import { getIntrinsicElementProps, getRTLSafeKey, slot } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { addDays, addWeeks, compareDates, findAvailableDate, stringifyDataAttribute } from '../../utils';
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

/**
 * Create the state required to render CalendarDayGridCell.
 */
export const useCalendarDayGridCell_unstable = (props: CalendarDayGridCellProps): CalendarDayGridCellState => {
  'use no memo'; // justified: compiler would optimize unknown function — manual opt-out to preserve runtime behavior

  const { ariaHidden, day, dayIndex, weekIndex, ...rest } = props;

  const activeDescendantId = useCalendarDayContext_unstable(ctx => ctx.activeDescendantId);
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);
  const calculateRoundedCorners = useCalendarDayContext_unstable(ctx => ctx.calculateRoundedCorners);
  const dateRangeType = useCalendarContext_unstable(ctx => ctx.dateRangeType);
  const daysToSelectInDayView = useCalendarDayContext_unstable(ctx => ctx.daysToSelectInDayView);
  const formatDateTime = useCalendarContext_unstable(ctx => ctx.formatDateTime);
  const formatLabel = useCalendarContext_unstable(ctx => ctx.formatLabel);
  const getDayInfosInRangeOfDay = useCalendarDayContext_unstable(ctx => ctx.getDayInfosInRangeOfDay);
  const getRefsFromDayInfos = useCalendarDayContext_unstable(ctx => ctx.getRefsFromDayInfos);
  const lightenDaysOutsideNavigatedMonth = useCalendarDayContext_unstable(ctx => ctx.lightenDaysOutsideNavigatedMonth);
  const maxDate = useCalendarContext_unstable(ctx => ctx.maxDate);
  const minDate = useCalendarContext_unstable(ctx => ctx.minDate);
  const navigatedDate = useCalendarDayContext_unstable(ctx => ctx.navigatedDate);
  const navigatedDayRef = useCalendarDayContext_unstable(ctx => ctx.navigatedDayRef);
  const onNavigateDate = useCalendarDayContext_unstable(ctx => ctx.onNavigateDate);
  const restrictedDates = useCalendarContext_unstable(ctx => ctx.restrictedDates);
  const weekCorners = useCalendarDayContext_unstable(ctx => ctx.weekCorners);
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);

  const corners = weekCorners?.[weekIndex + '_' + dayIndex];
  const isNavigatedDate = compareDates(navigatedDate, day.originalDate);

  const { dir } = useFluent_unstable();

  const navigateMonthEdge = (ev: React.KeyboardEvent<HTMLElement>, date: Date): void => {
    let targetDate: Date | undefined = undefined;
    let direction = 1; // by default search forward

    if (ev.key === ArrowUp) {
      targetDate = addWeeks(date, -1);
      direction = -1;
    } else if (ev.key === ArrowDown) {
      targetDate = addWeeks(date, 1);
    } else if (ev.key === getRTLSafeKey(ArrowLeft, dir)) {
      targetDate = addDays(date, -1);
      direction = -1;
    } else if (ev.key === getRTLSafeKey(ArrowRight, dir)) {
      targetDate = addDays(date, 1);
    }

    if (!targetDate) {
      // if we couldn't find a target date at all, do nothing
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
      findAvailableDateOptions.direction = -direction;
      nextDate = findAvailableDate(findAvailableDateOptions);
    }

    /*
     * if the nextDate is still inside the same focusZone area, let the focusZone handle setting the focus so we
     * don't jump the view unnecessarily
     */
    const isInCurrentView =
      weeks &&
      nextDate &&
      weeks.slice(1, weeks.length - 1).some((week: DayInfo[]) => {
        return week.some((dayToCompare: DayInfo) => {
          return compareDates(dayToCompare.originalDate, nextDate!);
        });
      });
    if (isInCurrentView) {
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
          daysToSelectInDayView > 1
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
          daysToSelectInDayView > 1
        ) {
          applyCorners(dayRef, NO_CORNERS);
        }
      }
    });
  };

  const onDayKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.key === Enter) {
      /*
       * `day.onSelected` is the grid's own handler, so Enter resolves the same date range and
       * navigation as a click does.
       */
      day.onSelected(ev);
    } else {
      navigateMonthEdge(ev, day.originalDate);
    }
  };

  const formattedDate = formatDateTime(day.originalDate, 'dayMonthYear');
  let ariaLabel = formattedDate;

  if (day.isMarked) {
    ariaLabel = formatLabel('dayMarked', { date: day.originalDate, formattedDate });
  }

  const isFocusable = !ariaHidden && (allFocusable || (day.isInBounds ? true : undefined));

  const setCellRef = (element: HTMLTableCellElement) => {
    day.setRef(element);
    if (isNavigatedDate) {
      navigatedDayRef.current = element;
    }
  };

  /*
   * The grid publishes `navigatedDayRef` so it can focus the navigated cell; assigning it from this
   * ref callback runs at commit, not during render.
   */
  // eslint-disable-next-line react-hooks/refs
  const root = slot.always<ExtractSlotProps<Slot<'td'>>>(getIntrinsicElementProps('td', rest), {
    defaultProps: {
      ref: setCellRef,
      'aria-current': day.isToday ? 'date' : undefined,
      'aria-disabled': !ariaHidden && !day.isInBounds,
      'aria-selected': day.isInBounds ? day.isSelected : undefined,
      onClick: day.isInBounds && !ariaHidden ? day.onSelected : undefined,
      onKeyDown: !ariaHidden ? onDayKeyDown : undefined,
      onMouseDown: !ariaHidden ? onMouseDownDay : undefined,
      onMouseOut: !ariaHidden ? onMouseOutDay : undefined,
      onMouseOver: !ariaHidden ? onMouseOverDay : undefined,
      onMouseUp: !ariaHidden ? onMouseUpDay : undefined,
      role: 'gridcell',
      tabIndex: isNavigatedDate || isFocusable ? 0 : undefined,
    },
    elementType: 'td',
  });

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
    button: slot.always(props.button, {
      defaultProps: {
        'aria-label': ariaLabel,
        disabled: !ariaHidden && !day.isInBounds,
        id: isNavigatedDate ? activeDescendantId : undefined,
        tabIndex: -1,
        type: 'button',
      },
      elementType: 'button',
    }),
    dayLabel: slot.always(props.dayLabel, {
      defaultProps: { children: formatDateTime(day.originalDate, 'day') },
      elementType: 'span',
    }),
    marker: slot.optional(props.marker, {
      defaultProps: { 'aria-hidden': true },
      renderByDefault: day.isMarked,
      elementType: 'div',
    }),
  };
};
