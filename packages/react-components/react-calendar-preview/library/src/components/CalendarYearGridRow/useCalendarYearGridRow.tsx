'use client';

import * as React from 'react';
import { motionSlot } from '@fluentui/react-motion';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCalendarYearContext_unstable } from '../../contexts/calendarYearContext';
import { CalendarYearGridCell } from '../CalendarYearGridCell';
import type { CalendarYearGridRowProps, CalendarYearGridRowState } from './CalendarYearGridRow.types';
import { DirectionalSlideIn } from '../../utils/calendarMotions';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';

/**
 * Create the state required to render CalendarYearGridRow.
 */
export const useCalendarYearGridRowBase_unstable = (
  props: CalendarYearGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarYearGridRowState => {
  const yearRows = useCalendarYearContext_unstable(ctx => ctx.yearRows);

  return {
    cells: yearRows[props.rowIndex] ?? [],
    components: {
      root: 'div',
      motion: React.Fragment,
    },
    root: slot.always(getIntrinsicElementProps('div', { ref, role: 'row', ...props }, ['rowIndex']), {
      elementType: 'div',
    }),
  };
};

/**
 * Create the state required to render CalendarYearGridRow.
 */
export const useCalendarYearGridRow_unstable = (
  props: CalendarYearGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarYearGridRowState => {
  const state = useCalendarYearGridRowBase_unstable(props, ref);
  const fromYear = useCalendarYearContext_unstable(ctx => ctx.fromYear);
  const animateBackwards = useAnimateBackwards(fromYear);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      motion: DirectionalSlideIn,
    },
    root: slot.always(getIntrinsicElementProps('div', { ref, role: 'row', ...props }, ['rowIndex']), {
      defaultProps: {
        children: state.cells.map(cell => <CalendarYearGridCell key={cell.year} cell={cell} />),
      },
      elementType: 'div',
    }),
    motion: motionSlot(props.motion, {
      defaultProps: {
        animationDirection: 'vertical',
        animateBackwards,
        replayKey: fromYear,
      },
      elementType: DirectionalSlideIn,
    }),
  };
};
