'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import { useCalendarPickerStyles } from '../../hooks/useCalendarPickerStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarMonthSlots, CalendarMonthState } from './CalendarMonth.types';

/**
 * The `yearPicker` slot uses CalendarYear's class names and removes its duplicate embedded chrome.
 */
export const calendarMonthClassNames: SlotClassNames<Omit<CalendarMonthSlots, 'yearPicker'>> = {
  root: 'fui-CalendarMonth',
  header: 'fui-CalendarMonth__header',
  heading: 'fui-CalendarMonth__heading',
  navigation: 'fui-CalendarMonth__navigation',
  previousYearButton: 'fui-CalendarMonth__previousYearButton',
  nextYearButton: 'fui-CalendarMonth__nextYearButton',
  grid: 'fui-CalendarMonth__grid',
};

const useStyles = makeStyles({
  embeddedYearPicker: {
    overflow: 'visible',
    padding: '0',
    width: 'auto',
  },
});

/**
 * Apply styling to the CalendarMonth slots based on the state.
 */
export const useCalendarMonthStyles_unstable = (state: CalendarMonthState): CalendarMonthState => {
  const pickerStyles = useCalendarPickerStyles();
  const itemStyles = useCalendarItemStyles();
  const styles = useStyles();

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    calendarMonthClassNames.root,
    pickerStyles.normalize,
    pickerStyles.root,
    state.root.className,
  );

  state.yearPicker.className = mergeClasses(styles.embeddedYearPicker, state.yearPicker.className);

  state.header.className = mergeClasses(calendarMonthClassNames.header, pickerStyles.header, state.header.className);

  state.heading.className = mergeClasses(
    calendarMonthClassNames.heading,
    pickerStyles.heading,
    state.headerIsClickable && pickerStyles.hasHeaderClickCallback,
    state.heading.className,
  );

  state.navigation.className = mergeClasses(
    calendarMonthClassNames.navigation,
    pickerStyles.navigation,
    state.navigation.className,
  );

  state.grid.className = mergeClasses(calendarMonthClassNames.grid, pickerStyles.grid, state.grid.className);

  state.previousYearButton.className = mergeClasses(
    calendarMonthClassNames.previousYearButton,
    pickerStyles.navigationButton,
    !state.isPrevYearInBounds && itemStyles.disabled,
    state.previousYearButton.className,
  );

  state.nextYearButton.className = mergeClasses(
    calendarMonthClassNames.nextYearButton,
    pickerStyles.navigationButton,
    !state.isNextYearInBounds && itemStyles.disabled,
    state.nextYearButton.className,
  );
  /* eslint-enable react-hooks/immutability */
  return state;
};
