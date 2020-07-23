import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a datepicker calendar grid.
 * @specification
 */
export const datepickerCalendarCellBehavior: Accessibility<DatepickerCalendarCellBehaviorProps> = props => ({
  attributes: {},
});

export type DatepickerCalendarCellBehaviorProps = {
  disabled: boolean;
  hidden: boolean;
};
