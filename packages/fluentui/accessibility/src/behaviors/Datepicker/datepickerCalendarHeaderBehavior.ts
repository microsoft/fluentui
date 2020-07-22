import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a datepicked calendar component
 * @specification
 * Adds role='group'.
 */
export const datepickerCalendarHeaderBehavior: Accessibility<DatepickerCalendarHeaderBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type DatepickerCalendarHeaderBehaviorProps = never;
