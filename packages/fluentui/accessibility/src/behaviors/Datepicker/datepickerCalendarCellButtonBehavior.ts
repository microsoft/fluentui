import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a datepicker calendar grid cell button.
 * The aria roles need to be explicitly added so that VPC mode is turned off when navigating the grid.
 * Thus the keyboard navigation works properly.
 * @specification
 * Adds attribute 'aria-selected=true' based on the property 'selected'.
 * Adds role='gridcell'.
 */
export const datepickerCalendarCellButtonBehavior: Accessibility<
  DatepickerCalendarCellButtonBehaviorProps
> = props => ({
  attributes: {
    root: {
      role: 'gridcell',
      ...(props.selected && { 'aria-selected': true }),
      ...(props.disabled && { 'aria-disabled': true }),
      ...(props.today && { 'aria-current': 'date' }),
    },
  },
});

export type DatepickerCalendarCellButtonBehaviorProps = {
  /** Cell can be selected. */
  selected: boolean;

  /** Cell is disabled. */
  disabled: boolean;

  /** Cell refers to today's date. */
  today: boolean;
};
