'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { motionSlot } from '@fluentui/react-motion';
import { getWeekNumbersInMonth } from '../../utils';
import { DirectionalSlideIn, DirectionalSlideOut } from '../../utils/calendarMotions';
import { CalendarDayGridCell } from '../CalendarDayGridCell/CalendarDayGridCell';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import { useCalendarDayContext_unstable } from '../../contexts/calendarDayContext';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';
import type { DayInfo } from '../../hooks/useWeeks';
import type {
  CalendarDayGridRowBaseProps,
  CalendarDayGridRowProps,
  CalendarDayGridRowState,
} from './CalendarDayGridRow.types';

/**
 * Create the base state required to render an unstyled CalendarDayGridRow.
 */
export const useCalendarDayGridRowBase_unstable = (
  props: CalendarDayGridRowBaseProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridRowState => {
  const { transition, weekIndex } = props;
  const firstDayOfWeek = useCalendarContext_unstable(ctx => ctx.firstDayOfWeek);
  const firstWeekOfYear = useCalendarContext_unstable(ctx => ctx.firstWeekOfYear);
  const formatLabel = useCalendarContext_unstable(ctx => ctx.formatLabel);
  const showWeekNumbers = useCalendarContext_unstable(ctx => ctx.showWeekNumbers);
  const navigatedDate = useCalendarDayContext_unstable(ctx => ctx.navigatedDate);
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);

  const weekNumbers = showWeekNumbers
    ? getWeekNumbersInMonth(weeks.length, firstDayOfWeek, firstWeekOfYear, navigatedDate)
    : null;

  const titleString = weekNumbers ? formatLabel('weekNumber', { weekNumber: weekNumbers[weekIndex] }) : '';

  return {
    transition,
    components: {
      root: 'tr',
      weekNumberCell: 'th',
      motion: React.Fragment,
    },
    root: slot.always(
      getIntrinsicElementProps('tr', {
        ref,
        'aria-hidden': transition ? true : undefined,
        role: transition ? 'presentation' : undefined,
        ...props,
      }),
      { elementType: 'tr' },
    ),
    weekNumberCell: slot.optional(weekNumbers ? props.weekNumberCell ?? {} : undefined, {
      defaultProps: {
        'aria-label': titleString,
        children: <span>{weekNumbers?.[weekIndex]}</span>,
        scope: 'row',
        title: titleString,
      },
      elementType: 'th',
    }),
  };
};

/**
 * Create the state required to render CalendarDayGridRow.
 */
export const useCalendarDayGridRow_unstable = (
  props: CalendarDayGridRowProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridRowState => {
  const weeks = useCalendarDayContext_unstable(ctx => ctx.weeks);
  const state = useCalendarDayGridRowBase_unstable(props, ref);
  const animateBackwards = useAnimateBackwards(weeks[0][0].originalDate);

  // The filler rows slide out towards the edge they sit on; the visible weeks slide in.
  const motionElementType = props.transition ? DirectionalSlideOut : DirectionalSlideIn;

  /*
   * Single navigation epoch for all rows in the grid. Derived from the first visible day's key
   * (`Date.toString()`), which changes when the user navigates to a different range but stays
   * stable across intra-range interactions (e.g. day selection).
   */
  const replayKey = weeks[0][0].key;

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      motion: motionElementType,
    },
    root: slot.always(state.root, {
      defaultProps: {
        children: props.week.map((day: DayInfo, dayIndex: number) => (
          <CalendarDayGridCell
            key={day.key}
            day={day}
            dayIndex={dayIndex}
            weekIndex={props.weekIndex}
            ariaHidden={!!props.transition}
          />
        )),
      },
      elementType: 'tr',
    }),
    motion: motionSlot(props.motion, {
      elementType: motionElementType,
      defaultProps: {
        animationDirection: 'vertical',
        animateBackwards,
        replayKey,
        edge: props.transition,
      },
    }),
  };
};
