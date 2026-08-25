'use client';

import * as React from 'react';
import { motionSlot } from '@fluentui/react-motion';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCalendarMonthContext_unstable } from '../../contexts/calendarMonthContext';
import { CalendarMonthGridCell } from '../CalendarMonthGridCell';
import { DirectionalSlideIn } from '../../utils/calendarMotions';
import { useAnimateBackwards } from '../../hooks/useAnimateBackwards';
import type { CalendarMonthGridRowProps, CalendarMonthGridRowState } from './CalendarMonthGridRow.types';

/**
 * Create the base state required to render an unstyled CalendarMonthGridRow.
 */
export const useCalendarMonthGridRowBase_unstable = (
  props: CalendarMonthGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarMonthGridRowState => {
  const { rowIndex } = props;
  const monthRows = useCalendarMonthContext_unstable(ctx => ctx.monthRows);

  return {
    cells: monthRows[rowIndex],
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
 * Create the state required to render CalendarMonthGridRow.
 */
export const useCalendarMonthGridRow_unstable = (
  props: CalendarMonthGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarMonthGridRowState => {
  const state = useCalendarMonthGridRowBase_unstable(props, ref);
  const navigatedYear = useCalendarMonthContext_unstable(ctx => ctx.navigatedYear);
  const animateBackwards = useAnimateBackwards(navigatedYear);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      motion: DirectionalSlideIn,
    },
    root: slot.always(state.root, {
      defaultProps: {
        children: state.cells.map(month => <CalendarMonthGridCell key={month.index} month={month} />),
      },
      elementType: 'div',
    }),
    motion: motionSlot(props.motion, {
      elementType: DirectionalSlideIn,
      defaultProps: {
        animationDirection: 'vertical',
        animateBackwards,
        replayKey: navigatedYear,
      },
    }),
  };
};
