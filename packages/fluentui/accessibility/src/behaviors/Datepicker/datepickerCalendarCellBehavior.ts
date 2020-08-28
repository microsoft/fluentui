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
    },
  },
});

export type DatepickerCalendarCellBehaviorProps = {
  /** Cell can be selected. */
  selected: boolean;
};
