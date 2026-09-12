'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { motionSlot, motionTokens } from '@fluentui/react-motion';
import { Fade } from '@fluentui/react-motion-components-preview';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { FadeParams } from '@fluentui/react-motion-components-preview';
import type {
  CalendarDayGridHeaderCellBaseProps,
  CalendarDayGridHeaderCellBaseState,
  CalendarDayGridHeaderCellProps,
  CalendarDayGridHeaderCellState,
} from './CalendarDayGridHeaderCell.types';

/**
 * Create the base state required to render an unstyled CalendarDayGridHeaderCell.
 */
export const useCalendarDayGridHeaderCellBase_unstable = (
  props: CalendarDayGridHeaderCellBaseProps,
  ref: React.Ref<HTMLTableCellElement>,
): CalendarDayGridHeaderCellBaseState => {
  const { dayLabel } = props;
  const allFocusable = useCalendarContext_unstable(ctx => ctx.allFocusable);

  return {
    components: {
      root: 'th',
    },
    root: slot.always(
      getIntrinsicElementProps('th', {
        'aria-label': dayLabel.label,
        children: dayLabel.content,
        scope: 'col',
        tabIndex: allFocusable ? 0 : undefined,
        title: dayLabel.label,
        ...props,
        ref,
      }),
      { elementType: 'th' },
    ),
  };
};

/**
 * Create the state required to render CalendarDayGridHeaderCell.
 */
export const useCalendarDayGridHeaderCell_unstable = (
  props: CalendarDayGridHeaderCellProps,
  ref: React.Ref<HTMLTableCellElement>,
): CalendarDayGridHeaderCellState => {
  const state = useCalendarDayGridHeaderCellBase_unstable(props, ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      labelMotion: Fade.In,
    },
    labelMotion: motionSlot<FadeParams>(props.labelMotion, {
      elementType: Fade.In,
      defaultProps: { duration: motionTokens.durationGentle },
    }),
  };
};
