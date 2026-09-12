'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { useCalendarDayGridCellBaseStyles } from '../CalendarDayGridCell/useCalendarDayGridCellStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  CalendarDayGridHeaderCellBaseSlots,
  CalendarDayGridHeaderCellState,
} from './CalendarDayGridHeaderCell.types';

/**
 * Class names for calendarDayGridHeaderCell slots.
 */
export const calendarDayGridHeaderCellClassNames: SlotClassNames<CalendarDayGridHeaderCellBaseSlots> = {
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
