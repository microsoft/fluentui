import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Adds role='group'.
 */
const datepickerCalendarBehavior: Accessibility<DatepickerCalendarBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export default datepickerCalendarBehavior;

export type DatepickerCalendarBehaviorProps = never;
