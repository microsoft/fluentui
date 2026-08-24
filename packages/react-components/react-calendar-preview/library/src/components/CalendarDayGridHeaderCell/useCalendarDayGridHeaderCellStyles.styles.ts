'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { useCalendarDayGridCellBaseStyles } from '../CalendarDayGridCell/useCalendarDayGridCellStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellSlots, CalendarDayGridHeaderCellState } from './CalendarDayGridHeaderCell.types';

/**
 * Class names for calendarDayGridHeaderCell slots.
 */

export const calendarDayGridHeaderCellClassNames: SlotClassNames<CalendarDayGridHeaderCellSlots> = {
  root: 'fui-CalendarDayGridHeaderCell',
};

const useRootStyles = makeStyles({
  base: {
    userSelect: 'none',
  },
});

/**
 * Apply styling to the CalendarDayGridHeaderCell slots based on the state.
 */
export const useCalendarDayGridHeaderCellStyles_unstable = (
  state: CalendarDayGridHeaderCellState,
): CalendarDayGridHeaderCellState => {
  'use no memo'; // justified: compiler would optimize useCalendarDayGridHeaderCellStyles_unstable — manual opt-out to preserve runtime behavior

  // The header cells sit in the same grid columns as the day cells, so they share their metrics.
  const cellBaseStyles = useCalendarDayGridCellBaseStyles();
  const rootStyles = useRootStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    calendarDayGridHeaderCellClassNames.root,
    cellBaseStyles.base,
    rootStyles.base,
    state.root.className,
  );

  return state;
};
