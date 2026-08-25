'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarYearGridCellSlots, CalendarYearGridCellState } from './CalendarYearGridCell.types';

/**
 * Class names for calendarYearGridCell slots.
 */

export const calendarYearGridCellClassNames: SlotClassNames<CalendarYearGridCellSlots> = {
  root: 'fui-CalendarYearGridCell',
};

/**
 * Apply styling to the CalendarYearGridCell slots based on the state.
 */
export const useCalendarYearGridCellStyles_unstable = (state: CalendarYearGridCellState): CalendarYearGridCellState => {
  const itemStyles = useCalendarItemStyles();
  const highlightSelectedYear = useCalendarContext_unstable(ctx => ctx.highlightSelected);

  /* eslint-disable-next-line react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarYearGridCellClassNames.root,
    itemStyles.itemButton,
    state.isSelected && highlightSelectedYear && itemStyles.highlightSelected,
    state.isDisabled && itemStyles.disabled,
    state.root.className,
  );

  return state;
};
