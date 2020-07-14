import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Adds role='group'.
 */
export const datepickerCalendarBehavior: Accessibility<DatepickerCalendarBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});


export type DatepickerCalendarBehaviorProps = never;
