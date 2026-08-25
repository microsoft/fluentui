'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarDayGridCellBaseStyles } from '../CalendarDayGridCell/useCalendarDayGridCellStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderRowSlots, CalendarDayGridHeaderRowState } from './CalendarDayGridHeaderRow.types';

/**
 * Class names for calendarDayGridHeaderRow slots.
 */

export const calendarDayGridHeaderRowClassNames: SlotClassNames<CalendarDayGridHeaderRowSlots> = {
  root: 'fui-CalendarDayGridHeaderRow',
  weekNumberSpacerCell: 'fui-CalendarDayGridHeaderRow__weekNumberSpacerCell',
};

/**
 * Apply styling to the CalendarDayGridHeaderRow slots based on the state.
 */
export const useCalendarDayGridHeaderRowStyles_unstable = (
  state: CalendarDayGridHeaderRowState,
): CalendarDayGridHeaderRowState => {
  'use no memo'; // justified: compiler would optimize useCalendarDayGridHeaderRowStyles_unstable — manual opt-out to preserve runtime behavior

  // The spacer cell sits in the same grid column as the week number cells, so it shares day cell metrics.
  const cellBaseStyles = useCalendarDayGridCellBaseStyles();

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(calendarDayGridHeaderRowClassNames.root, state.root.className);

  if (state.weekNumberSpacerCell) {
    state.weekNumberSpacerCell.className = mergeClasses(
      calendarDayGridHeaderRowClassNames.weekNumberSpacerCell,
      cellBaseStyles.base,
      state.weekNumberSpacerCell.className,
    );
  }
  /* eslint-enable react-hooks/immutability */

  return state;
};
