'use client';

import { clsx } from 'clsx';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles.css';
import { useCalendarPickerStyles } from '../../hooks/useCalendarPickerStyles.styles.css';
import { useCalendarContext_unstable } from '../../contexts/calendarContext';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarMonthSlots, CalendarMonthState } from './CalendarMonth.types';
import styles from './CalendarMonth.module.css';

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

/**
 * Class names of the rows and cells rendered inside the month grid.
 */
export const calendarMonthGridClassNames = {
  row: 'fui-CalendarMonthGridRow',
  cell: 'fui-CalendarMonthGridCell',
} as const;

/**
 * Apply styling to the CalendarMonth slots based on the state.
 */
export const useCalendarMonthStyles_unstable = (state: CalendarMonthState): CalendarMonthState => {
  const pickerStyles = useCalendarPickerStyles();
  const itemStyles = useCalendarItemStyles();
  const highlightCurrent = useCalendarContext_unstable(ctx => ctx.highlightCurrent);
  const highlightSelected = useCalendarContext_unstable(ctx => ctx.highlightSelected);

  /* eslint-disable react-hooks/immutability */
  state.root.className = clsx(
    calendarMonthClassNames.root,
    pickerStyles.normalize,
    pickerStyles.root,
    state.root.className,
  );

  state.yearPicker.className = clsx(styles.embeddedYearPicker, state.yearPicker.className);

  state.header.className = clsx(calendarMonthClassNames.header, pickerStyles.header, state.header.className);

  state.heading.className = clsx(
    calendarMonthClassNames.heading,
    pickerStyles.heading,
    state.headerIsClickable && pickerStyles.hasHeaderClickCallback,
    state.heading.className,
  );

  state.navigation.className = clsx(
    calendarMonthClassNames.navigation,
    pickerStyles.navigation,
    state.navigation.className,
  );

  state.grid.className = clsx(calendarMonthClassNames.grid, pickerStyles.grid, state.grid.className);

  state.previousYearButton.className = clsx(
    calendarMonthClassNames.previousYearButton,
    pickerStyles.navigationButton,
    !state.isPrevYearInBounds && itemStyles.disabled,
    state.previousYearButton.className,
  );

  state.nextYearButton.className = clsx(
    calendarMonthClassNames.nextYearButton,
    pickerStyles.navigationButton,
    !state.isNextYearInBounds && itemStyles.disabled,
    state.nextYearButton.className,
  );

  for (const row of state.monthRows) {
    row.props.className = clsx(calendarMonthGridClassNames.row, itemStyles.buttonRow, row.props.className);
    for (const cell of row.cells) {
      cell.props.className = clsx(
        calendarMonthGridClassNames.cell,
        itemStyles.itemButton,
        cell.isCurrent && highlightCurrent && itemStyles.highlightCurrent,
        cell.isSelected && highlightSelected && itemStyles.highlightSelected,
        !cell.isInBounds && itemStyles.disabled,
        cell.props.className,
      );
    }
  }
  /* eslint-enable react-hooks/immutability */
  return state;
};
