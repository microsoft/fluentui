import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarPickerStyles, CalendarPickerStyleProps } from './CalendarPicker.types';
import styles from './CalendarPicker.module.css';

/**
 * @internal
 */
export const calendarPickerClassNames: SlotClassNames<CalendarPickerStyles> = {
  root: 'fui-CalendarPicker',
  headerContainer: 'fui-CalendarPicker__headerContainer',
  currentItemButton: 'fui-CalendarPicker__currentItemButton',
  navigationButtonsContainer: 'fui-CalendarPicker__navigationButtonsContainer',
  navigationButton: 'fui-CalendarPicker__navigationButton',
  gridContainer: 'fui-CalendarPicker__gridContainer',
  buttonRow: 'fui-CalendarPicker__buttonRow',
  itemButton: 'fui-CalendarPicker__itemButton',
  current: 'fui-CalendarPicker__current',
  selected: 'fui-CalendarPicker__selected',
  disabled: 'fui-CalendarPicker__disabled',
};

/**
 * Apply styling to the CalendarPicker slots based on the state
 *
 * @internal
 */
export const useCalendarPickerStyles_unstable = (props: CalendarPickerStyleProps): CalendarPickerStyles => {
  const { className, hasHeaderClickCallback, highlightCurrent, highlightSelected } = props;

  return {
    root: clsx(calendarPickerClassNames.root, styles.normalize, styles.root, className),
    headerContainer: clsx(calendarPickerClassNames.headerContainer, styles.headerContainer),
    currentItemButton: clsx(
      calendarPickerClassNames.currentItemButton,
      styles.currentItemButton,
      hasHeaderClickCallback && styles.currentItemButtonHasHeaderClickCallback,
    ),
    navigationButtonsContainer: clsx(
      calendarPickerClassNames.navigationButtonsContainer,
      styles.navigationButtonsContainer,
    ),
    navigationButton: clsx(calendarPickerClassNames.navigationButton, styles.navigationButton),
    gridContainer: clsx(calendarPickerClassNames.gridContainer, styles.gridContainer),
    buttonRow: clsx(calendarPickerClassNames.buttonRow, styles.buttonRow),
    itemButton: clsx(calendarPickerClassNames.itemButton, styles.itemButton),
    selected: clsx(calendarPickerClassNames.selected, highlightSelected && styles.selectedHighlightSelected),
    current: clsx(calendarPickerClassNames.current, highlightCurrent && styles.currentHighlightCurrent),
    disabled: clsx(calendarPickerClassNames.disabled, styles.disabled),
  };
};
