'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellSlots, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

/**
 * Class names for calendarMonthGridCell slots.
 */

export const calendarMonthGridCellClassNames: SlotClassNames<CalendarMonthGridCellSlots> = {
  root: 'fui-CalendarMonthGridCell',
};

/**
 * Apply styling to the CalendarMonthGridCell slots based on the state.
 */
export const useCalendarMonthGridCellStyles_unstable = (
  state: CalendarMonthGridCellState,
): CalendarMonthGridCellState => {
  const itemStyles = useCalendarItemStyles();
  const highlightCurrentMonth = useCalendarContext_unstable(ctx => ctx.highlightCurrent);
  const highlightSelectedMonth = useCalendarContext_unstable(ctx => ctx.highlightSelected);

  /* eslint-disable-next-line react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarMonthGridCellClassNames.root,
    itemStyles.itemButton,
    state.isCurrent && highlightCurrentMonth && itemStyles.highlightCurrent,
    state.isSelected && highlightSelectedMonth && itemStyles.highlightSelected,
    !state.isInBounds && itemStyles.disabled,
    state.root.className,
  );

  return state;
};
