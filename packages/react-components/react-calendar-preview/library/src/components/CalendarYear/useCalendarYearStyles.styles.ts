'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import { useCalendarPickerStyles } from '../../hooks/useCalendarPickerStyles.styles';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarYearSlots, CalendarYearState } from './CalendarYear.types';

/**
 * The motion slot carries no class names of its own; the per-year class names belong to
 * CalendarYearGridRow and CalendarYearGridCell, each of which owns its own styles hook.
 */
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
 * Apply styling to the CalendarYear slots based on the state.
 */
export const useCalendarYearStyles_unstable = (state: CalendarYearState): CalendarYearState => {
  'use no memo'; // justified: compiler would optimize useCalendarYearStyles_unstable — manual opt-out to preserve runtime behavior

  const pickerStyles = useCalendarPickerStyles();
  const itemStyles = useCalendarItemStyles();
  const highlightCurrentYear = useCalendarContext_unstable(ctx => ctx.highlightCurrent);

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

  // A non-clickable title is plain text rather than a button, so it uses the `current` treatment.
  state.heading.className = mergeClasses(
    calendarYearClassNames.heading,
    state.hasHeaderClickCallback
      ? mergeClasses(pickerStyles.heading, pickerStyles.hasHeaderClickCallback)
      : highlightCurrentYear && itemStyles.highlightCurrent,
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
  /* eslint-enable react-hooks/immutability */

  return state;
};
