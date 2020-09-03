import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 * Adds attribute 'aria-selected' based on the property 'selected' to 'root' slot.
 */
export const datepickerCalendarCellBehavior: Accessibility<DatepickerCalendarCellBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-selected': props.selected || false,
      ...(props.disabled && { 'aria-disabled': true }),
      ...(props.today && { 'aria-current': 'date' }),
    },
  },
});

export type DatepickerCalendarCellBehaviorProps = {
  /** Cell can be selected. */
  selected: boolean;

  /** Cell is disabled. */
  disabled: boolean;

  /** Cell refers to today's date. */
  today: boolean;
};
