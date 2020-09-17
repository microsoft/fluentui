import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a datepicker calendar grid.
 * The aria roles need to be explicitly added so that VPC mode is turned off when navigating the grid.
 * Thus the keyboard navigation works properly.
 * @specification
 * Adds attribute 'aria-selected' based on the property 'selected' to 'button' slot.
 * Adds role='gridcell' to 'button' slot.
 * Adds role='none' to 'tableCell' slot.
 */
export const datepickerCalendarCellBehavior: Accessibility<DatepickerCalendarCellBehaviorProps> = props => ({
  attributes: {
    button: {
      role: 'gridcell',
      'aria-selected': props.selected || false,
      ...(props.disabled && { 'aria-disabled': true }),
      ...(props.today && { 'aria-current': 'date' }),
    },
    tableCell: {
      role: 'none',
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
