'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import { useCalendarPickerStyles } from '../../hooks/useCalendarPickerStyles.styles';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarYearSlots, CalendarYearState } from './CalendarYear.types';

export const calendarYearClassNames: SlotClassNames<CalendarYearSlots> = {
  root: 'fui-CalendarYear',
  header: 'fui-CalendarYear__header',
  heading: 'fui-CalendarYear__heading',
  navigation: 'fui-CalendarYear__navigation',
  previousRangeButton: 'fui-CalendarYear__previousRangeButton',
  nextRangeButton: 'fui-CalendarYear__nextRangeButton',
  grid: 'fui-CalendarYear__grid',
};

/**
 * Class names of the rows and cells rendered inside the year grid.
 */
export const calendarYearGridClassNames = {
  row: 'fui-CalendarYearGridRow',
  cell: 'fui-CalendarYearGridCell',
} as const;

/**
 * Apply styling to the CalendarYear slots based on the state.
 */
export const useCalendarYearStyles_unstable = (state: CalendarYearState): CalendarYearState => {
  const pickerStyles = useCalendarPickerStyles();
  const itemStyles = useCalendarItemStyles();
  const highlightCurrent = useCalendarContext_unstable(ctx => ctx.highlightCurrent);
  const highlightSelected = useCalendarContext_unstable(ctx => ctx.highlightSelected);

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarYearClassNames.root,
    pickerStyles.normalize,
    pickerStyles.root,
    state.root.className,
  );

  state.header.className = mergeClasses(calendarYearClassNames.header, pickerStyles.header, state.header.className);

  state.navigation.className = mergeClasses(
    calendarYearClassNames.navigation,
    pickerStyles.navigation,
    state.navigation.className,
  );

  state.grid.className = mergeClasses(calendarYearClassNames.grid, pickerStyles.grid, state.grid.className);

  state.heading.className = mergeClasses(
    calendarYearClassNames.heading,
    pickerStyles.heading,
    state.hasHeaderClickCallback && pickerStyles.hasHeaderClickCallback,
    state.heading.className,
  );

  state.previousRangeButton.className = mergeClasses(
    calendarYearClassNames.previousRangeButton,
    pickerStyles.navigationButton,
    state.prevDisabled && itemStyles.disabled,
    state.previousRangeButton.className,
  );

  state.nextRangeButton.className = mergeClasses(
    calendarYearClassNames.nextRangeButton,
    pickerStyles.navigationButton,
    state.nextDisabled && itemStyles.disabled,
    state.nextRangeButton.className,
  );

  for (const row of state.yearRows) {
    row.props.className = mergeClasses(calendarYearGridClassNames.row, itemStyles.buttonRow);
    for (const cell of row.cells) {
      cell.props.className = mergeClasses(
        calendarYearGridClassNames.cell,
        itemStyles.itemButton,
        cell.isCurrent && highlightCurrent && itemStyles.highlightCurrent,
        cell.isSelected && highlightSelected && itemStyles.highlightSelected,
        cell.isDisabled && itemStyles.disabled,
      );
    }
  }
  /* eslint-enable react-hooks/immutability */
  return state;
};
