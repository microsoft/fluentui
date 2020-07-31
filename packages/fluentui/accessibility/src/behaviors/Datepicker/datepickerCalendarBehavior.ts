import { Accessibility } from '../../types';
import { datepickerCalendarGridBehavior } from './datepickerCalendarGridBehavior';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Applies 'datepickerCalendarGridBehavior' for 'calendarGrid' child component.
 */
export const datepickerCalendarBehavior: Accessibility<DatepickerCalendarBehaviorProps> = props => ({
  childBehaviors: {
    calendarGrid: datepickerCalendarGridBehavior,
  },
});

export type DatepickerCalendarBehaviorProps = never;
