import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicker calendar grid row.
 * @specification
 * Adds role 'row' to 'root' slot.
 */
export const datepickerCalendarGridRowBehavior: Accessibility<DatepickerCalendarGridRowBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'row',
    },
  },
});

export type DatepickerCalendarGridRowBehaviorProps = never;
