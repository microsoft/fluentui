import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a datepicker calendar grid cell.
 * The aria roles need to be explicitly added so that VPC mode is turned off when navigating the grid.
 * Thus the keyboard navigation works properly.
 * @specification
 * Adds role='none'.
 */
export const datepickerCalendarCellBehavior: Accessibility<DatepickerCalendarCellBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'none',
    },
  },
});

export type DatepickerCalendarCellBehaviorProps = {};
