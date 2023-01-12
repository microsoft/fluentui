import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { CalendarGridProps, CalendarGridState } from './CalendarGrid.types';

/**
 * Create the state required to render CalendarGrid.
 *
 * The returned state can be modified with hooks such as useCalendarGridStyles_unstable,
 * before being passed to renderCalendarGrid_unstable.
 *
 * @param props - props from this instance of CalendarGrid
 * @param ref - reference to root HTMLElement of CalendarGrid
 */
export const useCalendarGrid_unstable = (props: CalendarGridProps, ref: React.Ref<HTMLElement>): CalendarGridState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
